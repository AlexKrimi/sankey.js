import StationShape from '../visualisation/shapes/domain/Station.js';
import Source from '../visualisation/shapes/domain/Source.js';
import Drain from '../visualisation/shapes/domain/Drain.js';
import Buffer from '../visualisation/shapes/domain/Buffer.js';
import EfficiencyLevel from './../model/EfficiencyLevel.js';

const colorCodeForLevel = {
    [EfficiencyLevel.Low]:    '#F60A20',
    [EfficiencyLevel.Medium]: '#FF7F00',
    [EfficiencyLevel.High]:   '#8fb239',
    [undefined]:              'gray',
    [null]:                   'gray'
};

const lineFunction =
    d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .curve(d3.curveBasis);

const MAX_FLOW_WIDTH = 46;

export default function(productionLine, layoutedShapes, canvas){
    function getUniqVertexIdsByLinkHandSide(side){
        const possibleSides = ['left', 'right'];
        if(!possibleSides.includes(side))
            throw new Error(`Expected 'left' or 'right' for side instead of ${side}`);

        const edgeSide = ({
            left: 'from',
            right: 'to'
        })[side];

        return _(productionLine.edges)
            .map(edge => edge[edgeSide].id)
            .uniq()
            .value();
    }

    function* xPositionGenerator(groupOfLinksWithCommonSideOfVertex, shapeBounds, side){
        const possibleSides = ['left', 'right'];
        if(!possibleSides.includes(side))
            throw new Error(`Expected 'left' or 'right' for side instead of ${side}`);

        const x =
            side === 'left'
            ? shapeBounds.x2
            : shapeBounds.x1;

        for(let edge of groupOfLinksWithCommonSideOfVertex){
            yield x;
        }
    }
    function* yPositionGenerator(groupOfLinksWithCommonSideOfVertex, shapeBounds, totalFlowWidth){
        let y =  shapeBounds.y1 + (shapeBounds.y2 - shapeBounds.y1 - totalFlowWidth) / 2;
        for(let edge of groupOfLinksWithCommonSideOfVertex){
            const currentFlowWidth = edge.intensity * MAX_FLOW_WIDTH;
            yield y + currentFlowWidth / 2;
            y = y + currentFlowWidth;
        }
    }

    function* positionForFlowsGenerator(groupOfLinksWithCommonLeftVertex, xGenerator, yGenerator){
        for(let edge of groupOfLinksWithCommonLeftVertex){
            const x = xGenerator.next();
            const y = yGenerator.next();
            const isDone = x.done || y.done;
            const position = {
                id: edge.id,
                x: x.value,
                y: y.value,
            };

            if(isDone)
                return position;
            else
                yield position;
        }
    };

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

    const linksGroupedByLeftVertex = _.groupBy(productionLine.edges, edge => edge.from.id);
    const leftSidePositionForFlows =
        _(getUniqVertexIdsByLinkHandSide('left'))
        .map(function(vertexId){
            const groupOfLinksWithCommonSideOfVertex = linksGroupedByLeftVertex[vertexId];
            const totalFlowWidth = groupOfLinksWithCommonSideOfVertex.reduce((aggregate, edge) => edge.intensity * MAX_FLOW_WIDTH + aggregate, 0);
            const fromShapeBounds = findShapeById(vertexId).GetBoundingBox();
            const xGenerator = xPositionGenerator(groupOfLinksWithCommonSideOfVertex, fromShapeBounds, 'left');
            const yGenerator = yPositionGenerator(groupOfLinksWithCommonSideOfVertex, fromShapeBounds, totalFlowWidth);
            return [...positionForFlowsGenerator(groupOfLinksWithCommonSideOfVertex, xGenerator, yGenerator)];
        })
        .flatten()
        .value();

    const linksGroupedByRightVertex = _.groupBy(productionLine.edges, edge => edge.to.id);
    const rightSidePositionForFlows =
        _(getUniqVertexIdsByLinkHandSide('right'))
        .map(function(vertexId){
            const groupOfLinksWithCommonSideOfVertex = linksGroupedByRightVertex[vertexId];
            const totalFlowWidth = groupOfLinksWithCommonSideOfVertex.reduce((aggregate, edge) => edge.intensity * MAX_FLOW_WIDTH + aggregate, 0);
            const toShapeBounds = findShapeById(vertexId).GetBoundingBox();
            const xGenerator = xPositionGenerator(groupOfLinksWithCommonSideOfVertex, toShapeBounds, 'right');
            const yGenerator = yPositionGenerator(groupOfLinksWithCommonSideOfVertex, toShapeBounds, totalFlowWidth);
            return [...positionForFlowsGenerator(groupOfLinksWithCommonSideOfVertex, xGenerator, yGenerator)];
        })
        .flatten()
        .value();

    const linkDescriptionGenerator = (function* (){
        for(let edge of productionLine.edges){
            const leftPosition = leftSidePositionForFlows.find(x => x.id === edge.id);
            const rightPosition = rightSidePositionForFlows.find(x => x.id === edge.id);
            yield {
                id: edge.id,
                intensity: edge.intensity,
                width: edge.intensity * MAX_FLOW_WIDTH,
                distanceBetweenBounds: rightPosition.x - leftPosition.x,

                from:{
                    ...leftPosition,
                    efficiencyLevel: edge.from.efficiencyLevel
                },
                to: {
                    ...rightPosition,
                    efficiencyLevel: edge.to.efficiencyLevel,
                }
            };
        }
    })();

    (function render(){
        for(let edgeData of [...linkDescriptionGenerator]){
            const lengthOfStraightPart = edgeData.distanceBetweenBounds * 0.20;
            //debugger;
            const lineData = [
                { x: edgeData.from.x,                        y: edgeData.from.y },
                { x: edgeData.from.x + lengthOfStraightPart, y: edgeData.from.y },
                { x: edgeData.to.x   - lengthOfStraightPart, y: edgeData.to.y },
                { x: edgeData.to.x,                          y: edgeData.to.y }
            ];

            const flowGroup =
                canvas
                .append('g')
                .attr('class', 'flowGroup');

            flowGroup
                .append('path')
                .attr('d', lineFunction(lineData))
                .attr('class', 'flow')
                .attr('data-gradient-start', colorCodeForLevel[edgeData.from.efficiencyLevel])
                .attr('data-gradient-end', colorCodeForLevel[edgeData.to.efficiencyLevel])
                .attr('data-intensity', edgeData.intensity || 0)
                .attr('data-width', edgeData.width || 0)
                // Not really important since it's going to be replaced by renderGradient metohd.
                .attr('stroke', 'gray')
                .attr('stroke-width', 10)
                .attr('fill', 'none');
        }
    })();
}
