import fromProductionModelToColumnPartitionsForVisualization from './fromProductionModelToColumnPartitionsForVisualization.js';
import transposeMatrix from '../util/transposeMatrix.js';
import mapEntityPartitionsToShapePartitions from './mapEntityPartitionsToShapePartitions.js';
import getNormalizedPartitions from './getNormalizedPartitions.js';
import applyLayout from '../visualisation/applyLayout.js';
import renderLinks from './renderLinks.js';
import renderGradients from '../util/renderGradients.js';
import renderShapes from '../visualisation/renderShapes.js';

export default function renderModel(productionLineModel, canvas, options){
    productionLineModel.IsValid();
    const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(productionLineModel);
    const transposedColumnPartitions = transposeMatrix(columnPartitions);
    let columnPartitionsWithShapes = mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options);
    columnPartitionsWithShapes = getNormalizedPartitions(columnPartitionsWithShapes, productionLineModel);
    applyLayout(options, columnPartitionsWithShapes);
    renderLinks(productionLineModel, columnPartitionsWithShapes, canvas, options);

    if(!options.links.color)
        renderGradients(canvas);

    renderShapes(columnPartitionsWithShapes, canvas);
}
