import { NUM_COLOR } from '../constGame';

export class Cell {

  x;
  y;
  numColor;
  id;

  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.numColor = this.setRandomColor();
    this.id = id;
  }

  /**
   * 0 blue
   * 1 green
   * 2 purple
   * 3 red
   * 4 yellow
   */
  setRandomColor() {
    return Math.floor(Math.random() * NUM_COLOR);
  }

  setValue(x, y) {
    this.x = x;
    this.y = y;
  }
}