import Phaser from 'phaser';

import { BUTTON_STYLE, SCALE_GAME, STYLE_COMMON } from './constStype';

export class Button extends Phaser.GameObjects.Container {
  _button;

  constructor(scene, posX, posY, bg, label) {
    super(scene, posX, posY);
    this._button = scene.add.image(posX, posY, bg).setScale(SCALE_GAME).setInteractive({ useHandCursor: true });

    scene.add.text(posX, posY, label, { ...STYLE_COMMON, fontSize: `${BUTTON_STYLE * SCALE_GAME}px`}).setScale(SCALE_GAME).setOrigin(0.5, 0.5);
  }

  onClick(callback) {
    this._button.on('pointerdown', callback);
  }
}
