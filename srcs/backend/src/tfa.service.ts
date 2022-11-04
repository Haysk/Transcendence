import { Injectable } from "@nestjs/common";
import { Oauth as OauthModel } from "@prisma/client";
import { OauthService } from "./oauth.service";
import { Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";
import { totp } from 'otplib';
import { Tfa as TfaModel } from "@prisma/client"
import { Tfa } from "@prisma/client";

@Injectable()
export class TfaService {
	qrcode = require('qrcode');
	speakeasy = require('speakeasy');
	constructor(private oauthService: OauthService,
				private prisma: PrismaService) {}

	async updateTfa(data: { code: string, tfa: boolean }): Promise<TfaModel> {
		const result = await this.prisma.oauth.findFirst({
			where: {
				code: data.code
			},
			select: {
				tfa: true
			}
		});
		const tmp = await this.prisma.tfa.update({
				where: {
					id: result.tfa.id
				},
				data: {
					tfa_qr: data.tfa === false ? null : result.tfa.tfa_qr,
					tfa_activated: data.tfa
				}
			});
		delete tmp.tfa_secret;
		delete tmp.tfa_temp_secret;
		return tmp
	}

	async createTfa(params: Prisma.OauthCreateInput): Promise<TfaModel> {
		const secret = this.speakeasy.generateSecret({
			name: "Transcendence",
			length: 20
		});
		const qrCode = await this.qrcode.toDataURL(secret.otpauth_url);
		const result = await this.prisma.oauth.findFirst({
			where: {
				code: params.code
			},
			select: {
				tfa: true
			}
		});
		const tmp = await this.prisma.tfa.update({
			where: {
				id: result.tfa.id,
			},
			data: {
					tfa_temp_secret: secret.base32,
					tfa_qr: qrCode
			},
		});
		delete tmp.tfa_secret;
		delete tmp.tfa_temp_secret;
		return tmp;
	}

	async verifyTfa(params: {code: string, verify_tfa_key: string}) {
		const tmp = await this.prisma.oauth.findUnique({
			where: {
				code: params.code
			},
			select: {
				tfa: {
					select: {
						tfa_temp_secret: true
					}
				}
			}
		});
		const verify = this.speakeasy.totp.verify({
			token: params.verify_tfa_key,
			secret: tmp.tfa.tfa_temp_secret,
			encoding: 'base32',
			window: 10,
		});
		console.log(verify);
	}

	validateTfa(params: Prisma.OauthCreateInput) {

	}

}
