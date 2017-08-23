import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import renderGradients from './plv/util/renderGradients.js';
import LayoutManager from './plv/visualisation/LayoutManager.js';
import LinkManager from './plv/visualisation/LinkManager.js';

import StationShape from './plv/visualisation/shapes/domain/Station.js';
import Source from './plv/visualisation/shapes/domain/Source.js';
import Drain from './plv/visualisation/shapes/domain/Drain.js';
import Buffer from './plv/visualisation/shapes/domain/Buffer.js';

function loadSvgImage(filename){
    d3
    .xml(`./src/images/${filename}.svg`)
    .mimeType("image/svg+xml")
    .get(function(error, xml) {
        if (error) throw error;
        document.body.appendChild(xml.documentElement);
    });
}

window.onload = function(){
    (function loadExternalImages(){
        var stationSvgSymbols = ['station-low', 'station-medium',  'station-high', 'station-not-available'];
        for(let svgSymbol of stationSvgSymbols){
            loadSvgImage(svgSymbol);
        }

        var bufferSvgSymbols = ['buffer-low', 'buffer-medium',  'buffer-high', 'buffer-not-available'];
        for(let svgSymbol of bufferSvgSymbols){
            loadSvgImage(svgSymbol);
        }
     })();

    const canvas =
        d3.select("body")
        .append("svg")
        .attr("id", 'canvas')
        .attr("width", 1800)
        .attr("height", 1000);

    var options = {
        alignToOtherElementsInTheSameColumn: ['left', 'center'][1],
        verticalDistributionToCanvas: ['top', 'center'][1],
        windowMarginLeft: 50,
        windowMarginTop: 50,
        elementMarginTop: 80,
        elementMarginRight: 85
    };

    const productionLine = generateDummyProductionLine();
    const source = productionLine.source;
    const columnPartitions = fromProductionModelToVisualisationModel(productionLine);
    const transposedColumnPartitions = transposeMatrix(columnPartitions);
    const entityToShapeMap = {
        'Buffer':  element => new Buffer(element.id, element.label, element.efficiencyLevel),
        'Drain':   element => new Drain(element.id),
        'Source':  element => new Source(element.id),
        'Station': element => new StationShape(element.id, element.label, element.efficiencyLevel, element.efficiencyRelativeAmountLabel),
    };
    const columnPartitionsWithShapes =
        transposedColumnPartitions.map(
            column => column.map(
                element =>
                    !!element
                    ? entityToShapeMap[element.constructor.name](element)
                    : null
            )
        );

    const layoutedShapes = LayoutManager(options, columnPartitionsWithShapes);

    LinkManager(productionLine, layoutedShapes, canvas);
    renderGradients(canvas);

    for(let row of layoutedShapes){
        for(let element of row){
            element && element.Render(canvas);
        }
    }
}

// Takes matrix of dimensions m x n and transposes it to new matrix of dimensions n x m
// n - number of rows of initial matrix
// m - number of columns of initial matrix
function transposeMatrix(originalMatrix){
    if(!originalMatrix || !originalMatrix.length)
        return [];

    const originalRowCount = originalMatrix.length;
    const originalColumnCount = Math.max(...originalMatrix.map(row => row.length));

    const newMatrix = [];
    for(let rowIndex = 0; rowIndex < originalRowCount; rowIndex++){
        for(let columnIndex = 0; columnIndex < originalColumnCount; columnIndex++){
            newMatrix[columnIndex] = newMatrix[columnIndex] || [];
            newMatrix[columnIndex][rowIndex] = originalMatrix[rowIndex][columnIndex] || null;
        }
    }
    return newMatrix;
}
