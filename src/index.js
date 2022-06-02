import { data as fieldParams } from "./setup.js";
import { Field } from "./Classes/field.js";
import { Cell } from "./Classes/cell.js";

function run(field) {
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

  const { fieldSizeX } = fieldParams;
  const { fieldSizeY } = fieldParams;
  const { cellSize } = fieldParams;

  const canvas = document.getElementById("game-field");

  const field = new Field(canvas, fieldSizeX, fieldSizeY, cellSize);
  field.setup();
  field.init(Cell);
  field.draw();

  const btnDoStep = document.getElementById("do-step");
  btnDoStep.addEventListener("click", field.changeState.bind(field));

  const btnClearField = document.getElementById("clear-field");
  btnClearField.addEventListener("click", field.clear.bind(field));

  const btnStartGame = document.getElementById("start-game");
  btnStartGame.addEventListener("click", () => {
    run(field);
  });

  const btnStopGame = document.getElementById("stop-game");
  btnStopGame.addEventListener("click", () => {
    localStorage.setItem("stopGame", "true");
  });
}

init();
