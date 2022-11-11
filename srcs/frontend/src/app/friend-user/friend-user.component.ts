import { Component, Input, OnInit } from '@angular/core';
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
  @Input() friendOrNot:boolean=true; 
  // user: User = {
  //   id: this.getId(),
  //   login: this.getLogin(),
  //   email: this.getEmail(),
  //   first_name: this.getFirstName(),
  //   last_name: this.getLastName(),
  //   url: this.getUrl(),
  //   displayname: this.getDisplayName(),
  //   image_url: this.getImageUrl(),
  //   online: this.getOnline(),
  //   friend_list: false,
  // };
  // users!: User[];
  // allUsers!: User[];
  // getUser!: User;
  createDate!: Date;
  like!: number;
  numberOfFriend!: number;
  // mode1: any;
  ami!: string;
  userList!: User[];
  userfound!: User;
  // user.friends;
  constructor(private apiService:ApiService, private socketService: SocketService) {
    this.createDate = new Date();
    this.like = 0;
    this.numberOfFriend = 0;

    // this.user = {id:Number(localStorage.getItem('id')), email: "", login: String(localStorage.getItem('login')), first_name: "", last_name: "", url: "", displayname: "", image_url: "", online: true, socket: ""}
    // this.user.friends = [{id:1, email:"asfd@fsd.com", first_name:"alex", last_name: "sdfds", login: "dsfs", url: "", image_url: "", displayname: "sdffsd", online: true},
    // {id:2, email:"asssdfd@fsd.com", first_name:"ching", last_name: "afs", login: "sdf", url: "", image_url: "", displayname: "dsffds", online: true},
    // {id:3, email:"assdfsdffd@fsd.com", first_name:"arnaud", last_name: "dsfdsfsd", login: "dsfdsf", url: "", image_url: "", displayname: "cxvcxv", online: true}];
  }

  ngOnInit(): void {
    
    
    // this.apiService.findUserByLogin(this.user.login).subscribe(
    //   (result => {
    //     // if (result.friends)
    //     // console.log(result.friends)
    //     this.userfound = result;
    //     console.log ("user = " + this.userfound.friends);
    //     if (this.userfound.friends){
    //     this.userList=this.userfound.friends;
    //     console.log ("user = " + this.userfound.login);
    //     console.log ("userList = " + this.userList);
    //     }
    //   }));

    // this.apiService.getAllUsers(this.user.id).subscribe(
    //   (result => {
    //     this.allUsers = result;
    //     console.log("users found = " + this.allUsers);
    //     if (this.allUsers){
    //       this.allUsers = this.allUsers;
    //     }
    // }));
    this.socketService.getFriend().subscribe((result) => {
      this.userList = result;
    })
    this.socketService.removeFriend().subscribe((result) => {
      this.userList = result;
    })
    this.socketService.getFriendList(this.Me.id);
    this.socketService.listFriend().subscribe((result) => {
      //console.log("hello" + result);
      this.userList = result;
    })    

    // this.apiService.addFriend(this.user.id).subscribe (
    //   (result => {
    //     this.user = result;
    //     console.log("user add = " + this.user);
    // }));

  }

  // getFriend(){
  //   this.socketService.getFriendList(this.Me.id);
  // }

  onAddLike(){
    this.like++;
  }

  onNewFriend(){
    if (this.ami === 'friend')
    {
      this.ami = 'unfriend';
      this.numberOfFriend++;
    }
    else
    {
      this.ami = 'friend';
      this.numberOfFriend--;
    }
  }

  onFriend(){
  }

}