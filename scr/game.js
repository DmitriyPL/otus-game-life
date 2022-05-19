import { data as fieldParams } from './modules/setup.js';
import { Field } from './modules/field.js';
import { Cell } from './modules/cell.js';

function init() {

    const fieldSize = fieldParams.fieldSize;
    const cellSize = fieldParams.cellSize;

    const canvas = document.getElementById("game-field");

    const field = new Field(canvas, fieldSize, cellSize);
    field.setup(); 
    field.initFieldState(Cell);
    field.draw(); 

}

init();