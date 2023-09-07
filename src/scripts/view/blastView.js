import Phaser from 'phaser';

import Tail from './tail';
import { resizePicture } from '../utils';
import { PADDING, SCALE_GAME } from '../constStype';
import { COLUMNS, ROWS, SCENE_GAME, SCENE_GAME_OVER } from '../constGame';

export class BlastView extends Phaser.GameObjects.Container {
  pictureBg;
  tails;
  scene;
  controller;
  fromX;
  fromY;
  isTween = false;
  _isGameOver = false;
  _isWin = false;

  constructor(scene, x, y, controller) {
    super(scene, x, y);
    this.scene = scene;
    this.controller = controller;
    this.tails = new Map();
    this.updateField = this.updateField.bind(this);

    const pictureTail = this.scene.add.image(x, y, 'green').setVisible(false);

    const widthTails = pictureTail.width * COLUMNS;
    const heightTails = pictureTail.height * ROWS;
    this.fromX = this.x - (SCALE_GAME * (widthTails - pictureTail.width)) / 2;
    this.fromY = this.y - (SCALE_GAME * (heightTails - pictureTail.height)) / 2;

    const widthField = widthTails + 2 * PADDING.x;
    const heightField = heightTails + 2 * PADDING.y;

    resizePicture(
      this.scene,
      x,
      y,
      SCALE_GAME,
      heightField,
      widthField,
      'fieldAngle',
      'fieldLeft',
      'fieldTop',
      'fieldCenter'
    );
  }

  updateField(data) {
    const { cells, isGameOver, isWin } = data;

    if (!cells) {
      return;
    }

    this._isGameOver = isGameOver;
    this._isWin = isWin;
    this.isTween = true;

    const cellsFlat = cells.flat();
    for (let value of this.tails.entries()) {
      const cell = cellsFlat.find((item) => item.id == value[0]);
      if (!cell) {
        value[1].removeTail(this.scene, () => this.tails.delete(value[1].id));
      }
    }

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        let tail = this.tails.get(cell.id);

        if (!tail) {
          this.tails.set(
            cell.id,
            new Tail(
              this.scene,
              this.fromX,
              this.fromY,
              cell.x,
              cell.y,
              cell.numColor,
              cell.id,
              this.controller.onClick
            )
          );
        } else if (tail && (tail.y != cell.y || tail.x != cell.x)) {
          tail.tweenTail(this.scene, this.fromY, cell.y, this.fromX, cell.x);
        }
      }
    }
  }

  removeTails() {}

  update() {
    if (this.isTween) {
      const countTween = this.scene.tweens.getTweens().length;
      if (!countTween) {
        if (this._isGameOver) {
          this.scene.scene.pause();
          this.scene.scene.run(SCENE_GAME_OVER, {
            scene: SCENE_GAME,
            isWin: this._isWin,
          });
        }

        this.isTween = false;
        // check move exists
        this.controller.checkMove();
      }
    }
  }
}
