import Shape from './ShapeBase.js'

export default class Station extends Shape {
    constructor(label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;

        this.__wVariance = Math.random() * 50;
        this.__hVariance = Math.random() * 50;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }
    get width() { return 25 + this.__wVariance; }
    get height() { return 100 + this.__hVariance; }

    Render(svg, color){
        const group =
        d3
        .select('#canvas')
        .append("g");

        const rectangle =
        group
        .append('rect')
        .attr("x", this.x)
        .attr("y", this.y)
        .attr("width", this.width)
        .attr("height", this.height)
        .style("fill", `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`)

        const text =
        group
        .append('text', this.label)
        .attr("x", this.x)
        .attr("y", this.y)
        .text(this.label)
        .attr("font-family", "sans-serif")
        .attr("font-size", "8px")
        .attr("fill", "black");
    }
}
