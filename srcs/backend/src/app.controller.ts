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
import { TechService } from './tech.service';
import { MessageService } from './message.service';
import { OauthService } from './oauth.service';
import { User as UserModel, Tech as TechModel, Oauth as OauthModel, Message as MessageModel, Prisma, PrismaClient } from '@prisma/client';
import { delay, first } from 'rxjs';

@Controller()
export class AppController {
	constructor(
		private readonly messageService: MessageService,
		private readonly userService: UserService,
		private readonly techService: TechService,
		private readonly oauthService: OauthService,
	) { }

	@Post('message')
	async addMessage(
		@Body() messageData: {userId: number, fromUserName: string, fromUserId: number, content: string},
	): Promise<MessageModel> {
		console.log("@Post message dans app.controller backend");
		return await this.messageService.createMessage(messageData);
	}

	@Get('messages/:fromUserId:userId')
	async getMessages(
		@Param('fromUserId') fromUserId: number, @Param('userId') userId: number
		): Promise<MessageModel[]> {
			const data = {fromUserId, userId};
			//console.log("app.controller : fromUserId : " + fromUserId + " userId : " + userId);
			return await this.messageService.getMessages(data);
		}
	
	@Get('techs')
	async getTechs(): Promise<TechModel[]> {
		return this.techService.techs({});
	}

	@Get('tech/:id')
	async getTech(@Param('id') id: string): Promise<TechModel> {
		return this.techService.tech({id: Number(id)});
	}

	@Post('tech')
	async addTech(
		@Body() techData: {name: string, categorie?: string, details?: string},
	) : Promise<TechModel> {
		return this.techService.createTech(techData);
	}

	@Post('tech/:id')
	async updateTech(@Param('id') id: string,
		@Body() techData: {name?: string, categorie?: string, details?: string}
	): Promise<TechModel> {
		return this.techService.updateTech({
			where: {id: Number(id) },
			data: techData
		});
	}

	@Delete('tech/:id')
	async deleteTech(@Param('id') id: string): Promise<TechModel> {
		return this.techService.deleteTech({ id: Number(id) });
	}

	@Post('auth/token/code')
	async postInitOauth(
		@Body() oauthCode: {code: string}
	): Promise<UserModel> {
		var oauth = await this.oauthService.getToken(oauthCode);
		if (oauth != null) {
			var user = await this.userService.createUser(oauth);
			return user;
		}
		else {
			throw Prisma.PrismaClientKnownRequestError
		}
		//return this.userService.user(oauthData);
	}

	// @Get('user/:code')
	// async getUserByCode(@Param('code') code: string): Promise<UserModel> {
	// 	return await this.userService.user({code: String(code)});
	// }
	
	// @Post('createUser')
	// async createUser(@Param('id') id: number, @Param('login') login: string, @Param('email') email: string
	// , @Param('first_name') first_name: string, @Param('last_name') last_name: string, @Param('url') url: string
	// , @Param('displayname') displayname: string, @Param('image_url') image_url: string, @Param('online') online: boolean
	// ): Promise<void>
	// {
	// 	const tmp = {id: id, login: login, email: email, first_name: first_name, last_name: last_name, url: url, displayname: displayname, image_url: image_url, online: online, oauth_id:0, socket:""}; 
	// 	return await this.userService.addUser(tmp);
	// }

	@Get('allusers/:current')
	async getAllUsers(@Param('current') id: number) : Promise<UserModel[]>
	{
		let data = id;
		return await this.userService.getAllUsers(data);
	}
}

