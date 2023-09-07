import Phaser from 'phaser';

import PreloadScene from './scene/PreloadScene';
import StartScene from './scene/StartScene';
import GameScene from './scene/GameScene';
import GameOverScene from './scene/GameOverScene';
import { COLOR_BACKGROUND, HEIGHT_GAME, WIDTH_GAME } from './constStype';

export class Game {
  constructor() {
    new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'main',
      width: WIDTH_GAME,
      height: HEIGHT_GAME,
      backgroundColor: COLOR_BACKGROUND,
      fps: {
        target: 60,
        forceSetTimeOut: false,
      },
      scene: [PreloadScene, StartScene, GameScene, GameOverScene],
    });
  }
}
