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

  you_got_message:boolean=true;
  icon_message!:string;

  @Output() showchatEvent = new EventEmitter<Boolean>();
  @Output() sendDestEvent = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
    
    if (this.you_got_message==true){
        this.icon_message="📨";
    }
    else{
      this.icon_message="";
    }
    
  }

  sendBtn(dest : User): void {
    console.log("Me = " + this.Me.login + " | dest : " + dest.login);
    this.show_chat = this.show_chat?false:true;
    this.show_hide = this.show_chat?"close":"chat";
    this.showchatEvent.emit(this.show_chat);
    this.sendDestEvent.emit(this.user); 
  }
}
