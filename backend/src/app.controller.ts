import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link/link.entity';
import { Repository } from 'typeorm';

@Controller('')
export class AppController {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) {}
  @Get('healthz')
  async healthCheck(): Promise<string> {
    await this.linkRepository.count(); // This simply checks if the database connection is working.
    return 'OK';
  }
}
