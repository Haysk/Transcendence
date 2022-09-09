import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user!: User;
  title = 'todo-app';

  constructor(){
  }
  ngOnInit(): void {
    this.user = {id: 1, name: 'Chilee', email: "email"};
  }
}
