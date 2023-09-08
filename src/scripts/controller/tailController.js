import Phaser from 'phaser';

import { NUM_REMOVE } from '../constGame';

export default class TailController {
  _model;

  constructor(model) {
    this._model = model;
  }

  getNumRemoveCells({ x, y }, numColor) {
    const mapRemove = new Map();
    const removeCells = this.searchCellsRemovedR({ x, y}, numColor, mapRemove).size;

    if (removeCells >= NUM_REMOVE) {
      this.removeCells(mapRemove);
    }
    return removeCells;
  }

  searchCellsRemovedR(pos, type, mapRemove) {
    if (
      pos.x - 1 >= 0 &&
      !mapRemove.has(this._model.cells[pos.x - 1][pos.y].id) &&
      this._model.cells[pos.x - 1][pos.y].numColor == type
    ) {
      mapRemove.set(this._model.cells[pos.x][pos.y].id, this._model.cells[pos.x][pos.y]);
      this.searchCellsRemovedR({ x: pos.x - 1, y: pos.y }, type, mapRemove);
      mapRemove.set(this._model.cells[pos.x - 1][pos.y].id, this._model.cells[pos.x - 1][pos.y]);
    }
    if (
      pos.x + 1 < this._model.cells.length &&
      !mapRemove.has(this._model.cells[pos.x + 1][pos.y].id) &&
      this._model.cells[pos.x + 1][pos.y].numColor == type
    ) {
      mapRemove.set(this._model.cells[pos.x][pos.y].id, this._model.cells[pos.x][pos.y]);
      this.searchCellsRemovedR({ x: pos.x + 1, y: pos.y }, type, mapRemove);
      mapRemove.set(this._model.cells[pos.x + 1][pos.y].id, this._model.cells[pos.x + 1][pos.y]);
    }
    if (
      pos.y - 1 >= 0 &&
      !mapRemove.has(this._model.cells[pos.x][pos.y - 1].id) &&
      this._model.cells[pos.x][pos.y - 1].numColor == type
    ) {
      mapRemove.set(this._model.cells[pos.x][pos.y].id, this._model.cells[pos.x][pos.y]);
      this.searchCellsRemovedR({ x: pos.x, y: pos.y - 1 }, type, mapRemove);
      mapRemove.set(this._model.cells[pos.x][pos.y - 1].id, this._model.cells[pos.x][pos.y - 1]);
    }
    if (
      pos.y + 1 < this._model.cells[pos.x].length &&
      !mapRemove.has(this._model.cells[pos.x][pos.y + 1].id) &&
      this._model.cells[pos.x][pos.y + 1].numColor == type
    ) {
      mapRemove.set(this._model.cells[pos.x][pos.y].id, this._model.cells[pos.x][pos.y]);
      this.searchCellsRemovedR({ x: pos.x, y: pos.y + 1 }, type, mapRemove);
      mapRemove.set(this._model.cells[pos.x][pos.y + 1].id, this._model.cells[pos.x][pos.y + 1]);
    }
    return mapRemove;
  }

  removeCells(mapRemove) {
    for (let value of mapRemove.values()) {
      this._model.removeCell(value.x, value.y);
    }
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
}
