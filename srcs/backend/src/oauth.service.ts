
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
		try{
			return this.prisma.oauth.findUnique({
				where: oauthWhereUniqueInput,
			});
		}
		catch(err){
			console.log("error dans oauth :");
			console.log(err);
		}
	}

	async oauths(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.OauthWhereUniqueInput;
		where?: Prisma.OauthWhereInput;
		orderBy?: Prisma.OauthOrderByWithRelationInput;
	}): Promise<Oauth[]> {
		try{
			const { skip, take, cursor, where, orderBy } = params;
			return this.prisma.oauth.findMany({
				skip,
				take,
				cursor,
				where,
				orderBy,
			});
		}
		catch(err){
			console.log("error dans oauths :");
			console.log(err);
		}
	}

	async getToken(authCode: {code: string}): Promise<Oauth | null> {
		try{
			if (!authCode.code)
				return null;
			let result = new Promise<Oauth | null>(resolve => {
				this.httpClient.post<Oauth>('https://api.intra.42.fr/oauth/token', {
				grant_type: "authorization_code",
				client_id: "bfeae857f60a395fd5665c74d4bedbdcd827cc466384460f5e05cb451e9e4ad0", // A METTRE EN ENVIRONNEMENT
				client_secret: "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",//"daa68f28c0b45a2c11f8adcda2772d0630b5b82b7f8574098cbe3039e9fc4694", // A METTRE EN ENVIRONNEMENT
				code: authCode.code,
				redirect_uri: "https://localhost:8081",
				}).pipe(take(1)).subscribe({
					next: async result => {
						console.log("4");
						resolve(result.data);
					},
					error: err => {
						resolve(null);
					}
				})
			}
			);
			return (await result);
		}
		catch(err){
			console.log("error dans getToken : ");
			console.log(err);
		}
	}


	async updateOauth(params: {
		where: Prisma.OauthWhereUniqueInput;
		data: Prisma.OauthUpdateInput;
	}): Promise<Oauth> {
		try{
			const {where, data } = params;
			return this.prisma.oauth.update({
				data,
				where,
			});
		}
		catch(err){
			console.log("error dans update Oauth :");
			console.log(err);
		}
	}
}
