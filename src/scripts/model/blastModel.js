import { Cell } from './cell';

export default class BlastModel {
  
  #columns;
  #rows;
  score = 0;
  maxScore = 300;
  countMove = 0;
  maxCountMove = 10;
  cells;
  observers = new Array();
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

  swapCell(cell1, cell2) {

    let temp = this.cells[cell1.x][cell1.y];
    this.cells[cell1.x][cell1.y] = this.cells[cell2.x][cell2.y];
    this.cells[cell2.x][cell2.y] = temp;

    this.cells[cell1.x][cell1.y].setValue(cell1.x, cell1.y);
    this.cells[cell2.x][cell2.y].setValue(cell2.x, cell2.y);
  }

  subscribe (fn) {
    this.observers.push(fn);
  }

  broadcast() {
    this.observers.forEach((subscr) => subscr({
      cells: this.cells,
      score: this.score,
      countMove: this.countMove,
      maxCountMove: this.maxCountMove,
      maxScore: this.maxScore,
    }));
  }
}