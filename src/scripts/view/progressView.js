import {
  SCORE_STYLE,
  SCORE_TITLE_STYLE,
  MOVE_STYLE,
  SCALE_GAME,
  PROGRESS_TITLE_STYLE
} from '../constGame';

export default class ProgressView extends Phaser.GameObjects.Container {

  scene;
  _textScore;
  _textMove;
  _maxWidthPB;
  _startRightPB;
  _imageLeftPB;
  _imageRightPB;
  _imageCenterPB;

  constructor(scene, x, y) {
    super(scene, x, y)
    this.scene = scene;

    this.scene.add
      .image(932 * SCALE_GAME, -80 * SCALE_GAME, 'progressBarBg')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);
    
    const picture = this.scene.add
      .image(965 * SCALE_GAME, 110 * SCALE_GAME, 'darkBlueProgressBar')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    this._imageLeftPB = this.scene.add
      .image(971 * SCALE_GAME, 116 * SCALE_GAME, 'greenPBLeft')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);
    
    this._startRightPB = (971 + this._imageLeftPB.width) * SCALE_GAME;

    this._imageCenterPB = this.scene.add
      .image(this._startRightPB, 116 * SCALE_GAME, 'greenPBCenter')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);
    this._imageRightPB = this.scene.add
      .image(this._startRightPB, 116 * SCALE_GAME, 'greenPBRight')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    this._maxWidthPB = (picture.width - this._imageLeftPB.width - this._imageRightPB.width) * SCALE_GAME;

    this.scene.add
      .text(1435 * SCALE_GAME, 8 * SCALE_GAME, 'ПРОГРЕСС', PROGRESS_TITLE_STYLE)
      .setOrigin(0)
      .setDepth(1);
    
    this.scene.add
      .image(x, y, 'progressGameBg')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);
    
    this.scene.add
      .image(x, y - 49, 'moves')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);
    
    this.scene.add
      .image(x, y + 66, 'scoreBg')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);

    this._textMove = this.scene.add
      .text(x + 5, y - 55, '37', MOVE_STYLE)
      .setOrigin(0.5, 0.5);
    
    this.scene.add
      .text(x, y + 45, 'очки:', SCORE_TITLE_STYLE)
      .setOrigin(0.5, 0.5);

    this._textScore = this.scene.add
      .text(x, y + 77, '221', SCORE_STYLE)
      .setOrigin(0.5, 0.5);
    
    this.updateProgress = this.updateProgress.bind(this);
  }

  updateProgress(data) {

    const { score, countMove, maxCountMove, maxScore } = data;

    this._textScore.text = score;
    this._textMove.text = maxCountMove - countMove;

    let width = (score * this._maxWidthPB) / maxScore;
    width = Math.min(width, this._maxWidthPB);

    this.scene.tweens.add({
      targets: this._imageCenterPB,
      scaleX: width / this._imageCenterPB.width,
      duration: 500,
      ease: 'Power1',
      onUpdate: (tween) => {
        this._imageRightPB.x = this._startRightPB + (tween.getValue() * this._imageCenterPB.width);
      }
    });
  }
}