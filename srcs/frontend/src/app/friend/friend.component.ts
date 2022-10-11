import { Component, OnInit, Input } from '@angular/core';
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
  @Input() user!: User;
  @Input() testuser!: TestingFakeProfileComponent

  getUser!: User;
  test!: string;
  createDate!: Date;
  like!: number;
  numberOfFriend!: number;

  constructor() { }

  ngOnInit(): void {
    this.test = 'friend';
    this.createDate = new Date();
    this.numberOfFriend = 1;
    this.like = 0;
  }

  onAddLike(){
    this.like++;
  }

  onAddFriend(){
    if (this.test === 'friend')
      this.test = 'unfriend';
    else
      this.test = 'friend';
  }

}
