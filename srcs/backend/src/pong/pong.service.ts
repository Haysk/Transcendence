import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
import { AppGateway } from 'src/app.gateway';
import { defaultGameConfig } from './game/config';
import { Game } from './game/game';
import { IInput } from './game/interfaces/input.interface';
import { PongGateway } from './pong.gateway';

const interval_tick = 8;

interface ITest {
  name: string;
  game: Game;
  tickSubscription: Subscription;
}

@Injectable()
export class PongService {
  //tickSubscription!: Subscription;
  games: ITest[] = [];

  constructor(/*private game: Game, */ private pongGateway: PongGateway) {}

  /*
  public start(): void {
    if (this.tickSubscription == undefined) {
      this.tickSubscription = interval(interval_tick).subscribe(() => {
        this.tick();
      });
    }
    this.game.start();
  }
*/

  public start(): void {
    // if (this.games[0].tickSubscription == undefined) {
    //   console.log('ici');
    //   this.games[0].tickSubscription = interval(interval_tick).subscribe(() => {
    //     this.tick();
    //   });
    // }
    this.games[0].game.start();
    console.log('start');
  }

  public addGame(name: string): void {
    const newGame: ITest = {
      name: name,
      game: new Game(),
      tickSubscription: interval(interval_tick).subscribe(() => {
        this.tick();
      }),
    };
    this.games.push(newGame);
    console.log('addGame len:', this.games.length);
  }

  public deleteGame(name: string): void {
    //je ne sais pas
  }

  /*public updateMove(move: IInput): void {
    this.game.updateInput(move);
  }*/

  public updateMove(move: IInput): void {
    this.games[0].game.updateInput(move);
  }

  /*public reset(): void {
    this.game.updateStates(structuredClone(defaultGameConfig.states));
  }*/

  public reset(): void {
    this.games[0].game.updateStates(structuredClone(defaultGameConfig.states));
  }

  /*end(): void {
    this.tickSubscription.unsubscribe();
  }*/

  end(): void {
    this.games[0].tickSubscription.unsubscribe();
  }

  /*tick(): void {
    this.game.tick();
    this.pongGateway.sendGameStates(this.game.getGameStates());
  }*/

  tick(): void {
    this.games[0].game.tick();
    this.pongGateway.sendGameStates(this.games[0].game.getGameStates());
  }
}
