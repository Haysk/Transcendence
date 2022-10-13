import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-unfriend',
  templateUrl: './unfriend.component.html',
  styleUrls: ['./unfriend.component.css']
})
export class UnfriendComponent implements OnInit {

  users:User[] = [];
  @Output() unfriend = new EventEmitter<User>();
  constructor(private apiService:ApiService) { 
    this.users = apiService.getUsers_dispos();
  }

  ngOnInit(): void {
  }

}
