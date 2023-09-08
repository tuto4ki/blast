import { Cell } from './Cell';
import { MAX_SCORE, MAX_COUNT_MOVE } from '../constGame';

export default class BlastModel {
  _columns;
  _rows;
  _lastId = 0;
  _observers = new Array();

  maxScore = MAX_SCORE;
  maxCountMove = MAX_COUNT_MOVE;
  score = 0;
  countMove = 0;
  cells;
  isGameOver = false;
  isWin = false;

  constructor(rows, columns) {
    this._rows = rows;
    this._columns = columns;
    this.addCell = this.addCell.bind(this);
    this.initial = this.initial.bind(this);
  }

  initial() {
    this.cells = new Array(this._columns);
    for (let i = 0; i < this._columns; i++) {
      this.cells[i] = new Array(this._rows);
      for (let j = 0; j < this._rows; j++) {
        this.addCell(i, j);
      }
    }
    this.broadcast();
  }

  removeCell(i, j) {
    this.cells[i][j] = null;
  }

  addCell(i, j, type) {
    this.cells[i][j] = new Cell(i, j, this._lastId++, type);
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

  subscribe(fn) {
    this._observers.push(fn);
  }

  broadcast() {
    this._observers.forEach((subscr) =>
      subscr({
        cells: this.cells,
        score: this.score,
        countMove: this.countMove,
        maxCountMove: this.maxCountMove,
        maxScore: this.maxScore,
        isGameOver: this.isGameOver,
        isWin: this.isWin,
      })
    );
  }
}
