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
<<<<<<< HEAD
import { MessageService } from './message.service';
import { User as UserModel, Tech as TechModel, Message as MessageModel} from '@prisma/client';
=======
import { OauthService } from './oauth.service';
import { User as UserModel, Tech as TechModel, Oauth as OauthModel } from '@prisma/client';
>>>>>>> origin/OAut

@Controller()
export class AppController {
	constructor(
		private readonly messageService: MessageService,
		private readonly userService: UserService,
		private readonly techService: TechService,
		private readonly oauthService: OauthService,
	) { }

<<<<<<< HEAD
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

	@Post('user')
	async signupUser(
		@Body() userData: { name: string; online: boolean; avatarUrl: string },
	): Promise<UserModel> {
		return this.userService.createUser(userData);
	}
	
=======
>>>>>>> origin/OAut
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
		@Body() oauthData: {code: string}
	) : Promise<OauthModel> {
		this.oauthService.getCode(oauthData);
		return this.oauthService.initUser(oauthData);
	}
}

