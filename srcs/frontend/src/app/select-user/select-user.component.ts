import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { ChatComponent } from '../chat/chat.component';
import { VirtualTimeScheduler } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  @Input() Me!: User;
  @Input() user!: User;
  userList!: User[];
  show_chat: Boolean = false;
  show_hide: String = "chat";

  @Output() showchatEvent = new EventEmitter<Boolean>();
  @Output() sendDestEvent = new EventEmitter<User>();

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {    
  }

  sendBtn(dest : User): void {
    console.log("Me = " + this.Me.login + " | dest : " + dest.login);
    this.show_chat = this.show_chat?false:true;
    this.show_hide = this.show_chat?"close":"chat";
    this.showchatEvent.emit(this.show_chat);
    this.sendDestEvent.emit(this.user);
    // this.socketService.getFriendList(this.Me.id);
    // this.socketService.listFriend().subscribe((result) => {
    //   //console.log("hello" + result);
    //   this.userList = result;
    // })
    this.socketService.checkIfFriend(this.Me.id, this.user.id);
    // this.socketService.checkIfFriend(this.Me.id, this.user.id)
  }
}
