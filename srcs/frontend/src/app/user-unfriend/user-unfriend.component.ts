import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-unfriend',
  templateUrl: './user-unfriend.component.html',
  styleUrls: ['./user-unfriend.component.css']
})
export class UserUnfriendComponent implements OnInit {

  @Input() users!:User;
  @Input() Me!: User;

  @Output() userunfriend = new EventEmitter<User>();

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

}
