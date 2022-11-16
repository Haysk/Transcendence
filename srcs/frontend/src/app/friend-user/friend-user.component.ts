import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-friend-user',
  templateUrl: './friend-user.component.html',
  styleUrls: ['./friend-user.component.css']
})
export class FriendUserComponent implements OnInit {

  @Input() Me!: User;
  @Input() friend!: User;
  
  
 


  userList!: User[];

  show_hide: String = "chat";
  show_chat: boolean = false;
 
  @Output() showchatEvent = new EventEmitter<boolean>();
  @Output() sendDestEvent = new EventEmitter<User>();

  constructor(private apiService:ApiService, private socketService: SocketService) {

   
  }

  ngOnInit(): void {
    
    
    
    // this.socketService.getFriend().subscribe((result) => {
    //   this.userList = result;
    // })
    // this.socketService.removeFriend().subscribe((result) => {
    //   this.userList = result;
    // })
    // this.socketService.getFriendList(this.Me.id);
    // this.socketService.listFriend().subscribe((result) => {
   
    //   this.userList = result;
    // })    

   
  }

  
  sendBtn(friend : User): void {
   
    this.show_chat = this.show_chat?false:true;
    this.show_hide = this.show_chat?"close":"chat";
    this.showchatEvent.emit(this.show_chat);
    this.sendDestEvent.emit(friend);

    this.socketService.checkIfFriend(Number(this.Me.id), Number(friend.id));

  }




  

  

}