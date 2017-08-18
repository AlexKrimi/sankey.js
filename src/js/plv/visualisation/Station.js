import Shape from './ShapeBase.js'

export default class Station extends Shape {
    constructor(label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;

        this.__wVariance = Math.random()*50;
        this.__hVariance = Math.random()*50;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }
    get width() { return 25 + this.__wVariance; }
    get height() { return 100 + this.__hVariance; }

    Render(svg, startLocation, color){
        d3
        .select('#canvas')
        .append("g")
        .append('rect')
        .attr("x", startLocation.x)
        .attr("y", startLocation.y)
        .attr("width", this.width)
        .attr("height", this.height)
        .style("fill", color);
    }
}
