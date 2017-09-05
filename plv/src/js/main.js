import EfficiencyLevel from './plv/model/EfficiencyLevel.js';
import EntityBase from './plv/model/EntityBase.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import ModelManager from './plv/model/ModelManager.js';
import renderModel from './plv/visualisation/renderModel.js';
import ShapeBase from './plv/visualisation/shapes/ShapeBase.js';

(function(global) {
    const module = {
        EfficiencyLevel,
        EntityBase,
        loadSvgImage,
        ModelManager,
        renderModel,
        ShapeBase,
    };

    global.plv = global.plv || module;
})(typeof window === 'undefined' ? this : window);
