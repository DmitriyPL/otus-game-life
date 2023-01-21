import { Cell } from "./cell";

export class Field {
  state: Cell[][] = [];
  drawingCells = new Set<Cell>();
  analyzedCells = new Set<Cell>();
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
  }

  defaultSetup() {
    this.drawingCells.clear();
    this.analyzedCells.clear();
    this.aliveCells = 0;
    this.stateChanged = false;
  }

  initFieldState() {
    for (let y = 0; y < this.fieldSizeY; ++y) {
      const newRow: Cell[] = [];
      for (let x = 0; x < this.fieldSizeX; ++x) {
        const newCell = new Cell("dead");
        newCell.setX(x);
        newCell.setY(y);

        newRow.push(newCell);
      }
      this.state.push(newRow);
    }
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

  setCurrentType() {
    this.analyzedCells.forEach((cell) => {
      const type = cell.getType();
      const nextType = cell.getNextType();

      if (nextType !== type && nextType !== "") {
        cell.setType(nextType);
      } else {
        this.drawingCells.delete(cell);
      }
    });
  }

  setNextType() {
    this.stateChanged = false;

    this.analyzedCells.forEach((cell) => {
      const neighboursCoords = this.getNeighboursCoords(
        cell.getX(),
        cell.getY()
      );
      const aliveNeighbours = this.getAliveNeighbours(neighboursCoords);

      if (cell.getType() === "dead" && aliveNeighbours === 3) {
        cell.setNextType("alive");
        this.aliveCells += 1;
        this.stateChanged = true;
        this.addCellForDrawing(cell);
      } else if (
        cell.getType() === "alive" &&
        (aliveNeighbours < 2 || aliveNeighbours > 3)
      ) {
        cell.setNextType("dead");
        this.aliveCells -= 1;
        this.stateChanged = true;
        this.addCellForDrawing(cell);
      }
    });
  }

  getAliveCells(): number {
    return this.aliveCells;
  }

  getStateChanged() {
    return this.stateChanged;
  }

  getNeighboursCoords(x: number, y: number) {
    return [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ];
  }

  getAliveNeighbours(neighboursCoords: number[][]) {
    let alive = 0;

    /* eslint-disable-next-line */
    for (const coord of neighboursCoords) {
      const x = coord[0];
      const y = coord[1];

      const cellType = this.getCellType(x, y);

      if (cellType === "alive") {
        alive += 1;
      }
    }

    return alive;
  }

  getCellType(x: number, y: number): string {
    if (x < 0 || x > this.fieldSizeX - 1 || y < 0 || y > this.fieldSizeY - 1) {
      return "dead";
    }
    const findedCell = this.state[y][x];
    if (findedCell === undefined) {
      return "dead";
    } else {
      return findedCell.getType();
    }
  }

  delCells() {
    this.state.length = 0;
  }

  clearCellTypes() {
    this.state.forEach((row) => {
      row.forEach((cell) => {
        cell.setType("dead");
        cell.setNextType("");
      });
    });
  }

  addCell(x: number, y: number, newCell: Cell) {
    this.state[y][x] = newCell;
  }

  addCellForDrawing(cell: Cell) {
    this.drawingCells.add(cell);
    const neighborsCoords: number[][] = this.getNeighboursCoords(
      cell.getX(),
      cell.getY()
    );
    neighborsCoords.forEach((coord) => {
      const x: number = coord[0];
      const y: number = coord[1];
      if (
        x >= 0 &&
        x <= this.fieldSizeX - 1 &&
        y >= 0 &&
        y <= this.fieldSizeY - 1
      ) {
        const analizedCell = this.state[y][x];
        this.analyzedCells.add(analizedCell);
      }
    });
    this.analyzedCells.add(cell);
  }

  draw() {
    const size = this.cellSize;

    this.drawingCells.forEach((cell) => {
      const cellX: number = cell.getX() * size;
      const cellY: number = cell.getY() * size;

      if (cell.getType() === "dead") {
        this.ctx.clearRect(cellX, cellY, size, size);
        this.ctx.strokeRect(cellX, cellY, size, size);
      } else {
        if (cell.getNextType() === "dead") {
          this.ctx.fillStyle = "blue";
          this.ctx.fillRect(cellX, cellY, size, size);
        } else {
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(cellX, cellY, size, size);
        }
      }
    });
  }

  drawEmptyField() {
    const size: number = this.cellSize;
    for (let y = 0; y < this.fieldSizeY; ++y) {
      for (let x = 0; x < this.fieldSizeX; ++x) {
        this.ctx.clearRect(x * size, y * size, size, size);
        this.ctx.strokeRect(x * size, y * size, size, size);
      }
    }
  }
}
