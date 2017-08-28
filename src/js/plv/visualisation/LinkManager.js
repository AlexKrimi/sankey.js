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
        return shapeBounds.y2 - (shapeBounds.y2 - shapeBounds.y1) / 2;
    }

    const MAX_WIDTH_OF_FLOW_LINE = 46;

    const leftLinkUniqId =
        _(productionLine.edges)
        .map(edge => edge.from.id)
        .uniq()
        .value();

    const leftLinkLocation = _.groupBy(productionLine.edges, edge => edge.from.id);

    const left = leftLinkUniqId
        .map(function(key){

            var leftEdgeGroup = leftLinkLocation[key];
            const newEdges = [];
            const totalHeight = leftEdgeGroup.reduce((aggregate, edge) => edge.intensity * MAX_WIDTH_OF_FLOW_LINE + aggregate, 0);
            const shape = findShapeById(leftEdgeGroup[0].from.id);
            const fromShapeBounds = shape.GetBoundingBox();
            const fromShapeMaxHeight = fromShapeBounds.y2 - fromShapeBounds.y1;

            var accumulatedY = fromShapeBounds.y1 + (fromShapeBounds.y2 - fromShapeBounds.y1 - totalHeight) / 2 ;

            for(let edge of leftEdgeGroup){
                const x = fromShapeBounds.x2;
                const y = accumulatedY + edge.intensity * MAX_WIDTH_OF_FLOW_LINE / 2;
                newEdges.push({
                    id: edge.id,
                    from_X: x,
                    from_Y: y,
                });
                accumulatedY = accumulatedY + edge.intensity * MAX_WIDTH_OF_FLOW_LINE;
            }

            return newEdges;
        });

    const toLinkUniqId =
        _(productionLine.edges)
        .map(edge => edge.to.id)
        .uniq()
        .value();

    const rightLinkLocation =
        _.groupBy(productionLine.edges, edge => edge.to.id);

    const right =
        toLinkUniqId
        .map(function(key){
            var rightEdgeGroup = rightLinkLocation[key];
            const newEdges = [];
            const totalHeight = rightEdgeGroup.reduce((aggregate, edge) => edge.intensity * MAX_WIDTH_OF_FLOW_LINE + aggregate, 0);
            const shape = findShapeById(rightEdgeGroup[0].to.id);
            const toShapeBounds = shape.GetBoundingBox();
            const toShapeMaxHeight = toShapeBounds.y2 - toShapeBounds.y1;
            var accumulatedY =  toShapeBounds.y1 + (toShapeBounds.y2 - toShapeBounds.y1 - totalHeight) / 2 ;

            for(let edge of rightEdgeGroup){
                const x = toShapeBounds.x1;
                const y = accumulatedY + edge.intensity * MAX_WIDTH_OF_FLOW_LINE / 2;
                newEdges.push({
                    id: edge.id,
                    to_X: x,
                    to_Y: y,
                });
                accumulatedY = accumulatedY + edge.intensity * MAX_WIDTH_OF_FLOW_LINE;
            }

            return newEdges;;
        });

    var flatenedLeft = _.flatten(left);
    var flatenedRight = _.flatten(right);

    var merge = [];
    for(var leftObj of flatenedLeft){
        var rightObj = flatenedRight.find(x => x.id === leftObj.id);
        var edge = productionLine.edges.find(x => x.id === leftObj.id);
        var mergedObj = {
            id: leftObj.id,
            intensity: edge.intensity,
            distanceBetweenBounds: rightObj.to_X - leftObj.from_X,
            width: edge.intensity * MAX_WIDTH_OF_FLOW_LINE,

            from_X: leftObj.from_X,
            from_Y: leftObj.from_Y,
            from_efficiencyLevel: edge.from.efficiencyLevel,

            to_X: rightObj.to_X,
            to_Y: rightObj.to_Y,
            to_efficiencyLevel: edge.to.efficiencyLevel,
        };
        merge.push(mergedObj);
    }

    for(let edgeData of merge){
        var lineData = [
            { x: edgeData.from_X,                                         y: edgeData.from_Y },
            { x: edgeData.from_X + edgeData.distanceBetweenBounds * 0.20, y: edgeData.from_Y },
            { x: edgeData.to_X   - edgeData.distanceBetweenBounds * 0.20, y: edgeData.to_Y },
            { x: edgeData.to_X,                                           y: edgeData.to_Y }
        ];

        const flowGroup = canvas
            .append('g')
            .attr('class', 'flowGroup');

        flowGroup
            .append('path')
            .attr('d', lineFunction(lineData))
            .attr('class', 'flow')
            .attr('data-gradient-start', colorCodeForLevel[edgeData.from_efficiencyLevel])
            .attr('data-gradient-end', colorCodeForLevel[edgeData.to_efficiencyLevel])
            .attr('data-intensity', edgeData.intensity || 0)
            .attr('data-width', edgeData.width || 0)
            // Not really important since it's going to be replaced by renderGradient metohd.
            .attr('stroke', 'gray')
            .attr('stroke-width', 10)
            .attr('fill', 'none');
    }
}
