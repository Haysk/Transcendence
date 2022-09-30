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
import { OauthService } from './oauth.service';
import { User as UserModel, Tech as TechModel, Oauth as OauthModel } from '@prisma/client';

@Controller()
export class AppController {
	constructor(
		private readonly userService: UserService,
		private readonly techService: TechService,
		private readonly oauthService: OauthService,
	) { }

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
		@Body() oauthData: {code: string}
	) : Promise<OauthModel> {
		this.oauthService.getCode(oauthData);
		return this.oauthService.initUser(oauthData);
	}
}

