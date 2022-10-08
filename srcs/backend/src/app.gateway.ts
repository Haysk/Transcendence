import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'https://localhost:8081',
    credential:true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private Prisma : PrismaService){}

  @WebSocketServer()
  server!: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): void {
    this.server.emit('msgToClient', payload);
  }

  @SubscribeMessage('sendLogin')
  async setupLogin(client: Socket, payload: any): Promise<void>
  {
    //console.log("LOGIN :" + payload + " | mysocket : " + client.id)
    await this.Prisma.user.update({
      where: {
        login: payload,
      },
      data: {
        mysocket: client.id,
      },
    });
  }

  @SubscribeMessage('msgToMe')
  handlePrivMsg(client:any, payload: any): void
  {
    this.server.sockets.socketsJoin('test_room');
    this.server.sockets.to("test_room").emit('msgToClient', client);
    //this.server.emit('msgToClient', client);
  }

  @SubscribeMessage('moveToServer')
  handleMove(client: any, payload: any): void {
    this.server.emit('moveToClient', payload);
  }

  @SubscribeMessage('gameStatesToServer')
  handleGameStates(client: any, payload: any): void {
    this.server.emit('gameStatesToClient', payload);
  }

  @SubscribeMessage('startToServer')
  handleStart(client: any, payload: any): void {
    this.server.emit('startToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}