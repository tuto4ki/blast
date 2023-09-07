export default class GameOverController {

  _model;

  constructor(model) {
   this._model = model
  }

  moveDone(countCells) {
    this._model.countMove++;
    this._model.score += countCells * (countCells - 1);
  }

  checkGameOver() {

    if (this._model.score >= this._model.maxScore) {
      this._model.isWin = true;
      this._model.isGameOver = true;
    }
    else if (this._model.countMove == this._model.maxCountMove) {
      this._model.isGameOver = true;
    }
  }

  gameOverFailed() {
    this._model.isWin = false;
    this._model.isGameOver = true;
  }
}
