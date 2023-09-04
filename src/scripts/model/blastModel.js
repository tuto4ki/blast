import { Cell } from './cell';

export default class BlastModel {
  
  #columns;
  #rows;
  cells;
  observer;
  lastId = 0;

  constructor(rows, columns) {
    this.#rows = rows;
    this.#columns = columns;
    this.addCell = this.addCell.bind(this);
    this.initial = this.initial.bind(this);
  }

  initial() {
    this.cells = new Array(this.#columns);
    for (let i = 0; i < this.#columns; i++) {
      this.cells[i] = new Array(this.#rows);
      for (let j = 0; j < this.#rows; j++) {
        this.addCell(i, j);
      }
    }
    this.broadcast();
  }

  removeCell(i, j) {
    this.cells[i][j] = null;
  }

  addCell(i, j) {
    this.cells[i][j] = new Cell(i, j, this.lastId++);
  }

  moveDownCell(i, j, iNew, jNew) {
    this.cells[i][j].x = iNew;
    this.cells[i][j].y = jNew;
    this.cells[iNew][jNew] = this.cells[i][j];
    this.removeCell(i, j);
  }

  subscribe (fn) {
    this.observer = fn;
  }

  broadcast() {
    this.observer(this.cells);
  }
}