import { Component, OnInit,Input } from '@angular/core';
import { User } from '../../models/user';
import { SGame } from 'src/app/models/savedGame';

@Component({
  selector: 'app-bloc-user-profile',
  templateUrl: './bloc-user-profile.component.html',
  styleUrls: ['./bloc-user-profile.component.css']
})
export class BlocUserProfileComponent implements OnInit {
  @Input() user!: User;
  @Input() match!: SGame;

  constructor() { }

  ngOnInit(): void {
  }

}
