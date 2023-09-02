import { SCALE_GAME, TAIL_PIC } from '../constGame';

export default class Tail {

  image;
  #type;
  #id;

  constructor(scene, fromX, fromY, x, y, type, id) {
    this.image = scene.add
      .image(0, 0, TAIL_PIC[type])
      .setScale(SCALE_GAME)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log(id);
      });;
    this.image.x = fromX + x * (this.image.width * this.image.scaleX);
    this.image.y = fromY + y * (this.image.height * this.image.scaleY);
    this.#type = type;
    this.#id = id;
  }
}