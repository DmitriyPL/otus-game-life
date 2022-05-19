export class Field {
    
    state = [];

    canvasX = 0;
    canvasY = 0;

    constructor(canvas, fieldSize, cellSize)
    {
        this.canvas = canvas;
        this.fieldSize = fieldSize;
        this.cellSize = cellSize;
        this.ctx = this.canvas.getContext('2d');
    }

    setup() {

        this.canvas.width = this.fieldSize * this.cellSize;
        this.canvas.height = this.fieldSize * this.cellSize;     
    
        this.canvasX = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasY = this.canvas.offsetTop + this.canvas.clientTop;
        
        this.canvas.addEventListener('click', this.clickHandler.bind(this));

    }

    initFieldState(Cell) {        
 
        for (let y = 0; y < this.fieldSize; y += 1){
            for (let x = 0; x < this.fieldSize; x += 1) {
                this.state.push(new Cell(x, y, this.cellSize, "dead"));
            }
        }        
    }

    clickHandler(e) {        

        let x = e.pageX - this.canvasX;
        let y = e.pageY - this.canvasY;
    
        this.state.forEach( (cell) => {

            const cellX = cell.getCoord('x');
            const cellY = cell.getCoord('y');
            const size = cell.getSize();

            if (y > cellY && y < cellY + size 
                && x > cellX && x < cellX + size ) {
                
                if (cell.getType() == "dead"){
                    cell.setType("alive");
                } else {
                    cell.setType("dead");
                }
    
                this.draw();
            }
        });
    }

    draw() {      

        this.state.forEach( (cell) => {

            const x = cell.getCoord('x');
            const y = cell.getCoord('y');
            const size = cell.getSize();

            if (cell.getType() == "dead"){
                this.ctx.clearRect(x, y, size, size);    
                this.ctx.strokeRect(x, y, size, size);    
            } else {
                this.ctx.fillRect(x, y, size, size);    
            }
            
        });      
    
    }
}