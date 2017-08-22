export default class ShapeBase{
    constructor(width, height){
        this._width = width;
        this._height = height;
        this.x = 0;
        this.y = 0;
    }

    get width() { return this._width; }
    get height() { return this._height; }

    Render() { }

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

    Translate(deltaX, deltaY){
        this.x = this.x + deltaX;
        this.y = this.y + deltaY;
    }
}
