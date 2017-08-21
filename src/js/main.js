import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';
import generateDummyProductionLine from './generateDummyProductionLine.js';
import fromProductionModelToVisualisationModel from './fromProductionModelToVisualisationModel.js';
import StationShape from './plv/visualisation/Station.js';

import renderGradients from './plv/util/renderGradients.js';

window.onload = function(){
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
    const elementMarginTop = 80;
    const elementMarginRight = 85;

    const productionLine = generateDummyProductionLine();
    const source = productionLine.source;
    const columnPartitions = fromProductionModelToVisualisationModel(productionLine);

    // Takes matrix of dimensions m x n and transposes it to new matrix of dimensions n x m
    // n - number of rows of initial matrix
    // m - number of columns of initial matrix
    function transposeMatrix(originalMatrix){
        if(!originalMatrix || !originalMatrix.length)
            return [];

        const originalRowCount = originalMatrix.length;
        const originalColumnCount = Math.max(...originalMatrix.map(row => row.length));

        const newMatrix = [];
        for(let rowIndex = 0; rowIndex < originalRowCount; rowIndex++){
            for(let columnIndex = 0; columnIndex < originalColumnCount; columnIndex++){
                newMatrix[columnIndex] = newMatrix[columnIndex] || [];
                newMatrix[columnIndex][rowIndex] = originalMatrix[rowIndex][columnIndex] || null;
            }
        }
        return newMatrix;
    }

    let transposedColumnPartitions = transposeMatrix(columnPartitions);
    const layoutedShapes =
    transposedColumnPartitions.map(
        column => column.map(
            element => element && new StationShape(`Station`, EfficiencyLevel.Low, '0.5')
        ));

    function getMaxWidthForColumn(columnIndex){
        if(!layoutedShapes[0][columnIndex]){
            return 0;
        }
        var column = layoutedShapes.map(row => row[columnIndex]);
        return Math.max(...column.map(element => element ? element.width : 0));
    }

    function getMaxHeightForRow(rowIndex){
        if(!layoutedShapes[rowIndex])
            return 0;
        return Math.max(...layoutedShapes[rowIndex].map(element => element ? element.height : 0));
    }

    var options = {
        alignToOtherElementsInTheSameColumn: ['left', 'center'][1],
        verticalDistributionToCanvas: ['top', 'center'][1]
    };

    (function distributeHorizontally_center(run){
        if(!run) return;

        const alignVertically = true;
        for(let rowIndex = 0; rowIndex < layoutedShapes.length; rowIndex++){
            let xPosition = windowMarginLeft;
            for(let columnIndex = 0; columnIndex < layoutedShapes[rowIndex].length; columnIndex++){
                if(layoutedShapes[rowIndex][columnIndex] === null){
                    xPosition = xPosition + getMaxWidthForColumn(columnIndex) + elementMarginRight;
                    continue;
                }
                const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

                layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
                xPosition = xPosition + (getMaxWidthForColumn(columnIndex) - elementWidth)/2;
                layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
                xPosition = xPosition + (getMaxWidthForColumn(columnIndex) - elementWidth)/2 + elementWidth;
                xPosition = xPosition + elementMarginRight;
            }
        }
    })(options.alignToOtherElementsInTheSameColumn === 'center');

    (function distributeHorizontally_left(run){
        if(!run) return;

        const alignVertically = true;
        for(let rowIndex = 0; rowIndex < layoutedShapes.length; rowIndex++){
            let xPosition = windowMarginLeft;
            for(let columnIndex = 0; columnIndex < layoutedShapes[rowIndex].length; columnIndex++){
                if(layoutedShapes[rowIndex][columnIndex] === null){
                    xPosition = xPosition + getMaxWidthForColumn(columnIndex) + elementMarginRight;
                    continue;
                }
                const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

                layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
                layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
                xPosition = xPosition + getMaxWidthForColumn(columnIndex) + elementMarginRight;
            }
        }
    })(options.alignToOtherElementsInTheSameColumn === 'left');

    (function distributeVertically_top(run){
        if(!run) return;

        const alignToElementsInTheSameRow = true;
        const alignVertically = true;
        let yPosition = elementMarginTop;
        for(let rowIndex = 0; rowIndex < layoutedShapes.length; rowIndex++){
            for(let columnIndex = 0; columnIndex < layoutedShapes[rowIndex].length; columnIndex++){
                if(layoutedShapes[rowIndex][columnIndex] === null){
                    continue;
                }
                layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
            }

            if(alignToElementsInTheSameRow){
                yPosition = yPosition + getMaxHeightForRow(rowIndex);
            }

            yPosition = yPosition + elementMarginTop;
        }
    })(options.verticalDistributionToCanvas === 'top');

    (function distributeVertically_center(run){
        if(!run) return;

        const columnBoudingBoxes = [];
        const numberOfRows = layoutedShapes.length;
        const numberOfColumns = layoutedShapes[0].length;

        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            let yPosition =  windowMarginTop;
            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                if(layoutedShapes[rowIndex][columnIndex] === null){
                    continue;
                }

                layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
                yPosition = yPosition + layoutedShapes[rowIndex][columnIndex].height + elementMarginTop;
            }
        }

        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            var columnElementBoundingBox = {
                x1: layoutedShapes[0][columnIndex].GetBoundingBox().x1,
                y1: layoutedShapes[0][columnIndex].GetBoundingBox().y1,
                x2: 0,
                y2: 0
            };

            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                if(!layoutedShapes[rowIndex][columnIndex]){
                    continue;
                }
                columnElementBoundingBox.x2 = layoutedShapes[rowIndex][columnIndex].GetBoundingBox().x2;
                columnElementBoundingBox.y2 = layoutedShapes[rowIndex][columnIndex].GetBoundingBox().y2;
            }

            columnBoudingBoxes.push(columnElementBoundingBox);
        }

        const maxColumnBoundingBoxHeight = Math.max(...columnBoudingBoxes.map(columnBox => columnBox.y2 - columnBox.y1));
        debugger;
        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
            const deltaY = (maxColumnBoundingBoxHeight - (columnBoudingBoxes[columnIndex].y2 - columnBoudingBoxes[columnIndex].y1))/2;
            for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
                if(!layoutedShapes[rowIndex][columnIndex]){
                    continue;
                }
                layoutedShapes[rowIndex][columnIndex].Translate(0, deltaY);
            }
        }
    })(options.verticalDistributionToCanvas === 'center');

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
