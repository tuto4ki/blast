import Phaser from 'phaser';

import { TAIL_PIC, ROWS, NUM_COLOR } from '../constGame';
import { PARTICLE_BOMB, PARTICLE_HORIZONTAL, PARTICLE_VERTICAL, SCALE_GAME } from '../constStype';

export default class Tail {
  _image;
  _type;
  _particles;
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

  removeTail(scene, callback, width, height, fromX, fromY) {
    this.addParticle(scene, width, height, fromX, fromY);

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

  addParticle(scene, width, height, fromX, fromY) {
    if (this._type >= NUM_COLOR) {
      const lineVertical = new Phaser.Geom.Line(
        0,
        fromY - this._image.y,
        0,
        (height - this._image.height) * SCALE_GAME + fromY - this._image.y
      );
      const lineHorizontal = new Phaser.Geom.Line(
        fromX - this._image.x,
        0,
        (width - this._image.width) * SCALE_GAME + fromX - this._image.x,
        0
      );
      let emitter;
      switch (this._type) {
        case 6:
          PARTICLE_VERTICAL.emitZone = { type: 'edge', source: lineVertical, quantity: 24, total: 64 };
          emitter = scene.add.particles(this._image.x, this._image.y, 'ellipse', PARTICLE_VERTICAL);
          break;
        case 7:
          PARTICLE_HORIZONTAL.emitZone = { type: 'edge', source: lineHorizontal, quantity: 24, total: 64 };
          emitter = scene.add.particles(this._image.x, this._image.y, 'ellipse', PARTICLE_HORIZONTAL);
          break;
        default:
          emitter = scene.add.particles(this._image.x, this._image.y, 'ellipse', PARTICLE_BOMB);
      }
      emitter.setDepth(1);

      emitter.on('start', (emitter) => {
        console.log(emitter);
      });
    }
  }
}
