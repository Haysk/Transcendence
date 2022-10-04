import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	login: string = "";
	constructor(private route: ActivatedRoute,
				private apiService: ApiService,
				private router: Router) { }

	ngOnInit(): void {
		this.login = localStorage["login"];
	}
}
