import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'

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

  constructor(private socketService: SocketService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.socketService.getMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }
  
  sendMessage() {
    this.socketService.sendMessage(this.message);
    this.apiService.createMessage(this.Dest.id, this.Me.name, this.Me.id, this.message);
    this.message = '';
  }
}
