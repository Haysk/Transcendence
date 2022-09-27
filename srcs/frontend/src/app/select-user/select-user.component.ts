import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {
  @Input() user!: User;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
