import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { TechService } from './tech.service';
import { OauthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, TechService, OauthService],
})
export class AppModule {}
