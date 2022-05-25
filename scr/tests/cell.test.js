import { Cell } from "../modules/cell.js";

const cell = new Cell(0, 0, 15, "dead");

describe("calss Cell", () => {
  it("is an object", () => {
    expect(typeof cell).toBe("object");
  });
});
