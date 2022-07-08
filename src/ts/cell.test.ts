import { Cell } from "../ts/cell";

describe("cell to be instance of Cell", () => {

  const cell = new Cell(0, 0, 15, "dead");

  it("to be instance of Cell", () => {
    expect(cell).toBeInstanceOf(Cell);
  });

});

describe("methods setType/getType", () => {

  const cell = new Cell(0, 0, 15, "dead");

  it("get type for cell ", () => {
    expect(cell.getType()).toBe("dead");
  });

  it("get type for cell ", () => {
    cell.setType("alive");
    expect(cell.getType()).toBe("alive");
  });  

});

describe("methods setNextType/getNextType", () => {

  const cell = new Cell(0, 0, 15, "dead");

  it("get next type for cell ", () => {
    expect(cell.getNextType()).toBe("");
  });

  it("set next type for cell ", () => {
    cell.setNextType("alive");
    expect(cell.getNextType()).toBe("alive");
  });

});

describe("methods getX/getY", () => {
  
  const cell = new Cell(10, 20, 15, "dead");

  it("get X for cell ", () => {
    expect(cell.getX()).toBe(10);
  });

  it("get Y for cell ", () => {
    expect(cell.getY()).toBe(20);
  });

});

describe("methods getSize", () => {
  
  const cell = new Cell(10, 20, 15, "dead");

  it("get size for cell ", () => {
    expect(cell.getSize()).toBe(15);
  });

});

describe("methods getCoord", () => {
  
  const cell = new Cell(10, 20, 15, "dead");

  it("get coordinate X for cell ", () => {
    expect(cell.getCoord('x')).toBe(150);
  });

  it("get coordinate Y for cell ", () => {
    expect(cell.getCoord('y')).toBe(300);
  });

  it("get coordinate Y for cell ", () => {
    expect(cell.getCoord('')).toBe(0);
  });

});