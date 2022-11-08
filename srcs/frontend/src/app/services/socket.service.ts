import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { Channel } from '../models/channel'
import { environment } from 'src/environments/environment';
import { IGameStates } from '../pong/game/interfaces/game-states.interface';
import { IInput } from '../pong/game/interfaces/input.interface';
import { observable } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'https://' + environment.IP_HOST;
  private socket;
  API_SERVER = 'https://' + environment.IP_HOST + '/api';
  target !: User;
  sock :string | undefined = "";

  constructor(private apiService: ApiService) {
    this.socket = io(this.url);
  }

  //MUTE

  muteUserByTime(userToMute: number, channelConcerned: number, timeToMute: number)
  {
    this.socket.emit('muteUserByTime', userToMute, channelConcerned, timeToMute);
  }

  muteUser(userToMute: number, channelConcerned: number)
  {
    this.socket.emit('muteUser', userToMute, channelConcerned);
  }

  unmuteUser(userToMute: number, channelConcerned: number)
  {
    this.socket.emit('unmuteUser', userToMute, channelConcerned);
  }

//BAN

banUserByTime(userToBan: number, channelConcerned: number, timeToMute: number)
{
  this.socket.emit('banUserByTime', userToBan, channelConcerned, timeToMute);
}

banUser(userToBan: number, channelConcerned: number)
{
  this.socket.emit('banUser', userToBan, channelConcerned);
}

unbanUser(userToBan: number, channelConcerned: number)
{
  this.socket.emit('unbanUser', userToBan, channelConcerned);
}

amIBanned()
{
  return new Observable<number>((obs) => {
    this.socket.on('youAreBanned', (res) => {
      obs.next(res)
    })
  })
}

//CONNECTION

  imDisconnected(login: string)
  {
    this.socket.emit('isOffline', login);
    this.socket.emit('imDisconnected');
    this.socket.disconnect();
  }

  imConnected(login: string)
  {
    this.socket.emit('isOnline', login);
    this.socket.emit('imConnected');
  }

  getId(): String{
    return this.socket.id;
  }

  sendLogin(login: string): void {
    this.socket.emit('sendLogin', login);
  }

  //CHANNEL

  async createChannel(channel_name: string, creator_id: number)
  {
    this.socket.emit('createChannel', channel_name, creator_id, () => { 
      this.socket.emit('joinChannel', channel_name, creator_id);
    });
  }
  getConnectionSignal(current_id: number)
  {
    return new Observable((obs) => {
      this.socket.on('userListUpdated', () => {
      this.socket.emit('userListPlz', current_id);
      obs.next();
      })
    })
  }

//UPDATE CHANNEL

  async updateChannel()
  {
    this.socket.emit('channelToUpdate');
  }

  async updateChannels()
  {
    this.socket.emit('channelsToUpdate');
  }

  async getUpdateChannel()
  {
    return new Observable<Channel>((obs)=>{
    this.socket.on('channelIsUpdated', (data: Channel) => {
      obs.next(data);
    })
  })
  }

  async getUpdateChannels()
  {
    return new Observable<Channel[]>((obs)=>{
      this.socket.on('channelsAreUpdated', (data: Channel[]) => {
        obs.next(data);
      })
    }) 
  }

  getAllUser()
  {
    return new Observable<User[]>((obs) => {
      this.socket.on('hereIsTheUserList', (res: User[]) => {
        // console.log("HEREISTHEUSERLIST OK =>")
        // console.log(res);
        obs.next(res);
      })
  })
  }

  createPrivChannel(channel_name: string, creator_id: number, password?: string)
  {
    this.socket.emit('createPrivChannel', channel_name, creator_id, password, () => { 
      this.socket.emit('joinChannel', channel_name, creator_id);
    });
  }

  updateChannelList() : Observable<Channel[]>
  {
    return new Observable<Channel[]>((observer) => {
      this.socket.on('aChannelHasBeenCreated', (data) => {
        observer.next(data);
      })
    })
  }

  joinChannel(channel_name: string, id: number)
  {
    this.socket.emit('joinChannel', channel_name, id);
  }

  leaveChannel(channel_name: string, id: number)
  {
    this.socket.emit('leaveChannel', channel_name, id);
  }

  sendMsgToChannel(channel_name: string, message: string, from: string) : void
  {
    this.socket.emit('MsgInChannel', channel_name, from, message);
  }

  getMsgFromChannel() : Observable<string>
  {
    return new Observable<string>((observer) => {
      this.socket.on('msginchannel', (msg) => {
        observer.next(msg)
      });
    });
  }

  updateUserInSalonList(current_channel_name: string)
  {
    this.socket.emit('userInChannelListPlz', current_channel_name);
  }

  //USER

  askForUserList(current_id: number)
  {
    this.socket.emit('userListPlz', current_id);
  }

  updateUserList() : Observable<User[]>
  {
    return new Observable<User[]>((observer) => {
        this.socket.on('someoneJoinedTheChannel', (data) => {
          console.log("SOMEONEJOINEDTHECHANNEL");
          
          observer.next(data.joined);
        });
  
      });
  };

//START COMPONENT

  iAmReady()
  {
    return new Observable(obs => {
      this.socket.on('youAreReady', () => {
        obs.next();
      })
    })
  }

  //PRIV MESSAGE

  sendMessage(message: string): void {
    this.socket.emit('msgToServer', message);
  }

  sendMessageTo(message: string, login1: string, login2: string): void
  {
    this.socket.emit('sendMsgTo', message, "", login1, login2)
  };

  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('PrivMsg', (message) => {
        observer.next(message);
      });
    });
  }

  //PONG GAME

  sendMove(move: IInput): void {
    this.socket.emit('moveToServer', move);
  }

  getMove(): Observable<IInput> {
    return new Observable<IInput>((observer) => {
      this.socket.on('moveToClient', (message) => {
        observer.next(message);
      });
    });
  }

  sendGameStates(gameStates: IGameStates): void {
    this.socket.emit('gameStatesToServer', gameStates);
  }

  getGameStates(): Observable<IGameStates> {
    return new Observable<IGameStates>((observer) => {
      this.socket.on('gameStatesToClient', (message) => {
        observer.next(message);
      });
    });
  }

//INIT

  sendStart(): void {
    this.socket.emit('startToServer');
  }

  getStart() {
    return new Observable<void>((observer) => {
      this.socket.on('startToClient', (payload) => {
        observer.next(payload);
      });
    });
  }
}
