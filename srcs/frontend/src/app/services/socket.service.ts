import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url = 'https://localhost:8081';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(message: string): void {
    this.socket.emit('msgToServer', message);
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