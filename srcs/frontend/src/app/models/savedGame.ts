import { User } from './user';

export interface SGame {
  roomName:       string;
  players:        User[];
  player1_score:  number;
  player2_score:  number;
}