import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user!: User;
  title = 'todo-app';
  visible:boolean = true;

	constructor(public route: ActivatedRoute,
				public router: Router){
  }
  ngOnInit(): void {
  }

  public getLogin(): string | null{
	var login = localStorage.getItem("login");
	if (login == undefined) {
		return null;
	}
	return login;
  }

  public getRoute() {
	return this.router.url.split("?")[0];
  }

}
