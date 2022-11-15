import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(private route: ActivatedRoute,
				private router: Router,
				private storageService: StorageService,
				private apiService: ApiService) {}

	INTRA_API_AUTH = "https://api.intra.42.fr/oauth/authorize";
	private code!: string | undefined;
	private locked: boolean = true;
	private tfa: boolean = false;

	goToIntraLoginPage() {
			window.location.href = `${this.INTRA_API_AUTH}?client_id=${environment.INTRA_UID}&redirect_uri=https%3A%2F%2Flocalhost%3A8081&response_type=code`;
	}

	async getCode(): Promise<boolean> {
		return new Promise<boolean>(resolve => {
			this.route.queryParams.subscribe(async (params) => {
				this.code = params['code'];
				if (this.code) {
					this.storageService.setCode(this.code);
					const result = this.postCode();
					if (await result === true) {
						this.tfa = true;
					}
				}
				resolve(this.tfa);
		})});
	}

	async postCode() {
		return new Promise<User | boolean>(resolve => {
			if (this.code)
				this.apiService.signup(this.code).subscribe({
					next: (result) => {
						if (typeof (result) != "boolean" && result) {
							if (this.initUser(result)) {
								this.locked = false;
								this.router.navigate(["../home"], { relativeTo: this.route });
							}
						}
						resolve(result);
					}
				})
		});
	}

	async validateTfaCode(tfaCode: string): Promise<User | boolean> {
		this.code = this.storageService.getCode();	
		return new Promise<User | boolean>(resolve => {
			if (this.code && this.code !== "") {
				this.apiService.validateTfa({ code: this.code, tfa_key: tfaCode }).subscribe({
					next: (result) => {
						if (typeof (result) != "boolean" && result) {
							if (this.initUser(result)) {
								this.locked = false;
								this.tfa = false;
								this.router.navigate(["../home"], { relativeTo: this.route });
							}
						}
						resolve(result);
					}
				});
			}
		});
	}

	initUser(user: User) {
		if (user.oauth !== undefined) {
			this.storageService.setTfa(user.oauth.tfa?.tfa_activated);
		}
		if (this.storageService.setId(user.id) &&
		this.storageService.setEmail(user.email) &&
		this.storageService.setLogin(user.login) &&
		this.storageService.setFirstName(user.first_name) &&
		this.storageService.setLastName(user.last_name) &&
		this.storageService.setUrl(user.url) &&
		this.storageService.setDisplayName(user.displayname) &&
		this.storageService.setNickName(user.nickname) &&
		this.storageService.setImageUrl(user.image_url) &&
		this.storageService.setAvatarUrl(user.avatar_url)) {
			return true;
		} else {
			return false
		}
	}

	logout() {
		this.storageService.clear();
		this.router.navigate(["../"], {relativeTo: this.route}); 
		this.locked = true;
	}
	
	getTfa() {
		return this.tfa;
	}

	getLocked() {
		return this.locked;
	}
}
