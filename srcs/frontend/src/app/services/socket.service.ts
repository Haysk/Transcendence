import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { IGameStates } from '../pong/game/interfaces/game-states.interface';
import { IInput } from '../pong/game/interfaces/input.interface';

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

  getId(): String{
    return this.socket.id;
  }

  //socket?.emit('loadprv', {n1 : login, n2 : recv}, (resp : Message[]) =>       {         setMessages(resp);       })

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
