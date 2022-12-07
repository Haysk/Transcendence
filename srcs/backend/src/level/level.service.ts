import { Injectable } from '@nestjs/common';

@Injectable()
export class LevelService {
  level: number;
  toNextLevel: number;

  constructor() {
    this.level = 0;
    this.toNextLevel = 1;
  }

  public getLevel(): number {
    return this.level + this.toNextLevel / this.level;
  }

  public up(): void {
    this.toNextLevel--;
    this.levelUp();
  }

  private levelUp(): void {
    if (this.toNextLevel <= 0) {
      this.level++;
      this.toNextLevel = this.level + 1;
    }
  }
}
