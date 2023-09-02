import Tail from './tail';
import { SCALE_GAME } from '../constGame';

const PADDING = {
  x: 136 * SCALE_GAME,
  y: 140 * SCALE_GAME,
};

export class BlastView extends Phaser.GameObjects.Container {

  isAnimation = false;
  pictureBg;
  tails;
  scene;

  constructor(scene, x, y) {
    super(scene, x, y)
    this.scene = scene;
    this.pictureBg = this.scene.add
      .image(x, y, 'field')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);
    this.tails = new Map();
    this.updateField = this.updateField.bind(this);
  }

  updateField(cells) {
    this.isAnimation = true;
    const fromX = this.x - (+this.pictureBg.width * +this.pictureBg.scaleX) / 2 + PADDING.x;
    const fromY = this.y - (+this.pictureBg.height * +this.pictureBg.scaleY) / 2 + PADDING.y;
    for(let i = 0; i < cells.length; i++) {
      for(let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        this.tails.set(
          cell.id,
          new Tail(this.scene, fromX, fromY, cell.x, cell.y, cell.numColor, cell.id)
        );
      }
    }
  }

  update() {
    
  }

}