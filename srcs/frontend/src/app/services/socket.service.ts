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

  imConnected()
  {
    this.socket.emit('imConnected');
  }

  getId(): String{
    return this.socket.id;
  }

  //socket?.emit('loadprv', {n1 : login, n2 : recv}, (resp : Message[]) =>       {         setMessages(resp);       })

  async createChannel(channel_name: string, creator_id: number)
  {
    this.socket.emit('createChannel', channel_name, creator_id, () => { 
      this.socket.emit('joinChannel', channel_name, creator_id);
    });
  }

  askForUserList(current_id: number)
  {
    this.socket.emit('userListPlz', current_id);
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

  getAllUser()
  {
    return new Observable<User[]>((obs) => {
      this.socket.on('hereIsTheUserList', (res: User[]) => {
        // console.log("HEREISTHEUSERLIST OK =>")
        console.log(res);

        obs.next(res);
      })
  })
  }

  createPrivChannel(channel_name: string, creator_id: number, password?: string)
  {
    this.socket.emit('createChannel', channel_name, creator_id, password, () => { 
      this.socket.emit('joinChannel', channel_name, creator_id);
    });
  }

  iAmReady()
  {
    return new Observable(obs => {
      this.socket.on('youAreReady', () => {
        obs.next();
      })
    })
  }

  updateChannelList() : Observable<Channel[]>
  {
    return new Observable<Channel[]>((observer) => {
      this.socket.on('aChannelHasBeenCreated', (data) => {
        observer.next(data);
      })
    })
  }

  updateUserList() : Observable<User[]>
  {
    // console.log("wististyle");
    return new Observable<User[]>((observer) => {
        this.socket.on('someoneJoinedTheChannel', (data) => {
          // console.log("SOMEONE JOINED THE CHANNEL")
          observer.next(data.joined);
        });
  
      });
  };

  joinChannel(channel_name: string, id: number)
  {
    // console.log("channel : " + channel_name + " room joined");
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

  sendMessage(message: string): void {
    this.socket.emit('msgToServer', message);
  }

  sendMessageTo(message: string, login1: string, login2: string): void
  {
    this.socket.emit('sendMsgTo', message, "", login1, login2)
  };

  sendLogin(login: string): void {
    this.socket.emit('sendLogin', login);
  }

  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('PrivMsg', (message) => {
        observer.next(message);
      });
    });
  }

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
