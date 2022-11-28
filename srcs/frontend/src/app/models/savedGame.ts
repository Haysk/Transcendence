import { User } from './user';

export interface SGame {
  roomName: string;
  player1: User;
  player2: User;
  player1_score: number;
  player2_score: number;
  winner: User;
}