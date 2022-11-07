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

	async status(code: string) {
		console.log(code);
		
		const result = await this.prisma.oauth.findFirst({
			where: {
				code: code,
			},
			include: {
				tfa: {
					select: {
						tfa_activated: true
					}
				}
			}
		});
		console.log(result.tfa.tfa_activated);
		return (result);
	}

	async disableTfa(code: string) {
		const result = await this.prisma.oauth.findFirst({
			where: {
				code: code
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
					tfa_qr: null,
					tfa_activated: false,
					tfa_secret: null,
					tfa_temp_secret: null
				}
			});
	}

	async createTfa(code: string): Promise<TfaModel> {
		const secret = this.speakeasy.generateSecret({
			name: "Transcendence",
			length: 20
		});
		const qrCode = await this.qrcode.toDataURL(secret.otpauth_url);
		const result = await this.prisma.oauth.findFirst({
			where: {
				code: code
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

	async verifyTfa(params: {code: string, tfa_key: string}) {
		const tmp = await this.prisma.oauth.findUnique({
			where: {
				code: params.code
			},
			select: {
				tfa: {
					select: {
						tfa_temp_secret: true,
						id: true
						
					}
				}
			}
		});
		const verify = this.speakeasy.totp.verify({
			token: params.tfa_key,
			secret: tmp.tfa.tfa_temp_secret,
			encoding: 'base32',
			window: 2,
		});
		if (verify) {
			await this.prisma.tfa.update({
				where: {
					id: tmp.tfa.id
				},
				data: {
					tfa_temp_secret: null,
					tfa_secret: tmp.tfa.tfa_temp_secret,
					tfa_activated: true
				}
			});
		}
			return (verify)
	}

	async validateTfa(params: {code: string, tfa_key: string}) {
		console.log(params);
		const tmp = await this.prisma.oauth.findUnique({
			where: {
				code: params.code
			},
			select: {
				tfa: {
					select: {
						tfa_secret: true,
						id: true
					}
				}
			}
		});
		const verify = this.speakeasy.totp.verify({
			token: params.tfa_key,
			secret: tmp.tfa.tfa_secret,
			encoding: 'base32',
			window: 2,
		});
			if (verify)
				return (this.prisma.user.findFirst({
					where: {
						oauth: {
							code: params.code
						}
					},
					include: {
						oauth: {
							include: {
								tfa: {
									select: {
										tfa_activated: true,
										tfa_qr: true
									}
								}
							}
						}
					}
				}));
		return (verify);
	}

}
