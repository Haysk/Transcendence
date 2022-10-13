import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'
import { Message } from '../models/message';

@Component({
  selector: 'app-direct-chat',
  templateUrl: './direct-chat.component.html',
  styleUrls: ['./direct-chat.component.css']
})
export class DirectChatComponent implements OnInit {
  @Input() Me!: User;
  @Input() Dest!: User;
  message: string = '';
  messages: String[] = [];
  to_create!: Message;
  roomName !:string;

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    await this.socketService.getMessage().subscribe( {
      next:(message: any) => {
        console.log("roomName = " + this.getRoomName(this.Me.login, this.Dest.login) + " | message.channel = " + message.channel)
        if (this.getRoomName(this.Me.login, this.Dest.login) == message.channel)
          this.messages.push(message.msg);
    },
    error: (err) =>{},
    complete:() => {}
      // console.log("message[0] = " + message.msg + " | message[1] = " + message.channel);
    });
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
    this.message = '';
  }
}
