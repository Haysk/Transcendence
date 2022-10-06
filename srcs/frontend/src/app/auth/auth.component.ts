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
	
	constructor(private route: ActivatedRoute,
		private apiService: ApiService,
		private router: Router) {
	}

	ngOnInit(): void {

	}

}
