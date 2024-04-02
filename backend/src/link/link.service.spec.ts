import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Link } from './link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLinkRequest, CreateLinkResponse } from './link.dto';
import { EncoderUtils } from '../utils/encoder.utilty';

describe('LinkService', () => {
  let service: LinkService;
  const mockLinkRepository = mock<Repository<Link>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        { provide: getRepositoryToken(Link), useValue: mockLinkRepository },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createShortLink', () => {
    it('should create a short link in database and return it', async () => {
      const mockSavedRecordId = 1;
      const request: CreateLinkRequest = { actualUrl: 'https://google.com' };

      when(mockLinkRepository.insert)
        .calledWith({
          actualUrl: request.actualUrl,
          slug: 'PENDING',
        })
        .mockResolvedValue({
          identifiers: [{ id: mockSavedRecordId }],
        } as unknown as InsertResult);

      when(mockLinkRepository.update)
        .calledWith(
          { id: mockSavedRecordId },
          { slug: EncoderUtils.encode(mockSavedRecordId) },
        )
        .mockResolvedValue({} as UpdateResult);

      const response = await service.createShortLink(request);

      const expectedResponse: CreateLinkResponse = {
        actualUrl: request.actualUrl,
        shortUrl: `${process.env.BASE_URL}/${EncoderUtils.encode(mockSavedRecordId)}`,
      };

      expect(response).toEqual(expectedResponse);
    });
  });
});
