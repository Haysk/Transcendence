import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { Channel } from '../models/channel'

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'https://localhost:8081';
  private socket;
  API_SERVER = "https://localhost:8081/api";
  target !: User;
  sock :string | undefined = "";

  constructor() {
    this.socket = io(this.url);
  }

  getId(): String{
    return this.socket.id;
  }

  //socket?.emit('loadprv', {n1 : login, n2 : recv}, (resp : Message[]) =>       {         setMessages(resp);       })

  getUserInChannel(name: string)
  {
    return new Observable<User[]>((observer) => {
      this.socket.on('channelJoined', (payload) => {
        observer.next(payload.joined)
      });
    });
  }

  addChannel(channel_name: string, creator_id: number)
  {
    this.socket.emit('createChannel', channel_name, creator_id);
    this.socket.on('channelCreated', (payload) => {
      this.socket.emit('needToJoin', payload);
    })
  }

  joinChannel(channel_name: string, current_user: User)
  {
    console.log("channel : " + channel_name + " room joined");
    this.socket.emit('joinChannel', channel_name, current_user);
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

  getPrivMsg() : Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('msgToClient', (message) => {
        observer.next(message)
      });
    });
  }

  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('PrivMsg', (message) => {
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