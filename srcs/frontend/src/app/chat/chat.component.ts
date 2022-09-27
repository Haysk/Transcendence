import { Component, OnInit, Input, Inject } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    {
      provide: 'user_list',
      useValue: [
        {id: 2, name: "Antoine", online: true},
        {id: 3, name: "Arnaud", online: false},
        {id: 4, name: "Ching", online: true}
      ]
    },
    {
      provide: 'whoAmI',
      useValue: {id: 1, name: "Alexandre", email: "someEmail", online: true}
    },
]
})
export class ChatComponent implements OnInit {
  @Input() Me!: User;
  @Input() Dest!: User;
  @Input() User_list!: User[];
  message: string = '';
  messages: String[] = [];

  constructor(private socketService: SocketService, private apiService: ApiService,
    @Inject('user_list') User_list: User[], @Inject('whoAmI') Me: User)
  {
    this.Me = Me;
    this.User_list = User_list;
    this.Dest = this.User_list[0];
  }

  ngOnInit(): void {
    this.socketService.getMessage().subscribe((message: any) => {
      this.messages.push(message);
    });
  }

  // sendMessage() {
  //   this.socketService.sendMessage(this.message);
  //   this.apiService.createMessage(this.Dest.id, this.Me.name, this.Me.id, this.message);
  //   this.message = '';
  // }
}