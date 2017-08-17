import Shape from './ShapeBase.js'

export default class Station extends Shape {
    constructor(label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }
    get width() { return 25; }
    get height() { return 100; }

    Render(svg, startLocation){
        svg
        .selectAll('g')
        .append("g")
        .append('rect')
        .attr("x", startLocation.x)
        .attr("y", startLocation.y)
        .attr("width", this.width)
        .attr("height", this.height)
        .style("fill", (d, i) => d.fill);
    }
}
