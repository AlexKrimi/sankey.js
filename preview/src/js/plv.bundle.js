var plv =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var EfficiencyLevel = new Enumeration({
    1: 'Low',
    2: 'Medium',
    3: 'High'
});
exports.default = EfficiencyLevel;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ModelManager = __webpack_require__(4);

var _ModelManager2 = _interopRequireDefault(_ModelManager);

var _fromProductionModelToColumnPartitionsForVisualization = __webpack_require__(7);

var _fromProductionModelToColumnPartitionsForVisualization2 = _interopRequireDefault(_fromProductionModelToColumnPartitionsForVisualization);

var _getNormalizedPartitions = __webpack_require__(8);

var _getNormalizedPartitions2 = _interopRequireDefault(_getNormalizedPartitions);

var _renderGradients = __webpack_require__(11);

var _renderGradients2 = _interopRequireDefault(_renderGradients);

var _transposeMatrix = __webpack_require__(12);

var _transposeMatrix2 = _interopRequireDefault(_transposeMatrix);

var _loadSvgImage = __webpack_require__(13);

var _loadSvgImage2 = _interopRequireDefault(_loadSvgImage);

var _applyLayout = __webpack_require__(14);

var _applyLayout2 = _interopRequireDefault(_applyLayout);

var _renderLinks = __webpack_require__(17);

var _renderLinks2 = _interopRequireDefault(_renderLinks);

var _mapEntityPartitionsToShapePartitions = __webpack_require__(18);

var _mapEntityPartitionsToShapePartitions2 = _interopRequireDefault(_mapEntityPartitionsToShapePartitions);

var _renderShapes = __webpack_require__(19);

var _renderShapes2 = _interopRequireDefault(_renderShapes);

var _EfficiencyLevel = __webpack_require__(0);

