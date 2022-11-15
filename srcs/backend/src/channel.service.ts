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

	// async	joinChannel(param : {target: Channel, user: User}) : Promise<Channel>
	// {
	// 	try{
	// 		//console.log("Channel Service : channel name : " + param.target.name + " | user name : " + param.user.login);
	// 		var toto = await this.userService.user(param.user);
	// 		return await this.prisma.channel.update({
	// 			where: {
	// 				name: param.target.name
	// 			},
	// 			data: {
	// 				joined: {
	// 					connect: [{id: toto.id}],
	// 				}
	// 			},
	// 		})
	// 	}
	// 	catch(err)
	// 	{
	// 		console.log("error joinChannel service :");
	// 		console.log(err);
	// 	}
	// }

	async	addChannel(params : {name: string, creator_id: number}): Promise<Channel>
	{
		
		//console.log("addChannel ChannelService params : creator_id : " + params.creator_id + " | Channel_name : " + params.name);
		try{
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
		catch(err)
		{
			console.log("error dans addChannel service :");
			console.log(err);
		}
	}

	async	findChannelByName(params: string) : Promise<Channel>
	{
		try{
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
		catch(err)
		{
			console.log("error dans findChannelByName service :");
			console.log(err);
		}
	}


	async getAllChannels() : Promise<Channel[]>
	{
	  return await this.prisma.channel.findMany();
	}

}

