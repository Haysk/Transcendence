import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { TechService } from './tech.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, UserService, PostService, TechService, AppGateway],
})
export class AppModule {}
