import { data as fieldParams } from './modules/setup.js';
import { Field } from './modules/field.js';
import { Cell } from './modules/cell.js';

let state = [];

let canvas = document.getElementById("game-field");
let ctx = canvas.getContext('2d')

const fieldSize = fieldParams.fieldSize;
const cellSize = fieldParams.cellSize;  

let canvasX = canvas.offsetLeft + canvas.clientLeft;
let canvasY = canvas.offsetTop + canvas.clientTop;

function init() {

    canvas.width = fieldSize * cellSize;
    canvas.height = fieldSize * cellSize;     

    canvas.addEventListener('click', clickHandler, false);

    initFieldState(state, Cell, fieldSize, cellSize);
    draw(state, ctx);    
}

function draw(state, ctx) {      

    state.forEach(function(cell) {
        if (cell.type == "dead"){
            ctx.clearRect(cell.x * cell.size, cell.y * cell.size, cell.size, cell.size);    
            ctx.strokeRect(cell.x * cell.size, cell.y * cell.size, cell.size, cell.size);    
        } else {
            ctx.fillRect(cell.x * cell.size, cell.y * cell.size, cell.size, cell.size);    
        }
        
    });      

}

function initFieldState(state, Cell, fieldSize, cellSize) {        
 
    for (let y = 0; y < fieldSize; y += 1){
        for (let x = 0; x < fieldSize; x += 1) {
            state.push(new Cell(x, y, cellSize, "dead"));
        }
    }        

}

function clickHandler(e) {        

    let x = e.pageX - canvasX;
    let y = e.pageY - canvasY;

    state.forEach(function(cell) {
        if (y > cell.y * cell.size && y < cell.y * cell.size + cell.size 
            && x > cell.x * cell.size && x < cell.x * cell.size + cell.size) {
            
            if (cell.type == "dead"){
                cell.setType("alive");
            } else {
                cell.setType("dead");
            }

            draw(state, ctx);
        }
    });
}

init();