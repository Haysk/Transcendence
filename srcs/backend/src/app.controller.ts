import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TechService } from './tech.service';
import { MessageService } from './message.service';
import { OauthService } from './oauth.service';
import { TfaService } from './tfa.service';
import {
	User as UserModel, Tech as TechModel,
	Oauth as OauthModel, Message as MessageModel,
	Tfa as TfaModel,
	Prisma, PrismaClient
} from '@prisma/client';

@Controller()
export class AppController {
	constructor(
		private readonly messageService: MessageService,
		private readonly userService: UserService,
		private readonly techService: TechService,
		private readonly oauthService: OauthService,
		private readonly tfaService: TfaService
	) { }

	@Post('message')
	async addMessage(
		@Body() messageData: { userId: number, fromUserName: string, fromUserId: number, content: string },
	): Promise<MessageModel> {
		console.log("@Post message dans app.controller backend");
		return await this.messageService.createMessage(messageData);
	}

	@Get('getSocket/:login')
	async getSocket(@Param('login') login: string): Promise<UserModel> {
		return await this.userService.findUsertByLogin(login);
	}

	@Get('messages/:fromUserId/:userId')
	async getMessages(
		@Param('fromUserId') fromUserId: Number, @Param('userId') userId: Number
	): Promise<MessageModel[]> {
		let data = { fromUserId, userId };
		console.log("app.controller : data.fromUserId : " + data.fromUserId + " data.userId : " + data.userId);
		return await this.messageService.getMessages(data);
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
		@Body() techData: { name: string, categorie?: string, details?: string },
	): Promise<TechModel> {
		return this.techService.createTech(techData);
	}

	@Post('tech/:id')
	async updateTech(@Param('id') id: string,
		@Body() techData: { name?: string, categorie?: string, details?: string }
	): Promise<TechModel> {
		return this.techService.updateTech({
			where: { id: Number(id) },
			data: techData
		});
	}

	@Delete('tech/:id')
	async deleteTech(@Param('id') id: string): Promise<TechModel> {
		return this.techService.deleteTech({ id: Number(id) });
	}

	@Post('auth/token/code')
	async postInitOauth(
		@Body() oauthCode: { code: string | null }
	): Promise<UserModel> {
		var oauth = await this.oauthService.getToken(oauthCode);
		if (oauth != null) {
			var user = await this.userService.createUser(oauth, oauthCode.code);
			return user;
		}
		else {
			throw Prisma.PrismaClientKnownRequestError
		}
	}

	@Get('users/:code')
	async getUsers(@Param('code') code: string): Promise<UserModel[]> {
		let data = code;
		return await this.userService.getAllUsers(data);
	}

	@Patch('user/:id')
	async patchUser(@Param('id') id: number,
		@Body() userData: { online?: boolean, two_factor_auth?: boolean }): Promise<UserModel> {
		return this.userService.updateUser({
			where: { id: id },
			data: userData
		});
	}

	// @Get('tfa/')
	// async getTfa(){}

	@Patch('tfa/')
	async patchTfa(
		@Body() data: { code: string, tfa: boolean }): Promise<TfaModel> {
		return this.tfaService.updateTfa(data);
	}

	@Post('tfa/signup')
	async postSignup(
		@Body() data: { code: string }): Promise<TfaModel> {
		console.log("signup");
		return (this.tfaService.createTfa(data));
	}
	//si tfa secret n'existe pas lors du login

	@Post('tfa/verify')
	async postVerify(
		@Body() param: { code: string, verify_tfa_key: string }) {
		return this.tfaService.verifyTfa(param);
	}

	@Post('tfa/validate')
	async postValidate(
		@Body() data: { code: string }) {

	}
}
