import { Module } from '@nestjs/common';
import { Ai } from './game/ai';
import { Game } from './game/game';
import { PongService } from './pong.service';
import { PongGateway } from './pong.gateway';

@Module({
  providers: [Game, Ai, PongService, PongGateway],
  exports: [PongService],
})
export class PongModule {}
