import { Cell } from "./cell";

export class Field {
  state: Cell[] = [];
  aliveCells = 0;
  stateChanged = false;
  canvasX = 0;
  canvasY = 0;

  canvas: HTMLCanvasElement;
  fieldSizeX: number;
  fieldSizeY: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    canvas: HTMLCanvasElement,
    fieldSizeX: number,
    fieldSizeY: number,
    cellSize: number
  ) {
    this.canvas = canvas;
    this.fieldSizeX = fieldSizeX;
    this.fieldSizeY = fieldSizeY;
    this.cellSize = cellSize;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.addEventListener("click", this.clickHandler.bind(this));
  }

  setFieldSize(x: number, y: number, cell: number) {
    this.fieldSizeX = x;
    this.fieldSizeY = y;
    this.cellSize = cell;
  }

  setupCanvas() {
    this.canvas.width = this.fieldSizeX * this.cellSize;
    this.canvas.height = this.fieldSizeY * this.cellSize;
  }

  getAliveCells(): number {
    return this.aliveCells;
  }

  getStateChanged() {
    return this.stateChanged;
  }

  getAliveNeighbours(cellX: number, cellY: number) {
    let alive = 0;

    const neighboursCoords = [
      [cellX - 1, cellY - 1],
      [cellX - 1, cellY],
      [cellX - 1, cellY + 1],
      [cellX, cellY - 1],
      [cellX, cellY + 1],
      [cellX + 1, cellY - 1],
      [cellX + 1, cellY],
      [cellX + 1, cellY + 1],
    ];

    /* eslint-disable-next-line */
    for (const coord of neighboursCoords) {
      const x = coord[0];
      const y = coord[1];

      const cellType = this.getNeighbourType(x, y);

      if (cellType === "alive") {
        alive += 1;
      }
    }

    return alive;
  }

  getNeighbourType(x: number, y: number): string {
    if (x < 0 || x > this.fieldSizeX - 1 || y < 0 || y > this.fieldSizeY - 1) {
      return "dead";
    }
    const findedCell = this.state.find(
      (cell) => cell.getX() === x && cell.getY() === y
    );
    if (findedCell === undefined) {
      return "dead";
    } else {
      return findedCell.getType();
    }
  }

  addCell(newCell: Cell) {
    this.state.push(newCell);
  }

  clear() {
    this.state.forEach((cell) => {
      cell.setType("dead");
      cell.setNextType("");
    });
  }

  delCells() {
    this.state.length = 0;
  }

  draw() {
    this.state.forEach((cell) => {
      const x = cell.getCoord("x");
      const y = cell.getCoord("y");
      const size = this.cellSize;

      if (cell.getType() === "dead") {
        this.ctx.clearRect(x, y, size, size);
        this.ctx.strokeRect(x, y, size, size);
      } else {
        if (cell.getNextType() === "dead") {
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(x, y, size, size);
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(x, y, size, size);
        }
      }
    });
  }

  changeState() {
    this.stateChanged = false;

    this.state.forEach((cell) => {
      const cellX = cell.getX();
      const cellY = cell.getY();

      const aliveNeighbours = this.getAliveNeighbours(cellX, cellY);

      if (cell.getType() === "dead" && aliveNeighbours === 3) {
        cell.setNextType("alive");
        this.aliveCells += 1;
        this.stateChanged = true;
      } else if (
        cell.getType() === "alive" &&
        (aliveNeighbours < 2 || aliveNeighbours > 3)
      ) {
        cell.setNextType("dead");
        this.aliveCells -= 1;
        this.stateChanged = true;
      }
    });
  }

  setNextType() {
    this.state.forEach((cell) => {
      const type = cell.getType();
      const nextType = cell.getNextType();

      if (nextType !== type && nextType !== "") {
        cell.setType(nextType);
      }
    });
  }

  clickHandler(ev: MouseEvent) {
    this.canvasX = this.canvas.offsetLeft + this.canvas.clientLeft;
    this.canvasY = this.canvas.offsetTop + this.canvas.clientTop;

    const x = ev.pageX - this.canvasX;
    const y = ev.pageY - this.canvasY;

    /* eslint-disable-next-line */
    for (const cell of this.state) {
      const cellX = cell.getCoord("x");
      const cellY = cell.getCoord("y");
      const size = this.cellSize;

      if (y > cellY && y < cellY + size && x > cellX && x < cellX + size) {
        if (cell.getType() === "dead") {
          cell.setType("alive");
          this.aliveCells += 1;
        } else {
          cell.setType("dead");
          this.aliveCells -= 1;
        }

        this.draw();

        break;
      }
    }
  }
}
