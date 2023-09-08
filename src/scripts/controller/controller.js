import GameOverController from './GameOverController';
import ShuffleController from './ShuffleController';
import SuperTailController from './SupeTailController';
import TailController from './TailController';
import { NUM_COLOR, NUM_REMOVE } from '../constGame';

export default class Controller {
  _model;
  _gameOverController;
  _superTailController;
  _shuffleController;
  _tailController;

  constructor(model) {
    this._model = model;

    this.onClick = this.onClick.bind(this);
    this.checkMove = this.checkMove.bind(this);

    this._tailController = new TailController(this._model);
    this._gameOverController = new GameOverController(this._model);
    this._superTailController = new SuperTailController(this._model);
    this._shuffleController = new ShuffleController(this._model);
  }

  onClick(id) {
    const cell = this._model.cells.flat().find((item) => item && item.id == id);
    if (cell) {
      const { x, y, numColor } = cell;
      let removeCells = 0;

      if (numColor >= NUM_COLOR) {
        removeCells = this._superTailController.removeSuperCell(x, y);
      } else {
        removeCells = this._tailController.getNumRemoveCells({ x, y }, numColor);
        // set super cell
        this._superTailController.setSuperCell(x, y, removeCells);
      }

      if (removeCells >= NUM_REMOVE) {
        this._shuffleController.refresh();
        // add score
        this._gameOverController.moveDone(removeCells);
        // move cells
        this._tailController.moveDownCells();

        this._gameOverController.checkGameOver();

        this._model.broadcast();
      }
    }
  }

  checkMove() {
    const isMoveExists = this._shuffleController.checkMove();

    if (!isMoveExists) {
      this._gameOverController.gameOverFailed();
      this._model.broadcast();
    }
  }
}
