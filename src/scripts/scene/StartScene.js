import Phaser from 'phaser';

import {
  COLOR_BACKGROUND,
  SCENE_START,
  SCENE_GAME,
  BUTTON_STYLE,
} from '../constGame';
import { Button } from '../button';

export class StartScene extends Phaser.Scene {
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
        'Start'
      ).onClick(SCENE_START, SCENE_GAME);
  }
}
