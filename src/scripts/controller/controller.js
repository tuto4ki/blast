import { COUNT_SHUFFLE } from '../constGame';
import { getRandom } from '../utils';
import GameOverController from './gameOverController';

export class Controller {

  model;
  countShuffle = COUNT_SHUFFLE;
  _gameOverController;

  constructor(model) {
    this.model = model;
    this.onClick = this.onClick.bind(this);
    this.moveDownCells = this.moveDownCells.bind(this);
    this.checkMove = this.checkMove.bind(this);
    this._gameOverController = new GameOverController(this.model);
  }

  onClick(id) {
    const cell = this.model.cells.flat().find((item) => item && item.id == id);
    if (cell) {
      //remove cells
      const removeCells = this.getNewFieldsR({x: cell.x, y: cell.y }, cell.numColor); // -1 move
      if (removeCells) {
        this.countShuffle = COUNT_SHUFFLE;
        // add score
        this._gameOverController.moveDone(removeCells);
        // move cells
        this.moveDownCells();

        this._gameOverController.checkGameOver();
        
        this.model.broadcast();
      }
    }
  }

  getNewFieldsR(pos, type) {
    let isRemove = 0;
    if (
      (pos.x - 1 >= 0 && this.model.cells[pos.x - 1][pos.y]) &&
      this.model.cells[pos.x - 1][pos.y].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({x: pos.x - 1, y: pos.y}, type);
      this.model.removeCell(pos.x - 1, pos.y);
      isRemove++;
    }
    if (
      (pos.x + 1 < this.model.cells.length && this.model.cells[pos.x + 1][pos.y]) &&
      this.model.cells[pos.x + 1][pos.y].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({x: pos.x + 1, y: pos.y}, type);
      this.model.removeCell(pos.x + 1, pos.y);
      isRemove++;
    }
    if (
      (pos.y - 1 >= 0 && this.model.cells[pos.x][pos.y - 1]) &&
      this.model.cells[pos.x][pos.y - 1].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({x: pos.x, y: pos.y - 1}, type);
      this.model.removeCell(pos.x, pos.y - 1);
      isRemove++;
    }
    if (
      (pos.y + 1 < this.model.cells[pos.x].length && this.model.cells[pos.x][pos.y + 1]) &&
      this.model.cells[pos.x][pos.y + 1].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      isRemove += this.getNewFieldsR({x: pos.x, y: pos.y + 1}, type);
      this.model.removeCell(pos.x, pos.y + 1);
      isRemove++;
    }
    return isRemove;
  }

  moveDownCells() {
    for (let i = 0; i < this.model.cells.length; i++) {
      for (let j = 0; j < this.model.cells[i].length; j++) {
        if (!this.model.cells[i][j]) {
          if (j - 1 >= 0) {
            this.model.moveDownCell(i, j - 1, i, j);
            if (j > 0) {
              j -= 2;
            }
          } else {
            this.model.addCell(i, j);
          }
        }
      }
    }
  }

  checkMove() {
    let isMove = this.isMoveExists();
    if (!isMove && this.countShuffle) {
      this.countShuffle--;
      this.shuffle();
      this.model.broadcast();
    }
  }

  isMoveExists() {
    
    for (let i = 0; i < this.model.cells.length; i++) {
      for (let j = 0; j < this.model.cells[i].length; j++) {
        if ((
          i - 1 >= 0 &&
          this.model.cells[i][j].numColor == this.model.cells[i - 1][j].numColor
        ) || (
          i + 1 < this.model.cells.length &&
          this.model.cells[i][i].numColor == this.model.cells[i + 1][i].numColor
        ) || (
          j - 1 >= 0 &&
          this.model.cells[i][j].numColor == this.model.cells[i][j - 1].numColor
        ) || (
          j + 1 < this.model.cells[i].length &&
          this.model.cells[i][j].numColor == this.model.cells[i][j + 1].numColor
        )) {
          return true;
        }
      }
    }
    return false;
  }

  shuffle() {
    const maxX = this.model.cells.length - 1;
    for (let i = 0; i < this.model.cells.length; i++) {
      const maxY = this.model.cells[i].length - 1;
      for (let j = 0; j < this.model.cells[i].length; j++) {
        const xMove = getRandom(0, maxX);
        const yMove = getRandom(0, maxY);
        if (i != xMove && j != yMove)
          this.model.swapCell({x: i,  y: j }, { x: xMove, y: yMove });
      }
    }
  }
}