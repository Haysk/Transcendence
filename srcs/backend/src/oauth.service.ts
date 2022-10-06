
import { HttpServer, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Oauth, User, Prisma } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { catchError, take } from 'rxjs';

export interface Tokens {
		access_token: string,
		token_type: string,
		expires_in: number,
		refresh_token: string,
		scope: string,
		created_at: number
}

@Injectable()
export class OauthService {
	constructor(private prisma: PrismaService,
				private httpClient: HttpService) {}

	INTRA_API = "https://api.intra.42.fr";

	async oauth(
		oauthWhereUniqueInput: Prisma.OauthWhereUniqueInput,
	): Promise<Oauth | null> {
		return this.prisma.oauth.findUnique({
			where: oauthWhereUniqueInput,
		});
	}

	async oauths(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.OauthWhereUniqueInput;
		where?: Prisma.OauthWhereInput;
		orderBy?: Prisma.OauthOrderByWithRelationInput;
	}): Promise<Oauth[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.oauth.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async getToken(authCode: {code: string}): Promise<Oauth | null> {
		if (!authCode.code)
			return;
		let result = new Promise<Oauth | null>(resolve => {
				this.httpClient.post<Oauth>('https://api.intra.42.fr/oauth/token', {
				grant_type: "authorization_code",
				client_id: "bfeae857f60a395fd5665c74d4bedbdcd827cc466384460f5e05cb451e9e4ad0", // A METTRE EN ENVIRONNEMENT
				client_secret: "24aabe296e1989a276ad4f144753168a4d9e37b493ecca63e524eb1b711999a0", // A METTRE EN ENVIRONNEMENT
				code: authCode.code,
				redirect_uri: "https://localhost:8081",
			}).pipe(take(1)).subscribe({
				next: async result => {
					resolve(await result.data);
				},
				error: err =>{
					resolve(null);
				}

			})
		}
		);
		return (await result);
	}


	async updateOauth(params: {
		where: Prisma.OauthWhereUniqueInput;
		data: Prisma.OauthUpdateInput;
	}): Promise<Oauth> {
		const {where, data } = params;
		return this.prisma.oauth.update({
			data,
			where,
		});
	}
}
