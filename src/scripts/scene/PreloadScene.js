import Phaser from 'phaser';

import { WIDTH_GAME, HEIGHT_GAME } from '../constStype';
import { SCENE_PRELOAD, SCENE_START } from '../constGame';
import * as preload from './constPreload';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SCENE_PRELOAD);
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(preload.COLOR_PRELOAD, 0.8);
    progressBox.fillRect(
      (WIDTH_GAME - preload.WIDTH_PRELOAD) / 2,
      (HEIGHT_GAME - preload.HEIGHT_PRELOAD) / 2,
      preload.WIDTH_PRELOAD,
      preload.HEIGHT_PRELOAD
    );
    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(preload.COLOR_PROGRESS, 1);
      progressBar.fillRect(
        (WIDTH_GAME - preload.WIDTH_PROGRESS) / 2,
        (HEIGHT_GAME - preload.HEIGHT_PROGRESS) / 2,
        preload.WIDTH_PROGRESS * value,
        preload.HEIGHT_PROGRESS
      );
    });
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.scene.start(SCENE_START);
    });

    this.load.image('blue', './images/blue.png');
    this.load.image('bomb', './images/bomb.png');
    this.load.image('bonusBg', './images/bonusBg.png');
    this.load.image('button', './images/button.png');
    this.load.image('darkBlueProgressBar', './images/darkBlueProgressBar.png');
    this.load.image('ellipse', './images/ellipse.png');
    this.load.image('fieldAngle', './images/fieldAngle.png');
    this.load.image('fieldCenter', './images/fieldCenter.png');
    this.load.image('fieldLeft', './images/fieldLeft.png');
    this.load.image('fieldTop', './images/fieldTop.png');
    this.load.image('green', './images/green.png');
    this.load.image('greenPBLeft', './images/greenPBLeft.png');
    this.load.image('greenPBCenter', './images/greenPBCenter.png');
    this.load.image('greenPBRight', './images/greenPBRight.png');
    this.load.image('increase', './images/increase.png');
    this.load.image('moves', './images/moves.png');
    this.load.image('pause', './images/pause.png');
    this.load.image('progressBarBg', './images/progressBarBg.png');
    this.load.image('progressGameBg', './images/progressGameBg.png');
    this.load.image('purple', './images/purple.png');
    this.load.image('red', './images/red.png');
    this.load.image('rocket', './images/rocket.png');
    this.load.image('rocketHoriz', './images/rocketHoriz.png');
    this.load.image('scoreBg', './images/scoreBg.png');
    this.load.image('scoreButton', './images/scoreButton.png');
    this.load.image('yellow', './images/yellow.png');
    this.load.image('yellowButton', './images/yellowButton.png');
    loadFont('marvinFont', './fonts/marvin-round.otf');
  }
}

function loadFont(name, url) {
  const newFont = new FontFace(name, `url(${url})`);
  newFont
    .load()
    .then(function (loaded) {
      document.fonts.add(loaded);
    })
    .catch(function (error) {
      return error;
    });
}
