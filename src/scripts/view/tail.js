import { TAIL_PIC, ROWS, NUM_COLOR } from '../constGame';
import { SCALE_GAME } from '../constStype';

export default class Tail {
  _image;
  _type;
  id;
  x;
  y;

  constructor(scene, fromX, fromY, x, y, type, id, controller) {
    this._image = scene.add
      .image(0, 0, TAIL_PIC[type])
      .setScale(SCALE_GAME)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        controller(id);
      });
    this._image.x = fromX + x * (this._image.width * this._image.scaleX);
    this._image.y =
      fromY + y * (this._image.height * this._image.scaleY) - this._image.height * this._image.scaleY * ROWS;
    this._type = type;
    this.id = id;
    this.x = x;
    this.y = y;

    if (type < NUM_COLOR) {
      this._image.y =
        fromY + y * (this._image.height * this._image.scaleY) - this._image.height * this._image.scaleY * ROWS;
      scene.tweens.add({
        targets: this._image,
        y: fromY + y * (this._image.height * this._image.scaleY),
        duration: 500,
      });
    } else {
      this._image.y = fromY + y * (this._image.height * this._image.scaleY);
    }
  }

  tweenTail(scene, fromY, y, fromX, x) {
    this.y = y;
    scene.tweens.add({
      targets: this._image,
      y: fromY + y * (this._image.height * this._image.scaleY),
      x: fromX + x * (this._image.width * this._image.scaleX),
      duration: 500,
      ease: 'Power1',
    });
  }

  removeTail(scene, callback) {
    scene.tweens.add({
      targets: this._image,
      scale: 0.1,
      duration: 200,
      onComplete: () => {
        this._image.destroy();
        callback();
      },
    });
  }
}
