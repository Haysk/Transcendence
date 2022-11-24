import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IGameStates } from './game/interfaces/game-states.interface';

@WebSocketGateway()
export class PongGateway {
  @WebSocketServer()
  server!: Server;

  public sendGameStates(gameStates: IGameStates, name: string): void {
    //a faire:
    // envoie de la gameState uniquement au salon concerne
    this.server.emit('gameStatesToClient', gameStates);

    //this.server.emit(name + 'gameStatesToClient', gameStates);
  }
}
