import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import StationShape from './plv/visualisation/Station.js';

import renderGradients from './plv/util/renderGradients.js';

window.onload = function(){
    var a = { title: 'A', position: {c:0, r:0}, fill: '#8fb239' },
        b = { title: 'B', position: {c:1, r:0}, fill: '#8fb239' },
        c = { title: 'C', position: {c:1, r:1}, fill: '#BE120C' };

    a.links = [b, c];
    b.links = [];
    c.links = [];

    var columns = [a, b, c];

    const canvas =
    d3.select("body")
    .append("svg")
    .attr("id", 'canvas')
    .attr("width", 1800)
    .attr("height", 1000);

    const rectWidth = 25;
    const rectHeight = 100;
    const windowMarginLeft = 50;
    const windowMarginTop = 50;
    const elementMarginTop = 20;
    const elementMarginLeft = 60;

    var g = canvas
    .selectAll('g')
    .data(columns)
    .enter()
    .append("g");


    var colorIterator = {
        [Symbol.iterator](){
            return {
                next(){
                    return {
                        value: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`,
                        done: false
                    };
                }
            }
        }
    }
    const color = colorIterator[Symbol.iterator]();

    const productionLine = generateDummyProductionLine();
    const source = productionLine.source;
    const columnPatitions = fromProductionModelToVisualisationModel(productionLine);

    const layoutedShapes = [];
    let xPosition = windowMarginLeft;
    for(let columnIndex = 0; columnIndex < columnPatitions.length; columnIndex++){
        layoutedShapes[columnIndex] = [];
        const currentColumn = columnPatitions[columnIndex];
        let yPosition = windowMarginTop;
        for(let rowIndex = 0; rowIndex < currentColumn.length; rowIndex++){
            layoutedShapes[columnIndex][rowIndex] = new StationShape(`Station (${columnIndex},${rowIndex})`, EfficiencyLevel.Low, '0.5');
            layoutedShapes[columnIndex][rowIndex].Render(canvas,
                {
                    x: xPosition,
                    y: yPosition
                },
                color.next().value
            );
            yPosition = yPosition + layoutedShapes[columnIndex][rowIndex].height + elementMarginTop;
        }
        xPosition = xPosition + Math.max(...layoutedShapes[columnIndex].map(x => x.width)) + elementMarginLeft;
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
