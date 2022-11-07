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
import { BanAndMuteService } from './banAndMute.service'

@WebSocketGateway({
  cors: {
    origin: 'https://' + process.env.IP_HOST,
    credential:true,
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private BaM: BanAndMuteService, private Prisma : PrismaService, private readonly userService: UserService,){}

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

  /* MUTE */

  @SubscribeMessage('muteUserByTime')
  muteUserByTime(client: any, payload: any)
  {
    this.BaM.muteUserDuringDelay(payload[0], payload[1], payload[2]);
  }

  @SubscribeMessage('muteUser')
  muteUser(client: any, payload: any)
  {
    this.BaM.muteUserFromChannel(payload[0], payload[1]);
  }
  
  @SubscribeMessage('unmuteUser')
  unmuteUser(client: any, payload: any)
  {
    this.BaM.unmuteUserFromChannel(payload[0], payload[1]);
  }

  /* BAN */

  @SubscribeMessage('banUserByTime')
  banUserByTime(client: any, payload: any)
  {
    this.BaM.banUserDuringDelay(payload[0], payload[1], payload[2]);
  }

  @SubscribeMessage('banUser')
  banUser(client: any, payload: any)
  {
    this.BaM.banUserFromChannel(payload[0], payload[1]);
  }
  
  @SubscribeMessage('unbanUser')
  unbanUser(client: any, payload: any)
  {
    this.BaM.unbanUserFromChannel(payload[0], payload[1]);
  }

  /* CONNECTION */

  @SubscribeMessage('imConnected')
  async connectionNotification(client:any, payload:any)
  {
      //this.server.emit('userListUpdated');
  }

  @SubscribeMessage('imDisconnected')
  async deconnectionNotification(client:any, payload:any)
  {
    this.server.emit('userListUpdated');
  }

  @SubscribeMessage('isOnline')
  async isOnline(client:any, payload: any)
  {
    // console.log("PAYLOAD =>");
    // console.log(payload);
    try {
      let data = await this.Prisma.user.update({
      where: {
        login: payload,
      },
      data: {
        online: true,
      }
    })
    if(data != null && data != undefined)
      this.server.emit('userListUpdated')
  }
  catch(err) {
    console.log("error dans isOnline");
    console.log(err)
  }
}

  @SubscribeMessage('isOffline')
  async isOffline(client:any, payload: any)
  {
    try {
    let data = await this.Prisma.user.update({
      where: {
        login: payload
      },
      data: {
        online: false
      }
    })
    if (data != null && data != undefined)
      this.server.emit('userListUpdated');
  }
  catch(err)
  {
    console.log("error dans isOffline");
    console.log(err);
  }
}

async handleDisconnect(client: Socket): Promise<void> {
  this.logger.log(`Client disconnected: ${client.id}`);
  try{
    let data = await this.Prisma.user.findFirst({
    where: {
      socket: client.id
    }
    })
    if (data != null && data != undefined)
    {
      //console.log("DECONNEXION =>");
      console.log(data)
      this.isOffline(client, data.login);
      this.server.emit('userListUpdated');
    }
  }
  catch(err){
  console.log("error dans handle disconnect : ");
  console.log(err);
}
}

async handleConnection(client: Socket, ...args: any[]) {
  
    this.server.emit('userListUpdated');
    this.logger.log(`Client connected: ${client.id}`);
}

@SubscribeMessage('sendLogin')
async setupLogin(client: Socket, payload: any): Promise<void>
{
  //console.log("LOGIN :" + payload + " | mysocket : " + client.id)
  try{
    let data = await this.Prisma.user.update({
    where: {
      login: payload,
    },
    data: {
      socket: client.id,
    },
  });
  if (data != null && data != undefined)
    this.server.emit('userListUpdated');
}
catch(err){
  console.log("erreur dans setuplogin : ");
  console.log(err);
  
}
}

  /* USER LIST ACTUALISATION */

  @SubscribeMessage('userListPlz')
  async sendUserList(client: any, payload: any)
  {
    // console.log("SENDUSERLIST en cours");
    
    try{
    let data = await this.Prisma.user.findMany({
      where: {
        id: {
          not: Number(payload),
        }
      },
      include: {
        channel_joined: true,
        blocked:        true,
        blockedby:      true,
        friends:        true,
        friendsof:      true,
      }
    })
    if(data != null && data != undefined)
    {
      this.server.to(client.id).emit('hereIsTheUserList', data);
    }
  }
  catch(err) {
    console.log("error SEND USER LIST : ");
    console.log(err); 
  }
}

  /* MESSAGE */

  @SubscribeMessage('sendMsgTo')
  async sendMsgTo(client: any, payload: any): Promise<void> {
    try{
      payload[1] = (await this.userService.findUserByLogin(payload[3])).socket;
      const roomName = this.createRoomName(payload[2], payload[3]);
      this.server.in(payload[1]).socketsJoin(roomName);
      this.server.in(client.id).socketsJoin(roomName);
      this.server.to(roomName).emit('PrivMsg', {msg: payload[0], channel: roomName, from: payload[2]});
    }
    catch(err){
      console.log("error dans sendMsgTo :");
      console.log(err);
    }
  }

  @SubscribeMessage('MsgInChannel')
  async MsgInChannel(client: Socket, payload: any)
  {
    this.server.to(payload[0] + "_channel").emit('msginchannel', {msg: payload[2], channel: payload[0], from: payload[1]});
  }

  @SubscribeMessage('msgToMe')
  handlePrivMsg(client:any, payload: any): void
  {
    this.server.sockets.to(payload).emit('msgToClient', client);
  }

  /* CREATE CHANNEL */

  @SubscribeMessage('createChannel')
  async createChannel(client: Socket, payload: any)
  {
    try{
      await this.Prisma.channel.create({
			  data: {
          name: String(payload[0]), 
          creator_id: Number(payload[1]),
          joined: {
            connect: [{id: Number(payload[1])}],
          }
        },
		  })
      const data = await this.Prisma.channel.findMany({
        include: {joined: true},
      })
      if (data != null && data != undefined)
      {
        this.server.emit('aChannelHasBeenCreated', data);
        this.server.to(client.id).emit('youAreReady');
      }
    }
    catch(err){
      console.log("error dans create Channel :");
      console.log(err);
    }
  }

  @SubscribeMessage('createPrivChannel')
  async createPrivChannel(client: Socket, payload: any)
  {
    try{
      await this.Prisma.channel.create({
			  data: {
          name: String(payload[0]), 
          creator_id: Number(payload[1]),
          password: String(payload[2]),
          joined: {
            connect: [{id: Number(payload[1])}],
          }
        },
		  })
      const data = await this.Prisma.channel.findMany({
        include: {joined: true},
      })
      if (data != null && data != undefined)
      {
        this.server.emit('aChannelHasBeenCreated', data);
        this.server.to(client.id).emit('youAreReady');
      }
    }
    catch(err){
      console.log("error dans create priv chann");
      console.log(err);
    }
  }

  /* JOIN/LEAVE CHANNEL */

  @SubscribeMessage('joinChannel')
  async joinChannel(client: Socket, payload: any)
  {
    try{
      this.server.in(client.id).socketsJoin(payload[0] + "_channel");
      let data = await this.Prisma.channel.update({
        where: {
          name: String(payload[0])
        },
        data: {
          joined: {
            connect: [{id: Number(payload[1])}]
          }
        },
        include: {
          joined: true,
        }
      })
      if (data != null && data != undefined)
      {
        this.server.to(payload[0] + "_channel").emit('someoneJoinedTheChannel', data)
        return data;
      }
    }
    catch(error){
      console.log(error);
    }
  }

  @SubscribeMessage('leaveChannel')
  async leaveChannel(client: Socket, payload: any)
  {
    try{
      this.server.in(client.id).socketsLeave(payload[0] + "_channel");
      let data = await this.Prisma.channel.update({
        where: {
          name: payload[0]
        },
        data: {
          joined: {
            disconnect: [{id: Number(payload[1])}]
          }
        },
        include: {
          joined: true,
        }
      })    
      if (data != null && data != undefined)
      {
        this.server.to(payload[0] + "_channel").emit('someoneJoinedTheChannel', data)
        return data;
      }
    }
    catch(err)
    {
      console.log("error dans leaveChannel :");
      console.log(err);
    }
  }

/* PONG GAME */

  @SubscribeMessage('moveToServer')
  handleMove(client: any, payload: any): void {
    this.server.emit('moveToClient', payload);
  }

  @SubscribeMessage('gameStatesToServer')
  handleGameStates(client: any, payload: any): void {
    this.server.emit('gameStatesToClient', payload);
  }

/* INIT */

  @SubscribeMessage('startToServer')
  handleStart(client: any, payload: any): void {
    this.server.emit('startToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }
}
