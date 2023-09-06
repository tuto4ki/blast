export default class GameOverController {

  model;

  constructor(model) {
   this.model = model
  }

  moveDone(countCells) {
    this.model.countMove++;
    this.model.score += countCells * (countCells - 1);
  }

  checkGameOver() {

    if (this.model.score >= this.model.maxScore) {
      this.model.isWin = true;
      this.model.isGameOver = true;
    }
    else if (this.model.countMove == this.model.maxCountMove) {
      this.model.isGameOver = true;
    }
  }
}
