import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateLinkRequest, LinkResponse } from './link.dto';
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
  }: CreateLinkRequest): Promise<LinkResponse> {
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
    let link: Link | null = null;
    try {
      link = await this.linkRepository.findOneBy({
        id: EncoderUtils.decode(requestedSlug),
      });
    } catch (error) {
      Logger.error(
        `Error while fetching link for slug: ${requestedSlug}`,
        error,
      );
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    if (!link) {
      throw new HttpException('Link not found', HttpStatus.NOT_FOUND);
    }

    return link.actualUrl;
  }

  async getRecentShortLinks(): Promise<LinkResponse[]> {
    const links = await this.linkRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return links.map(({ actualUrl, slug }) => ({
      actualUrl,
      shortUrl: `${process.env.BASE_URL}/${slug}`,
    }));
  }
}
