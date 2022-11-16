import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Message } from '../models/message';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  @Input() Me!: User;
  @Input() Dest!: User;
  @Input() clean!: Observable<void>;
  
  message: string = '';
  messages: string[] = [];
  to_create!: Message;
  friend: string="Add friend";
  friendOrNot:boolean=true;
  bloque: string="Block";
  bloqueOrNot: boolean=true;
  roomName !:string;
  private eventsSubscription!: Subscription;

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {

    this.eventsSubscription = this.clean.subscribe(() => this.cleanMsgTab());

    await this.socketService.getMessage().subscribe( {
      next:(message: any) => {
        if (this.getRoomName(this.Me.login, this.Dest.login) == message.channel)
          this.messages.push(message.from + ": " + message.msg);
        this.message = "";
    },
    error: (err) =>{},
    complete:() => {}
      // console.log("message[0] = " + message.msg + " | message[1] = " + message.channel);
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  cleanMsgTab(){
    console.log(this.messages)
    // while(this.messages)
    // {
    //   console.log(this.messages)
    //   this.messages.pop();
    // }
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
    this.socketService.sendMessageTo(this.message, this.Me.login,this.Dest.login);
    this.apiService.createMessage({userId: this.Dest.id, fromUserName: this.Me.nickname , fromUserId: this.Me.id, content: this.message}).subscribe((result)=>{
      console.log(result);
    });
  }

  addDelFriend(){
    this.friend = this.friendOrNot?"Del friend":"Add friend";
    this.friendOrNot=this.friendOrNot?false:true;
    
  }

  blockOrNot(){
    this.bloque = this.bloqueOrNot?"UnBlock":"Block";
    this.bloqueOrNot = this.bloqueOrNot?false:true;

  }

  goToProfile() {

  }

}
