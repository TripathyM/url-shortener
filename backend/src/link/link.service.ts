import { Injectable, Logger } from '@nestjs/common';
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

    Logger.log(`Created short link: ${slug} for ${actualUrl}`);

    return {
      actualUrl,
      shortUrl: `${process.env.BASE_URL}/${slug}`,
    };
  }

  async getActalUrl(requestedSlug: string): Promise<string> {
    Logger.log(`Requested slug: ${requestedSlug}`);
    const link = await this.linkRepository.findOneBy({
      id: EncoderUtils.decode(requestedSlug),
    });

    if (!link) {
      throw new Error('Link not found'); // TODO Map this exception later
    }

    return link.actualUrl;
  }
}
