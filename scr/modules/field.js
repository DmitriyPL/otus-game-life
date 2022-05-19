export class Field {
    
    state = [];
    canvasX = 0;
    canvasY = 0;

    constructor(canvas, fieldSize, cellSize)
    {
        this.canvas = canvas;
        this.fieldSize = fieldSize;
        this.cellSize = cellSize;
    }

    initFieldState(Cell) {        
 
        for (let y = 0; y < this.fieldSize; y += 1){
            for (let x = 0; x < this.fieldSize; x += 1) {
                this.state.push(new Cell(x, y, this.cellSize, "dead"));
            }
        }        

    }

    setup() {

        this.canvas.width = this.fieldSize * this.cellSize;
        this.canvas.height = this.fieldSize * this.cellSize;

        this.canvasX = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasY = this.canvas.offsetTop + this.canvas.clientTop;

        this.canvas.addEventListener('click', this.clickHandler, false);
        this.canvas.clsInstant = this;
    }

    clickHandler(e) {        

        const canvasX = e.currentTarget.this.canvasX;
        const canvasY = e.currentTarget.this.canvasY;
        let state = e.currentTarget.this.state;
        const draw = e.currentTarget.this.draw

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

                draw(e.currentTarget.this);
            }
        });
    }
}