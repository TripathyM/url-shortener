import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkRequest, LinkResponse } from './link.dto';

@Controller('')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  createShortLink(
    @Body() createShortLinkRequest: CreateLinkRequest,
  ): Promise<LinkResponse> {
    return this.linkService.createShortLink(createShortLinkRequest);
  }

  @Get('recentLinks')
  async getRecentShortLinks(): Promise<LinkResponse[]> {
    return this.linkService.getRecentShortLinks();
  }

  @Get(':slug')
  @Redirect('', HttpStatus.MOVED_PERMANENTLY)
  async getUrl(@Param('slug') slug: string) {
    const url = await this.linkService.getActalUrl(slug);
    return { url };
  }
}
