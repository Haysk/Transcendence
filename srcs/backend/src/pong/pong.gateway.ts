import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IGameStates } from './game/interfaces/game-states.interface';

@WebSocketGateway()
export class PongGateway {
  @WebSocketServer()
  server!: Server;

  public sendGameStates(gameStates: IGameStates): void {
    this.server.emit('gameStatesToClient', gameStates);
  }
}
