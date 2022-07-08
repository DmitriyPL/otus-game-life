import { Field } from "../ts/field";
// import { Cell } from "../ts/cell";

const canvas = document.createElement("canvas");
const field = new Field(canvas, 10, 10, 10);

describe("field to be instance of Field", () => {
  it("to be instance of Cell", () => {
    expect(field).toBeInstanceOf(Field);
  });
});

describe("setFieldSize", () => {
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
  field.setupCanvas();

  it("canvas.width = 30", () => {
    expect(field.canvas.width).toBe(30);
  });
  it("canvas.height = 40", () => {
    expect(field.canvas.height).toBe(40);
  });
});

describe("getAliveCells", () => {
  const aliveCells = field.getAliveCells();

  it("alive cells = 0", () => {
    expect(aliveCells).toBe(0);
  });
});

describe("getStateChanged", () => {
  const state = field.getStateChanged();

  it("alive cells = 0", () => {
    expect(state).toBeFalsy();
  });
});
