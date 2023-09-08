import Phaser from 'phaser';

import Tail from './tail';
import { resizePicture } from '../utils';
import { PADDING, SCALE_GAME } from '../constStype';
import { COLUMNS, ROWS, SCENE_GAME, SCENE_GAME_OVER } from '../constGame';

export class BlastView extends Phaser.GameObjects.Container {
  _tails;
  _controller;
  _fromX;
  _fromY;
  _isTween = false;
  _isGameOver = false;
  _isWin = false;
  _widthField;
  _heightField;

  constructor(scene, x, y, controller) {
    super(scene, x * SCALE_GAME, y * SCALE_GAME);
    this._controller = controller;
    this._tails = new Map();
    this.updateField = this.updateField.bind(this);

    const pictureTail = this.scene.add.image(x, y, 'green').setVisible(false);

    const widthTails = pictureTail.width * COLUMNS;
    const heightTails = pictureTail.height * ROWS;
    this._fromX = this.x - (SCALE_GAME * (widthTails - pictureTail.width)) / 2;
    this._fromY = this.y - (SCALE_GAME * (heightTails - pictureTail.height)) / 2;

    this._widthField = widthTails + 2 * PADDING.x;
    this._heightField = heightTails + 2 * PADDING.y;

    resizePicture(
      this.scene,
      this.x,
      this.y,
      SCALE_GAME,
      this._heightField,
      this._widthField,
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
    this._isTween = true;

    const cellsFlat = cells.flat();
    for (let value of this._tails.entries()) {
      const cell = cellsFlat.find((item) => item.id == value[0]);
      if (!cell) {
        value[1].removeTail(
          this.scene,
          () => this._tails.delete(value[1].id),
          this._widthField,
          this._heightField,
          this._fromX,
          this._fromY
        );
      }
    }

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        let tail = this._tails.get(cell.id);

        if (!tail) {
          this._tails.set(
            cell.id,
            new Tail(
              this.scene,
              this._fromX,
              this._fromY,
              cell.x,
              cell.y,
              cell.numColor,
              cell.id,
              this._controller.onClick
            )
          );
        } else if (tail && (tail.y != cell.y || tail.x != cell.x)) {
          tail.tweenTail(this.scene, this._fromY, cell.y, this._fromX, cell.x);
        }
      }
    }
  }

  update() {
    if (this._isTween) {
      const countTween = this.scene.tweens.getTweens().length;
      if (!countTween) {
        if (this._isGameOver) {
          this.scene.scene.pause();
          this.scene.scene.run(SCENE_GAME_OVER, {
            scene: SCENE_GAME,
            isWin: this._isWin,
          });
        }

        this._isTween = false;
        // check move exists
        this._controller.checkMove();
      }
    }
  }
}
