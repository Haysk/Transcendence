import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendBtn(dest : User): void {
    console.log("Me = " + this.Me.name + " | dest : " + dest.name);
    this.show_chat == false ? this.show_chat = true : this.show_chat = false;
    this.show_hide == "chat" ? this.show_hide = "close" : this.show_hide = "chat";
  }
}
