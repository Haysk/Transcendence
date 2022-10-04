import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';
import { Oauth } from '../models/oauth';
import { User } from '../models/oauth';
import { Router, ActivatedRoute } from '@angular/router';
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
				private router: Router) { }

	ngOnInit(): void {
		console.log("INIT");
		if (localStorage.getItem("code") === null) {
			this.route.queryParams.subscribe(params => {
				this.code = params['code'];
				if (this.code) {
					console.log("code ok");
					localStorage.setItem("code", this.code);
					this.apiService.postOauthCode(this.code);
					this.apiService.getUser(localStorage.getItem("code")).subscribe(async (result) => {
						localStorage.setItem("id", result.id.toString());
						localStorage.setItem('email', result.email);
						localStorage.setItem('login', result.login);
						localStorage.setItem('first_name', result.first_name);
						localStorage.setItem('last_name', result.last_name);
						localStorage.setItem('url', result.url);
						localStorage.setItem('displayname', result.displayname);
						localStorage.setItem('image_url', result.image_url);
					});
				}
				else {
					console.log("code pas ok");
					this.router.navigate(["../"], { relativeTo: this.route });
				}
			});
		}
		this.router.navigate(["../home"], { relativeTo: this.route });

	}
}
