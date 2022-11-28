import { IGame } from './interfaces/game.interface';

const racketHeight = 160;
const racketWidth = 30;
const racketSpeed = 10;

const gameHeight = 790;
const gameWidth = 1000;
const gameMargin = 10;

const ballDiameter = 22;
export const ballSpeed = 5;

export const defaultGameConfig: IGame = {
  left: {
    id: 0,
    mode: {
      type: 'local',
      upKey: 'w',
      downKey: 's',
    },
    input: {
      userId: 0,
      up: false,
      down: false,
    },
  },
  right: {
    id: 1,
    mode: {
      type: 'local',
      upKey: 'ArrowUp',
      downKey: 'ArrowDown',
    },
    input: {
      userId: 1,
      up: false,
      down: false,
    },
  },
  board: {
    id: 0,
    mode: {
      type: 'local',
    },
    board: {
      width: gameWidth,
      height: gameHeight,
      margin: gameMargin,
      color: '#000000',
    },
    scoreToWin: 11,
  },
  states: {
    gameId: 0,
    scoreLeft: 0,
    scoreRight: 0,
    start: false,
    powerUps: [],
    racketLeft: {
      width: racketWidth,
      height: racketHeight,
      speed: racketSpeed,
      color: '#04EBB2',
      position: {
        left: gameMargin,
        top: gameMargin,
      },
    },
    racketRight: {
      width: racketWidth,
      height: racketHeight,
      speed: racketSpeed,
      color: '#FFBB33',
      position: {
        left: gameWidth - gameMargin - racketWidth,
        top: gameMargin,
      },
    },
    ball: {
      diammeter: ballDiameter,
      speed: ballSpeed,
      collor: '#e5e83b',
      position: {
        left: (gameWidth - ballDiameter) / 2,
        top: (gameHeight - ballDiameter) / 2,
      },
      direction: [ballSpeed / 2, 0],
    },
  },
};
