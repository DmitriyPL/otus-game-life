// SCSS
import "./assets/scss/main.scss";

// CSS
import "./assets/css/normalize.css";

import { Field } from "./ts/field";

function run(field: Field, gameSpeed: number) {
  localStorage.setItem("stopGame", "false");

  const refreshId = setInterval(() => {
    field.setNextType();
    field.draw();
    field.setCurrentType();
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

function clickHandler(this: Field, ev: MouseEvent) {
  this.canvasX = this.canvas.offsetLeft + this.canvas.clientLeft;
  this.canvasY = this.canvas.offsetTop + this.canvas.clientTop;

  const coordX = ev.pageX - this.canvasX;
  const coordY = ev.pageY - this.canvasY;

  const x = Math.trunc(coordX / this.cellSize);
  const y = Math.trunc(coordY / this.cellSize);

  const cell = this.state[y][x];

  if (cell.getType() === "dead") {
    cell.setType("alive");
    this.aliveCells += 1;
  } else {
    cell.setType("dead");
    this.aliveCells -= 1;
  }

  this.addCellForDrawing(cell);
  this.draw();
}

function initField(canvas: HTMLCanvasElement) {
  const { fieldSizeX, fieldSizeY, cellSize } = getFieldParams();

  const field = new Field(canvas, fieldSizeX, fieldSizeY, cellSize);
  field.initFieldState();
  field.setupCanvas();

  canvas.addEventListener("click", clickHandler.bind(field));

  return field;
}

function changeFieldSize(field: Field) {
  const { fieldSizeX, fieldSizeY, cellSize } = getFieldParams();
  field.delCells();
  field.defaultSetup();
  field.setFieldSize(fieldSizeX, fieldSizeY, cellSize);
  field.initFieldState();
  field.setupCanvas();
  field.drawEmptyField();
}

function init() {
  localStorage.setItem("stopGame", "false");

  const canvas: HTMLCanvasElement = document.getElementById(
    "game-field"
  ) as HTMLCanvasElement;

  const field = initField(canvas);
  field.drawEmptyField();

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
  btnDoStep.addEventListener("click", function () {
    field.setNextType();
    field.draw();
    field.setCurrentType();
  });

  const btnClearField: HTMLElement = document.getElementById(
    "clear-field"
  ) as HTMLElement;
  btnClearField.addEventListener("click", function () {
    field.defaultSetup();
    field.clearCellTypes();
    field.drawEmptyField();
  });

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
