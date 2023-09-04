import { SCALE_GAME, TAIL_PIC, ROWS } from '../constGame';

export default class Tail {

  image;
  #type;
  id;
  x;
  y

  constructor(scene, fromX, fromY, x, y, type, id, controller) {
    this.image = scene.add
      .image(0, 0, TAIL_PIC[type])
      .setScale(SCALE_GAME)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        controller(id);
      });;
    this.image.x = fromX + x * (this.image.width * this.image.scaleX);
    this.image.y = fromY + y * (this.image.height * this.image.scaleY) - (this.image.height * this.image.scaleY) * ROWS;
    this.#type = type;
    this.id = id;
    this.x = x;
    this.y = y;

    scene.tweens.add({
      targets: this.image,
      y: fromY + y * (this.image.height * this.image.scaleY),
      duration: 500,
    });

  }

  tweenTail(scene, fromY, y, fromX, x) {
    this.y = y;
    scene.tweens.add({
      targets: this.image,
      y: fromY + y * (this.image.height * this.image.scaleY),
      x: fromX + x * (this.image.width * this.image.scaleX),
      duration: 500,
      ease: 'Power1',
    });
  }

  removeTail(scene, callback) {
    scene.tweens.add({
      targets: this.image,
      scale: 0.1,
      duration: 200,
      onComplete: () => {
        this.image.destroy();
        callback();
    },
    });
    
  }
}