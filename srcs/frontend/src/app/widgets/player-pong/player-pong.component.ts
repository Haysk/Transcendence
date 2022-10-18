import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-player-pong',
  templateUrl: './player-pong.component.html',
  styleUrls: ['./player-pong.component.css']
})
export class PlayerPongComponent implements OnInit {
@Input() Me!: User;
@Input() user!: User;
  constructor() { }

  ngOnInit(): void {
    console.log("User = " + this.user.login );
     
  }

}


