import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth } from '../models/oauth';
import { User } from '../models/oauth';
import { waitForAsync } from '@angular/core/testing';
import { first, mergeMap, take } from 'rxjs';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	INTRA_API_AUTH = "https://api.intra.42.fr/oauth/authorize";
	code: string = "";

	constructor(private socketService: SocketService,
		private route: ActivatedRoute,
		private apiService: ApiService,
		private router: Router) {
		this.route.queryParams.subscribe((params) => {
			var code = params['code'];
			this.getUser(code);
		})
	}

	ngOnInit(): void {
	}

	OAuthSignIn() {
		var login = localStorage.getItem("login");
		if (login !== null && login !== undefined) {
			this.router.navigate(["../home"], { relativeTo: this.route });
		}
		else
			window.location.href = `${this.INTRA_API_AUTH}?client_id=${environment.INTRA_UID}&redirect_uri=https%3A%2F%2Flocalhost%3A8081&response_type=code`;
	}
	getUser(code: string) {
		console.log(code);
		var login = localStorage.getItem("login");
		if (login === null || login === undefined) {
			if (code) {
				this.apiService.postOauthCode(code).pipe(take(1)).subscribe({
					next: (result) => {
						localStorage.setItem("id", result.id.toString());
						localStorage.setItem('email', result.email);
						localStorage.setItem('login', result.login);
						localStorage.setItem('first_name', result.first_name);
						localStorage.setItem('last_name', result.last_name);
						localStorage.setItem('url', result.url);
						localStorage.setItem('displayname', result.displayname);
						localStorage.setItem('nickname', result.nickname);
						localStorage.setItem('image_url', result.image_url);
						localStorage.setItem('avatar_url', result.avatar_url);
						// if(!result.avatar_url)
						// 	localStorage.setItem('avatar_url', result.image_url);
						
					},
					error: err => {
						this.router.navigate(["../"], { relativeTo: this.route });
					},
					complete: () => {
						this.socketService.imConnected();
						this.router.navigate(["../home"], { relativeTo: this.route });
					}
				});
			}
		}
	}
}
