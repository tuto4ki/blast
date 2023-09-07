import { getRandom } from '../utils';
import {
  SUPER_TAIL_COUNT,
  NUM_COLOR,
} from '../constGame';

export default class SuperTailController {

  _model;

  constructor(model) {
    this._model = model;
  }

  setSuperCell(x, y, count) {
    if (count >= SUPER_TAIL_COUNT.bomb) {
      this._model.addCell(x, y, 5);
    }
    else if (count >= SUPER_TAIL_COUNT.rocket) {
      this._model.addCell(x, y, getRandom(6, 7));
    }
  }

  removeSuperCell(x, y) {
    let removeCells = 0;
    switch(this._model.cells[x][y].numColor) {
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
    this._model.removeCell(x, y);
    for (let i = Math.max(0, x - 1); i < Math.min(this._model.cells.length, x + 2); i++) {
      for (let j = Math.max(0, y - 1); j < Math.min(this._model.cells[i].length, y + 2); j++) {
        if (this._model.cells[i][j]) {
          if (this._model.cells[i][j].numColor >= NUM_COLOR) {
            removeCells += this.removeSuperCell(i, j);
          } else {
            removeCells++;
            this._model.removeCell(i, j);
          }
        }
      }
    }
    return removeCells;
  }

  removeCellRocket(x, y) {
    let removeCells = 1;
    this._model.removeCell(x, y);
    for (let i = 0; i < this._model.cells[x].length; i++) {
      if (this._model.cells[x][i]) {
        if (this._model.cells[x][i].numColor >= NUM_COLOR) {
          removeCells += this.removeSuperCell(x, i);
        } else {
          removeCells++;
          this._model.removeCell(x, i);
        }
      }
    }
    return removeCells;
  }

  removeCellRocketHoriz(x, y) {
    let removeCells = 1;
    this._model.removeCell(x, y);
    for (let i = 0; i < this._model.cells.length; i++) {
      if (this._model.cells[i][y]) {
        if (this._model.cells[i][y].numColor >= NUM_COLOR) {
          removeCells += this.removeSuperCell(i, y);
        } else {
          removeCells++;
          this._model.removeCell(i, y);
        }
      }
    }
    return removeCells;
  }
}
