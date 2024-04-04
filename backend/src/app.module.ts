import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Link } from './link/link.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // reads valus from .env file
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME') || 'urlsshortenerdb',
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get('DB_SSL') === 'true',
      }),
    }),
    LinkModule,
    TypeOrmModule.forFeature([Link]), // Injected here since health check API in AppController uses this
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
