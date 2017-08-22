import ShapeBase from './ShapeBase.js'

export default class Station extends ShapeBase {
    constructor(){
        super();
        this._radius = 20;
    }

    get width() { return 2 * this._radius; }
    get height() { return 2 * this._radius; }

    Render(svg, color){
        var group =
            d3.select("#canvas")
            .append("g")
            .attr("transform", `translate(${this.x}, ${this.y})`);

        var arc = d3.arc()
            .innerRadius(10)
            .outerRadius(30)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        group.append("path")
            .attr("class", "arc")
            .attr("d", arc)
            .attr('fill', 'gray');
    }
}
