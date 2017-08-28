import StationShape from '../visualisation/shapes/domain/Station.js';
import Source from '../visualisation/shapes/domain/Source.js';
import Drain from '../visualisation/shapes/domain/Drain.js';
import Buffer from '../visualisation/shapes/domain/Buffer.js';
import EfficiencyLevel from './../model/EfficiencyLevel.js';

const colorCodeForLevel = {};
colorCodeForLevel[EfficiencyLevel.Low] = '#F60A20';
colorCodeForLevel[EfficiencyLevel.Medium] = '#FF7F00';
colorCodeForLevel[EfficiencyLevel.High] = '#8fb239';
colorCodeForLevel[undefined] = 'gray';
colorCodeForLevel[null] = 'gray';

export default function(productionLine, layoutedShapes, canvas){
    const findShapeById = (function(){
        const allShapes =
            layoutedShapes
            .reduce(
                (aggregate, current) => !!current ? aggregate.concat(current) : aggregate,
                []
            )
            .filter(shape => !!shape);
        return (id) => allShapes.find(shape => shape.id === id);
    })();

    const lineFunction =
        d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveBasis);

    function getMiddleY(shapeBounds){
        return shapeBounds.y2 - (shapeBounds.y2 - shapeBounds.y1)/2;
    }

    for(let edge of productionLine.edges){
        const fromShapeBounds = findShapeById(edge.from.id).GetBoundingBox();
        const toShapeBounds = findShapeById(edge.to.id).GetBoundingBox();
        const distanceBetweenBounds = toShapeBounds.x1 - fromShapeBounds.x2;

        var lineData = [
            { x: fromShapeBounds.x2,                                y: getMiddleY(fromShapeBounds) },
            { x: fromShapeBounds.x2 + distanceBetweenBounds * 0.20, y: getMiddleY(fromShapeBounds) },
            { x: toShapeBounds.x1   - distanceBetweenBounds * 0.20, y: getMiddleY(toShapeBounds) },
            { x: toShapeBounds.x1,                                  y: getMiddleY(toShapeBounds) }
        ];

        const flowGroup = canvas
            .append('g')
            .attr('class', 'flowGroup');

        flowGroup
            .append('path')
            .attr('d', lineFunction(lineData))
            .attr('class', 'flow')
            .attr('data-gradient-start', colorCodeForLevel[edge.from.efficiencyLevel])
            .attr('data-gradient-end', colorCodeForLevel[edge.to.efficiencyLevel])
            .attr('data-intensity', edge.intensity || 0)
            // Not really important since it's going to be replaced by renderGradient metohd.
            .attr('stroke', 'gray')
            .attr('stroke-width', 10)
            .attr('fill', 'none');
    }
}
