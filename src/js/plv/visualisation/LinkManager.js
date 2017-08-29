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

    function* yPositionGenerator(groupOfLinksWithCommonSideOfVertex, shapeBounds, totalFlowWidth){
        let y =  shapeBounds.y1 + (shapeBounds.y2 - shapeBounds.y1 - totalFlowWidth) / 2;
        for(let edge of groupOfLinksWithCommonSideOfVertex){
            const currentFlowWidth = edge.intensity * MAX_FLOW_WIDTH;
            yield y + currentFlowWidth / 2;
            y = y + currentFlowWidth;
        }
    }
    function* leftSidePositionForFlowsGenerator(groupOfLinksWithCommonLeftVertex, fromShapeBounds, totalFlowWidth){
        const yGenerator = yPositionGenerator(groupOfLinksWithCommonLeftVertex, fromShapeBounds, totalFlowWidth);
        for(let edge of groupOfLinksWithCommonLeftVertex){
            const x = fromShapeBounds.x2;
            const y = yGenerator.next().value;
            yield {
                id: edge.id,
                from_X: x,
                from_Y: y,
            };
        }
    };
    function* rightSidePositionForFlowsGenerator(groupOfLinksWithCommonRightVertex, toShapeBounds, totalFlowWidth){
        const yGenerator = yPositionGenerator(groupOfLinksWithCommonRightVertex, toShapeBounds, totalFlowWidth);
        for(let edge of groupOfLinksWithCommonRightVertex){
            const x = toShapeBounds.x1;
            const y = yGenerator.next().value;
            yield {
                id: edge.id,
                to_X: x,
                to_Y: y,
            };
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
            const groupOfLinksWithCommonLeftVertex = linksGroupedByLeftVertex[vertexId];
            const totalFlowWidth = groupOfLinksWithCommonLeftVertex.reduce((aggregate, edge) => edge.intensity * MAX_FLOW_WIDTH + aggregate, 0);
            const fromShapeBounds = findShapeById(vertexId).GetBoundingBox();
            return [...leftSidePositionForFlowsGenerator(groupOfLinksWithCommonLeftVertex, fromShapeBounds, totalFlowWidth)];
        })
        .flatten()
        .value();

    const linksGroupedByRightVertex = _.groupBy(productionLine.edges, edge => edge.to.id);
    const rightSidePositionForFlows =
        _(getUniqVertexIdsByLinkHandSide('right'))
        .map(function(vertexId){
            const groupOfLinksWithCommonRightVertex = linksGroupedByRightVertex[vertexId];
            const totalFlowWidth = groupOfLinksWithCommonRightVertex.reduce((aggregate, edge) => edge.intensity * MAX_FLOW_WIDTH + aggregate, 0);
            const toShapeBounds = findShapeById(vertexId).GetBoundingBox();
            return [...rightSidePositionForFlowsGenerator(groupOfLinksWithCommonRightVertex, toShapeBounds, totalFlowWidth)];
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
                distanceBetweenBounds: rightPosition.to_X - leftPosition.from_X,

                ...leftPosition,
                ...rightPosition,
                from_efficiencyLevel: edge.from.efficiencyLevel,
                to_efficiencyLevel: edge.to.efficiencyLevel,
            };
        }
    })();

    (function render(){
        for(let edgeData of [...linkDescriptionGenerator]){
            const lengthOfStraightPart = edgeData.distanceBetweenBounds * 0.20;
            const lineData = [
                { x: edgeData.from_X,                        y: edgeData.from_Y },
                { x: edgeData.from_X + lengthOfStraightPart, y: edgeData.from_Y },
                { x: edgeData.to_X   - lengthOfStraightPart, y: edgeData.to_Y },
                { x: edgeData.to_X,                          y: edgeData.to_Y }
            ];

            const flowGroup =
                canvas
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
    })();
}
