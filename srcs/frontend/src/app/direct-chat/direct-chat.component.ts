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

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.socketService.getMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
  
  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.apiService.createMessage({userId: this.Dest.id, fromUserName: this.Me.name , fromUserId: this.Me.id, content: this.message}).subscribe((result)=>{
      console.log(result);
    });
    this.message = '';
  }
}
