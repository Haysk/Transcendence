import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { TechService } from './tech.service';
import {
  User as UserModel,
  Post as PostModel,
  Tech as TechModel,
} from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly techService: TechService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }

  @Get('techs')
  async getTechs(): Promise<TechModel[]> {
    return this.techService.techs({});
  }

  @Get('tech/:id')
  async getTech(@Param('id') id: string): Promise<TechModel> {
    return this.techService.tech({ id: Number(id) });
  }

  @Post('tech')
  async addTech(
    @Body() techData: { name: string; categorie?: string; details?: string },
  ): Promise<TechModel> {
    return this.techService.createTech(techData);
  }

  @Post('tech/:id')
  async updateTech(
    @Param('id') id: string,
    @Body() techData: { name?: string; categorie?: string; details?: string },
  ): Promise<TechModel> {
    return this.techService.updateTech({
      where: { id: Number(id) },
      data: techData,
    });
  }

  @Delete('tech/:id')
  async deleteTech(@Param('id') id: string): Promise<TechModel> {
    return this.techService.deleteTech({ id: Number(id) });
  }
}