var _EfficiencyLevel2 = _interopRequireDefault(_EfficiencyLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import generateDummyProductionLine from './generateDummyProductionLine.js';
(function (global) {
    "use strict";

    var module = {};

    module.ModelManager = _ModelManager2.default;

    global.plv = global.plv || module;
})(typeof window !== "undefined" ? window : undefined);

var o = {
    test: 'TEKST'
};

exports.default = o;

// window.onload = function(){
//     (function loadExternalImages(){
//         const svgSymbolFilenames =
//             ['station-low',
//              'station-medium',
//              'station-high',
//              'station-not-available',
//              'buffer-low',
//              'buffer-medium',
//              'buffer-high',
//              'buffer-not-available'];
//         loadSvgImage(...svgSymbolFilenames);
//      })();

//     const canvas =
//         d3.select('body')
//         .append('svg')
//         .attr('id', 'canvas')
//         .attr('width', 2000)
//         .attr('height', 600);

//     const options = {
//         alignToOtherElementsInTheSameColumn: ['left', 'center'][1],
//         verticalDistributionToCanvas: ['top', 'center'][1],
//         windowMarginLeft: 50,
//         windowMarginTop: 50,
//         elementMarginTop: 80,
//         elementMarginRight: 85,
//         maxFlowWidth: 46,
//         entityToShapeMap: {
//             'Buffer':  entity => new BufferShape(entity.id, entity.label, entity.efficiencyLevel),
//             'Drain':   entity => new DrainShape(entity.id),
//             'Source':  entity => new SourceShape(entity.id),
//             'Station': entity => new StationShape(entity.id, entity.label, entity.efficiencyLevel, entity.efficiencyRelativeAmountLabel),
//         },
//         colorCodeForLevel: {
//             [EfficiencyLevel.Low]:    '#F60A20',
//             [EfficiencyLevel.Medium]: '#FF7F00',
//             [EfficiencyLevel.High]:   '#8fb239',
//             [undefined]:              'gray',
//             [null]:                   'gray'
//         }
//     };

//     const productionLine = generateDummyProductionLine();
//     productionLine.IsValid();
//     const columnPartitions = fromProductionModelToColumnPartitionsForVisualization(productionLine);
//     const transposedColumnPartitions = transposeMatrix(columnPartitions);
//     let columnPartitionsWithShapes = mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options);
//     columnPartitionsWithShapes = getNormalizedPartitions(columnPartitionsWithShapes, productionLine);
//     applyLayout(options, columnPartitionsWithShapes);
//     renderLinks(productionLine, columnPartitionsWithShapes, canvas, options);
//     renderGradients(canvas);
//     renderShapes(columnPartitionsWithShapes, canvas);
// }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EntityBase = __webpack_require__(5);

var _EntityBase2 = _interopRequireDefault(_EntityBase);

var _Edge = __webpack_require__(6);

var _Edge2 = _interopRequireDefault(_Edge);

var _EfficiencyLevel = __webpack_require__(0);

var _EfficiencyLevel2 = _interopRequireDefault(_EfficiencyLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelManager = function () {
    function ModelManager() {
        _classCallCheck(this, ModelManager);

        this.verteces = [];
        this.edges = [];
        this.source = null;
    }

    _createClass(ModelManager, [{
        key: 'AddVertex',
        value: function AddVertex(entity) {
            var immediateParentPrototypeName = Object.getPrototypeOf(entity.constructor).name;
            if (!immediateParentPrototypeName) throw new Error('Immediate parent prototype of entity should be of type "EntityBase". Instead it has no parent.');
            if (immediateParentPrototypeName !== 'EntityBase') throw new Error('Immediate parent prototype of entity should be of type "EntityBase". Found "' + immediateParentPrototypeName + '" instead.');
            if (this.verteces.includes(entity)) {
                console.warn('Vertex already added to the model. Vertex:', entity);
                return this;
            }
            if (entity.constructor.name === 'Source') {
                var numberOfSources = this.verteces.filter(function (vertex) {
                    return vertex.constructor.name === 'Source';
                }).length;
                if (numberOfSources === 1) {
                    console.error('Model should have exactly one source vertex. Cannot add additional vertex of type Source.');
                }
            }
            if (entity.constructor.name === 'Drain') {
                var numberOfDrains = this.verteces.filter(function (vertex) {
                    return vertex.constructor.name === 'Drain';
                }).length;
                if (numberOfDrains === 1) {
                    console.error('Model should have exactly one drain vertex. Cannot add additional vertex of type Drain.');
                }
            }

            this.verteces.push(entity);
            if (entity.constructor.name === 'Source') {
                this.source = entity;
            }
            return this;
        }
    }, {
        key: 'AddEdge',
        value: function AddEdge(vertexTriplet) {
            var newFrom = vertexTriplet[0],
                newTo = vertexTriplet[1],
                newIntensity = vertexTriplet[2] || 0;
            var isElementAlreadyAddedToModel = this.edges.findIndex(function (existingEdge) {
                return existingEdge.from === newFrom && existingEdge.to === newTo;
            }) !== -1;
            if (isElementAlreadyAddedToModel) {
                console.warn('Identical edge already added to the model.', vertexTriplet);
                return;
            }

            var indexOfOriginNode = this.verteces.indexOf(newFrom);
            var indexOfTargetNode = this.verteces.indexOf(newTo);

            if (indexOfOriginNode === -1) throw new Error('Cannot create edge between two verteces if both of them are not previously added (registered) to the model. Cannot find origin node.');
            if (indexOfTargetNode === -1) throw new Error('Cannot create edge between two verteces if both of them are not previously added (registered) to the model. Cannot find target node.');
            if (newIntensity < 0) throw new Error('Intensity should be non-negative number. Found ' + newIntensity + ' instead.');

            this.edges.push(new _Edge2.default(newFrom, newTo, newIntensity));
        }
    }, {
        key: 'GetOutgoingEdge',
        value: function GetOutgoingEdge(vertexId) {
            return this.edges.filter(function (edge) {
                return edge.from.id === vertexId;
            });
        }
    }, {
        key: 'GetOutgoingVertex',
        value: function GetOutgoingVertex(vertexId) {
            return this.GetOutgoingEdge(vertexId).map(function (edge) {
                return edge.to;
            });
        }
    }, {
        key: 'GetIncomingEdge',
        value: function GetIncomingEdge(vertexId) {
            return this.edges.filter(function (edge) {
                return edge.to.id === vertexId;
            });
        }
    }, {
        key: 'GetIncomingVertex',
        value: function GetIncomingVertex(vertexId) {
            return this.GetIncomingEdge(vertexId).map(function (edge) {
                return edge.from;
            });
        }
    }, {
        key: 'AddEdges',
        value: function AddEdges(newVertexTuples) {
            newVertexTuples.forEach(function (newVertexTuple) {
                this.AddEdge(newVertexTuple);
            }, this);
        }
    }, {
        key: 'AddVertecesAndEdges',
        value: function AddVertecesAndEdges(vertecesAndOutgoingFlowsCollection) {
            for (var collectionIndex = 0; collectionIndex < vertecesAndOutgoingFlowsCollection.length; collectionIndex++) {
                var currentCollection = vertecesAndOutgoingFlowsCollection[vertexIndex];
                var vertex = currentCollection[0];
                var outgoingFlows = currentCollection[1];
                this.verteces.push(vertex);

                for (var flowIndex = 0; flowIndex < outgoingFlows.length; flowIndex++) {
                    this.AddEdge([vertex, outgoingFlows[flowIndex]]);
                }
            }
        }
    }, {
        key: 'IsValid',
        value: function IsValid() {
            var numberOfSources = this.verteces.filter(function (vertex) {
                return vertex.constructor.name === 'Source';
            }).length;
            if (numberOfSources !== 1) {
                console.warn('Model should have exactly one source vertex. Instead found ' + numberOfSources + ' of them.');
                return false;
            }
            var numberOfDrains = this.verteces.filter(function (vertex) {
                return vertex.constructor.name === 'Drain';
            }).length;
            if (numberOfDrains !== 1) {
                console.warn('Model should have exactly one drain vertex. Instead found ' + numberOfDrains + ' of them.');
                return false;
            }
            return true;
        }
    }, {
        key: 'Get',
        value: function Get(id) {
            return this.verteces.find(function (vertex) {
                return vertex.id === id;
            });
        }
    }]);

    return ModelManager;
}();

exports.default = ModelManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntityBase = function EntityBase() {
    _classCallCheck(this, EntityBase);

    this.flowsTo = [];
    this.flowsFrom = [];
    this.id = Symbol('Vertex');
};

exports.default = EntityBase;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = function () {
    function Edge(from, to) {
        var intensity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, Edge);

        this._from = from;
        this._to = to;
        this._intensity = intensity;
        this._id = Symbol('Edge');
    }

    _createClass(Edge, [{
        key: 'from',
        get: function get() {
            return this._from;
        }
    }, {
        key: 'to',
        get: function get() {
            return this._to;
        }
    }, {
        key: 'intensity',
        get: function get() {
            return this._intensity;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }]);

    return Edge;
}();

exports.default = Edge;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fromProductionModelToColumnPartitionsForVisualization;
function fromProductionModelToColumnPartitionsForVisualization(productionModel) {
    var columns = [];

    function scanVertecesByOutgoingFlows(currentVertex, columnIndex) {
        var isAlreadyAdded = !!columns.find(function (column) {
            return column.find(function (vertex) {
                return vertex === currentVertex;
            });
        });
        if (isAlreadyAdded) return;

        columns[columnIndex] = columns[columnIndex] || [];
        columns[columnIndex].push(currentVertex);
        var outgoingVerteces = productionModel.GetOutgoingVertex(currentVertex.id);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = outgoingVerteces[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var nextVertex = _step.value;

                scanVertecesByOutgoingFlows(nextVertex, columnIndex + 1);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    scanVertecesByOutgoingFlows(productionModel.source, 0);

    return columns;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getNormalizedPartitions;

var _ImaginaryShape = __webpack_require__(9);

var _ImaginaryShape2 = _interopRequireDefault(_ImaginaryShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNormalizedPartitions(columnPartitionsWithShapes, productionLine) {
    var normalizedLayout = [];

    var getColumnIndexByVertexId = function getColumnIndexByVertexId(matrix, id) {
        for (var rowIndex = 0; rowIndex < columnPartitionsWithShapes.RowCount; rowIndex++) {
            for (var columnIndex = 0; columnIndex < columnPartitionsWithShapes.ColumnCount; columnIndex++) {
                var element = matrix[rowIndex][columnIndex];
                if (element && element.id === id) return columnIndex;
            }
        }
        return -1;
    };

    var hasVertecesPointingToItFromSameColumn = function hasVertecesPointingToItFromSameColumn(matrix, destinationVertexId, columnIndex) {
        return productionLine.GetIncomingEdge(destinationVertexId).some(function (incomingEdge) {
            return getColumnIndexByVertexId(matrix, incomingEdge.from.id) === columnIndex;
        });
    };

    for (var columnIndex = 0; columnIndex < columnPartitionsWithShapes.ColumnCount; columnIndex++) {
        var firstColumn = [];
        var secondColumn = [];
        for (var rowIndex = 0; rowIndex < columnPartitionsWithShapes.RowCount; rowIndex++) {
            var currentShape = columnPartitionsWithShapes[rowIndex][columnIndex];
            if (currentShape === null) {
                firstColumn.push(null);
                secondColumn.push(null);
                continue;
            }
            var currentEntity = productionLine.Get(currentShape.id);

            if (hasVertecesPointingToItFromSameColumn(columnPartitionsWithShapes, currentEntity.id, columnIndex)) {
                firstColumn.push(new _ImaginaryShape2.default(currentShape.width, currentShape.height));
                secondColumn.push(currentShape);
            } else {
                firstColumn.push(currentShape);
                secondColumn.push(new _ImaginaryShape2.default(currentShape.width, currentShape.height));
            }
        }

        var secondColumnShouldBeAdded = secondColumn.some(function (shape) {
            return shape && shape.id !== _ImaginaryShape2.default.Id;
        });
        for (var _rowIndex = 0; _rowIndex < columnPartitionsWithShapes.RowCount; _rowIndex++) {
            normalizedLayout[_rowIndex] = normalizedLayout[_rowIndex] || [];
            normalizedLayout[_rowIndex].push(firstColumn[_rowIndex]);
            if (secondColumnShouldBeAdded) normalizedLayout[_rowIndex].push(secondColumn[_rowIndex]);
        }
    }

    return normalizedLayout;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShapeBase2 = __webpack_require__(10);

var _ShapeBase3 = _interopRequireDefault(_ShapeBase2);

var _EfficiencyLevel = __webpack_require__(0);

var _EfficiencyLevel2 = _interopRequireDefault(_EfficiencyLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImaginaryShapeUniqueId = Symbol('ImaginaryVertex');

var ImaginaryShape = function (_ShapeBase) {
    _inherits(ImaginaryShape, _ShapeBase);

    _createClass(ImaginaryShape, null, [{
        key: 'Id',
        get: function get() {
            return ImaginaryShapeUniqueId;
        }
    }]);

    function ImaginaryShape(imaginaryWidth, imaginaryHeight) {
        _classCallCheck(this, ImaginaryShape);

        return _possibleConstructorReturn(this, (ImaginaryShape.__proto__ || Object.getPrototypeOf(ImaginaryShape)).call(this, ImaginaryShape.Id, imaginaryWidth, imaginaryHeight));
    }

    _createClass(ImaginaryShape, [{
        key: 'Render',
        value: function Render() {
            // It is imaginary, used for layouting and is not renderable.
        }
    }]);

    return ImaginaryShape;
}(_ShapeBase3.default);

exports.default = ImaginaryShape;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShapeBase = function () {
    function ShapeBase(id, width, height) {
        _classCallCheck(this, ShapeBase);

        this._id = id;
        this._width = width;
        this._height = height;
        this.x = 0;
        this.y = 0;
    }

    _createClass(ShapeBase, [{
        key: "Render",
        value: function Render() {}
    }, {
        key: "SetLocation",
        value: function SetLocation(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: "GetBoundingBox",
        value: function GetBoundingBox() {
            return {
                x1: this.x,
                y1: this.y,
                x2: this.x + this.width,
                y2: this.y + this.height
            };
        }
    }, {
        key: "Translate",
        value: function Translate(deltaX, deltaY) {
            this.x = this.x + deltaX;
            this.y = this.y + deltaY;
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        }
    }]);

    return ShapeBase;
}();

exports.default = ShapeBase;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderGradients;
// Large portion of this code came from: https://bl.ocks.org/mbostock/4163057
// Authoer: Mike Bostock
// Released under: GNU General Public License, version 3

function renderGradients(svg) {
    var path = d3.selectAll('.flow').remove();
    var allNodes = path.nodes();

    var _loop = function _loop() {
        element = allNodes[index];

        var color = d3.interpolateRgb(element.dataset.gradientStart, element.dataset.gradientEnd);
        var width = Number(element.dataset.width) || 0;
        // TODO Use height of shape with smallest height
        var MAX_WIDTH_OF_FLOW_LINE = 46;

        svg.selectAll('.flow').data(quads(sampleSingle(element, 1))).enter().append('path').style('fill', function (d) {
            return color(d.t);
        }).style('fill-opacity', 0.65).attr('d', function (d) {
            return lineJoin(d[0], d[1], d[2], d[3], width);
        });
    };

    for (var index = 0; index < allNodes.length; index++) {
        var element;

        _loop();
    }
}

// Sample the SVG path uniformly with the specified precision.
function sampleSingle(path, precision) {
    var n = path.getTotalLength(),
        t = [0],
        i = 0,
        dt = precision;
    while ((i += dt) < n) {
        t.push(i);
    }t.push(n);
    return t.map(function (t) {
        var p = path.getPointAtLength(t),
            a = [p.x, p.y];
        a.t = t / n;
        return a;
    });
}

// Compute quads of adjacent points [p0, p1, p2, p3].
function quads(points) {
    return d3.range(points.length - 1).map(function (i) {
        var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
        a.t = (points[i].t + points[i + 1].t) / 2;
        return a;
    });
}

// Compute stroke outline for segment p12.
function lineJoin(p0, p1, p2, p3, width) {
    var u12 = perp(p1, p2),
        r = width / 2,
        a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
        b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
        c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
        d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

    if (p0) {
        // clip ad and dc using average of u01 and u12
        var u01 = perp(p0, p1),
            e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
        a = lineIntersect(p1, e, a, b);
        d = lineIntersect(p1, e, d, c);
    }

    if (p3) {
        // clip ab and dc using average of u12 and u23
        var u23 = perp(p2, p3),
            e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
        b = lineIntersect(p2, e, a, b);
        c = lineIntersect(p2, e, d, c);
    }

    return 'M' + a + 'L' + b + ' ' + c + ' ' + d + 'Z';
}

// Compute intersection of two infinite lines ab and cd.
function lineIntersect(a, b, c, d) {
    var x1 = c[0],
        x3 = a[0],
        x21 = d[0] - x1,
        x43 = b[0] - x3,
        y1 = c[1],
        y3 = a[1],
        y21 = d[1] - y1,
        y43 = b[1] - y3,
        ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [x1 + ua * x21, y1 + ua * y21];
}

// Compute unit vector perpendicular to p01.
function perp(p0, p1) {
    var u01x = p0[1] - p1[1],
        u01y = p1[0] - p0[0],
        u01d = Math.sqrt(u01x * u01x + u01y * u01y);
    return [u01x / u01d, u01y / u01d];
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transposeMatrix;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function transposeMatrix(original) {
    if (!original || !original.length) return [];

    var originalRowCount = original.length;
    var originalColumnCount = Math.max.apply(Math, _toConsumableArray(original.map(function (row) {
        return row.length;
    })));

    var transposed = [];
    for (var rowIndex = 0; rowIndex < originalRowCount; rowIndex++) {
        for (var columnIndex = 0; columnIndex < originalColumnCount; columnIndex++) {
            transposed[columnIndex] = transposed[columnIndex] || [];
            transposed[columnIndex][rowIndex] = original[rowIndex][columnIndex] || null;
        }
    }
    return transposed;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadSvgImage;
function loadSvgImage() {
    for (var _len = arguments.length, imageFilenames = Array(_len), _key = 0; _key < _len; _key++) {
        imageFilenames[_key] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = imageFilenames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var filename = _step.value;

            d3.xml('./src/images/' + filename + '.svg').mimeType('image/svg+xml').get(function (error, xml) {
                if (error) throw error;
                document.body.appendChild(xml.documentElement);
            });
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = applyLayout;

var _EfficiencyLevel = __webpack_require__(0);

var _EfficiencyLevel2 = _interopRequireDefault(_EfficiencyLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function applyLayout(options, layoutedShapes) {
    layoutedShapes.RowCount = layoutedShapes.length;
    if (!layoutedShapes.RowCount) throw new Error('layoutedShapes > Expected more than 0 rows but found 0 rows.');
    layoutedShapes.ColumnCount = layoutedShapes[0].length;
    if (!layoutedShapes.ColumnCount) throw new Error('layoutedShapes > Expected more than 0 columns but found 0 columns.');
    for (var row = 0; row < layoutedShapes.RowCount; row++) {
        if (layoutedShapes[row].length != layoutedShapes.ColumnCount) throw new Error('layoutedShapes > Expected rectangular 2D array with ' + layoutedShapes.RowCount + ' rows an ' + layoutedShapes.ColumnCount + ' columns. Found row with ' + layoutedShapes[row].length + ' instead.');
    }

    applyRelativeAlignmentToOtherElementsInSameColumn(options, layoutedShapes);
    applyVerticalDistribution(options, layoutedShapes);
}

function getMaxWidthForColumn(layoutedShapes, columnIndex) {
    if (!layoutedShapes[0][columnIndex]) {
        return 0;
    }
    var column = layoutedShapes.map(function (row) {
        return row[columnIndex];
    });
    return Math.max.apply(Math, _toConsumableArray(column.map(function (element) {
        return element ? element.width : 0;
    })));
}

function getMaxHeightForRow(layoutedShapes, rowIndex) {
    if (!layoutedShapes[rowIndex]) return 0;
    return Math.max.apply(Math, _toConsumableArray(layoutedShapes[rowIndex].map(function (element) {
        return element ? element.height : 0;
    })));
}

function applyRelativeAlignmentToOtherElementsInSameColumn(options, layoutedShapes) {
    if (options.alignToOtherElementsInTheSameColumn === 'center') alignToOtherElementsInTheSameColumn_center(options, layoutedShapes);else if (options.alignToOtherElementsInTheSameColumn === 'left') alignToOtherElementsInTheSameColumn_left(options, layoutedShapes);else throw new Error('Incorrect =lue for options.alignToOtherElementsInTheSameColumn of ' + options.alignToOtherElementsInTheSameColumn);
}

function alignToOtherElementsInTheSameColumn_center(options, layoutedShapes) {
    var alignVertically = true;
    for (var rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++) {
        var xPosition = options.windowMarginLeft;
        for (var columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++) {
            if (layoutedShapes[rowIndex][columnIndex] === null) {
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.elementMarginRight;
                continue;
            }
            var elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth) / 2;
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth) / 2 + elementWidth;
            xPosition = xPosition + options.elementMarginRight;
        }
    }
}

function alignToOtherElementsInTheSameColumn_left(options, layoutedShapes) {
    var alignVertically = true;
    for (var rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++) {
        var xPosition = options.windowMarginLeft;
        for (var columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++) {
            if (layoutedShapes[rowIndex][columnIndex] === null) {
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.elementMarginRight;
                continue;
            }
            var elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.elementMarginRight;
        }
    }
}

function applyVerticalDistribution(options, layoutedShapes) {
    if (options.verticalDistributionToCanvas === 'top') verticalDistributionToCanvas_top(options, layoutedShapes);else if (options.verticalDistributionToCanvas === 'center') verticalDistributionToCanvas_center(options, layoutedShapes);else throw new Error('Incorrect value for options.alignToOtherElementsInTheSameColumn of ' + options.alignToOtherElementsInTheSameColumn);
}

function verticalDistributionToCanvas_top(options, layoutedShapes) {
    var yPosition = options.windowMarginTop;
    for (var rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++) {
        for (var columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++) {
            if (!layoutedShapes[rowIndex][columnIndex]) {
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
        }
        yPosition = yPosition + getMaxHeightForRow(layoutedShapes, rowIndex) + options.elementMarginTop;
    }
}

function verticalDistributionToCanvas_center(options, layoutedShapes) {
    var _marked = [columnBoudingBoxesGenerator].map(_regenerator2.default.mark);

    function applyEvenVerticalDistribution() {
        for (var columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++) {
            var yPosition = options.windowMarginTop;
            for (var rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++) {
                if (layoutedShapes[rowIndex][columnIndex] === null) {
                    continue;
                }

                layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
                yPosition = yPosition + layoutedShapes[rowIndex][columnIndex].height + options.elementMarginTop;
            }
        }
    };

    function columnBoudingBoxesGenerator() {
        var columnIndex, columnElementBoundingBox, rowIndex, currentBounding;
        return _regenerator2.default.wrap(function columnBoudingBoxesGenerator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        columnIndex = 0;

                    case 1:
                        if (!(columnIndex < layoutedShapes.ColumnCount)) {
                            _context.next = 18;
                            break;
                        }

                        columnElementBoundingBox = {
                            x1: layoutedShapes[0][columnIndex].GetBoundingBox().x1,
                            y1: layoutedShapes[0][columnIndex].GetBoundingBox().y1,
                            x2: 0,
                            y2: 0
                        };
                        rowIndex = 0;

                    case 4:
                        if (!(rowIndex < layoutedShapes.RowCount)) {
                            _context.next = 13;
                            break;
                        }

                        if (layoutedShapes[rowIndex][columnIndex]) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('continue', 10);

                    case 7:
                        currentBounding = layoutedShapes[rowIndex][columnIndex].GetBoundingBox();

                        columnElementBoundingBox.x2 = currentBounding.x2;
                        columnElementBoundingBox.y2 = currentBounding.y2;

                    case 10:
                        rowIndex++;
                        _context.next = 4;
                        break;

                    case 13:
                        _context.next = 15;
                        return columnElementBoundingBox;

                    case 15:
                        columnIndex++;
                        _context.next = 1;
                        break;

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this);
    };

    applyEvenVerticalDistribution();
    var columnBoudingBoxes = [].concat(_toConsumableArray(columnBoudingBoxesGenerator()));
    var maxColumnBoundingBoxHeight = Math.max.apply(Math, _toConsumableArray(columnBoudingBoxes.map(function (columnBox) {
        return columnBox.y2 - columnBox.y1;
    })));
    for (var columnIndex = 0; columnIndex < layoutedShapes.ColumnCount; columnIndex++) {
        var deltaY = (maxColumnBoundingBoxHeight - (columnBoudingBoxes[columnIndex].y2 - columnBoudingBoxes[columnIndex].y1)) / 2;
        for (var rowIndex = 0; rowIndex < layoutedShapes.RowCount; rowIndex++) {
            if (!layoutedShapes[rowIndex][columnIndex]) {
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, deltaY);
        }
    }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(16);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = renderLinks;

var _EfficiencyLevel = __webpack_require__(0);

var _EfficiencyLevel2 = _interopRequireDefault(_EfficiencyLevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lineFunction = d3.line().x(function (d) {
    return d.x;
}).y(function (d) {
    return d.y;
}).curve(d3.curveBasis);

var Side = {
    left: 0,
    right: 1
};

function renderLinks(productionLine, layoutedShapes, canvas, options) {
    var _marked = [xPositionGenerator, yPositionGenerator, positionForFlowsGenerator, linkDescriptionGenerator].map(_regenerator2.default.mark);

    var findShapeById = function () {
        var allShapes = layoutedShapes.reduce(function (aggregate, current) {
            return !!current ? aggregate.concat(current) : aggregate;
        }, []).filter(function (shape) {
            return !!shape;
        });
        return function (id) {
            return allShapes.find(function (shape) {
                return shape.id === id;
            });
        };
    }();

    {
        var positionOfLeftFlows = getPositionOfFlowsBySide(Side.left);
        var positionOfRightFlows = getPositionOfFlowsBySide(Side.right);

        var _arr = [].concat(_toConsumableArray(linkDescriptionGenerator(productionLine, positionOfLeftFlows, positionOfRightFlows)));

        for (var _i = 0; _i < _arr.length; _i++) {
            var edgeData = _arr[_i];
            var lengthOfStraightPart = edgeData.distanceBetweenBounds * 0.20;

            var lineData = [{ x: edgeData.from.x, y: edgeData.from.y }, { x: edgeData.from.x + lengthOfStraightPart, y: edgeData.from.y }, { x: edgeData.to.x - lengthOfStraightPart, y: edgeData.to.y }, { x: edgeData.to.x, y: edgeData.to.y }];

            var flowGroup = canvas.append('g').attr('class', 'flowGroup');

            flowGroup.append('path').attr('d', lineFunction(lineData)).attr('class', 'flow').attr('data-gradient-start', options.colorCodeForLevel[edgeData.from.efficiencyLevel]).attr('data-gradient-end', options.colorCodeForLevel[edgeData.to.efficiencyLevel]).attr('data-intensity', edgeData.intensity || 0).attr('data-width', edgeData.width || 0)
            // Not really important since it's going to be replaced by renderGradient metohd.
            .attr('stroke', 'gray').attr('stroke-width', 10).attr('fill', 'none');
        }
    }

    function getUniqVertexIdsByLinkHandSide(side) {
        var _Side$left$Side$right;

        var edgeSide = (_Side$left$Side$right = {}, _defineProperty(_Side$left$Side$right, Side.left, 'from'), _defineProperty(_Side$left$Side$right, Side.right, 'to'), _Side$left$Side$right)[side];

        return _(productionLine.edges).map(function (edge) {
            return edge[edgeSide].id;
        }).uniq().value();
    }

    function xPositionGenerator(groupOfLinksWithCommonSideOfVertex, shapeBounds, side) {
        var x, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, edge;

        return _regenerator2.default.wrap(function xPositionGenerator$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        x = side === Side.left ? shapeBounds.x2 : shapeBounds.x1;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 4;
                        _iterator = groupOfLinksWithCommonSideOfVertex[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 13;
                            break;
                        }

                        edge = _step.value;
                        _context.next = 10;
                        return x;

                    case 10:
                        _iteratorNormalCompletion = true;
                        _context.next = 6;
                        break;

                    case 13:
                        _context.next = 19;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 19:
                        _context.prev = 19;
                        _context.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context.prev = 22;

                        if (!_didIteratorError) {
                            _context.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context.finish(22);

                    case 26:
                        return _context.finish(19);

                    case 27:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _marked[0], this, [[4, 15, 19, 27], [20,, 22, 26]]);
    }

    function yPositionGenerator(groupOfLinksWithCommonSideOfVertex, shapeBounds, totalFlowWidth) {
        var y, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, edge, currentFlowWidth;

        return _regenerator2.default.wrap(function yPositionGenerator$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        y = shapeBounds.y1 + (shapeBounds.y2 - shapeBounds.y1 - totalFlowWidth) / 2;
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 4;
                        _iterator2 = groupOfLinksWithCommonSideOfVertex[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context2.next = 15;
                            break;
                        }

                        edge = _step2.value;
                        currentFlowWidth = edge.intensity * options.maxFlowWidth;
                        _context2.next = 11;
                        return y + currentFlowWidth / 2;

                    case 11:
                        y = y + currentFlowWidth;

                    case 12:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 6;
                        break;

                    case 15:
                        _context2.next = 21;
                        break;

                    case 17:
                        _context2.prev = 17;
                        _context2.t0 = _context2['catch'](4);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t0;

                    case 21:
                        _context2.prev = 21;
                        _context2.prev = 22;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 24:
                        _context2.prev = 24;

                        if (!_didIteratorError2) {
                            _context2.next = 27;
                            break;
                        }

                        throw _iteratorError2;

                    case 27:
                        return _context2.finish(24);

                    case 28:
                        return _context2.finish(21);

                    case 29:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _marked[1], this, [[4, 17, 21, 29], [22,, 24, 28]]);
    }

    function positionForFlowsGenerator(groupOfLinksWithCommonLeftVertex, xGenerator, yGenerator) {
        var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, edge, x, y, isDone, position;

        return _regenerator2.default.wrap(function positionForFlowsGenerator$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context3.prev = 3;
                        _iterator3 = groupOfLinksWithCommonLeftVertex[Symbol.iterator]();

                    case 5:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context3.next = 20;
                            break;
                        }

                        edge = _step3.value;
                        x = xGenerator.next();
                        y = yGenerator.next();
                        isDone = x.done || y.done;
                        position = {
                            id: edge.id,
                            x: x.value,
                            y: y.value
                        };

                        if (!isDone) {
                            _context3.next = 15;
                            break;
                        }

                        return _context3.abrupt('return', position);

                    case 15:
                        _context3.next = 17;
                        return position;

                    case 17:
                        _iteratorNormalCompletion3 = true;
                        _context3.next = 5;
                        break;

                    case 20:
                        _context3.next = 26;
                        break;

                    case 22:
                        _context3.prev = 22;
                        _context3.t0 = _context3['catch'](3);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context3.t0;

                    case 26:
                        _context3.prev = 26;
                        _context3.prev = 27;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 29:
                        _context3.prev = 29;

                        if (!_didIteratorError3) {
                            _context3.next = 32;
                            break;
                        }

                        throw _iteratorError3;

                    case 32:
                        return _context3.finish(29);

                    case 33:
                        return _context3.finish(26);

                    case 34:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _marked[2], this, [[3, 22, 26, 34], [27,, 29, 33]]);
    };

    function linkDescriptionGenerator(productionLine, leftSidePositionForFlows, rightSidePositionForFlows) {
        var _this = this;

        var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop, _iterator4, _step4;

        return _regenerator2.default.wrap(function linkDescriptionGenerator$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context5.prev = 3;
                        _loop = _regenerator2.default.mark(function _loop() {
                            var edge, leftPosition, rightPosition;
                            return _regenerator2.default.wrap(function _loop$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            edge = _step4.value;
                                            leftPosition = leftSidePositionForFlows.find(function (x) {
                                                return x.id === edge.id;
                                            });
                                            rightPosition = rightSidePositionForFlows.find(function (x) {
                                                return x.id === edge.id;
                                            });
                                            _context4.next = 5;
                                            return {
                                                id: edge.id,
                                                intensity: edge.intensity,
                                                width: edge.intensity * options.maxFlowWidth,
                                                distanceBetweenBounds: rightPosition.x - leftPosition.x,

                                                from: _extends({}, leftPosition, {
                                                    efficiencyLevel: edge.from.efficiencyLevel
                                                }),
                                                to: _extends({}, rightPosition, {
                                                    efficiencyLevel: edge.to.efficiencyLevel
                                                })
                                            };

                                        case 5:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _loop, _this);
                        });
                        _iterator4 = productionLine.edges[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            _context5.next = 11;
                            break;
                        }

                        return _context5.delegateYield(_loop(), 't0', 8);

                    case 8:
                        _iteratorNormalCompletion4 = true;
                        _context5.next = 6;
                        break;

                    case 11:
                        _context5.next = 17;
                        break;

                    case 13:
                        _context5.prev = 13;
                        _context5.t1 = _context5['catch'](3);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context5.t1;

                    case 17:
                        _context5.prev = 17;
                        _context5.prev = 18;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 20:
                        _context5.prev = 20;

                        if (!_didIteratorError4) {
                            _context5.next = 23;
                            break;
                        }

                        throw _iteratorError4;

                    case 23:
                        return _context5.finish(20);

                    case 24:
                        return _context5.finish(17);

                    case 25:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _marked[3], this, [[3, 13, 17, 25], [18,, 20, 24]]);
    };

    function getLinksGroupedByVertexSide(productionLine, side) {
        if (side === Side.left) return _.groupBy(productionLine.edges, function (edge) {
            return edge.from.id;
        });else return _.groupBy(productionLine.edges, function (edge) {
            return edge.to.id;
        });
    }

    function getPositionOfFlowsBySide(side) {
        return _(getUniqVertexIdsByLinkHandSide(side)).map(function (vertexId) {
            var groupOfLinksWithCommonSideOfVertex = getLinksGroupedByVertexSide(productionLine, side)[vertexId];
            var fromShapeBounds = findShapeById(vertexId).GetBoundingBox();
            var totalFlowWidth = groupOfLinksWithCommonSideOfVertex.reduce(function (aggregate, edge) {
                return edge.intensity * options.maxFlowWidth + aggregate;
            }, 0);
            var xGenerator = xPositionGenerator(groupOfLinksWithCommonSideOfVertex, fromShapeBounds, side);
            var yGenerator = yPositionGenerator(groupOfLinksWithCommonSideOfVertex, fromShapeBounds, totalFlowWidth);
            return [].concat(_toConsumableArray(positionForFlowsGenerator(groupOfLinksWithCommonSideOfVertex, xGenerator, yGenerator)));
        }).flatten().value();
    }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mapEntityPartitionsToShapePartitions;
function mapEntityPartitionsToShapePartitions(transposedColumnPartitions, options) {
    var columnPartitionsWithShapes = transposedColumnPartitions.map(function (column) {
        return column.map(function (element) {
            return !!element ? options.entityToShapeMap[element.constructor.name](element) : null;
        });
    });
    columnPartitionsWithShapes.RowCount = columnPartitionsWithShapes.length;
    columnPartitionsWithShapes.ColumnCount = columnPartitionsWithShapes[0].length;

    return columnPartitionsWithShapes;
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderShapes;
function renderShapes(columnPartitionsWithShapes, canvas) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = columnPartitionsWithShapes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var row = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = row[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var shape = _step2.value;

                    shape && shape.Render(canvas);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map