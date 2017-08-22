import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import StationShape from './plv/visualisation/shapes/Station.js';

import renderGradients from './plv/util/renderGradients.js';
import LayoutManager from './plv/visualisation/LayoutManager.js';

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

    // const someShape01 = new StationShape('Station 1', EfficiencyLevel.Low, '0.5');
    // someShape01.Render(canvas,
    //     {
    //         x: 0,
    //         y: 0
    //     },
    //     color.next().value
    // );

    // const someShape02 = new StationShape('Station B', EfficiencyLevel.High, '0.9');
    // someShape02.Render(canvas,
    //     {
    //         x: 150,
    //         y: 50
    //     },
    //     color.next().value
    // );

    // const someShape03 = new StationShape('Station B', EfficiencyLevel.High, '0.9');
    // someShape03.Render(canvas,
    //     {
    //         x: 1,
    //         y: 150
    //     },
    //     color.next().value
    // );

    // d3
    // .xml("./src/images/station.svg")
    // .mimeType("image/svg+xml")
    // .get(function(error, xml) {
    //     if (error) throw error;

    //     document.body.appendChild(xml.documentElement);

    //     d3
    //     .select('#canvas')
    //     .append('use')
    //     .attr('href', '#station')
    //     .attr('width', '75')
    //     .attr('height', ' 68.05')
    //     .attr('x', '200')
    //     .attr('y', '200');
    // });

    // Lines
    // var lineData1 = [
    //     { x: rectWidth, y: rectHeight * 0.25 },
    //     { x: rectWidth + leftMargin/2, y: rectHeight * 0.25},
    //     { x: rectWidth + leftMargin - leftMargin/2, y:  rectHeight * 0.25 + 1 },
    //     { x: rectWidth + leftMargin, y: rectHeight * 0.25 + 1 }
    // ];
    // var lineData2 = [
    //     { x: rectWidth, y: rectHeight * 0.75  },
    //     { x: rectWidth + leftMargin/2, y: rectHeight * 0.75 },
    //     { x: rectWidth + leftMargin - leftMargin/2, y: rectHeight + topMargin + rectHeight * 0.25 },
    //     { x: rectWidth + leftMargin, y: rectHeight + topMargin + rectHeight * 0.25 }
    // ];

    // var lineFunction =
    //     d3.line()
    //     .x(function(d) { return d.x; })
    //     .y(function(d) { return d.y; })
    //     .curve(d3.curveBasis);

    // canvas.append('path')
    //     .attr('d', lineFunction(lineData1))
    //     .attr('class', 'flow')
    //     .attr("stroke", "gray")
    //     .attr("stroke-width", rectHeight * 0.5)
    //     .attr('data-gradient-start', "red")
    //     .attr('data-gradient-end', "blue")
    //     .attr("fill", "none");

    // canvas.append('path')
    //     .attr('class', 'gradient')
    //     .attr('d', lineFunction(lineData2))
    //     .attr('data-gradient-start', "#8fb239")
    //     .attr('data-gradient-end', "#be120c")
    //     .attr('class', 'flow')
    //     .attr("stroke", "gray")
    //     .attr("stroke-width", rectHeight * 0.5)
    //     .attr("fill", "none");

    // renderGradients(canvas);
}
