import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'https://localhost:8081';
  private socket;
  API_SERVER = "https://localhost:8081/api";
  target !: User;
  sock :string | undefined = "";

  constructor(private apiService: ApiService) {
    this.socket = io(this.url);
  }

  getId(): String{
    return this.socket.id;
  }

  sendMessage(message: string): void {
    this.socket.emit('msgToServer', message);
  }

 sendMessageTo(message: string, login: string): void {
    this.apiService.getSocket(login).subscribe({
        next :(result) => {
      this.sock = result.socket;
      console.log("Socket du dest2 : " + this.sock);
      this.socket.emit('msgToClient', message, this.sock)
    },
    error: (err) => {},
    complete: () => {}
  })
      
      // this.socket.emit('msgToClient', message, this.sock);
      this.sock = "";
    };
    //this.socket.to(data).emit('msgToServer', message);

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
      this.socket.on('msgToClient', (message) => {
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
