import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
import { defaultGameConfig } from './game/config';
import { Game } from './game/game';
import { IInput } from './game/interfaces/input.interface';
import { PongGateway } from './pong.gateway';

const interval_tick = 8;

interface ITest {
  name: string;
  playerLeft: any;
  playerRight: any;
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

  public addGame(name: string): void;
  public addGame(name: string, playerLeft?: any, playerRight?: any): void {
    if (this.games.find((game) => game.name === name) == undefined) {
      const newGame: ITest = {
        name: name,
        game: new Game(),
        playerLeft: playerLeft,
        playerRight: playerRight,
        tickSubscription: interval(interval_tick).subscribe(() => {
          this.tick(name);
        }),
      };
      this.games.push(newGame);
      //TODO: sleep 1 seconde le temps que la partie soit charger pour tout les clients
      this.start(name);
    }
  }

  public deleteGame(name: string): void {
    this.end(name);
  }

  public getGames(): any[] {
    let games = [];
    for (let index = 0; index < this.games.length; index++) {
      const element = this.games[index];
      games.push({
        name: element.name,
        playerLeft: element.playerLeft,
        playerRight: element.playerRight,
        scoreLeft: element.game.getGameStates().scoreLeft,
        scoreRight: element.game.getGameStates().scoreRight,
      });
    }
    return games;
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
    this.games.splice(
      this.games.findIndex((game) => game.name === name),
      1,
    );
  }

  tick(name: string): void {
    const game = this.games.find((game) => game.name === name);
    game?.game.tick();
    this.pongGateway.sendGameStates(game?.game.getGameStates(), name);
    if (game?.game.getWinner() != null) {
      //TODO: fin de partie
      this.end(name);
    }
  }
}
