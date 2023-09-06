import { COUNT_BOMB, COUNT_ROCKET, COUNT_SHUFFLE, NUM_COLOR } from '../constGame';
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
      const { x, y, numColor } = cell;
      let removeCells = 0;

      if (numColor >= NUM_COLOR) {
        removeCells = this.removeSuperCell(x, y);
      }
      else {
        //remove cells
        removeCells = this.getNewFieldsR({x, y}, numColor) + 1;
        // set super cell
        this.setSuperCell(x, y, removeCells);
      }

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
        if (this.model.cells[i][j].numColor >= NUM_COLOR) {
          return true;
        }
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

  setSuperCell(x, y, count) {
    if (count >= COUNT_BOMB) {
      this.model.addCell(x, y, 5);
    }
    else if (count >= COUNT_ROCKET) {
      this.model.addCell(x, y, getRandom(6, 7));
    }
  }

  removeSuperCell(x, y) {
    let removeCells = 0;
    switch(this.model.cells[x][y].numColor) {
      case 5:
        removeCells = this.removeCellsBomb(x, y);
        break;
      case 6:
        removeCells = this.removeCellRocket(x, y);
        break;
      case 7:
        removeCells = this.removeCellRocketHoriz(x, y);
        break;
    }
    return removeCells;
  }

  removeCellsBomb(x, y) {
    let removeCells = 1;
    this.model.removeCell(x, y);
    for (let i = Math.max(0, x - 1); i < Math.min(this.model.cells.length, x + 2); i++) {
      for (let j = Math.max(0, y - 1); j < Math.min(this.model.cells[i].length, y + 2); j++) {
        if (this.model.cells[i][j]) {
          if (this.model.cells[i][j].numColor >= 5) {
            removeCells += this.removeSuperCell(i, j);
          } else {
            removeCells++;
            this.model.removeCell(i, j);
          }
        }
      }
    }
    return removeCells;
  }

  removeCellRocket(x, y) {
    let removeCells = 1;
    this.model.removeCell(x, y);
    for (let i = 0; i < this.model.cells[x].length; i++) {
      if (this.model.cells[x][i]) {
        if (this.model.cells[x][i].numColor >= 5) {
          removeCells += this.removeSuperCell(x, i);
        } else {
          removeCells++;
          this.model.removeCell(x, i);
        }
      }
    }
    return removeCells;
  }

  removeCellRocketHoriz(x, y) {
    let removeCells = 1;
    this.model.removeCell(x, y);
    for (let i = 0; i < this.model.cells.length; i++) {
      if (this.model.cells[i][y]) {
        if (this.model.cells[i][y].numColor >= 5) {
          removeCells += this.removeSuperCell(i, y);
        } else {
          removeCells++;
          this.model.removeCell(i, y);
        }
      }
    }
    return removeCells;
  }
}
