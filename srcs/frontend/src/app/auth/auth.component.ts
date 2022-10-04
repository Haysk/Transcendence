import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth } from '../models/oauth';
import { User } from '../models/oauth';
import { Router, ActivatedRoute } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';
import { first, mergeMap, take } from 'rxjs';
@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	INTRA_API_AUTH = "https://api.intra.42.fr/oauth/authorize";
	code: string = "";
	
	constructor(private route: ActivatedRoute,
				private apiService: ApiService,
				private router: Router) {
				}

	ngOnInit(): void {
		this.getUser();
		//this.router.navigate(["../home"], { relativeTo: this.route });
		console.log("INIT");

	}

	getUser() {
		if (localStorage.getItem("code") === null) {
			this.route.queryParams.subscribe((params) => {
				this.code = params['code'];
				return this.code;
			});
				if (this.code) {
					console.log("code ok");
					localStorage.setItem("code", this.code);
					this.apiService.postOauthCode(this.code).pipe(take(1)).subscribe({next: (result) => {
						console.log(result);
						localStorage.setItem("id", result.id.toString());
						localStorage.setItem('email', result.email);
						localStorage.setItem('login', result.login);
						localStorage.setItem('first_name', result.first_name);
						localStorage.setItem('last_name', result.last_name);
						localStorage.setItem('url', result.url);
						localStorage.setItem('displayname', result.displayname);
						localStorage.setItem('image_url', result.image_url);	
					},
					complete: () => { this.router.navigate(["../home"], { relativeTo: this.route });}
				});

				}
				else {
					console.log("code pas ok");
					this.router.navigate(["../"], { relativeTo: this.route });
				}
		}

	}
}
