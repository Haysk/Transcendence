import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-unfriend',
  templateUrl: './unfriend.component.html',
  styleUrls: ['./unfriend.component.css']
})
export class UnfriendComponent implements OnInit {

  @Input() users!:User;
  @Input() Me!: User;
  
  @Output() unfriend = new EventEmitter<User>();

  constructor(private apiService:ApiService) { 
   // this.users = apiService.getUsers_dispos();
  
  // notify:EventEmitter<string> = new EventEmitter<User>();
  }
  sendUserList(){
    this.unfriend.emit(this.users);
  }


  ngOnInit(): void {
  }

}
