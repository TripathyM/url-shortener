import { Injectable } from '@nestjs/common';
import { CreateLinkRequest, CreateLinkResponse } from './link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { Repository } from 'typeorm';
import { EncoderUtils } from '../utils/encoder.utilty';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) {}

  async createShortLink({
    actualUrl,
  }: CreateLinkRequest): Promise<CreateLinkResponse> {
    const { identifiers } = await this.linkRepository.insert({
      actualUrl,
      slug: 'PENDING', // This is an intermediate value and will be updated to a unique slug later.
    });
    const insertedRecordId: number = identifiers[0].id;
    const slug = EncoderUtils.encode(insertedRecordId);
    await this.linkRepository.update(insertedRecordId, {
      slug,
    });

    return {
      actualUrl,
      shortUrl: `${process.env.BASE_URL}/${slug}`,
    };
  }
}
