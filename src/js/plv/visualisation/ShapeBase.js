export default class ShapeBase{
    constructor(){
        this.x = 0;
        this.y = 0;
    }

    get width() { }
    get height() { }

    Render(svg, color) { }

    SetLocation(x, y){
        this.x = x;
        this.y = y;
    }

    GetBoundingBox(){
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height,
        };
    }
}
