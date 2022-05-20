import { data as fieldParams } from './modules/setup.js';
import { Field } from './modules/field.js';
import { Cell } from './modules/cell.js';

function init() {

    localStorage.setItem('stopGame', "false");

    const fieldSizeX = fieldParams.fieldSizeX;
    const fieldSizeY = fieldParams.fieldSizeY;
    const cellSize = fieldParams.cellSize;

    const canvas = document.getElementById("game-field");

    const field = new Field(canvas, fieldSizeX, fieldSizeY, cellSize);
    field.setup(); 
    field.init(Cell);
    field.draw(); 

    const btnDoStep = document.getElementById("do-step");    
    btnDoStep.addEventListener('click', field.changeState.bind(field));

    const btnClearField = document.getElementById("clear-field");    
    btnClearField.addEventListener('click', field.clear.bind(field));    
 
    const btnStartGame = document.getElementById("start-game");    
    btnStartGame.addEventListener('click', ()=>{run(field)});    

    const btnStopGame = document.getElementById("stop-game");    
    btnStopGame.addEventListener('click', ()=>{      
        localStorage.setItem('stopGame', "true");
    });    

}

function run(field) {
  
    localStorage.setItem('stopGame', "false");

    let refreshId = setInterval( () => {
        field.changeState();
        if (field.getStateChanged() === false || localStorage.getItem('stopGame') === "true"){
            clearInterval(refreshId);  
        }
    }, 100);
}

init();