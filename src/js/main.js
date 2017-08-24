import EfficiencyLevel from './plv/model/EfficiencyLevel.js';
import ModelManager from './plv/model/ModelManager.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import renderGradients from './plv/util/renderGradients.js';
import transposeMatrix from './plv/util/transposeMatrix.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import LayoutManager from './plv/visualisation/LayoutManager.js';
import LinkManager from './plv/visualisation/LinkManager.js';

import StationShape from './plv/visualisation/shapes/domain/Station.js';
import SourceShape from './plv/visualisation/shapes/domain/Source.js';
import DrainShape from './plv/visualisation/shapes/domain/Drain.js';
import BufferShape from './plv/visualisation/shapes/domain/Buffer.js';
import ImaginaryShape from './plv/visualisation/shapes/ImaginaryShape.js';

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
    };

    const productionLine = generateDummyProductionLine();
    const source = productionLine.source;
    const columnPartitions = fromProductionModelToVisualisationModel(productionLine);
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

    columnPartitionsWithShapes = (function normalize(columnPartitionsWithShapes, productionLine){
        const normalizedLayout = [];
        const numberOfRows = columnPartitionsWithShapes.length;
        const numberOfColumns = columnPartitionsWithShapes[0].length;
        const getColumnIndexByVertexId = function(matrix, id){
            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
                    const element = matrix[rowIndex][columnIndex];
                    if(element && element.id === id)
                        return columnIndex;
                }
            }
            return -1;
        }
        const hasVertecesPointingToItFromSameColumn = function(matrix, vertex, columnIndex){
            const flowsFrom = vertex.flowsFrom;
            return flowsFrom.some(
                element =>
                    !!element
                    ? getColumnIndexByVertexId(matrix, element.id) === columnIndex
                    : false
            );
        }
        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            const firstColumn = [];
            const secondColumn = [];
            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                const currentShape = columnPartitionsWithShapes[rowIndex][columnIndex];
                if(currentShape === null){
                    firstColumn.push(null);
                    secondColumn.push(null);
                    continue;
                }
                const currentVertex = productionLine.Get(currentShape.id);

                if(hasVertecesPointingToItFromSameColumn(columnPartitionsWithShapes, currentVertex, columnIndex)){
                    firstColumn.push(new ImaginaryShape(currentShape.width, currentShape.height));
                    secondColumn.push(currentShape);
                } else {
                    firstColumn.push(currentShape);
                    secondColumn.push(new ImaginaryShape(currentShape.width, currentShape.height));
                }
            }
            const secondColumnShouldBeAdded = secondColumn.some(x => !!x && x.id !== ImaginaryShape.Id);

            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                normalizedLayout[rowIndex] = normalizedLayout[rowIndex] || [];
                normalizedLayout[rowIndex].push(firstColumn[rowIndex]);
                if(secondColumnShouldBeAdded)
                    normalizedLayout[rowIndex].push(secondColumn[rowIndex]);
            }
        }
        return normalizedLayout;
    })(columnPartitionsWithShapes, productionLine);

    const layoutedShapes = LayoutManager(options, columnPartitionsWithShapes);

    LinkManager(productionLine, layoutedShapes, canvas);
    renderGradients(canvas);

    for(let row of layoutedShapes){
        for(let element of row){
            element && element.Render(canvas);
        }
    }
}
