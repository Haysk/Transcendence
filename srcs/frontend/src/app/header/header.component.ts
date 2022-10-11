import { Component, OnInit, Input, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user!: User;
  login = localStorage.getItem("login");

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  async logout() {
	localStorage.clear();
	this.router.navigate(["../"], {relativeTo: this.route});
  }
  

}
