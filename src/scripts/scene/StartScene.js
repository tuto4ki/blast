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
    ).onClick(SCENE_START, SCENE_GAME);
  }
}
