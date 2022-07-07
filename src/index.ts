// SCSS
import "./assets/scss/main.scss";

// CSS
import "./assets/css/normalize.css";

import { data as fieldParams } from "./ts/setup";
import { Field } from "./ts/field";
import { Cell } from "./ts/cell";

function run(field: Field) {
  localStorage.setItem("stopGame", "false");

  const refreshId = setInterval(() => {
    field.changeState();
    if (
      field.getStateChanged() === false ||
      localStorage.getItem("stopGame") === "true"
    ) {
      clearInterval(refreshId);
    }
  }, 100);
}

function init() {
  localStorage.setItem("stopGame", "false");

  const { fieldSizeX, fieldSizeY, cellSize } = getFieldSize();

  const canvas: HTMLCanvasElement = document.getElementById(
    "game-field"
  ) as HTMLCanvasElement;

  const field = new Field(canvas, fieldSizeX, fieldSizeY, cellSize);

  drawField(field);

  const btnChangeSize: HTMLElement = document.getElementById(
    "set-field-size"
  ) as HTMLElement;
  btnChangeSize.addEventListener("click", () => {
    changeFieldSize(field);
  });

  const btnDoStep: HTMLElement = document.getElementById(
    "do-step"
  ) as HTMLElement;
  btnDoStep.addEventListener("click", field.changeState.bind(field));

  const btnClearField: HTMLElement = document.getElementById(
    "clear-field"
  ) as HTMLElement;
  btnClearField.addEventListener("click", field.clear.bind(field));

  const btnStartGame: HTMLElement = document.getElementById(
    "start-game"
  ) as HTMLElement;
  btnStartGame.addEventListener("click", () => {
    run(field);
  });

  const btnStopGame: HTMLElement = document.getElementById(
    "stop-game"
  ) as HTMLElement;
  btnStopGame.addEventListener("click", () => {
    localStorage.setItem("stopGame", "true");
  });
}

function getFieldSize() {
  const inputXel: HTMLInputElement = document.getElementById(
    "sizeX"
  ) as HTMLInputElement;
  const inputYel: HTMLInputElement = document.getElementById(
    "sizeY"
  ) as HTMLInputElement;
  const cellSize: HTMLInputElement = document.getElementById(
    "cellSize"
  ) as HTMLInputElement;

  const fieldParams = {
    fieldSizeX: Number(inputXel.value),
    fieldSizeY: Number(inputYel.value),
    cellSize: Number(cellSize.value),
  };

  return fieldParams;
}

function changeFieldSize(field: Field) {
  const { fieldSizeX, fieldSizeY, cellSize } = getFieldSize();
  field.setFieldSize(fieldSizeX, fieldSizeY, cellSize);
  field.setup();
  drawField(field);
}

function drawField(field: Field) {
  field.setup();

  for (let y = 0; y < field.fieldSizeY; y += 1) {
    for (let x = 0; x < field.fieldSizeX; x += 1) {
      field.addCell(new Cell(x, y, field.cellSize, "dead"));
    }
  }

  field.draw();
}

init();
