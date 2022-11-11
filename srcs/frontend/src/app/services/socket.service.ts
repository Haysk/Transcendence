import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
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

  getAddFriend(id: number, id1: number){
    //this.socket.on('getAddFriend');
    this.socket.emit('getAddFriend', id, id1);
  }

  getFriend(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      this.socket.on('addFriend', (tab: User[]) => {
        observer.next(tab);
      });
    });
  }

  getRemoveFriend(id: number, id1: number){
    this.socket.emit('getRemoveFriend', id, id1);
  }

  removeFriend(): Observable<User[]> {
    return new Observable<User[]>((obs) => {
      this.socket.on('removeFriend', (tab: User[]) => {
        obs.next(tab);
      });
    });
  }

  getFriendList(id: number){
    this.socket.emit('getFriendList', id);
  }

  listFriend(): Observable<User[]> {
    return new Observable<User[]>((obs) => {
      this.socket.on('listFriends', (tab: User[]) => {
        obs.next(tab);
      });
    });
  }

  updateListFriend(id: number){
    this.socket.emit('getFriendList', id);
  }

  checkIfFriend(id: number, id1: number){
    this.socket.emit('checkIfFriend', id, id1);
  }

  findFriendsOrNot(): Observable<number> {
    return new Observable<number>((obs) => {
      this.socket.on('findFriendsOrNot', (index: number) => {
        obs.next(index);
        console.log(`find friend or not ${index}`);
      })
    })
  }

  getBlockUser(id: number, id1: number){
    //this.socket.on('get Block User');
    this.socket.emit('getBlockUser', id, id1);
  }

  blockedUser(): Observable<User[]> {
    return new Observable<User[]>((obs) => {
      this.socket.on('blockedUser', (tab: User[]) => {
        obs.next(tab);
      });
    });
  }

  getUnblockUser(id: number, id1: number){
    this.socket.emit('getUnblockUser', id, id1);
  }

  unblockedUser(): Observable<User[]> {
    return new Observable<User[]>((obs) => {
      this.socket.on('unblockedUser', (tab: User[]) => {
        obs.next(tab);
      });
    });
  }
}