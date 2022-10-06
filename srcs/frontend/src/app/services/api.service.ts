import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../models/technology';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Oauth } from '../models/oauth';

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
    // console.log("api service : fromUserId : " + fromUserId + " userId : " + userId);
    const data = {fromUserId, userId};
    return this.httpClient.get<Message[]>(`${this.API_SERVER}/messages/${fromUserId}${userId}`);
  }

  createMessage(message: Message)
  {    
    console.log("post message api service called");
    return this.httpClient.post<Message>(`${this.API_SERVER}/message`, message);
  }

  postOauthCode(code: string) {
	console.log("post :" + code);
	return this.httpClient.post<Oauth>(`${this.API_SERVER}/auth/token/code`, {code});
  }

  //pour la page Show-room-affiche les matches en cours
  getMatches(){
    return ["chilee vs ade-temm", "anclarmat vs antton-t", "hello kitty vs snoppy"];
  }

  //pour la page salon - palyers in salon
  getGuests(){
    return ["adylewsk", "chilee", "anclamar"];
  }

}
