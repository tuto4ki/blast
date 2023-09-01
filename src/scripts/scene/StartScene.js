import Phaser from 'phaser';

import {
  COLOR_BACKGROUND,
  SCENE_START,
  SCENE_GAME,
} from '../constGame';

export class StartScene extends Phaser.Scene {
  constructor() {
    super(SCENE_START);
  }

  create() {
    this.cameras.main.setBackgroundColor(COLOR_BACKGROUND);

    const btnPlay = this.add
      .image(+this.game.config.width / 2, +this.game.config.height / 2, 'scoreButton')
      .setInteractive({ useHandCursor: true });
    //btnPlay.name = EBUTTON.play;
    btnPlay.on('pointerdown', () => {
      this.scene.pause();
      this.scene.start(SCENE_GAME, {
        scene: SCENE_START,
      });
    });
  }
}
