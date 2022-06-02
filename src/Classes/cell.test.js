import { Cell } from "../Classes/cell";

const cell = new Cell(0, 0, 15, "dead");

describe("calss Cell", () => {
  it("is an object", () => {
    expect(typeof cell).toBe("object");
  });
});
