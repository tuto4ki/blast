import Phaser from 'phaser';

import Button from '../Button';
import { COLOR_BACKGROUND, BUTTON_STYLE, SCALE_GAME, STYLE_COMMON } from '../constStype';
import { SCENE_GAME_OVER, SCENE_GAME } from '../constGame';

const POSITION = 200;

export default class GameOverScene extends Phaser.Scene {
  _isWin;

  constructor() {
    super(SCENE_GAME_OVER);
  }

  init(data) {
    this._isWin = data.isWin;
  }

  create() {
    const widthPart = +this.game.config.width / 2;
    const heightPart = +this.game.config.height / 2;

    const scene = this.scene.scene;

    this.cameras.main.setBackgroundColor(COLOR_BACKGROUND);

    scene.add
      .text(widthPart, heightPart - POSITION * SCALE_GAME, 'КОНЕЦ ИГРЫ', {
        ...STYLE_COMMON,
        fontSize: `${BUTTON_STYLE * SCALE_GAME}px`,
      })
      .setScale(SCALE_GAME)
      .setOrigin(0.5, 0.5);

    scene.add
      .text(widthPart, heightPart, this._isWin ? 'ВЫ ВЫИГРАЛИ' : 'ВЫ ПРОИГРАЛИ', {
        ...STYLE_COMMON,
        fontSize: `${BUTTON_STYLE * SCALE_GAME}px`,
      })
      .setScale(SCALE_GAME)
      .setOrigin(0.5, 0.5);

    new Button(this, widthPart, heightPart + POSITION * SCALE_GAME, 'scoreButton', 'ИГРАТЬ').onClick(() => {
      this.scene.pause();
      this.scene.start(SCENE_GAME, {
        scene: SCENE_GAME_OVER,
      });
    });
  }
}
