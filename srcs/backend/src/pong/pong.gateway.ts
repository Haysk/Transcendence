import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SaveGameService } from 'src/save-game/save-game.service';
import { IGameStates } from './game/interfaces/game-states.interface';
import { SGame } from './game/interfaces/save-game.interface';

@WebSocketGateway()
export class PongGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private saveGame: SaveGameService){}

  public sendGameStates(gameStates: IGameStates, name: string): void {
    this.server.emit(name + '_gameStatesToClient', gameStates);
  }


  public gameIsFinished(game: SGame)
  {
    this.saveGame.createGame(game);
    this.server.to(game.roomName).emit('gameIsFinished', game);
  }
}
