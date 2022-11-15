import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { TechService } from './tech.service';
import { AppGateway } from './app.gateway';
import { HttpModule } from '@nestjs/axios';
import { OauthService } from './oauth.service';
import { PongModule } from './pong/pong.module';

@Module({
  imports: [HttpModule, PongModule],
  controllers: [
    AppController
  ],
  providers: [
    PrismaService,
    UserService,
    TechService,
    MessageService,
    AppGateway,
    OauthService
  ],
})
export class AppModule { }
