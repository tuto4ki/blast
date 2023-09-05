import Tail from './tail';
import { SCALE_GAME, SCENE_GAME, SCENE_GAME_OVER } from '../constGame';

const PADDING = {
  x: 136 * SCALE_GAME,
  y: 140 * SCALE_GAME,
};

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
    super(scene, x, y)
    this.scene = scene;
    this.pictureBg = this.scene.add
      .image(x, y, 'field')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);
    this.tails = new Map();
    this.updateField = this.updateField.bind(this);
    
    this.fromX = this.x - (+this.pictureBg.width * +this.pictureBg.scaleX) / 2 + PADDING.x;
    this.fromY = this.y - (+this.pictureBg.height * +this.pictureBg.scaleY) / 2 + PADDING.y;

    this.controller = controller;
  }

  updateField(data) {

    const { cells, isGameOver, isWin } = data;

    this._isGameOver = isGameOver;
    this._isWin = isWin;

    if (!cells) {
      return;
    }

    this.isTween = true;

    const cellsFlat = cells.flat();
    for (let value of this.tails.entries()) {
      const cell = cellsFlat.find((item) => item.id == value[0]);
      if (!cell) {
        value[1].removeTail(this.scene, () => this.tails.delete(value[1].id));
      }
    }

    for(let i = 0; i < cells.length; i++) {
      for(let j = 0; j < cells[i].length; j++) {
        
        const cell = cells[i][j];
        let tail = this.tails.get(cell.id);
        
        if (!tail) {

          this.tails.set(
            cell.id,
            new Tail(this.scene, this.fromX, this.fromY, cell.x, cell.y, cell.numColor, cell.id, this.controller.onClick)
          );

        } else if (tail && (tail.y != cell.y || tail.x != cell.x)) {
          tail.tweenTail(this.scene, this.fromY, cell.y, this.fromX, cell.x);
        }
      }
    }
  }

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
