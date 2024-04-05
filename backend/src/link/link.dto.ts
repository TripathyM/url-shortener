import { IsUrl } from 'class-validator';

export class CreateLinkRequest {
  @IsUrl({
    require_protocol: true,
    require_tld: true,
    protocols: ['http', 'https'],
  })
  actualUrl: string;
}

export class LinkResponse {
  actualUrl: string;
  shortUrl: string;
}
