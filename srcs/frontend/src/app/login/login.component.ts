import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth } from '../models/oauth';
import { User } from '../models/oauth';
import { waitForAsync } from '@angular/core/testing';
import { first, mergeMap, take } from 'rxjs';
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
	tfaCode: string = "";
	tfaCount: number = 3;

	constructor(private route: ActivatedRoute,
		private apiService: ApiService,
		private storageService: StorageService,
		private router: Router) {
		this.route.queryParams.subscribe((params) => {
			var code = params['code'];
			this.getUser(code);
		})
	this.router.navigate([], {
  queryParams: {
    'code': null,
  },
})
	}

	ngOnInit(): void {
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
	getUser(code: string) {
		if (code !== undefined && code.length > 0 && this.storageService.getCode() === "") {
			this.apiService.postOauthCode(code).pipe(take(1)).subscribe({
				next: (result) => {
					console.log(result);
					this.storageService.setId(result.id);
					this.storageService.setEmail(result.email);
					this.storageService.setLogin(result.login);
					this.storageService.setFirstName(result.first_name);
					this.storageService.setLastName(result.last_name);
					this.storageService.setUrl(result.url);
					this.storageService.setDisplayName(result.displayname);
					this.storageService.setImageUrl(result.image_url);
					if (result.oauth !== undefined) {
						this.storageService.setTfa(result.oauth.tfa?.tfa_activated);
						this.storageService.setQrCode(result.oauth.tfa?.tfa_qr);
					}
				},
				error: err => {
					this.router.navigate(["../"], { relativeTo: this.route });
				},
				complete: () => {
					this.tfa = this.storageService.getTwoFactorAuth();
					this.locked = this.tfa;
					console.log(this.locked);
					if (!this.locked) {
						this.storageService.setCode(code);
						this.router.navigate(["../home"], { relativeTo: this.route });
					}
				}
			});
		}
	}

	sendTfaCode() {
		console.log(this.tfaCode);
		if (this.tfaCount < 2) {
			this.tfaCount = 0;
			this.tfa = false;
			this.storageService.clear();
			return;
		}
		this.tfaCount--;
		this.tfaCode = "";
	}
}
