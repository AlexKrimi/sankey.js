import ModelManager from './plv/model/ModelManager.js';
import loadSvgImage from './plv/util/loadSvgImage.js';
import renderModel from './plv/visualisation/renderModel.js';
import EfficiencyLevel from './plv/model/EfficiencyLevel.js';
import EntityBase from './plv/model/EntityBase.js';
import ShapeBase from './plv/visualisation/shapes/ShapeBase.js';

(function(global) {
    const module = {
        ModelManager,
        EntityBase,
        ShapeBase,
        EfficiencyLevel,
        loadSvgImage,
        renderModel
    };

    global.plv = global.plv || module;
})(typeof window === 'undefined' ? this : window);
