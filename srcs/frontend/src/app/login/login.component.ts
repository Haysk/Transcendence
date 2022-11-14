import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth, Tfa } from '../models/oauth';
import { User } from '../models/oauth';
import { waitForAsync } from '@angular/core/testing';
import { first, mergeMap, ObservableInput, switchMap, take } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { SocketService } from '../services/socket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	code: string = "";
	locked: boolean = true;
	tfa: boolean = false;
	tfa_key: string = "";
	tfa_count: number = 3;

	constructor(private storageService: StorageService,
		private router: Router,
		private authService: AuthService) {
	}

	async ngOnInit() {
		this.tfa = await this.authService.getCode();
		this.router.navigate([], {
			queryParams: {
				'code': null,
			},
		})
	}

	OAuthSignIn() {
		this.authService.goToIntraLoginPage();
	}

	async tfaLogin() {
		const tfa = await this.authService.validateTfaCode(this.tfa_key);
				if (this.tfa_count < 2) {
					this.tfa_count = 3;
					this.tfa = false;
					this.storageService.clear();
					return;
				}
				this.tfa_count--;
				this.tfa_key = "";
	}
}
