import StationShape from '../visualisation/shapes/Station.js';
import Source from '../visualisation/shapes/Source.js';
import Drain from '../visualisation/shapes/Drain.js';
import EfficiencyLevel from '../EfficiencyLevel.js';

export default function(options, columnPartitions){
    let transposedColumnPartitions = transposeMatrix(columnPartitions);
    const layoutedShapes =
        transposedColumnPartitions.map(
            column => column.map(
                function(element) {
                    // TODO Refactor out. Diferentiate types.
                    if(element){
                        if(element.constructor.name === 'Station'){
                            return new StationShape(element.label, element.efficiencyLevel, element.efficiencyRelativeAmountLabel);
                        }
                        if(element.constructor.name === 'Source'){
                            return new Source();
                        }
                        if(element.constructor.name === 'Drain'){
                            return new Drain();
                        }
                        return new StationShape(`Something else`, EfficiencyLevel.High, '0.5');
                    }
                    return null;
                }
            ));

    if(options.alignToOtherElementsInTheSameColumn === 'center')
        alignToOtherElementsInTheSameColumn_center(options, layoutedShapes);
    else if(options.alignToOtherElementsInTheSameColumn === 'left')
        alignToOtherElementsInTheSameColumn_left(options, layoutedShapes);
    else
        throw new Error(`Incorrect value for options.alignToOtherElementsInTheSameColumn of ${options.alignToOtherElementsInTheSameColumn}`);

    if(options.verticalDistributionToCanvas === 'top')
        verticalDistributionToCanvas_top(options, layoutedShapes);
    else if(options.verticalDistributionToCanvas === 'center')
        verticalDistributionToCanvas_center(options, layoutedShapes);
    else
        throw new Error(`Incorrect value for options.alignToOtherElementsInTheSameColumn of ${options.alignToOtherElementsInTheSameColumn}`);

    return layoutedShapes;
}


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

function getMaxWidthForColumn(layoutedShapes, columnIndex){
    if(!layoutedShapes[0][columnIndex]){
        return 0;
    }
    var column = layoutedShapes.map(row => row[columnIndex]);
    return Math.max(...column.map(element => element ? element.width : 0));
}

function getMaxHeightForRow(layoutedShapes, rowIndex){
    if(!layoutedShapes[rowIndex])
        return 0;
    return Math.max(...layoutedShapes[rowIndex].map(element => element ? element.height : 0));
}

function alignToOtherElementsInTheSameColumn_center(options, layoutedShapes){
    const alignVertically = true;
    for(let rowIndex = 0; rowIndex < layoutedShapes.length; rowIndex++){
        let xPosition = options.windowMarginLeft;
        for(let columnIndex = 0; columnIndex < layoutedShapes[rowIndex].length; columnIndex++){
            if(layoutedShapes[rowIndex][columnIndex] === null){
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.elementMarginRight;
                continue;
            }
            const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth)/2;
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + (getMaxWidthForColumn(layoutedShapes, columnIndex) - elementWidth)/2 + elementWidth;
            xPosition = xPosition + options.elementMarginRight;
        }
    }
}

function alignToOtherElementsInTheSameColumn_left(options, layoutedShapes){
    const alignVertically = true;
    for(let rowIndex = 0; rowIndex < layoutedShapes.length; rowIndex++){
        let xPosition = options.windowMarginLeft;
        for(let columnIndex = 0; columnIndex < layoutedShapes[rowIndex].length; columnIndex++){
            if(layoutedShapes[rowIndex][columnIndex] === null){
                xPosition = xPosition + getMaxWidthForColumn(layoutedShapes, columnIndex) + options.elementMarginRight;
                continue;
            }
            const elementWidth = layoutedShapes[rowIndex][columnIndex].width;

            layoutedShapes[rowIndex] = layoutedShapes[rowIndex] || [];
            layoutedShapes[rowIndex][columnIndex].Translate(xPosition, 0);
            xPosition = xPosition + getMaxWidthForColumn(layoutedShapes,columnIndex) + options.elementMarginRight;
        }
    }
}

function verticalDistributionToCanvas_top(options, layoutedShapes){
    const numberOfRows = layoutedShapes.length;
    const numberOfColumns = layoutedShapes[0].length;

    let yPosition = options.windowMarginTop;
    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
        for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        if(!layoutedShapes[rowIndex][columnIndex]){
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
        }
        yPosition = yPosition + getMaxHeightForRow(layoutedShapes, rowIndex) + options.elementMarginTop;
    }
}

function verticalDistributionToCanvas_center(options, layoutedShapes){
    const columnBoudingBoxes = [];
    const numberOfRows = layoutedShapes.length;
    const numberOfColumns = layoutedShapes[0].length;

    for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        let yPosition =  options.windowMarginTop;
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
            if(layoutedShapes[rowIndex][columnIndex] === null){
                continue;
            }

            layoutedShapes[rowIndex][columnIndex].Translate(0, yPosition);
            yPosition = yPosition + layoutedShapes[rowIndex][columnIndex].height + options.elementMarginTop;
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

    for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        const deltaY = (maxColumnBoundingBoxHeight - (columnBoudingBoxes[columnIndex].y2 - columnBoudingBoxes[columnIndex].y1))/2;
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
            if(!layoutedShapes[rowIndex][columnIndex]){
                continue;
            }
            layoutedShapes[rowIndex][columnIndex].Translate(0, deltaY);
        }
    }
}
