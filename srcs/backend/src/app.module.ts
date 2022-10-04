import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
<<<<<<< HEAD
import { MessageService } from './message.service';
// import { PostService } from './post.service';
import { TechService } from './tech.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
    PrismaService, 
    UserService, 
    TechService, 
    MessageService, 
    AppGateway
  ],
=======
import { TechService } from './tech.service';
import { OauthService } from './oauth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService, UserService, TechService, OauthService],
>>>>>>> origin/OAut
})
export class AppModule {}
