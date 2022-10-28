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
import { subscribeOn } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: 'https://localhost:8081',
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

  @SubscribeMessage('createChannel')
  async createChannel(client: any, payload: any)
  {
    let data2 = {name: payload[0], creator_id: payload[1]}
    await this.Prisma.channel.create({
      data: data2
    })
    await this.Prisma.channel.update({
      where: {
        name: data2.name
      },
      data: {
        joined: {
          connect: [{id: data2.creator_id}],
        }
      },
    })
    this.server.emit('channelCreated', payload);
  }

  @SubscribeMessage('sendMsgTo')
  async sendMsgTo(client: any, payload: any): Promise<void> {
    // const dest = await this.server.in(payload[1]).fetchSockets;
    payload[1] = (await this.userService.findUserByLogin(payload[3])).socket;
    const roomName = this.createRoomName(payload[2], payload[3]);
    this.server.in(payload[1]).socketsJoin(roomName);
    this.server.in(client.id).socketsJoin(roomName);
    this.server.to(roomName).emit('PrivMsg', {msg: payload[0], channel: roomName, from: payload[2]});
  }

  @SubscribeMessage('getUserInChannel')
  async getUserInChannel(client: Socket, payload: any)
  {
    this.server.in(client.id).socketsJoin(client.id);
    let data = await this.Prisma.channel.findFirst({
			where: {
				name: payload[0]
			},
      select: {
        joined: true,
      }
		});
    this.server.to(client.id).emit('userInChannel', data)
  }

  @SubscribeMessage('needToJoin')
  async bridgeFunction(client: Socket, payload: any)
  {
    this.joinChannel(payload[0], payload[1]);
  }

//payload[0] = channel name
  @SubscribeMessage('joinChannel')
  async joinChannel(client: Socket, payload: any)
  {
    console.log("join channel received on : " + payload[0] + "_channel");
    this.server.in(client.id).socketsJoin(payload[0] + "_channel");
    await this.Prisma.channel.update({
      where: {
        name: payload[0]
      },
      data: {
        joined: {
          connect: [{id: Number(payload[1].id)}],
        }
      },
    })
    let data = await this.Prisma.channel.findFirst({
			where: {
				name: payload[0]
			},
      select: {
        joined: true,
      }
		})
    if (data != null && data != undefined)
        this.server.in(payload[0] + "_channel").emit("channelJoined", data);
    // console.log("data : ")
    // console.log(data)
    // this.server.in(payload + "_channel").emit("channelJoined", data);
  }

//payload[0] = channel name
//payload[1] = expediteur name
//payload[2] = message content

  @SubscribeMessage('MsgInChannel')
  async MsgInChannel(client: Socket, payload: any)
  {
    this.server.to(payload[0] + "_channel").emit('msginchannel', {msg: payload[2], channel: payload[0], from: payload[1]});
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

  async handleDisconnect(client: Socket): Promise<void> {
    this.logger.log(`Client disconnected: ${client.id}`);
    // let tmp = await this.Prisma.user.findFirst({
    //   where: {
    //     socket: client.id
    //   }
    // });
    // await this.Prisma.user.update({
    //     where: {
    //       login: tmp.login,
    //     },
    //     data: {
    //      online: false,
    //     },
    //   });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}