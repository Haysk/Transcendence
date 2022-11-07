import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma, Tfa } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { catchError, take } from 'rxjs';

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService,
		private httpClient: HttpService) { }

	INTRA_API = "https://api.intra.42.fr";

  async getAllUsers(code: string) : Promise<User[]>
  {
    return this.prisma.user.findMany({
      where: {
        oauth: {
			code: {
				not: code,
			}
		},
      },
})
  }

  async findUserByLogin(login: string) : Promise<User>
  {
	// let user = 
	return await this.prisma.user.findUnique({
		where: {
			login: login
		}
	})
  }


  async updateNickName(params: {id:number, nickname:string}) : Promise<User>
  {

	return await this.prisma.user.update({
		where: {
			id: params.id,
		},
		data: {
			nickname: params.nickname,
		},

	})
  }

  async updateAvatar(params: {id:number, avatar_url:string}) : Promise<User>
  {

	return await this.prisma.user.update({
		where: {
			id: params.id,
		},
		data: {
			avatar_url: params.avatar_url,
		},

	})
  }

	async user(
		userWhereInput: Prisma.UserWhereInput,
	): Promise<User> {
		return this.prisma.user.findFirst({
			where: {
				id: userWhereInput.id
			}
		});
	}

	async users(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: Prisma.UserWhereInput;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<User[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async addUser(params: User) {
		await this.prisma.user.create({
			data: params,
		})
	}


	async createUser(params: Prisma.OauthCreateInput, code: string): Promise<User | boolean> {
		return new Promise<User | boolean>((resolve) => { this.httpClient.get<User>(`${this.INTRA_API}/v2/me`, { params })
			.pipe(take(1))
			.subscribe(async (result) => {
				try {
					await this.prisma.user.create({
						data: {
							id: result.data.id,
							email: result.data.email,
							login: result.data.login,
							first_name: result.data.first_name,
							last_name: result.data.last_name,
							url: result.data.url,
							displayname: result.data.displayname,
							image_url: result.data.image_url,
							nickname: result.data.displayname,
							avatar_url: result.data.image_url,
							oauth: {
								create: {
									code: code,
									refresh_token: params.refresh_token,
									access_token: params.access_token,
									tfa: {
										create: {}
									}
								},
							},
							online: true,
						},
					});
				} catch (e) {
					await this.prisma.user.update({
						where: {
							id: result.data.id
						},
						data: {
							oauth: {
								update: {
									code: code,
									refresh_token: params.refresh_token,
									access_token: params.access_token,
								}
							},
							online: true,
						}
					});
				}
				const tmp = await this.prisma.user.findFirst({
					where: {
						id: result.data.id
					},
					include: {
						oauth: {
							select: {
								tfa: {
								}
							}
						}
					}
				});
				if (tmp.oauth.tfa.tfa_activated)
					resolve(tmp.oauth.tfa.tfa_activated);
				resolve(tmp);
			})})
	}

	async updateUser(params: {
		where: Prisma.UserWhereUniqueInput;
		data: Prisma.UserUpdateInput;
	}): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({
			data,
			where,
		});
	}

	async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
		return this.prisma.user.delete({
			where,
		});
	}
}
