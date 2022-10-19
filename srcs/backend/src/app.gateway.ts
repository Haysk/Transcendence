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
import { IoAdapter } from '@nestjs/platform-socket.io';
import { UserService } from './user.service';

@WebSocketGateway({
  cors: {
    origin: 'https://' + process.env.IP_HOST,
    credential:true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private Prisma : PrismaService, private readonly userService: UserService,){}

  createRoomName(login1: string, login2: string): string
  {
    let result: string;

    if (login1 < login2)
      result = login1 + login2;
    else
      result = login2 + login1;
    return result;
  }

  @WebSocketServer()
  server!: Server;
  private logger: Logger = new Logger('AppGateway');

  //payload[0] = message
  //payload[1] = socket dest
  //payload[2] = login1 - expediteur
  //payload[3] = login2 - Dest
  
  @SubscribeMessage('sendMsgTo')
  async sendMsgTo(client: any, payload: any): Promise<void> {
    // const dest = await this.server.in(payload[1]).fetchSockets;
    payload[1] = (await this.userService.findUserByLogin(payload[3])).socket;
    const roomName = this.createRoomName(payload[2], payload[3]);
    this.server.in(payload[1]).socketsJoin(roomName);
    this.server.in(client.id).socketsJoin(roomName);
    this.server.to(roomName).emit('PrivMsg', {msg: payload[0], channel: roomName, from: payload[2]});
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
        socket: client.id,
      },
    });
  }

  @SubscribeMessage('msgToMe')
  handlePrivMsg(client:any, payload: any): void
  {
    // this.server.sockets.socketsJoin('test_room');
    this.server.sockets.to(payload).emit('msgToClient', client);
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
