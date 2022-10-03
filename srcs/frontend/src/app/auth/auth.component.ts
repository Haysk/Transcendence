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
		this.route.queryParams.subscribe(params => {
			this.code = params['code'];
			if (this.code) {
				this.apiService.postOauthCode(this.code).subscribe();
				this.router.navigate([], {
					queryParams:{
						'code': null
					}
				})
			}
		});
	}

	OAuthSignIn() {
		window.location.href = `${this.INTRA_API_AUTH}?client_id=${environment.INTRA_UID}&redirect_uri=https%3A%2F%2Flocalhost%3A8081&response_type=code`;
	}

}
