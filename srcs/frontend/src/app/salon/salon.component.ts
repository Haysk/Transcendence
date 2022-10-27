import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Channel } from '../models/channel';
import { User } from '../models/user';
import { Message } from '../models/message';


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  // guests:string[] = [];
  conversation: string[] = [];
  historiqueConv: Message[] = [];
  message: string= '';
  quit_salon:Boolean=false;
  content: Message = {content: "", fromUserId: 0, fromUserName: ""};
  
  
  guest!:Channel;
  usersInGuest: User[] | undefined;
 
 
  
  @Output() QuitSalonEvent = new EventEmitter<Boolean>();
  @Input() channel_name!:string;
  @Input() current_user!: User;
  constructor(private socketService: SocketService, private apiService: ApiService) {

   }

   async ngOnInit(): Promise<void> {
    await this.apiService.findChannelByName(this.channel_name).subscribe({
      next: (result) => {
        this.guest = result;
        // if (undefined != this.guest.joined)
        console.log(result);
        this.usersInGuest=this.guest.joined;
      },
      error: (err) => {},
      complete: () => {}
    })
    console.log("findChannelByName finished");
    this.socketService.joinChannel(this.channel_name);
    this.apiService.getChannelMessages(this.channel_name).subscribe({
      next:(result) => {
        this.historiqueConv = result;
        // console.log("ici chat history : " + result[0].content)
        },
        error: (err) =>{},
        complete:() => {}
      })
    this.socketService.getMsgFromChannel().subscribe({
      next: (message: any) => {
        if (message.channel == this.channel_name)
          this.conversation.push(message.from + ": " + message.msg);
      },
      error: (err) =>{},
      complete:() => {}
    })
    console.log("getMsgFromChannel finished");
  }
  

  setUpContent()
  {
    this.content.channelName = this.channel_name;
    this.content.content = this.message;
    this.content.fromUserId = this.current_user.id;
    this.content.fromUserName = this.current_user.login;
  }

  sendMessage(){
    console.log(this.message);
    this.setUpContent();
    this.apiService.createChannelMessage(this.content).subscribe();
    this.socketService.sendMsgToChannel(this.channel_name, this.message, this.current_user.login)
    // this.conversation.push(this.message);
    this.message= '';
    this.content = {content: "", fromUserId: 0, fromUserName: ""};
  }

  quitSalon(){
    this.QuitSalonEvent.emit(this.quit_salon);
  }
}
