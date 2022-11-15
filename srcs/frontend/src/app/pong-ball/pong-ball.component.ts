import { Component, Input, OnInit } from '@angular/core';
import { defaultGameConfig } from '../pong/game/config';
import { IBallConfig } from '../pong/game/interfaces/ball-config.interface';

@Component({
  selector: 'app-pong-ball',
  templateUrl: './pong-ball.component.html',
  styleUrls: ['./pong-ball.component.css']
})
export class PongBallComponent implements OnInit {
  @Input()
  ball: IBallConfig = structuredClone(defaultGameConfig.ball);

  constructor() { }

  ngOnInit(): void {
  }

}
