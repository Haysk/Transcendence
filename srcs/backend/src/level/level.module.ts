import { Module } from '@nestjs/common';
import { LevelService } from './level.service';

@Module({
  providers: [LevelService]
})
export class LevelModule {}
