import ShapeBase from '../ShapeBase.js'
import EfficiencyLevel from '../../../model/EfficiencyLevel.js';

const stationSvgIdCode = {};
stationSvgIdCode[EfficiencyLevel.Low] = '#station-low';
stationSvgIdCode[EfficiencyLevel.Medium] = '#station-medium';
stationSvgIdCode[EfficiencyLevel.High] = '#station-high';
stationSvgIdCode[undefined] = '#station-not-available';
stationSvgIdCode[null] = '#station-not-available';

export default class Station extends ShapeBase {
    constructor(id, label, efficiencyLevel, efficiencyRelativeAmountLabel){
        super(id, 75, 68.05);
        this._label = label;
        this._efficiencyLevel = efficiencyLevel;
        this._efficiencyRelativeAmountLabel = efficiencyRelativeAmountLabel;
    }

    get label() { return this._label; }
    get efficiencyLevel() { return this._efficiencyLevel; }
    get efficiencyRelativeAmountLabel() { return this._efficiencyRelativeAmountLabel; }

    Render(){
        const group =
            d3
            .select('#canvas')
            .append("g");

        group
            .append('use')
            .attr('href', stationSvgIdCode[this.efficiencyLevel])
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('x', this.x)
            .attr('y', this.y);

        const label =
            group
            .append('text')
            .attr('x', this.x + 5)
            .attr('y', this.y + 49)
            .text(this.label || 'N/A')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '10px')
            .attr('fill', 'white');

        const efficiencyRelativeAmountLabel =
            group
            .append('text')
            .attr('x', this.x + 5)
            .attr('y', this.y + 62)
            .text(this.efficiencyRelativeAmountLabel || 'N/A')
            .attr('font-family', 'sans-serif')
            .attr('font-size', '11px')
            .attr('fill', 'white');
    }
}
