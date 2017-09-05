import ModelManager from './plv/model/ModelManager.js';
import fromProductionModelToColumnPartitionsForVisualization from './plv/visualisation/fromProductionModelToColumnPartitionsForVisualization.js';
import getNormalizedPartitions from './plv/visualisation/getNormalizedPartitions.js';
import renderGradients from './plv/util/renderGradients.js';
import transposeMatrix from './plv/util/transposeMatrix.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import applyLayout from './plv/visualisation/applyLayout.js';
import renderLinks from './plv/visualisation/renderLinks.js';
import mapEntityPartitionsToShapePartitions from './plv/visualisation/mapEntityPartitionsToShapePartitions.js';
import renderShapes from './plv/visualisation/renderShapes.js';
import EfficiencyLevel from './plv/model/EfficiencyLevel.js';
import EntityBase from './plv/model/EntityBase.js';
import ShapeBase from './plv/visualisation/shapes/ShapeBase.js';

(function(global) {
    'use strict';

    function render(productionLineModel, canvas, options){
        productionLineModel.IsValid();
        const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(productionLineModel);
        const transposedColumnPartitions = transposeMatrix(columnPartitions);
        let columnPartitionsWithShapes = mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options);
        columnPartitionsWithShapes = getNormalizedPartitions(columnPartitionsWithShapes, productionLineModel);
        applyLayout(options, columnPartitionsWithShapes);
        renderLinks(productionLineModel, columnPartitionsWithShapes, canvas, options);
        renderGradients(canvas);
        renderShapes(columnPartitionsWithShapes, canvas);
    }

    let module = {};

    module.ModelManager = ModelManager;
    module.EntityBase = EntityBase;
    module.ShapeBase = ShapeBase;
    module.EfficiencyLevel = EfficiencyLevel;
    module.loadSvgImage = loadSvgImage;
    module.render = render;

    global.plv = global.plv || module;
})(typeof window === 'undefined' ? this : window);
