import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from './services/socket.service';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	constructor(public route: ActivatedRoute,
				public router: Router,private socketService: SocketService){
  }
  ngOnInit(): void {
  }

  public getRoute() {
	return this.router.url.split("?")[0];
  }

}
