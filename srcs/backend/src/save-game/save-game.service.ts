import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SGame } from 'src/pong/game/interfaces/save-game.interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaveGameService {
  constructor(private Prisma: PrismaService) {}

  async createGame(game: SGame) {
    if (game.player1 != undefined && game.player2 != undefined) {
      try{
        let result = await this.Prisma.game.create({
          data: {
            roomName: game.roomName,
            players: {
              connect:  [{id: game.player1.id}, {id: game.player2.id}]
            },
            player1_score: game.player1_score,
            player2_score: game.player2_score
          },
      });
      if (result !== null && result !== undefined) {
        console.log('data game created');
      }
      }
      catch(err){
        console.log("erreur dans saveGame :")
        console.log(err)
      }
    }
  }
}
