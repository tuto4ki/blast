import Phaser from 'phaser';
import { SCENE_GAME, COLUMNS, ROWS } from '../constGame';
import { BlastView } from '../view/blastView';
import BlastModel from '../model/blastModel';
import { Controller } from '../controller/controller';
import ProgressView from '../view/progressView';

export class GameScene extends Phaser.Scene {
  _model;
  _viewField;
  _viewProgress;
  _controller;

  constructor() {
    super(SCENE_GAME);

    this._model = new BlastModel(ROWS, COLUMNS);
    this._controller = new Controller(this._model);
  }

  create() {
    this._viewField = new BlastView(
      this,
      235,
      335, {
        onClick: this._controller.onClick,
        checkMove: this._controller.checkMove,
    });

    this._viewProgress = new ProgressView(
      this,
      685,
      265,
    );

    this._model.subscribe(this._viewField.updateField);
    this._model.subscribe(this._viewProgress.updateProgress);
    this._model.initial();
  }

  update() {
    this._viewField.update();
  }
}