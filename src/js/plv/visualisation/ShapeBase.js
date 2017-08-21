export default class ShapeBase{
    get width() { }
    get height() { }
    Render(svg, color) { }
    SetLocation(x, y){
        this.x = x;
        this.y = y;
    }
}
