import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { Link } from './link.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLinkRequest, LinkResponse } from './link.dto';
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

      const expectedResponse: LinkResponse = {
        actualUrl: request.actualUrl,
        shortUrl: `${process.env.BASE_URL}/${EncoderUtils.encode(mockSavedRecordId)}`,
      };

      expect(response).toEqual(expectedResponse);
    });
  });

  describe('getActualUrl', () => {
    it('should return the stored full URL for the given short link', async () => {
      const requestedSlug = 'some-slug';
      when(mockLinkRepository.findOneBy)
        .calledWith({
          id: EncoderUtils.decode(requestedSlug),
        })
        .mockResolvedValue({ actualUrl: 'https://www.google.com' } as Link);

      const actualUrl = await service.getActalUrl(requestedSlug);

      expect(actualUrl).toEqual('https://www.google.com');
    });

    it('should throw an error if the short link is not found', async () => {
      const requestedSlug = 'does-not-exist';
      when(mockLinkRepository.findOneBy)
        .calledWith({
          id: EncoderUtils.decode(requestedSlug),
        })
        .mockResolvedValue(null);

      await expect(service.getActalUrl(requestedSlug)).rejects.toThrow(
        'Link not found',
      );
    });
  });

  describe('getRecentShortLinks', () => {
    it('should return 10 most recently created short links', async () => {
      const mockLinks: Link[] = Array.from({ length: 10 }).map(
        (_, index) =>
          ({
            id: index + 1,
            actualUrl: 'https://www.google.com',
            slug: EncoderUtils.encode(index + 1),
          }) as Link,
      );
      when(mockLinkRepository.find)
        .calledWith({
          order: { createdAt: 'DESC' },
          take: 10,
        })
        .mockResolvedValue(mockLinks);

      const recentLinks = await service.getRecentShortLinks();

      expect(recentLinks).toEqual(
        mockLinks.map((link) => ({
          actualUrl: link.actualUrl,
          shortUrl: `${process.env.BASE_URL}/${link.slug}`,
        })),
      );
    });
  });
});
