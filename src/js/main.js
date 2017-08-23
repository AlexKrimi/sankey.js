import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import StationShape from './plv/visualisation/shapes/Station.js';
import renderGradients from './plv/util/renderGradients.js';
import LayoutManager from './plv/visualisation/LayoutManager.js';
import LinkManager from './plv/visualisation/LinkManager.js';

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
    const layoutedShapes = LayoutManager(options, columnPartitions);

    for(let row of layoutedShapes){
        for(let element of row){
            element && element.Render(canvas);
        }
    }

    LinkManager(productionLine, layoutedShapes, canvas);
    renderGradients(canvas);
}
