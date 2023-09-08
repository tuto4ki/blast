import Phaser from 'phaser';

import {
  STYLE_COMMON,
  SCORE_STYLE,
  SCORE_TITLE_STYLE,
  MOVE_STYLE,
  SCALE_GAME,
  PROGRESS_TITLE_STYLE,
} from '../constStype';
import {
  POSITION_PB_BG,
  POSITION_PB_DARK,
  POSITION_PB_GREEN_L,
  POSITION_TITLE_PB,
  POSITION_MOVES,
  POSITION_SCORE_BG,
  POSITION_TEXT_MOVE,
  POSITION_TITLE_SCORE,
  POSITION_TEXT_SCORE,
} from './constProgressView';

export default class ProgressView extends Phaser.GameObjects.Container {
  _textScore;
  _textMove;
  _maxWidthPB;
  _startRightPB;
  _imageLeftPB;
  _imageRightPB;
  _imageCenterPB;

  constructor(scene, x, y) {
    super(scene, x * SCALE_GAME, y * SCALE_GAME);

    this.scene.add
      .image(POSITION_PB_BG.x * SCALE_GAME, POSITION_PB_BG.y * SCALE_GAME, 'progressBarBg')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    const picture = this.scene.add
      .image(POSITION_PB_DARK.x * SCALE_GAME, POSITION_PB_DARK.y * SCALE_GAME, 'darkBlueProgressBar')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    this._imageLeftPB = this.scene.add
      .image(POSITION_PB_GREEN_L.x * SCALE_GAME, POSITION_PB_GREEN_L.y * SCALE_GAME, 'greenPBLeft')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    this._startRightPB = (POSITION_PB_GREEN_L.x + this._imageLeftPB.width) * SCALE_GAME;

    this._imageCenterPB = this.scene.add
      .image(this._startRightPB, POSITION_PB_GREEN_L.y * SCALE_GAME, 'greenPBCenter')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);
    this._imageRightPB = this.scene.add
      .image(this._startRightPB, POSITION_PB_GREEN_L.y * SCALE_GAME, 'greenPBRight')
      .setScale(SCALE_GAME)
      .setOrigin(0)
      .setDepth(1);

    this._maxWidthPB = (picture.width - this._imageLeftPB.width - this._imageRightPB.width) * SCALE_GAME;

    this.scene.add
      .text(POSITION_TITLE_PB.x * SCALE_GAME, POSITION_TITLE_PB.y * SCALE_GAME, 'ПРОГРЕСС', {
        ...STYLE_COMMON,
        fontSize: `${PROGRESS_TITLE_STYLE * SCALE_GAME}px`,
      })
      .setOrigin(0)
      .setDepth(1);

    this.scene.add.image(this.x, this.y, 'progressGameBg').setScale(SCALE_GAME).setOrigin(0.5);

    this.scene.add
      .image(this.x + POSITION_MOVES.x * SCALE_GAME, this.y + POSITION_MOVES.y * SCALE_GAME, 'moves')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);

    this.scene.add
      .image(this.x + POSITION_SCORE_BG.x * SCALE_GAME, this.y + POSITION_SCORE_BG.y * SCALE_GAME, 'scoreBg')
      .setScale(SCALE_GAME)
      .setOrigin(0.5);

    this._textMove = this.scene.add
      .text(this.x + POSITION_TEXT_MOVE.x * SCALE_GAME, this.y + POSITION_TEXT_MOVE.y * SCALE_GAME, '', {
        ...STYLE_COMMON,
        fontSize: `${MOVE_STYLE * SCALE_GAME}px`,
      })
      .setOrigin(0.5);

    this.scene.add
      .text(this.x + POSITION_TITLE_SCORE.x * SCALE_GAME, this.y + POSITION_TITLE_SCORE.y * SCALE_GAME, 'очки:', {
        ...STYLE_COMMON,
        fontSize: `${SCORE_TITLE_STYLE * SCALE_GAME}px`,
      })
      .setOrigin(0.5);

    this._textScore = this.scene.add
      .text(this.x + POSITION_TEXT_SCORE.x * SCALE_GAME, this.y + POSITION_TEXT_SCORE.y * SCALE_GAME, '0', {
        ...STYLE_COMMON,
        fontSize: `${SCORE_STYLE * SCALE_GAME}px`,
      })
      .setOrigin(0.5);

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
        this._imageRightPB.x = this._startRightPB + tween.getValue() * this._imageCenterPB.width;
      },
    });
  }
}
