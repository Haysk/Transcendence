import { IPosition } from './position.interface';

export interface IPowerUp {
  effect: string;
  color: string;
  position: IPosition;
  height: number;
  width: number;
}
