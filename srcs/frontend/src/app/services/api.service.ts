import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../models/technology';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { Oauth } from '../models/oauth';
import { Tfa } from '../models/tfa'
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "https://localhost:8081/api";

	constructor(private httpClient: HttpClient,) {

  }

  getSocket(login: string)
  {
    return this.httpClient.get<User>(`${this.API_SERVER}/getSocket/${login}`)
  }

  getUser(code: string)
  {
    return this.httpClient.get<User>(`${this.API_SERVER}/user/${code}`);
  }

  getUsers(code: string)
  {
    return this.httpClient.get<User[]>(`${this.API_SERVER}/users/${code}`);
  }

  updateUser(user: User) {
    return this.httpClient.patch<User>(`${this.API_SERVER}/user/${user.id}`, user);
  }

  getMessages(fromUserId: Number, userId: Number)
  {
    // console.log("api service : fromUserId : " + fromUserId + " userId : " + userId);
    const data = {fromUserId, userId};
    console.log("api service : data.fromUserId : " + data.fromUserId + " data.userId : " + data.userId);
    return this.httpClient.get<Message[]>(`${this.API_SERVER}/messages/${fromUserId}/${userId}`);
  }

  createMessage(message: Message)
  {    
    // console.log("post message api service called");
    return this.httpClient.post<Message>(`${this.API_SERVER}/message`, message);
  }

  //pour la page Show-room-affiche les matches en cours
  getMatches(){
    return ["chilee vs ade-temm", "anclarmat vs antton-t", "hello kitty vs snoppy"];
  }

  //pour la page salon - palyers in salon
  getGuests(){
    return ["chilee", "anclamar", "anton"];
  }

  signup(code: string) {
	return this.httpClient.post<User | boolean>(`${this.API_SERVER}/auth/`, {code});
  }

  signupTfa(code: string) {
	return this.httpClient.post<Tfa>(`${this.API_SERVER}/tfa/signup`, code);
  }

  disableTfa(code: string) {
	return this.httpClient.patch(`${this.API_SERVER}/tfa/disable`, code);
  }

  verifyTfa(data: {code: string, tfa_key: string}) {
	return this.httpClient.post(`${this.API_SERVER}/tfa/verify`, data);
  }

  validateTfa(data: {code: string, tfa_key: string}) {
	return this.httpClient.post<User | boolean>(`${this.API_SERVER}/tfa/validate`, data);
  }


}
