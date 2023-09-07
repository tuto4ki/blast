import { getRandom } from '../utils';
import { COUNT_SHUFFLE, NUM_COLOR } from '../constGame';

export default class ShuffleController {
  _model;
  _countShuffle = COUNT_SHUFFLE;

  constructor(model) {
    this._model = model;
  }

  refresh() {
    this._countShuffle = COUNT_SHUFFLE;
  }

  checkMove() {
    let isMove = this.isMoveExists();
    if (!isMove && this._countShuffle) {
      this._countShuffle--;
      this.shuffle();
      this._model.broadcast();
    }
    if (!isMove && !this._countShuffle) {
      return false;
    }
    return true;
  }

  isMoveExists() {
    for (let i = 0; i < this._model.cells.length; i++) {
      for (let j = 0; j < this._model.cells[i].length; j++) {
        if (this._model.cells[i][j].numColor >= NUM_COLOR) {
          return true;
        }
        if (
          (i - 1 >= 0 && this._model.cells[i][j].numColor == this._model.cells[i - 1][j].numColor) ||
          (i + 1 < this._model.cells.length &&
            this._model.cells[i][i].numColor == this._model.cells[i + 1][i].numColor) ||
          (j - 1 >= 0 && this._model.cells[i][j].numColor == this._model.cells[i][j - 1].numColor) ||
          (j + 1 < this._model.cells[i].length &&
            this._model.cells[i][j].numColor == this._model.cells[i][j + 1].numColor)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  shuffle() {
    const maxX = this._model.cells.length - 1;
    for (let i = 0; i < this._model.cells.length; i++) {
      const maxY = this._model.cells[i].length - 1;
      for (let j = 0; j < this._model.cells[i].length; j++) {
        const xMove = getRandom(0, maxX);
        const yMove = getRandom(0, maxY);
        if (i != xMove && j != yMove) this._model.swapCell({ x: i, y: j }, { x: xMove, y: yMove });
      }
    }
  }
}
