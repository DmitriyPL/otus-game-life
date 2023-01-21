export class Cell {
  nextType = "";
  type: string;
  x = 0;
  y = 0;

  constructor(type: string) {
    this.type = type;
  }

  setType(type: string) {
    this.type = type;
  }

  setNextType(type: string) {
    this.nextType = type;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getType(): string {
    return this.type;
  }

  getNextType(): string {
    return this.nextType;
  }
}
