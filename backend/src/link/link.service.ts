import { Injectable } from '@nestjs/common';
import { CreateLinkRequest } from './link.dto';

@Injectable()
export class LinkService {
  async createShortLink(request: CreateLinkRequest) {
    throw new Error('Method not implemented.');
  }
}
