import { Field } from "../ts/field";
import { Cell } from "../ts/cell";

function initFieldState(state: number[][]) {
  const canvas = document.createElement("canvas");
  const field = new Field(canvas, state.length, state[0].length, 10);

  field.delCells();

  for (let i = 0; i < state.length; ++i) {
    for (let j = 0; j < state[i].length; ++j) {
      let cellType = "dead";
      if (state[i][j] === 1) {
        cellType = "alive";
      }

      field.addCell(new Cell(i, j, 10, cellType));
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

  it("to be instance of Cell", () => {
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

  field.setFieldSize(3, 4, 10);

  it("fieldSizeX is 3", () => {
    expect(field.fieldSizeX).toBe(3);
  });
  it("fieldSizeY is 4", () => {
    expect(field.fieldSizeY).toBe(4);
  });
  it("fieldSizeX is 3", () => {
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

describe("addCell / clear / delCells ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("add cells on field", () => {
    expect(field.state.length).toBe(9);
  });

  it("add cells on field", () => {
    field.clear();
    expect(field.state[0].getType()).toBe("dead");
  });

  it("add cells on field", () => {
    field.delCells();
    expect(field.state).toEqual([]);
  });
});

describe("getNeighbourType ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);

  it("is a dead cell", () => {
    expect(field.getCellType(0, 0)).toBe("dead");
    expect(field.getCellType(2, 1)).toBe("dead");
    expect(field.getCellType(2, 2)).toBe("dead");
  });

  it("is an alive cell", () => {
    expect(field.getCellType(1, 0)).toBe("alive");
    expect(field.getCellType(1, 1)).toBe("alive");
    expect(field.getCellType(1, 2)).toBe("alive");
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
    expect(field.getAliveNeighbours(1, 1)).toBe(2);
  });

  it("has 1 alive neighbours", () => {
    expect(field.getAliveNeighbours(0, 0)).toBe(1);
  });
});

describe("changeState ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);
  field.changeState();

  it("has next type 'alive'", () => {
    expect(field.state[1].getNextType()).toBe("alive");
    expect(field.state[4].getNextType()).toBe("");
    expect(field.state[7].getNextType()).toBe("alive");
  });
});

describe("changeState ", () => {
  const stateInit = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const field = initFieldState(stateInit);
  field.changeState();
  field.setNextType();

  it("has type 'alive'", () => {
    expect(field.state[1].getType()).toBe("alive");
    expect(field.state[4].getType()).toBe("alive");
    expect(field.state[7].getType()).toBe("alive");
  });
});
