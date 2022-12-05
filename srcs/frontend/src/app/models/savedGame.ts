import { User } from './user';

export interface SGame {
  id:             number;
  roomName:       string;
  players:        User[];
  player1_score:  number;
  player2_score:  number;
}