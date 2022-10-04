import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	INTRA_API_AUTH = "https://api.intra.42.fr/oauth/authorize";

	constructor() { }

	ngOnInit(): void {
		localStorage.clear();
	}

	OAuthSignIn() {
		window.location.href = `${this.INTRA_API_AUTH}?client_id=${environment.INTRA_UID}&redirect_uri=https%3A%2F%2Flocalhost%3A8081%2Fauth&response_type=code`;
	}
  
}
