export class Field {
  state = [];

  aliveCells = 0;

  stateChanged = false;

  canvasX = 0;

  canvasY = 0;

  constructor(canvas, fieldSizeX, fieldSizeY, cellSize) {
    this.canvas = canvas;
    this.fieldSizeX = fieldSizeX;
    this.fieldSizeY = fieldSizeY;
    this.cellSize = cellSize;
    this.ctx = this.canvas.getContext("2d");
  }

  setup() {
    this.canvas.width = this.fieldSizeX * this.cellSize;
    this.canvas.height = this.fieldSizeY * this.cellSize;

    this.canvasX = this.canvas.offsetLeft + this.canvas.clientLeft;
    this.canvasY = this.canvas.offsetTop + this.canvas.clientTop;

    this.canvas.addEventListener("click", this.clickHandler.bind(this));
  }

  getAliveCells() {
    return this.aliveCells;
  }

  init(Cell) {
    for (let y = 0; y < this.fieldSizeY; y += 1) {
      for (let x = 0; x < this.fieldSizeX; x += 1) {
        this.state.push(new Cell(x, y, this.cellSize, "dead"));
      }
    }
  }

  clickHandler(e) {
    const x = e.pageX - this.canvasX;
    const y = e.pageY - this.canvasY;

    /* eslint-disable-next-line */
    for (const cell of this.state) {
      const cellX = cell.getCoord("x");
      const cellY = cell.getCoord("y");
      const size = cell.getSize();

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

  draw() {
    this.state.forEach((cell) => {
      const x = cell.getCoord("x");
      const y = cell.getCoord("y");
      const size = cell.getSize();

      if (cell.getType() === "dead") {
        this.ctx.clearRect(x, y, size, size);
        this.ctx.strokeRect(x, y, size, size);
      } else {
        this.ctx.fillRect(x, y, size, size);
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

    this.draw();

    this.state.forEach((cell) => {
      const type = cell.getType();
      const nextType = cell.getNextType();

      if (nextType !== type && nextType !== "") {
        cell.setType(nextType);
      }
    });
  }

  getAliveNeighbours(cellX, cellY) {
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

  getNeighbourType(x, y) {
    if (x < 0 || x > this.fieldSizeX - 1 || y < 0 || y > this.fieldSizeY - 1) {
      return "dead";
    }
    const findedCell = this.state.find(
      (cell) => cell.getX() === x && cell.getY() === y
    );
    return findedCell.getType();
  }

  clear() {
    this.state.forEach((cell) => {
      cell.setType("dead");
      cell.setNextType("");
    });

    this.draw();
  }

  getStateChanged() {
    return this.stateChanged;
  }
}
