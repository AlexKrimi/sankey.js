import ShapeBase from './ShapeBase.js'
import EfficiencyLevel from '../../EfficiencyLevel.js';

const bufferSvgIdCode = {};
bufferSvgIdCode[EfficiencyLevel.Low] = '#buffer-low';
bufferSvgIdCode[EfficiencyLevel.Medium] = '#buffer-medium';
bufferSvgIdCode[EfficiencyLevel.High] = '#buffer-high';
bufferSvgIdCode[undefined] = '#buffer-not-available';
bufferSvgIdCode[null] = '#buffer-not-available';

export default class Buffer extends ShapeBase {
    constructor(label, efficiencyLevel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get width() { return 54; }
    get height() { return 55.49; }

    Render(){
        const group =
        d3
        .select('#canvas')
        .append("g");

        group
        .append('use')
        .attr('href', bufferSvgIdCode[this.efficiencyLevel])
        .attr('width', '54')
        .attr('height', '55.49')
        .attr('x', this.x)
        .attr('y', this.y);

        const label =
        group
        .append('text')
        .attr('x', this.x + 5)
        .attr('y', this.y + 48)
        .text(this.label)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '10px')
        .attr('fill', 'white');
    }
}
