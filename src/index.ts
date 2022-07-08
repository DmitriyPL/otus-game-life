// SCSS
import "./assets/scss/main.scss";

// CSS
import "./assets/css/normalize.css";

import { Field } from "./ts/field";
import { Cell } from "./ts/cell";

function run(field: Field, gameSpeed: number) {
  localStorage.setItem("stopGame", "false");

  const refreshId = setInterval(() => {
    field.changeState();
    if (
      field.getStateChanged() === false ||
      localStorage.getItem("stopGame") === "true"
    ) {
      clearInterval(refreshId);
    }
  }, gameSpeed);

  localStorage.setItem("refreshId", String(refreshId));

  return refreshId;
}

function drawField(field: Field) {
  field.setupCanvas();
  field.delCells();

  for (let y = 0; y < field.fieldSizeY; y += 1) {
    for (let x = 0; x < field.fieldSizeX; x += 1) {
      field.addCell(new Cell(x, y, field.cellSize, "dead"));
    }
  }

  field.draw();
}

function getGameSpeed() {
  const gameSpeedEl: HTMLInputElement = document.getElementById(
    "gameSpeed"
  ) as HTMLInputElement;

  return Number(gameSpeedEl.value);
}

function getFieldParams() {
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
  const { fieldSizeX, fieldSizeY, cellSize } = getFieldParams();
  field.setFieldSize(fieldSizeX, fieldSizeY, cellSize);
  drawField(field);
}

function init() {
  localStorage.setItem("stopGame", "false");

  const { fieldSizeX, fieldSizeY, cellSize } = getFieldParams();

  const canvas: HTMLCanvasElement = document.getElementById(
    "game-field"
  ) as HTMLCanvasElement;

  const field = new Field(canvas, fieldSizeX, fieldSizeY, cellSize);

  drawField(field);

  const btnChangeSize: HTMLElement = document.getElementById(
    "set-field-size"
  ) as HTMLElement;
  btnChangeSize.addEventListener("click", function (ev) {
    ev.preventDefault();
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
  btnStartGame.addEventListener("click", function (ev) {
    ev.preventDefault();
    const gameSpeed = getGameSpeed();
    run(field, gameSpeed);
  });

  const btnStopGame: HTMLElement = document.getElementById(
    "stop-game"
  ) as HTMLElement;
  btnStopGame.addEventListener("click", function (ev) {
    ev.preventDefault();
    localStorage.setItem("stopGame", "true");
  });

  const btnGameSpeed: HTMLElement = document.getElementById(
    "set-game-speed"
  ) as HTMLElement;
  btnGameSpeed.addEventListener("click", function (ev) {
    ev.preventDefault();
    localStorage.setItem("stopGame", "true");
    const refreshId = Number(localStorage.getItem("refreshId"));
    clearInterval(refreshId);
    const gameSpeed = getGameSpeed();
    run(field, gameSpeed);
  });
}

init();
