import StationShape from '../visualisation/shapes/Station.js';
import Source from '../visualisation/shapes/Source.js';
import Drain from '../visualisation/shapes/Drain.js';
import Buffer from '../visualisation/shapes/Buffer.js';
import EfficiencyLevel from '../EfficiencyLevel.js';

const colorCodeForLevel = {};
colorCodeForLevel[EfficiencyLevel.Low] = '#F60A20';
colorCodeForLevel[EfficiencyLevel.Medium] = '#FF7F00';
colorCodeForLevel[EfficiencyLevel.High] = '#8fb239';
colorCodeForLevel[undefined] = 'gray';
colorCodeForLevel[null] = 'gray';

export default function(productionLine, layoutedShapes, canvas){
    const findShapeById = (function(){
        const allShapes =
            layoutedShapes.reduce(
                (aggregate, current) =>
                    current !== null
                    ? aggregate.concat(current)
                    : aggregate
                , []);
        return function(id){
            return allShapes.filter(shape => !!shape).find(shape => shape.id === id);
        }
    })();
    const lineFunction =
        d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveBasis);

    function getMiddleY(shapeBounds){
        return shapeBounds.y2 - (shapeBounds.y2 - shapeBounds.y1)/2
    }
    for(let fromVertex of productionLine.verteces){
        for(let toVertex of fromVertex.flowsTo){
            const fromShapeBounds = findShapeById(fromVertex.id).GetBoundingBox();
            const toShapeBounds = findShapeById(toVertex.id).GetBoundingBox();
            const distanceBetweenBounds = toShapeBounds.x1 - fromShapeBounds.x2;

            var lineData = [
                { x: fromShapeBounds.x2, y: getMiddleY(fromShapeBounds) },
                { x: fromShapeBounds.x2 + distanceBetweenBounds * 0.20, y: getMiddleY(fromShapeBounds) },
                { x: toShapeBounds.x1 - distanceBetweenBounds * 0.20, y: getMiddleY(toShapeBounds)},
                { x: toShapeBounds.x1, y: getMiddleY(toShapeBounds)}
            ];

            const flowGroup = canvas
                .append('g')
                .attr('class', 'flowGroup');

            flowGroup
                .append('path')
                .attr('d', lineFunction(lineData))
                .attr('class', 'flow')
                .attr("stroke", "gray")
                .attr("stroke-width", 25)
                .attr('data-gradient-start', colorCodeForLevel[fromVertex.efficiencyLevel])
                .attr('data-gradient-end', colorCodeForLevel[toVertex.efficiencyLevel])
                .attr("fill", "none");
        }
    }
}
