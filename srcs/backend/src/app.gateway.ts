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
import { async } from 'rxjs';
import { emit } from 'process';

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

  @SubscribeMessage('getAddFriend')
  async addingFriend(client: Socket, payload: any){
    // console.log("test add " + payload);
    try{
      let data = await this.Prisma.user.update({
        where: {
          id: Number(payload[0]),
        },
        data:{
          friends: {
            connect: [{id: Number(payload[1])}]
          },
      },
      include: {
        friends: true,
      }
      })
      if (data != null && data != undefined)
      {
        this.server.to(client.id).emit('addFriend', data.friends);
        // this.server.to(client.id).emit('updateListFriend',data.friends);
      }
    }
    catch(err){
      console.log("issue dans getAddFriend");
      console.log(err);
    }
  }

  @SubscribeMessage('getRemoveFriend')
  async removingFriend(client: Socket, payload: any){
    // console.log("test remove " + payload);
    try{
      let data = await this.Prisma.user.update({
        where: {
          id: Number(payload[0]),
        },
        data:{
          friends: {
            disconnect: [{id: Number(payload[1])}]
          }
        },
        include: {
          friends: true,
        }
      })
      if (data != null && data != undefined)
      {
        this.server.to(client.id).emit('removeFriend', data.friends);
      }
    }
    catch(err){
      console.log("issue dans le remove friend");
      console.log(err);
    }
  }

  @SubscribeMessage('getFriendList')
  async getFriendList(client: any, payload : any)
  {
    //console.log("test get Friend list" + payload);
    try{
      let data = await this.Prisma.user.findFirst({
        where: {
          id: Number(payload),
        },
        include: {
          friends: true,
        },
      })
      if (data != null && data != undefined)
      {
        console.log(data);
        this.server.to(client.id).emit('listFriends', data.friends);
      }
    }
    catch(err){
      console.log("issue dans le get friend list");
      console.log(err);
    }
  }

  @SubscribeMessage('checkIfFriend')
  async checkIfFriend(client: any, payload: any)
  {
    // console.log("check if friend app gateway");
    // console.log(payload[0]);
    // console.log(payload[1]);
    // console.log("hello youuuuuuuu");
    try{
      let data = await this.Prisma.user.findUnique({
        where: {
          id: Number(payload[0]),
        },
        include: {
          friends: true,
        }
      })
    
      
      if (data !== null && data !== undefined){
        const value = data.friends.find((element) => payload[1] === element.id);
        // console.log("111515150000000000000");
        if (value !== undefined){
          this.server.to(client.id).emit('findFriendsOrNot', 1);
          // console.log("11111111111111");
        }
        else{
          this.server.to(client.id).emit('findFriendsOrNot', 0);
          // console.log("00000000000000sdffdsfsddsffds00000");
        }}
      }
    catch(err){
    console.log("issue dans le get friend list");
    console.log(err);
    }
  }

    // const found = payload[0].find(element => element.id === payload[1]);
    // console.log(found);
    
    // try{
    //   let data = await this.      
    // }
    // if (data == 1)
    // {
    //   console.log(data);
    //   this.server.to(client.id).emit('friendOrNot', data)
    // }
    
}