import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	code: string = "";

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			console.log(params);
			this.code = params['code'];
			console.log(this.code);
		})
	}
}
