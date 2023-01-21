import { Cell } from "../ts/cell";

describe("cell to be instance of Cell", () => {
  const cell = new Cell("dead");

  it("to be instance of Cell", () => {
    expect(cell).toBeInstanceOf(Cell);
  });
});

describe("methods setType/getType", () => {
  const cell = new Cell("dead");

  it("get type for cell ", () => {
    expect(cell.getType()).toBe("dead");
  });

  it("get type for cell ", () => {
    cell.setType("alive");
    expect(cell.getType()).toBe("alive");
  });
});

describe("methods setNextType/getNextType", () => {
  const cell = new Cell("dead");

  it("get next type for cell ", () => {
    expect(cell.getNextType()).toBe("");
  });

  it("set next type for cell ", () => {
    cell.setNextType("alive");
    expect(cell.getNextType()).toBe("alive");
  });
});
