import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SGame } from 'src/app/models/savedGame';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css']
})



export class GameScoreComponent {

  @Input() GameData!: SGame;
  @Output() closeScoreEvent = new EventEmitter<boolean>();
  Winner!:string;
  // scorePlayer1!: number;
  // scorePlayer2!: number;
  

  closeGameScore(){
      this.closeScoreEvent.emit(false);
    }




}


