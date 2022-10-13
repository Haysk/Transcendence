import { Component, OnInit, Input } from '@angular/core';
import { empty } from 'rxjs';
import { Friend } from '../models/friend.model';
import { User } from '../models/user';
import { TestingFakeProfileComponent } from '../testing-fake-profile/testing-fake-profile.component';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  @Input() friend!: Friend;

  user!: User;
  getUser!: User;
  createDate!: Date;
  like!: number;
  numberOfFriend!: number;
  mode1: any;
  ami!: string;
  // user.friends;

  constructor() { }

  ngOnInit(): void {
    this.ami = 'friend';
    this.createDate = new Date();
    this.like = 0;
    this.numberOfFriend = 0;
    this.user = {id:5, email: "", login: "", first_name: "hello", last_name: "", url: "", displayname: "", image_url: "", online: true, socket: ""},
    this.user.friends = [{id:1, email:"asfd@fsd.com", first_name:"alex", last_name: "sdfds", login: "dsfs", url: "", image_url: "", displayname: "sdffsd", online: true},
    {id:2, email:"asssdfd@fsd.com", first_name:"ching", last_name: "afs", login: "sdf", url: "", image_url: "", displayname: "dsffds", online: true},
    {id:3, email:"assdfsdffd@fsd.com", first_name:"arnaud", last_name: "dsfdsfsd", login: "dsfdsf", url: "", image_url: "", displayname: "cxvcxv", online: true}];
  }

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

  onNbFriend(): number {
    if (!this.user.friends?.length){
      console.log("empty");
      return (0);
   }
   else
      return (this.user.friends.length);
  }

  // friendUnfriend(id:number, user:any): number{
  //    return user.id;
  // }

}
