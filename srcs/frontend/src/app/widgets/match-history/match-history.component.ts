import { Component, Input } from '@angular/core';
import { SGame } from 'src/app/models/savedGame';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})

export class MatchHistoryComponent {
  @Input() match!: SGame;
  scorePlayer1!: number;
  scorePlayer2!: number;
  winner!:User;
  

  ngOnInit(): void {

      // this.winner = this.winnerIs();
  }



  // winnerIs(): User{
  //     this.scorePlayer1=this.match.player1_score;
  //     this.scorePlayer2=this.match.player2_score;
  //     if(this.scorePlayer1>this.scorePlayer2){
  //       return this.match.player1;        
  //     }
  //     else{
  //       return this.match.player2;
  //     }
     
  // }

}
