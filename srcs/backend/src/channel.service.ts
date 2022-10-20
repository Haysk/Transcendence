import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, take } from 'rxjs';
import { PrismaService } from './prisma.service';
import { Channel, User, Prisma } from '@prisma/client';
import { userInfo } from 'os';

@Injectable()
export class ChannelService {
	constructor(private prisma: PrismaService,
		private httpClient: HttpService) { }

		
	INTRA_API = "https://api.intra.42.fr";

	async	joinChannel(param : {target: Channel, user: User}) : Promise<Channel>
	{
		console.log("Channel Service : channel name : " + param.target.name + " | user name : " + param.user.login);
		return await this.prisma.channel.update({
			where: {
				name: param.target.name
			},
			data: {
				joined: {
					set: [{id: param.user.id}],
				}
			},
		})
	}

	async	addChannel(params : {name: string, creator_id: number}): Promise<Channel>
	{
		console.log("addChannel ChannelService params : creator_id : " + params.creator_id + " | Channel_name : " + params.name);
		return await this.prisma.channel.create({
			data: params,
		})
	}

	async	findChannelByName(params: string)
	{
		return await this.prisma.channel.findFirst({
			where: {
				name: params
			}
		});
	}


	async getAllChannels() : Promise<Channel[]>
	{
	  return await this.prisma.channel.findMany();
	}

}

