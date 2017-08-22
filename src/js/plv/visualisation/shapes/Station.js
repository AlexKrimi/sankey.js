import ShapeBase from './ShapeBase.js'
import EfficiencyLevel from '../../EfficiencyLevel.js';

const stationSvgIdCode = {};
stationSvgIdCode[EfficiencyLevel.Low] = '#station-low';
stationSvgIdCode[EfficiencyLevel.Medium] = '#station-medium';
stationSvgIdCode[EfficiencyLevel.High] = '#station-high';
stationSvgIdCode[undefined] = '#station-not-available';
stationSvgIdCode[null] = '#station-not-available';

export default class Station extends ShapeBase {
    constructor(label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super();
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }
    get width() { return 75; }
    get height() { return 68.05; }

    Render(){
        const group =
        d3
        .select('#canvas')
        .append("g");

        group
        .append('use')
        .attr('href', stationSvgIdCode[this.efficiencyLevel])
        .attr('width', '75')
        .attr('height', '68.05')
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

        const efficiencyRelativeAmountLabel =
        group
        .append('text')
        .attr('x', this.x + 5)
        .attr('y', this.y + 61)
        .text(this.efficiencyRelativeAmountLabel)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'white');
    }
}
