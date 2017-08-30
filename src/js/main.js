import ModelManager from './plv/model/ModelManager.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToColumnPartitionsForVisualization from './plv/visualisation/fromProductionModelToColumnPartitionsForVisualization.js';
import normalizePartitions from './plv/visualisation/normalizePartitions.js';
import renderGradients from './plv/util/renderGradients.js';
import transposeMatrix from './plv/util/transposeMatrix.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import LayoutManager from './plv/visualisation/LayoutManager.js';
import renderLinks from './plv/visualisation/renderLinks.js';

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
        maxFlowWidth: 46
    };

    const productionLine = generateDummyProductionLine();
    productionLine.IsValid();
    const source = productionLine.source;
    const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(productionLine);
    const transposedColumnPartitions = transposeMatrix(columnPartitions);
    const entityToShapeMap = {
        'Buffer':  element => new BufferShape(element.id, element.label, element.efficiencyLevel),
        'Drain':   element => new DrainShape(element.id),
        'Source':  element => new SourceShape(element.id),
        'Station': element => new StationShape(element.id, element.label, element.efficiencyLevel, element.efficiencyRelativeAmountLabel),
    };
    let columnPartitionsWithShapes =
        transposedColumnPartitions.map(
            column => column.map(
                element =>
                    !!element
                    ? entityToShapeMap[element.constructor.name](element)
                    : null
            )
        );
    columnPartitionsWithShapes = normalizePartitions(columnPartitionsWithShapes, productionLine);

    const layoutedShapes = LayoutManager(options, columnPartitionsWithShapes);

    renderLinks(productionLine, layoutedShapes, canvas, options);
    renderGradients(canvas);

    for(let row of layoutedShapes){
        for(let element of row){
            element && element.Render(canvas);
        }
    }
}
