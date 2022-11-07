import { Component, OnInit, Input, Injectable } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { User } from '../models/user';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private route: ActivatedRoute,
				private router: Router,
				private storage: StorageService,
				private socketService: SocketService) { }

	login = this.storage.getLogin();

	ngOnInit(): void {
		if (this.storage.getCode().length === 0 || this.storage.getLogin().length === 0) {
			this.router.navigate(["../"], { relativeTo: this.route });
		}
		else {
    this.socketService.sendLogin(String(this.login)); //obtenir son socket
    this.socketService.imConnected(String(this.login));
		}
	}

	async logout() {
		this.storage.clear();
    	this.socketService.imDisconnected(String(this.login));
		this.router.navigate(["../"], {relativeTo: this.route}); 
	}
}
