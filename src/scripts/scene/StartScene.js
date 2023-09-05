import Phaser from 'phaser';

import {
  COLOR_BACKGROUND,
  SCENE_START,
  SCENE_GAME,
} from '../constGame';
import { Button } from '../button';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super(SCENE_START);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_BACKGROUND);

    new Button(
        this,
        +this.game.config.width / 2,
        +this.game.config.height / 2, 
        'scoreButton',
        'ИГРАТЬ'
    ).onClick(() => {
      this.scene.pause();
    
      this.scene.start(SCENE_GAME, {
        scene: SCENE_START,
      });
    });
  }
}
