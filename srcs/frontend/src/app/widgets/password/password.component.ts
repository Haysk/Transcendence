import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import{ User } from '../../models/user'
import { Channel } from 'src/app/models/channel';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  channel_password!:string;
  
  @Output() ShowChannelPrivateEvent= new EventEmitter<Boolean>();
  @Output() ShowFormulePasswordEvent = new EventEmitter<Boolean>();

  @Input() current_user !:User;
  @Input() channel!:Channel;

  // channel_name!:string;
  
  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
  }
  
  enterSalon(){

    
    if (this.channel_password==this.channel.password){ 

        this.ShowChannelPrivateEvent.emit(true);
        this.ShowFormulePasswordEvent.emit(false);
    
    }

  }



}
