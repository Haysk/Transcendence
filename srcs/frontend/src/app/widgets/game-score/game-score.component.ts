import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/oauth';
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
  scorePlayer1!: number;
  scorePlayer2!: number;
  winner!:User;
  

  ngOnInit(): void {
      this.winnerIs();
  }


  closeGameScore(){
      this.closeScoreEvent.emit(false);
    }

  winnerIs(){
      this.scorePlayer1=this.GameData.player1_score;
      this.scorePlayer2=this.GameData.player2_score;
      if(this.scorePlayer1>this.scorePlayer2){
        this.winner=this.GameData.player1;        
      }
      else{
        this.winner=this.GameData.player2;
      }

  }
    
}


