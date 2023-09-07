import GameOverController from './gameOverController';
import ShuffleController from './shuffleController';
import SuperTailController from './supeTailController';
import { NUM_COLOR } from '../constGame';

export class Controller {
  _model;
  _gameOverController;
  _superTailController;
  _shuffleController;

  constructor(model) {
    this._model = model;

    this.onClick = this.onClick.bind(this);
    this.moveDownCells = this.moveDownCells.bind(this);
    this.checkMove = this.checkMove.bind(this);

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
        //remove cells
        removeCells = this.getNewFieldsR({ x, y }, numColor) + 1;
        // set super cell
        this._superTailController.setSuperCell(x, y, removeCells);
      }

      if (removeCells) {
        this._shuffleController.refresh();
        // add score
        this._gameOverController.moveDone(removeCells);
        // move cells
        this.moveDownCells();

        this._gameOverController.checkGameOver();

        this._model.broadcast();
      }
    }
  }

  getNewFieldsR(pos, type) {
    let isRemove = 0;
    if (pos.x - 1 >= 0 && this._model.cells[pos.x - 1][pos.y] && this._model.cells[pos.x - 1][pos.y].numColor == type) {
      this._model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({ x: pos.x - 1, y: pos.y }, type);
      this._model.removeCell(pos.x - 1, pos.y);
      isRemove++;
    }
    if (
      pos.x + 1 < this._model.cells.length &&
      this._model.cells[pos.x + 1][pos.y] &&
      this._model.cells[pos.x + 1][pos.y].numColor == type
    ) {
      this._model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({ x: pos.x + 1, y: pos.y }, type);
      this._model.removeCell(pos.x + 1, pos.y);
      isRemove++;
    }
    if (pos.y - 1 >= 0 && this._model.cells[pos.x][pos.y - 1] && this._model.cells[pos.x][pos.y - 1].numColor == type) {
      this._model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({ x: pos.x, y: pos.y - 1 }, type);
      this._model.removeCell(pos.x, pos.y - 1);
      isRemove++;
    }
    if (
      pos.y + 1 < this._model.cells[pos.x].length &&
      this._model.cells[pos.x][pos.y + 1] &&
      this._model.cells[pos.x][pos.y + 1].numColor == type
    ) {
      this._model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({ x: pos.x, y: pos.y + 1 }, type);
      this._model.removeCell(pos.x, pos.y + 1);
      isRemove++;
    }
    return isRemove;
  }

  moveDownCells() {
    for (let i = 0; i < this._model.cells.length; i++) {
      for (let j = 0; j < this._model.cells[i].length; j++) {
        if (!this._model.cells[i][j]) {
          if (j - 1 >= 0) {
            this._model.moveDownCell(i, j - 1, i, j);
            if (j > 0) {
              j -= 2;
            }
          } else {
            this._model.addCell(i, j);
          }
        }
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
