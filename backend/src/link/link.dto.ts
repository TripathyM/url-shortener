// TODO Add validation to request
export class CreateLinkRequest {
  actualUrl: string;
}

export class CreateLinkResponse {
  actualUrl: string;
  shortUrl: string;
}
