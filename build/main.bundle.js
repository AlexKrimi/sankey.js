/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _applyDummyGraph = __webpack_require__(1);

var _applyDummyGraph2 = _interopRequireDefault(_applyDummyGraph);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (pieChart, applyDummyGraph) {
    window.onload = function () {
        main(document.getElementById('graphContainer'), applyDummyGraph);
    };
})(window.pieChart, _applyDummyGraph2.default);

function main(container, renderDummyGraph) {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
        return;
    }

    mxEvent.disableContextMenu(container);

    var graph = new mxGraph(container);
    graph.setPanning(true);
    graph.setAllowDanglingEdges(false);
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.connectionHandler.select = false;
    graph.view.setTranslate(20, 20);
    graph.container.style.backgroundColor = 'white';
    graph.setEnabled(false); // Makes the graph read-only
    graph.setCellsEditable(false); // Disables basic selection and cell handling

    var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);
    layout.intraCellSpacing = 60; // The spacing buffer added between cells on the same layer.  Default is 30.
    layout.interRankCellSpacing = 50; // The spacing buffer added between cell on adjacent layers.  Default is 50.
    layout.interHierarchySpacing = 100; // The spacing buffer between unconnected hierarchies.  Default is 60.
    layout.parallelEdgeSpacing = 100; // The distance between each parallel edge on each ranks for long edges.

    var parent = graph.getDefaultParent();

    var executeLayout = function executeLayout(change) {
        var model = graph.getModel();
        model.beginUpdate();
        try {
            if (change != null) change(graph, model, parent);

            layout.execute(graph.getDefaultParent());
        } catch (exception) {
            throw exception;
        } finally {
            graph.getModel().endUpdate();
        }
    };
    executeLayout(_applyDummyGraph2.default);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (graph, model, parent) {
    function createVertex(x, y, shapeDefinition) {
        return graph.insertVertex(parent, null, null, null, null, x, y, shapeDefinition);
    }
    function createStation(title, efficiencyLevel, efficiencyRelativeAmount) {
        var description = 'shape=mxgraph.custom.station;title=' + title + ';';
        description += !!efficiencyLevel ? 'efficiencyLevel=' + efficiencyLevel + ';' : '';
        description += !!efficiencyRelativeAmount ? 'efficiencyRelativeAmount=' + efficiencyRelativeAmount + ';' : '';
        return createVertex(75, 68.05, description);
    }
    function createCyclicStation(title, efficiencyLevel, efficiencyRelativeAmount) {
        var description = 'shape=mxgraph.custom.cyclicStation;title=' + title + ';';
        description += !!efficiencyLevel ? 'efficiencyLevel=' + efficiencyLevel + ';' : '';
        description += !!efficiencyRelativeAmount ? 'efficiencyRelativeAmount=' + efficiencyRelativeAmount + ';' : '';
        return createVertex(75, 95.25, description);
    }
    function createBuffer(title, efficiencyLevel) {
        return createVertex(54, 55.49, 'shape=mxgraph.custom.buffer;title=' + title + ';efficiencyLevel=' + efficiencyLevel + ';');
    }
    function createDivergentOrConvergent(title, efficiencyLevel) {
        return graph.insertVertex(parent, null, null, null, null, 1, 1);
    }
    var source = createVertex(30, 30, 'shape=mxgraph.custom.source;');
    var drain = createVertex(30, 30, 'shape=mxgraph.custom.drain;');

    var s1 = createStation('1STAR-0A', 'high;', '90%');
    var s2 = createStation('2STAR-06', 'high;', '90%');
    var s3 = createStation('3FA01', 'high;', '90%');
    var s4 = createStation('4FB02', 'high;', '90%');
    var s5 = createStation('5FC03', 'high;', '90%');
    var s6 = createStation('6FC04', 'high;', '90%');
    var s7 = createStation('7FD01', 'high;', '90%');
    var s8 = createCyclicStation('8KAR9605', 'moderate');
    var s9 = createStation('9MAN8695', 'high;');
    var s10 = createStation('10FRS', 'low;', '20%');
    var s11 = createStation('11QP-98', 'moderate;', '70%');
    var s12 = createStation('12QA', 'high;');
    var s13 = createStation('13FIN', 'high;', '90%');

    var buffer1 = createBuffer('3/12', 'high');
    var buffer2 = createBuffer('80%', 'low');
    var buffer3 = createBuffer('10%', 'moderate');

    var div1 = createDivergentOrConvergent();
    var conv1 = createDivergentOrConvergent();
    var div2 = createDivergentOrConvergent();
    var conv2 = createDivergentOrConvergent();

    [[source, s1], [s1, s2], [s2, buffer1], [buffer1, div1], [div1, s3], [s3, s4], [s4, div2], [div2, s5], [div2, s6], [s5, conv2], [s6, conv2], [conv2, s7], [div1, s8], [s8, buffer2], [buffer2, s9], [s9, s10], [s10, s11], [s7, conv1], [s11, conv1], [conv1, buffer3], [buffer3, s12], [s12, s13], [s13, drain],

    // Feedback loops
    [conv2, s3],
    //[s8, s8],
    [s13, s1]].forEach(function (edge) {
        graph.insertEdge(parent, null, '', edge[0], edge[1]);
    });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (mxUtils, mxBufferShape) {
    var efficiencyLevelToSvgHref = {
        low: '#buffer-low',
        moderate: '#buffer-moderate',
        high: '#buffer-high'
    };
    function mxBufferShape(bounds, fill, stroke, strokewidth) {
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = strokewidth != null ? strokewidth : 1;
    };
    mxUtils.extend(mxBufferShape, mxShape);

    mxBufferShape.prototype.cst = {
        TITLE: 'title',
        EFFICIENCY_LEVEL: 'efficiencyLevel'
    };

    mxBufferShape.prototype.paintVertexShape = function (context, x, y, w, h) {
        var title = mxUtils.getValue(this.style, mxBufferShape.prototype.cst.TITLE, 'N/A');
        var efficiencyLevel = mxUtils.getValue(this.style, mxBufferShape.prototype.cst.EFFICIENCY_LEVEL, efficiencyLevelToSvgHref.high);
        var href = efficiencyLevelToSvgHref[efficiencyLevel];

        var gElement = context.root.appendChild(context.createElement('g'));

        var useElement = gElement.appendChild(context.createElement('use'));
        useElement.setAttribute('href', href);
        useElement.setAttribute('x', x);
        useElement.setAttribute('y', y);
        useElement.setAttribute('width', '54');
        useElement.setAttribute('height', '55.49');

        var textElement = gElement.appendChild(context.createElement('text'));
        textElement.setAttribute('font-family', 'Arial');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('fill', 'white');
        textElement.setAttribute('x', x + 27);
        textElement.setAttribute('y', y + 50);
        textElement.setAttribute('font-size', '12');
        textElement.textContent = title;
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.buffer'] = mxBufferShape;
})(window.mxUtils, window.mxBufferShape);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function (mxUtils) {
    var efficiencyLevelToSvgHref = {
        low: '#cyclic-station-low',
        moderate: '#cyclic-station-moderate',
        high: '#cyclic-station-high'
    };

    function mxCyclicStationShape(bounds, fill, stroke, strokewidth) {
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = strokewidth != null ? strokewidth : 1;
    };
    mxUtils.extend(mxCyclicStationShape, mxShape);

    mxCyclicStationShape.prototype.cst = {
        TITLE: 'title',
        EFFICIENCY_LEVEL: 'efficiencyLevel',
        EFFICIENCY_RELATIVE_AMOUNT: 'efficiencyRelativeAmount'
    };

    mxCyclicStationShape.prototype.paintVertexShape = function (context, x, y, w, h) {
        var title = mxUtils.getValue(this.style, mxCyclicStationShape.prototype.cst.TITLE, 'N/A');
        var efficiencyLevel = mxUtils.getValue(this.style, mxCyclicStationShape.prototype.cst.EFFICIENCY_LEVEL, efficiencyLevelToSvgHref.high);
        var efficiencyRelativeAmount = mxUtils.getValue(this.style, mxCyclicStationShape.prototype.cst.EFFICIENCY_RELATIVE_AMOUNT, 'N/A');
        var href = efficiencyLevelToSvgHref[efficiencyLevel];

        var gElement = context.root.appendChild(context.createElement('g'));

        var useElement = gElement.appendChild(context.createElement('use'));
        useElement.setAttribute('href', href);
        useElement.setAttribute('x', x);
        useElement.setAttribute('y', y);
        useElement.setAttribute('width', '75');
        useElement.setAttribute('height', '95.25');

        var titleElement = gElement.appendChild(context.createElement('text'));
        titleElement.setAttribute('font-family', 'Arial');
        titleElement.setAttribute('fill', 'white');
        titleElement.setAttribute('x', x + 5);
        titleElement.setAttribute('y', y + 48);
        titleElement.setAttribute('font-size', '12');
        titleElement.textContent = title;

        var efficiencyElement = gElement.appendChild(context.createElement('text'));
        efficiencyElement.setAttribute('font-family', 'Arial');
        efficiencyElement.setAttribute('fill', 'white');
        efficiencyElement.setAttribute('x', x + 5);
        efficiencyElement.setAttribute('y', y + 64);
        efficiencyElement.setAttribute('font-size', '12');
        efficiencyElement.textContent = efficiencyRelativeAmount;
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.cyclicStation'] = mxCyclicStationShape;
})(mxUtils);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    function mxDrainShape(bounds, fill, stroke, strokewidth) {
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = strokewidth != null ? strokewidth : 1;
    };
    mxUtils.extend(mxDrainShape, mxShape);

    mxDrainShape.prototype.paintVertexShape = function (context, x, y, w, h) {
        var radius = 15;

        context.begin();
        context.setStrokeColor('#000000');
        context.setFillColor('#000000');
        context.setStrokeWidth(3.5);
        context.ellipse(x, y, 2 * radius, 2 * radius);
        context.close();
        context.fillAndStroke();
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.drain'] = mxDrainShape;
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    function mxSourceShape(bounds, fill, stroke, strokewidth) {
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = strokewidth != null ? strokewidth : 1;
    };
    mxUtils.extend(mxSourceShape, mxShape);

    mxSourceShape.prototype.paintVertexShape = function (context, x, y, w, h) {
        var radius = 15;

        context.begin();
        context.setStrokeColor('#000000');
        context.setFillColor('#ffffff');
        context.setStrokeWidth(3.5);
        context.ellipse(x, y, 2 * radius, 2 * radius);
        context.close();
        context.fillAndStroke();
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.source'] = mxSourceShape;
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    var efficiencyLevelToSvgHref = {
        low: '#station-low',
        moderate: '#station-moderate',
        high: '#station-high'
    };

    function mxStationShape(bounds, fill, stroke, strokewidth) {
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = strokewidth != null ? strokewidth : 1;
    };
    mxUtils.extend(mxStationShape, mxShape);

    mxStationShape.prototype.cst = {
        TITLE: 'title',
        EFFICIENCY_LEVEL: 'efficiencyLevel',
        EFFICIENCY_RELATIVE_AMOUNT: 'efficiencyRelativeAmount'
    };

    mxStationShape.prototype.paintVertexShape = function (context, x, y, w, h) {
        var title = mxUtils.getValue(this.style, mxStationShape.prototype.cst.TITLE, 'N/A');
        var efficiencyLevel = mxUtils.getValue(this.style, mxStationShape.prototype.cst.EFFICIENCY_LEVEL, efficiencyLevelToSvgHref.high);
        var efficiencyRelativeAmount = mxUtils.getValue(this.style, mxStationShape.prototype.cst.EFFICIENCY_RELATIVE_AMOUNT, 'N/A');
        var href = efficiencyLevelToSvgHref[efficiencyLevel];

        var gElement = context.root.appendChild(context.createElement('g'));

        var useElement = gElement.appendChild(context.createElement('use'));
        useElement.setAttribute('href', href);
        useElement.setAttribute('x', x);
        useElement.setAttribute('y', y);
        useElement.setAttribute('width', '75');
        useElement.setAttribute('height', '68.05');

        var titleElement = gElement.appendChild(context.createElement('text'));
        titleElement.setAttribute('font-family', 'Arial');
        titleElement.setAttribute('fill', 'white');
        titleElement.setAttribute('x', x + 5);
        titleElement.setAttribute('y', y + 48);
        titleElement.setAttribute('font-size', '12');
        titleElement.textContent = title;

        var efficiencyElement = gElement.appendChild(context.createElement('text'));
        efficiencyElement.setAttribute('font-family', 'Arial');
        efficiencyElement.setAttribute('fill', 'white');
        efficiencyElement.setAttribute('x', x + 5);
        efficiencyElement.setAttribute('y', y + 64);
        efficiencyElement.setAttribute('font-size', '12');
        efficiencyElement.textContent = efficiencyRelativeAmount;
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.station'] = mxStationShape;
})();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map