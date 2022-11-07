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

	@Get('user/:code')
	async getUser(
		@Param('code') code: string) {
		this.userService.user({ code: code });
	}

	@Post('auth/')
	async signup(
		@Body() auth: { code: string }): Promise<UserModel | boolean> {
		try {
			var oauth = await this.oauthService.getToken(auth.code);
			if (oauth != null)
				return await this.userService.createUser(oauth, auth.code);
			else
				throw Prisma.PrismaClientKnownRequestError
		} catch (e) {
			console.log("User Init fail");
		}
	}

	@Patch('tfa/disable')
	async patchTfa(
		@Body() code: string) {
		this.tfaService.disableTfa(code);
	}

	@Post('tfa/signup')
	async postSignup(
		@Body() code: string): Promise<TfaModel> {
		return (this.tfaService.createTfa(code));
	}

	@Post('tfa/verify')
	async postVerify(
		@Body() param: { code: string, tfa_key: string }) {
		return (await this.tfaService.verifyTfa(param))
	}

	@Post('tfa/validate')
	async postValidate(
		@Body() param: { code: string, tfa_key: string }): Promise<UserModel | boolean> {
		return (await this.tfaService.validateTfa(param));
	}
}
