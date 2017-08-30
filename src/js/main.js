import ModelManager from './plv/model/ModelManager.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToColumnPartitionsForVisualization from './plv/visualisation/fromProductionModelToColumnPartitionsForVisualization.js';
import getNormalizedPartitions from './plv/visualisation/getNormalizedPartitions.js';
import renderGradients from './plv/util/renderGradients.js';
import transposeMatrix from './plv/util/transposeMatrix.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import applyLayout from './plv/visualisation/applyLayout.js';
import renderLinks from './plv/visualisation/renderLinks.js';
import mapEntityPartitionsToShapePartitions from './plv/visualisation/mapEntityPartitionsToShapePartitions.js';
import renderShapes from './plv/visualisation/renderShapes.js';

import StationShape from './plv/visualisation/shapes/domain/Station.js';
import SourceShape from './plv/visualisation/shapes/domain/Source.js';
import DrainShape from './plv/visualisation/shapes/domain/Drain.js';
import BufferShape from './plv/visualisation/shapes/domain/Buffer.js';

window.onload = function(){
    (function loadExternalImages(){
        const svgSymbolFilenames =
            ['station-low',
             'station-medium',
             'station-high',
             'station-not-available',
             'buffer-low',
             'buffer-medium',
             'buffer-high',
             'buffer-not-available'];
        loadSvgImage(...svgSymbolFilenames);
     })();

    const canvas =
        d3.select('body')
        .append('svg')
        .attr('id', 'canvas')
        .attr('width', 2000)
        .attr('height', 600);

    const options = {
        alignToOtherElementsInTheSameColumn: ['left', 'center'][1],
        verticalDistributionToCanvas: ['top', 'center'][1],
        windowMarginLeft: 50,
        windowMarginTop: 50,
        elementMarginTop: 80,
        elementMarginRight: 85,
        maxFlowWidth: 46,
        entityToShapeMap: {
            'Buffer':  entity => new BufferShape(entity.id, entity.label, entity.efficiencyLevel),
            'Drain':   entity => new DrainShape(entity.id),
            'Source':  entity => new SourceShape(entity.id),
            'Station': entity => new StationShape(entity.id, entity.label, entity.efficiencyLevel, entity.efficiencyRelativeAmountLabel),
        }
    };

    const productionLine = generateDummyProductionLine();
    productionLine.IsValid();
    const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(productionLine);
    const transposedColumnPartitions = transposeMatrix(columnPartitions);
    let columnPartitionsWithShapes = mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options);
    columnPartitionsWithShapes = getNormalizedPartitions(columnPartitionsWithShapes, productionLine);
    applyLayout(options, columnPartitionsWithShapes);
    renderLinks(productionLine, columnPartitionsWithShapes, canvas, options);
    renderGradients(canvas);
    renderShapes(columnPartitionsWithShapes, canvas);
}
