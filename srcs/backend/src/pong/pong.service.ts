import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
import { AppGateway } from 'src/app.gateway';
import { defaultGameConfig } from './game/config';
import { Game } from './game/game';
import { IInput } from './game/interfaces/input.interface';
import { PongGateway } from './pong.gateway';

const interval_tick = 8;

@Injectable()
export class PongService {
    tickSubscription!: Subscription;

    constructor(
        private game: Game,
        private pongGateway: PongGateway
    ) { }

    public start(): void {
        if (this.tickSubscription == undefined) {
            this.tickSubscription = interval(interval_tick).subscribe(() => {
                this.tick();
            });
        }
        this.game.start()
    }

    public updateMove(move: IInput): void {
        this.game.updateInput(move);
    }

    public reset(): void {
        this.game.updateStates(structuredClone(defaultGameConfig.states));
    }

    end(): void {
        this.tickSubscription.unsubscribe();
    }

    tick(): void {
        this.game.tick();
        this.pongGateway.sendGameStates(this.game.getGameStates());
    }
}
