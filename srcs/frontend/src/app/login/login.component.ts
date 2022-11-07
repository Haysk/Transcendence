import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth, Tfa } from '../models/oauth';
import { User } from '../models/oauth';
import { waitForAsync } from '@angular/core/testing';
import { first, mergeMap, ObservableInput, switchMap, take } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	INTRA_API_AUTH = "https://api.intra.42.fr/oauth/authorize";
	code: string = "";
	locked: boolean = true;
	tfa: boolean = false;
	tfa_key: string = "";
	tfa_count: number = 3;

	constructor(private route: ActivatedRoute,
		private apiService: ApiService,
		private storageService: StorageService,
		private router: Router) {
	}

	ngOnInit(): void {
		this.route.queryParams.subscribe((params) => {
			var code = params['code'];
			if (code) {
				this.code = code;
				this.signup(code);
			}
		})
		this.router.navigate([], {
			queryParams: {
				'code': null,
			},
		})
	}

	OAuthSignIn() {
		var login = this.storageService.getLogin();
		var code = this.storageService.getCode();
		console.log(this.locked);
		if (login.length > 0 && code.length > 0) {
				this.router.navigate(["../home"], { relativeTo: this.route });
		}
		else
			window.location.href = `${this.INTRA_API_AUTH}?client_id=${environment.INTRA_UID}&redirect_uri=https%3A%2F%2Flocalhost%3A8081&response_type=code`;
	}

	async signup(code: string) {
		this.postCode(code);

	}

	async postCode(code: string) {
		const result = await new Promise<User | boolean>(resolve => {
			this.apiService.signup(code).subscribe({
				next: (result) => {
					if (typeof (result) != "boolean" && result) {
						this.storageService.setCode(code);
						this.initUser(result);
						this.locked = false;
					}
					resolve(result);
				}
			})
		});
		if (result === true)
			this.tfa = true;
		else if (!this.locked)
			this.router.navigate(["../home"], { relativeTo: this.route });
	}

	async validateTfaCode(): Promise<User | boolean> {
		return new Promise<User | boolean>(resolve => {
			this.apiService.validateTfa({ code: this.code, tfa_key: this.tfa_key }).subscribe({
				next: (result) => {
					if (typeof (result) != "boolean" && result) {
						this.storageService.setCode(this.code);
						this.initUser(result);
						this.locked = false;
					}
					resolve(result);
				}
			});
		});
	}

	async tfaLogin() {
		const result = await this.validateTfaCode();
			console.log(result);
			if (result === false) {
				if (this.tfa_count < 2) {
					this.tfa_count = 3;
					this.tfa = false;
					this.storageService.clear();
					return;
				}
				this.tfa_count--;
				this.tfa_key = "";
			}
			else if (!this.locked) {
				this.router.navigate(["../home"], { relativeTo: this.route });
			}

	}

	initUser(user: User) {
		this.storageService.setId(user.id);
		this.storageService.setEmail(user.email);
		this.storageService.setLogin(user.login);
		this.storageService.setFirstName(user.first_name);
		this.storageService.setLastName(user.last_name);
		this.storageService.setUrl(user.url);
		this.storageService.setDisplayName(user.displayname);
		this.storageService.setImageUrl(user.image_url);
		if (user.oauth !== undefined) {
			this.storageService.setTfa(user.oauth.tfa?.tfa_activated);
		}
		
	}
}
