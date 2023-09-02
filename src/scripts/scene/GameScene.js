import Phaser from 'phaser';
import { SCENE_GAME, COLUMNS, ROWS } from '../constGame';
import { BlastView } from '../view/blastView';
import BlastModel from '../model/blastModel';

export class GameScene extends Phaser.Scene {
  model;
  constructor() {
    super(SCENE_GAME);

    this.model = new BlastModel(ROWS, COLUMNS);
  }

  create() {
    const view = new BlastView(this, 250, 350);

    this.model.subscribe(view.updateField);
    this.model.initial();
    //this.model.broadcast();
  }
}