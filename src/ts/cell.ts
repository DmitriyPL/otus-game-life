export class Cell {
  nextType = "";
  x: number;
  y: number;
  size: number;
  type: string;

  constructor(x: number, y: number, size: number, type: string) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  setType(type: string) {
    this.type = type;
  }

  getType(): string {
    return this.type;
  }

  getNextType(): string {
    return this.nextType;
  }

  setNextType(type: string) {
    this.nextType = type;
  }

  getCoord(coord: string): number {
    if (coord === "x") {
      return this.x * this.size;
    } else if (coord === "y") {
      return this.y * this.size;
    } else {
      return 0;
    }
  }

  getSize(): number {
    return this.size;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
