import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../models/technology';
import { User } from '../models/user'
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "https://localhost:8081/api";

  constructor(private httpClient: HttpClient) { }

  getTechs() {
    return this.httpClient.get<Tech[]>(`${this.API_SERVER}/techs`);
  }

  getTech(id: number) {
    return this.httpClient.get<Tech>(`${this.API_SERVER}/tech/${id}`)
  }

  createTech(techno: Tech) {
    return this.httpClient.post<Tech>(`${this.API_SERVER}/tech`, techno);
  }

  updateTech(techno: Tech) {
    return this.httpClient.patch<Tech>(`${this.API_SERVER}/tech/${techno.id}`, techno);
  }

  removeTech(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/tech/${id}`);
  }

  createUser(name: string, online: boolean, avatarUrl: string)
  {
    return this.httpClient.post<User>(`${this.API_SERVER}/user`, {name, online, avatarUrl});
  }

  getMessages(fromUserId: number, userId: number)
  {
    const data = {fromUserId, userId};
    return this.httpClient.get<Message[]>(`${this.API_SERVER}/messages/${data}`);
  }

  createMessage(userId: number, fromUserName: string, fromUserId: number, content: string)
  {
    const data = {userId, fromUserName, fromUserId, content};
    return this.httpClient.post<Message>(`${this.API_SERVER}/message`, data);
  }

}
