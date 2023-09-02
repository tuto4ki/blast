import { Cell } from './cell';

export default class BlastModel {
  
  #columns;
  #rows;
  #cells;
  observer;

  constructor(rows, columns) {
    this.#rows = rows;
    this.#columns = columns;
    //this.initial();
    //this.broadcast();
  }

  initial() {
    this.#cells = new Array(this.#columns);
    for (let i = 0; i < this.#columns; i++) {
      this.#cells[i] = new Array(this.#rows);
      const startId = i * this.#columns;
      for (let j = 0; j < this.#rows; j++) {
        this.#cells[i][j] = new Cell(i, j, startId + j);
      }
    }
    this.broadcast();
  }

  subscribe (fn) {
    this.observer = fn;
  }

  broadcast() {
    this.observer(this.#cells);
  }
}