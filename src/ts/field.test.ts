import { Field } from "../ts/field";
import { Cell } from "../ts/cell";

function initFieldState(state: number[][]) {
  const canvas = document.createElement("canvas");
  const field = new Field(canvas, state.length, state[0].length, 10);

  field.delCells();
  field.initFieldState();

  for (let y = 0; y < state.length; ++y) {
    for (let x = 0; x < state[y].length; ++x) {
      let cellType = "dead";
      if (state[y][x] === 1) {
        cellType = "alive";
      }

      const newCell = new Cell(cellType);
      newCell.setX(x);
      newCell.setY(y);
      field.addCell(x, y, newCell);
      field.analyzedCells.add(newCell);
    }
  }

  return field;
}

describe("field to be instance of Field", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("to be instance of Field", () => {
    expect(field).toBeInstanceOf(Field);
  });
});

describe("setFieldSize", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  field.setFieldSize(2, 2, 10);

  it("fieldSizeX is 2", () => {
    expect(field.fieldSizeX).toBe(2);
  });
  it("fieldSizeY is 2", () => {
    expect(field.fieldSizeY).toBe(2);
  });
  it("cell size is 10", () => {
    expect(field.cellSize).toBe(10);
  });
});

describe("setupCanvas", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  field.setupCanvas();

  it("canvas.width = 30", () => {
    expect(field.canvas.width).toBe(30);
  });
  it("canvas.height = 30", () => {
    expect(field.canvas.height).toBe(30);
  });
});

describe("getAliveCells", () => {
  const stateInit = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("alive cells = 0", () => {
    expect(field.getAliveCells()).toBe(0);
  });
});

describe("getStateChanged", () => {
  const stateInit = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("state not changed", () => {
    expect(field.getStateChanged()).toBeFalsy();
  });
});

describe("addCell / clearCellTypes / delCells ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("add cells on field", () => {
    expect(field.state[0].length).toBe(3);
    expect(field.state.length).toBe(3);
  });

  it("clear cell types on field", () => {
    field.clearCellTypes();
    expect(field.state[1][1].getType()).toBe("dead");
  });

  it("del cells from field", () => {
    field.delCells();
    expect(field.state).toEqual([]);
  });
});

describe("getCellType ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("is a dead cell", () => {
    expect(field.getCellType(0, 0)).toBe("dead");
    expect(field.getCellType(1, 0)).toBe("dead");
    expect(field.getCellType(2, 2)).toBe("dead");
  });

  it("is an alive cell", () => {
    expect(field.getCellType(0, 1)).toBe("alive");
    expect(field.getCellType(1, 1)).toBe("alive");
    expect(field.getCellType(2, 1)).toBe("alive");
  });
});

describe("getAliveNeighbours ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 0, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("has 2 alive neighbours", () => {
    const neighboursCoords = field.getNeighboursCoords(1, 1);
    expect(field.getAliveNeighbours(neighboursCoords)).toBe(2);
  });

  it("has 1 alive neighbours", () => {
    const neighboursCoords = field.getNeighboursCoords(0, 0);
    expect(field.getAliveNeighbours(neighboursCoords)).toBe(1);
  });
});

describe("changeState ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);
  field.setNextType();

  it("has next type 'alive'", () => {
    expect(field.state[0][1].getNextType()).toBe("alive");
    expect(field.state[1][1].getNextType()).toBe("");
    expect(field.state[2][1].getNextType()).toBe("alive");
  });
});

describe("changeState ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);
  field.setNextType();
  field.setCurrentType();

  it("has type 'alive'", () => {
    expect(field.state[0][1].getType()).toBe("alive");
    expect(field.state[1][1].getType()).toBe("alive");
    expect(field.state[2][1].getType()).toBe("alive");
  });
});
