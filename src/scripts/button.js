import { BUTTON_STYLE, SCALE_GAME } from './constGame';

export class Button extends Phaser.GameObjects.Container {

  #button;
  #text;

  constructor(scene, posX, posY, bg, label) {
    super(scene, posX, posY);
    this.#button = scene.add
      .image(posX, posY, bg)
      .setScale(SCALE_GAME)
      .setInteractive({ useHandCursor: true });
    
    this.#text = scene.add
      .text(posX, posY, label, BUTTON_STYLE)
      .setScale(SCALE_GAME)
      .setOrigin(0.5, 0.5);
  }

  onClick(fromScene, toScene, scene = null) {
    this.#button.on('pointerdown', () => {
      this.scene.scene.pause();
      if (scene) {
        scene.restart();
      } else {
        this.scene.scene.start(toScene, {
          scene: fromScene,
        });
      }
    });
  }
}