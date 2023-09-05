export default class GameOverController {

  model;

  constructor(model) {
   this.model = model
  }

  moveDone(countCells) {
    this.model.countMove++;
    this.model.score += countCells * (countCells + 1);
  }

  isGameOver() {
    if (this.model.countMove == this.model.maxCountMove) {
      return true;
    }
  }
}
