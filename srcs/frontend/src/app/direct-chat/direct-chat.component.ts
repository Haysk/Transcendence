import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Message } from '../models/message';
import { subscribeOn } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  
  @Input() Me!: User;
  @Input() Dest!: User;
  @Input() friendOrNot:boolean=true;
  @Input() messages: String[] = [];

  message: string = '';
  friendList!: User[];
  to_create!: Message;
  friend: string="Add friend";
  bloque: string="Block";
  bloqueOrNot: boolean=true;
  roomName !:string;
  friendListCheck!: User[];
  num!: number;
  old_messages: Message[] = [];

  constructor(private socketService: SocketService,
              private apiService: ApiService,
              public router:Router) {}

  async ngOnInit(): Promise<void> {
    this.socketService.destActualisation().subscribe((res) => {
      for (let i = this.old_messages.length; i > 0; i--) {
        this.old_messages.pop();
      }
      for (let i = this.messages.length; i > 0; i--) {
        this.messages.pop();
      }
      this.Dest = res;
      this.apiService.getMessages(this.Me.id, this.Dest.id,).subscribe(
        {
          next:(result) => {
          this.old_messages = result;
          },
          error: (err) =>{},
          complete:() => {}
        
        })
    })

    this.socketService.getMessage().subscribe( {
      next:(message: any) => {
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

    this.socketService.findBlockOrNot().subscribe((result) => {
      this.num = result;
      // console.log(this.num);
      if (this.num == 0)
      {
        this.bloqueOrNot = false;
        this.bloque = "Block";
      }
      else
      {
        this.bloqueOrNot = true;
        this.bloque = "Unblock";
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
    this.socketService.sendMessageTo(this.message, this.Me.login,this.Dest.login, this.Me.nickname);
    this.apiService.createMessage({userId: this.Dest.id, fromUserName: this.Me.nickname , fromUserId: this.Me.id, content: this.message}).subscribe((result)=>{
      // console.log(result);
    });
    // this.message = "";
  }

  addDelFriend(){
    this.friend = this.friendOrNot?"Del friend":"Add friend";
    if (this.friendOrNot == true)
    {
      this.socketService.getAddFriend(this.Me.id, this.Dest.id);
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
      this.bloqueOrNot = false;
    }
    else
    {
      this.socketService.getUnblockUser(this.Me.id, this.Dest.id);
      this.bloqueOrNot = true;
    }

  }

  invite_game(){
    this.socketService.displayInvitation(this.Dest, this.Me);

  }


  goToProfile() {

  }

}
