import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user'

@Component({
  selector: 'app-testing-fake-profile',
  templateUrl: './testing-fake-profile.component.html',
  styleUrls: ['./testing-fake-profile.component.css']
})
export class TestingFakeProfileComponent implements OnInit {

  @Input() user!: User;
  friends_list !: User[] | undefined;
  //@Input() name!: string;
  //@Input() friend!: string;

  constructor() { }

  ngOnInit(): void {
    // this.name = 'ching';
    // this.friend = 'antoine';
  }

  getFriend(){
    this.friends_list = this.user.friends;
  }

}
