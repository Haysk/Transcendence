import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';
import { Channel } from '../models/channel';
import { User } from '../models/user';


@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {

  // guests:string[] = [];
  conversation: string[] =[];
  message: string= '';
  quit_salon:Boolean=false;
  
  
  guest!:Channel;
  
  @Output() QuitSalonEvent = new EventEmitter<Boolean>();
  @Input() channel_name!:string;
  @Input() current_user!: User;
  constructor(private socketService: SocketService, private apiService:ApiService) {

   }

   async ngOnInit(): Promise<void> {
    await this.apiService.findChannelByName(this.channel_name).subscribe({
      next: (result) => {
        this.guest = result;
        // console.log("guest :" + this.guest.name);
        // if (this.guest.joined)
        // console.log('guest.joined : ' + this.guest.joined[0].login)
      },
      error: (err) => {},
      complete: () => {}
    })
    this.socketService.joinChannel(this.channel_name);
    this.socketService.getMsgFromChannel().subscribe({
      next: (message: any) => {
        if (message.channel == this.channel_name)
          this.conversation.push(message.from + ": " + message.msg);
      },
      error: (err) =>{},
      complete:() => {}
    })
  }
  

  sendMessage(){
    console.log(this.message);
    this.socketService.sendMsgToChannel(this.channel_name, this.message, this.current_user.login)
    // this.conversation.push(this.message);
    this.message= '';
  }

  quitSalon(){
    this.QuitSalonEvent.emit(this.quit_salon);
  }
}
