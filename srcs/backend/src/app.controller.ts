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
import { ChannelService } from './channel.service';
import { OauthService } from './oauth.service';
import { User as UserModel, Tech as TechModel, Oauth as OauthModel, Message as MessageModel, Channel as ChannelModel, Prisma, PrismaClient, User } from '@prisma/client';

@Controller()
export class AppController {
	constructor(
		private readonly messageService: MessageService,
		private readonly userService: UserService,
		private readonly techService: TechService,
		private readonly oauthService: OauthService,
		private readonly channelService: ChannelService,
	) { }

	@Post('joinChannel')
	async joinChannel(@Body() data : {target: ChannelModel, user: UserModel})
	{
		console.log("App Controller : channel name : " + data.target.name + " | user name : " + data.user.login);
		return await this.channelService.joinChannel(data);
	}

	@Post('addChannel')
	async addChannel(@Body() ChannelData: {name: string, creator_id: number},): Promise<ChannelModel>
	{
		console.log("addChannel");
		return await this.channelService.addChannel(ChannelData);
	}

	@Post('addPrivateChannel')
	async addPrivateChannel(@Body() ChannelData: {name: string, creator_id: number, password: string},): Promise<ChannelModel>
	{
		console.log("addPrivateChannel");
		return await this.channelService.addChannel(ChannelData);
	}

	@Post('updateNickName')
	async updateNickName(@Body() UserData:{id:number, nickname:string},): Promise<UserModel>
	{
		return await this.userService.updateNickName(UserData);
	}

	@Get('getAllChannels')
	async getAllChannels() : Promise<ChannelModel[]>
	{
		return await this.channelService.getAllChannels();
	}

	@Get('findChannelByName/:name')
	async findChannelByName(@Param('name') name: string): Promise<ChannelModel>
	{
		return await this.channelService.findChannelByName(name);
	}

	@Get('userByLogin/:login')
	async getUserByLogin(@Param('login') login: string)
	{
		//console.log("getUserByLogin : " + login);
		return await this.userService.findUserByLogin(login);
	}

	// @Post('updateNickName/:')

	@Post('message')
	async addMessage(
		@Body() messageData: {userId: number, fromUserName: string, fromUserId: number, content: string},
	): Promise<MessageModel> {
		console.log("@Post message dans app.controller backend");
		return await this.messageService.createMessage(messageData);
	}

	@Post('channelMessage')
	async channelMessage(
		@Body() messageData: {channel_name: string, fromUserName: string, fromUserId: number, content: string}) : Promise<MessageModel> {
		console.log("addChannelMessage is okay");
		return await this.messageService.createChannelMessage(messageData);
	}
	
	@Get('getSocket/:login')
	async getSocket(@Param('login') login: string) : Promise<UserModel>
	{
		return await this.userService.findUserByLogin(login);
	}

	@Get('messages/:fromUserId/:userId')
	async getMessages(
		@Param('fromUserId') fromUserId: Number, @Param('userId') userId: Number
		): Promise<MessageModel[]> {
			let data  = {fromUserId, userId};
			// console.log("app.controller : data.fromUserId : " + data.fromUserId + " data.userId : " + data.userId);
			return await this.messageService.getMessages(data);
		}
	
	@Get('channelMessages/:channelName')
	async getChannelMessages(
		@Param('channelName') channelName: string
	): Promise<MessageModel[]> {
		let data = {channelName};
		return await this.messageService.getChannelMessages(data);
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

