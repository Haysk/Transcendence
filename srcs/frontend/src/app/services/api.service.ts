import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../models/technology';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { Oauth } from '../models/oauth';
import { UrlSerializer } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "https://localhost:8081/api";

  constructor(private httpClient: HttpClient) { }

  joinChannel(target: Channel, user :User)
  {
    const data = {target, user}
    console.log("api service : channel name : " + target.name + " | user name : " + user.login);
    return this.httpClient.post<Channel>(`${this.API_SERVER}/joinChannel`, data);
  }

  addPrivateChannel(name: string, creator_id: number, password: string)
  {
    const data = {name, creator_id, password};
    console.log("API SERVICE : addPrivateChannel");
    return this.httpClient.post<Channel>(`${this.API_SERVER}/addPrivateChannel`, data);
  }

  addChannel(name: string, creator_id: number)
  {
    const data = {name, creator_id};
    console.log("API SERVICE : addChannel");
    return this.httpClient.post<Channel>(`${this.API_SERVER}/addChannel`, data);
  }

  findChannelByName(name: string)
  {
    return this.httpClient.get<Channel>(`${this.API_SERVER}/findChannelByName/${name}`)
  }

  getAllChannels()
  {
    return this.httpClient.get<Channel[]>(`${this.API_SERVER}/getAllChannels`)
  }

  getSocket(login: string)
  {
    return this.httpClient.get<User>(`${this.API_SERVER}/getSocket/${login}`)
  }

  getUser(code: string)
  {
    return this.httpClient.get<User>(`${this.API_SERVER}/user/${code}`);
  }

  findUserByLogin(login: string)
  {
    return this.httpClient.get<User>(`${this.API_SERVER}/userByLogin/${login}`);
  }

  getAllUsers(current: number)
  {
    return this.httpClient.get<User[]>(`${this.API_SERVER}/allusers/${current}`);
  }

  createUser(data: User)
  {
    return this.httpClient.post<User>(`${this.API_SERVER}/createUser`, data);
  }

  getMessages(fromUserId: Number, userId: Number)
  {
    // console.log("api service : fromUserId : " + fromUserId + " userId : " + userId);
    const data = {fromUserId, userId};
    //console.log("api service : data.fromUserId : " + data.fromUserId + " data.userId : " + data.userId);
    return this.httpClient.get<Message[]>(`${this.API_SERVER}/messages/${fromUserId}/${userId}`);
  }

  createMessage(message: Message)
  {    
    // console.log("post message api service called");
    return this.httpClient.post<Message>(`${this.API_SERVER}/message`, message);
  }

  postOauthCode(code: string | null) {
	//console.log("post :" + code);
	return this.httpClient.post<User>(`${this.API_SERVER}/auth/token/code`, {code});
  }

  //pour la page Show-room-affiche les matches en cours
  getMatches(){
    return ["chilee vs ade-temm", "anclarmat vs antton-t", "hello kitty vs snoppy"];
  }

  //pour la page salon - palyers in salon
  getGuests(){
    return ["chilee", "anclamar", "anton"];
  }


    //pour la page chat - salons disponibiles
    getSalons_dispos(){
      return ["Super groupe", "42 Pong"];
    }
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

  //get friend 

  getFriend(current: number){
    return this.httpClient.get<User>(`${this.API_SERVER}/user/friends/${current}`); 
  }

  //add friend

  addFriend(id: number, id1: number){
    const data = {id, id1};
    //console.log("add friend hoho");
    return this.httpClient.post<User>(`${this.API_SERVER}/addFriend`, data);
  }

  //remove friend
  
  removeFriend(id: number, id1: number){
    const data = {id, id1};
    //console.log("remove friend hoho");
    return this.httpClient.post<User>(`${this.API_SERVER}/removeFriend`, data);
  }

  //check if friend

  checkIfFriend(id: number, id1: number){
    const data = {id, id1};
    console.log ("check if friend or not");
    return this.httpClient.get<User>(`${this.API_SERVER}/checkIfFriend/${data}`);
  }

  //block user

  blockUser(id: number, id1: number){
    const data = {id, id1};
    console.log("block user hoho");
    return this.httpClient.post<User>(`${this.API_SERVER}/blockUser`, data);
  }
  
  unblockUser(id: number, id1: number){
    const data = {id, id1};
    //console.log("unblock hoho");
    return this.httpClient.post<User>(`${this.API_SERVER}/unblockUser`, data);
  }
}
