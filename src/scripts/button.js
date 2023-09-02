import { BUTTON_STYLE } from './constGame';

export class Button extends Phaser.GameObjects.Container {

  #button;
  #text;

  constructor(scene, posX, posY, bg, label) {
    super(scene, posX, posY);
    this.#button = scene.add
      .image(posX, posY, bg)
      .setScale(0.5)
      .setInteractive({ useHandCursor: true });
    
    this.#text = scene.add
      .text(posX, posY, label, BUTTON_STYLE)
      .setOrigin(0.5, 0.5);
  }

  onClick(fromScene, toScene) {
    this.#button.on('pointerdown', () => {
      this.scene.scene.pause();
      this.scene.scene.start(toScene, {
        scene: fromScene,
      });
    });
  }
}