import Phaser from 'phaser';

import { SCENE_START, SCENE_GAME } from '../constGame';
import Button from '../Button';
import { COLOR_BACKGROUND } from '../constStype';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super(SCENE_START);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_BACKGROUND);

    new Button(this, +this.game.config.width / 2, +this.game.config.height / 2, 'scoreButton', 'ИГРАТЬ').onClick(() => {
      this.scene.pause();

      this.scene.start(SCENE_GAME, {
        scene: SCENE_START,
      });
    });
  }
}
