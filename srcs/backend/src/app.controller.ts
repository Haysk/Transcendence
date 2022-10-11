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

	@Get('getSocket/:login')
	async getSocket(@Param('login') login: string) : Promise<UserModel>
	{
		return await this.userService.findUsertByLogin(login);
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

	@Get('allusers/:current')
	async getAllUsers(@Param('current') id: number) : Promise<UserModel[]>
	{
		let data = id;
		return await this.userService.getAllUsers(data);
	}
}

