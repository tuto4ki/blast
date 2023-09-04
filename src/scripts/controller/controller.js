export class Controller {

  model;

  constructor(model) {
    this.model = model;
    this.onClick = this.onClick.bind(this);
    this.moveDownCells = this.moveDownCells.bind(this);
  }

  onClick(id) {
    const cell = this.model.cells.flat().find((item) => item && item.id == id);
    if (cell) {
      //remove cells
      this.getNewFieldsR({x: cell.x, y: cell.y }, cell.numColor);
      // move cells
      this.moveDownCells();
    }

    this.model.broadcast();
  }

  getNewFieldsR(pos, type) {
    if (
      (pos.x - 1 >= 0 && this.model.cells[pos.x - 1][pos.y]) &&
      this.model.cells[pos.x - 1][pos.y].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      this.getNewFieldsR({x: pos.x - 1, y: pos.y}, type);
      this.model.removeCell(pos.x - 1, pos.y);
    }
    if (
      (pos.x + 1 < this.model.cells.length && this.model.cells[pos.x + 1][pos.y]) &&
      this.model.cells[pos.x + 1][pos.y].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      this.getNewFieldsR({x: pos.x + 1, y: pos.y}, type);
      this.model.removeCell(pos.x + 1, pos.y);
    }
    if (
      (pos.y - 1 >= 0 && this.model.cells[pos.x][pos.y - 1]) &&
      this.model.cells[pos.x][pos.y - 1].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      this.getNewFieldsR({x: pos.x, y: pos.y - 1}, type);
      this.model.removeCell(pos.x, pos.y - 1);
    }
    if (
      (pos.y + 1 < this.model.cells[0].length && this.model.cells[pos.x][pos.y + 1]) &&
      this.model.cells[pos.x][pos.y + 1].numColor == type
    ) {
      this.model.removeCell(pos.x, pos.y);
      this.getNewFieldsR({x: pos.x, y: pos.y + 1}, type);
      this.model.removeCell(pos.x, pos.y + 1);
    }
  }

  moveDownCells() {
    for (let i = 0; i < this.model.cells.length; i++) {
      for (let j = 0; j < this.model.cells[i].length; j++) {
        if (!this.model.cells[i][j]) {
          if (j - 1 >= 0) {
            this.model.moveDownCell(i, j - 1, i, j);
            if (j > 0) j-=2;
          } else {
            this.model.addCell(i, j);
          }
        }
      }
    }
    
  }
}