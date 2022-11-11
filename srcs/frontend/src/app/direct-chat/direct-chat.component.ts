import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Message } from '../models/message';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  @Input() Me!: User;
  @Input() Dest!: User;
  message: string = '';
  messages: string[] = [];
  friendList!: User[];
  to_create!: Message;
  friend: string="Add friend";
  @Input() friendOrNot:boolean=true;
  bloque: string="Block";
  bloqueOrNot: boolean=true;
  roomName !:string;
  friendListCheck!: User[];
  num!: number;
  //sub = WebSocket("ws://localhost:8081");


  constructor(private socketService: SocketService, private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.socketService.getMessage().subscribe( {
      next:(message: any) => {
        //console.log("roomName = " + this.getRoomName(this.Me.login, this.Dest.login) + " | message.channel = " + message.channel)
        if (this.getRoomName(this.Me.login, this.Dest.login) == message.channel)
          this.messages.push(message.from + ": " + message.msg);
        this.message = "";
    },
    error: (err) =>{},
    complete:() => {}
      // console.log("message[0] = " + message.msg + " | message[1] = " + message.channel);
    });
    
    this.socketService.findFriendsOrNot().subscribe((result) => {
      this.num = result;
      console.log(this.num);
      if (this.num == 1)
      {
        this.friendOrNot=false;
        this.friend = "Del friend";
      }
      else{
        this.friendOrNot=true;
        this.friend = "Add friend";
      }
    })
  }

  getRoomName(login1: string, login2 : string) : string
  {
    let result : string;

    if (login1 < login2)
      result = login1 + login2;
    else
      result = login2 + login1;
    return result
  }

  sendMessage() {
    //this.socketService.sendMessage(this.message);
    this.socketService.sendMessageTo(this.message, this.Me.login,this.Dest.login);
    this.apiService.createMessage({userId: this.Dest.id, fromUserName: this.Me.login , fromUserId: this.Me.id, content: this.message}).subscribe((result)=>{
      console.log(result);
    });
    // this.message = "";
  }

  addDelFriend(){

    this.friend = this.friendOrNot?"Del friend":"Add friend";
    if (this.friendOrNot == true)
    {
      this.socketService.getAddFriend(this.Me.id, this.Dest.id);
      //console.log("id ==>" + this.Me.id + "|| id dest ==> " + this.Dest.id);
      this.socketService.getFriend().subscribe((result) => {
        this.friendList = result;
      })
      this.friendOrNot = false;
    }
    else
    {
      this.socketService.getRemoveFriend(this.Me.id, this.Dest.id);
      this.socketService.removeFriend().subscribe((result) => {
        this.friendList = result;
      })
      this.friendOrNot = true;
    }
  }

  blockOrNot(){
    this.bloque = this.bloqueOrNot?"UnBlock":"Block";
    //this.bloqueOrNot = this.bloqueOrNot?false:true;
    if (this.bloqueOrNot == true)
    {
      this.socketService.getBlockUser(this.Me.id, this.Dest.id);
      this.socketService.blockedUser().subscribe((result) => {
        this.friendList = result;
      })
      console.log("test block");
      this.bloqueOrNot = false;
    }
    else
    {
      this.socketService.getUnblockUser(this.Me.id, this.Dest.id);
      this.bloqueOrNot = true;
      console.log("unblock456");
    }

  }

}
