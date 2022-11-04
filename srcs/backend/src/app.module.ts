import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { MessageService } from './message.service';
import { TechService } from './tech.service';
import { AppGateway } from './app.gateway';
import { HttpModule } from '@nestjs/axios';
import { OauthService } from './oauth.service';
import { TfaService } from './tfa.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({envFilePath: "../.env", isGlobal: true})],
  controllers: [
    AppController
  ],
  providers: [
    PrismaService, 
    UserService, 
    TechService, 
    MessageService, 
    AppGateway, 
    OauthService,
	TfaService
  ],
})
export class AppModule {}
