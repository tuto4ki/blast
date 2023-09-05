import { Button } from '../button';
import {
  SCALE_GAME,
  SCENE_GAME,
  SCENE_GAME_OVER,
  BUTTON_STYLE,
  COLOR_BACKGROUND,
} from '../constGame';

export default class GameOverScene extends Phaser.Scene {

  _sceneGame;
  _isWin;

  constructor() {
    super(SCENE_GAME_OVER);
  }

  init(data) {
    this._isWin = data.isWin;
    this._sceneGame = data.sceneGame;
  }

  create() {
    const widthPart = +this.game.config.width / 2;
    const heightPart = +this.game.config.height / 2;

    const scene = this.scene.scene;

    this.cameras.main.setBackgroundColor(COLOR_BACKGROUND);

    scene.add
      .text(
        widthPart,
        heightPart - 200 * SCALE_GAME,
        'КОНЕЦ ИГРЫ',
        BUTTON_STYLE
      ).setScale(SCALE_GAME)
      .setOrigin(0.5, 0.5);
    
    scene.add
      .text(
        widthPart,
        heightPart,
        this._isWin ? 'ВЫ ВЫИГРАЛИ' : 'ВЫ ПРОИГРАЛИ' ,
        BUTTON_STYLE
      ).setScale(SCALE_GAME)
      .setOrigin(0.5, 0.5);

    new Button(
      this,
      widthPart,
      heightPart + 200 * SCALE_GAME, 
      'scoreButton',
      'ИГРАТЬ'
    ).onClick(SCENE_GAME_OVER, SCENE_GAME, this.sceneGame);
  }
}