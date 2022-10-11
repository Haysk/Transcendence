import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  @Input() Me!: User;
  @Input() user!: User;
  show_chat: Boolean = false;
  show_hide: String = "chat";

  @Output() showchatEvent = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  sendBtn(dest : User): void {
    console.log("Me = " + this.Me.login + " | dest : " + dest.login);
    this.show_chat = this.show_chat?false:true;
    this.show_hide = this.show_chat?"close":"chat";
    this.showchatEvent.emit(this.show_chat); 
  }
}
