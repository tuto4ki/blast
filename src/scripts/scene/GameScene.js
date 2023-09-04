import Phaser from 'phaser';
import { SCENE_GAME, COLUMNS, ROWS } from '../constGame';
import { BlastView } from '../view/blastView';
import BlastModel from '../model/blastModel';
import { Controller } from '../controller/controller';

export class GameScene extends Phaser.Scene {
  model;
  view;
  controller;
  constructor() {
    super(SCENE_GAME);

    this.model = new BlastModel(ROWS, COLUMNS);
    this.controller = new Controller(this.model);
  }

  create() {
    this.view = new BlastView(this, 250, 350, this.controller.onClick);

    this.model.subscribe(this.view.updateField);
    this.model.initial();
  }
}