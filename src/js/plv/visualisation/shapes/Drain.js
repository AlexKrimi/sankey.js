import ShapeBase from './ShapeBase.js'

export default class Drain extends ShapeBase {
    constructor(){
        const radius = 15;
        super(
            2 * radius,
            2 * radius
        );
        this._radius = radius;
    }

    // GetBoundingBox(){
    //     return {
    //         x1: this.x - this._radius + 40,
    //         y1: this.y - this._radius,
    //         x2: this.x + this._radius,
    //         y2: this.y + this._radius
    //     };
    // }

    Render(){
        // arc draws arc around x, y. Therefor circle falls out of "standard" square and we need to translate it.
        const
            leftEdgeShiftToCenter = this._radius,
            topEdgeShiftToCenter = this._radius;

        var group =
        d3.select('#canvas')
        .append('g')
        .attr('transform', `translate(${this.x + leftEdgeShiftToCenter}, ${this.y + topEdgeShiftToCenter})`);

        var arc = d3.arc()
            .innerRadius(10)
            .outerRadius(this._radius)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        group.append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .attr('class', 'gray');
    }
}
