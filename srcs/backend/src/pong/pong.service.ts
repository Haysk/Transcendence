import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
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
  games: ITest[] = [];

  constructor(private pongGateway: PongGateway) {}

  public start(name: string): void {
    this.games.find((game) => game.name === name)?.game.start();
  }

  public addGame(name: string): void {
    if (this.games.find((game) => game.name === name) == undefined) {
      const newGame: ITest = {
        name: name,
        game: new Game(),
        tickSubscription: interval(interval_tick).subscribe(() => {
          this.tick(name);
        }),
      };
      this.games.push(newGame);
    }
    console.log('addGame len:', this.games.length);
  }

  public deleteGame(name: string): void {
    this.end(name);
    this.games.splice(
      this.games.findIndex((game) => game.name === name),
      1,
    );
    console.log('deleteGame len:', this.games.length);
  }

  public updateMove(move: IInput, name: string): void {
    this.games.find((game) => game.name === name)?.game.updateInput(move);
  }

  public reset(name: string): void {
    this.games
      .find((game) => game.name === name)
      ?.game.updateStates(structuredClone(defaultGameConfig.states));
  }

  end(name: string): void {
    this.games
      .find((game) => game.name === name)
      ?.tickSubscription.unsubscribe();
  }

  tick(name: string): void {
    const game = this.games.find((game) => game.name === name);
    game?.game.tick();
    this.pongGateway.sendGameStates(game?.game.getGameStates(), name);
  }
}
