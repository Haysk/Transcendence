import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { SGame } from './game/interfaces/save-game.interface';

@Injectable()
export class SaveGameService 
{
	constructor(private Prisma: PrismaService){}

	async createGame(game: SGame)
	{
		let result = await this.Prisma.game.create({
			data: {
				roomName:		game.roomName,
				scorePlayer1:	game.player1_score,
				scorePlayer2:	game.player2_score,
				players: {
					connect: 
						[{id: game.player1.id},
						{id: game.player2.id}]
				}
			},
		})
		if (result !== null && result !== undefined)
		{
			console.log("data game created");
		}
	}
}