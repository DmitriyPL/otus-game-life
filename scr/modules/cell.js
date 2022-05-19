export class Cell {
    
    constructor(x, y, size, type) {   
        this.x = x,
        this.y = y,    
        this.size = size,
        this.type = type
    } 

    setType(type){
        this.type = type;
    }

}