import Phaser from 'phaser';

import blue from '../../assets/images/blue.png';
import bomb from '../../assets/images/bomb.png';
import bonusBg from '../../assets/images/bonusBg.png';
import button from '../../assets/images/button.png';
import darkBlueProgressBar from '../../assets/images/darkBlueProgressBar.png';
import ellipse from '../../assets/images/ellipse.png';
import fieldAngle from '../../assets/images/fieldAngle.png';
import fieldCenter from '../../assets/images/fieldCenter.png';
import fieldLeft from '../../assets/images/fieldLeft.png';
import fieldTop from '../../assets/images/fieldTop.png';
import green from '../../assets/images/green.png';
import greenPBLeft from '../../assets/images/greenPBLeft.png';
import greenPBCenter from '../../assets/images/greenPBCenter.png';
import greenPBRight from '../../assets/images/greenPBRight.png';
import increase from '../../assets/images/increase.png';
import moves from '../../assets/images/moves.png';
import pause from '../../assets/images/pause.png';
import progressBarBg from '../../assets/images/progressBarBg.png';
import progressGameBg from '../../assets/images/progressGameBg.png';
import purple from '../../assets/images/purple.png';
import red from '../../assets/images/red.png';
import rocketVertical from '../../assets/images/rocketVertical.png';
import rocketHorizontal from '../../assets/images/rocketHorizontal.png';
import scoreBg from '../../assets/images/scoreBg.png';
import scoreButton from '../../assets/images/scoreButton.png';
import yellow from '../../assets/images/yellow.png';
import yellowButton from '../../assets/images/yellowButton.png';
import marvinFont from '../../assets/fonts/marvin-round.otf';

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

    this.load.image('blue', blue);
    this.load.image('bomb', bomb);
    this.load.image('bonusBg', bonusBg);
    this.load.image('button', button);
    this.load.image('darkBlueProgressBar', darkBlueProgressBar);
    this.load.image('ellipse', ellipse);
    this.load.image('fieldAngle', fieldAngle);
    this.load.image('fieldCenter', fieldCenter);
    this.load.image('fieldLeft', fieldLeft);
    this.load.image('fieldTop', fieldTop);
    this.load.image('green', green);
    this.load.image('greenPBLeft', greenPBLeft);
    this.load.image('greenPBCenter', greenPBCenter);
    this.load.image('greenPBRight', greenPBRight);
    this.load.image('increase', increase);
    this.load.image('moves', moves);
    this.load.image('pause', pause);
    this.load.image('progressBarBg', progressBarBg);
    this.load.image('progressGameBg', progressGameBg);
    this.load.image('purple', purple);
    this.load.image('red', red);
    this.load.image('rocketVertical', rocketVertical);
    this.load.image('rocketHorizontal', rocketHorizontal);
    this.load.image('scoreBg', scoreBg);
    this.load.image('scoreButton', scoreButton);
    this.load.image('yellow', yellow);
    this.load.image('yellowButton', yellowButton);
    loadFont('marvinFont', marvinFont);
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
