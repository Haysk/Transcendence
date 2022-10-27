import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, take } from 'rxjs';
import { PrismaService } from './prisma.service';
import { Channel, User, Prisma } from '@prisma/client';
import { userInfo } from 'os';
import { UserService } from './user.service';

@Injectable()
export class ChannelService {
	constructor(private prisma: PrismaService,
				private httpClient: HttpService,
				private userService: UserService) { }

		
	INTRA_API = "https://api.intra.42.fr";

	async	joinChannel(param : {target: Channel, user: User}) : Promise<Channel>
	{
		console.log("Channel Service : channel name : " + param.target.name + " | user name : " + param.user.login);
		const data = {id: param.user.id};
		var toto = await this.userService.user(param.user);
		return await this.prisma.channel.update({
			where: {
				name: param.target.name
			},
			data: {
				joined: {
					connect: [{id: toto.id}],
				}
			},
		})
	}

	async	addChannel(params : {name: string, creator_id: number}): Promise<Channel>
	{
		
		console.log("addChannel ChannelService params : creator_id : " + params.creator_id + " | Channel_name : " + params.name);
		await this.prisma.channel.create({
			data: params,
		})
		return await this.prisma.channel.update({
			where: {
				name: params.name,
			},
			data: {
				joined: {
					connect: [{id: params.creator_id}],
				}
			},
		})
	}

	async	findChannelByName(params: string) : Promise<Channel>
	{
		return await this.prisma.channel.findFirst({
			where: {
				name: params
			},
			include: {
				joined: true,
				muted: true,
				admins: true,
				messages: true,
				creator: true
			}
		});
	}


	async getAllChannels() : Promise<Channel[]>
	{
	  return await this.prisma.channel.findMany();
	}

}

