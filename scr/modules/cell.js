export class Cell {
  nextType = "";

  constructor(x, y, size, type) {
    (this.x = x), (this.y = y), (this.size = size), (this.type = type);
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getNextType() {
    return this.nextType;
  }

  setNextType(type) {
    this.nextType = type;
  }

  getCoord(coord) {
    return this[coord] * this.size;
  }

  getSize() {
    return this.size;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}
