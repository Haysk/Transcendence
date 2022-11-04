import { Component, OnInit, Input, Injectable } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user!: User;
  login = localStorage.getItem("login");

  constructor(private route: ActivatedRoute, private router: Router, private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.sendLogin(String(this.login)); //obtenir son socket
    this.socketService.imConnected(String(this.login));
  }

  async logout() {
    this.socketService.imDisconnected(String(this.login));
    localStorage.clear();
	  this.router.navigate(["../"], {relativeTo: this.route});
  }
  

}
