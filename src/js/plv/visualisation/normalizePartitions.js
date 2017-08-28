import ImaginaryShape from './shapes/ImaginaryShape.js';

export default function normalize(columnPartitionsWithShapes, productionLine){
    const normalizedLayout = [];
    const numberOfRows = columnPartitionsWithShapes.length;
    const numberOfColumns = columnPartitionsWithShapes[0].length;

    const getColumnIndexByVertexId = function(matrix, id){
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
            for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
                const element = matrix[rowIndex][columnIndex];
                if(element && element.id === id)
                    return columnIndex;
            }
        }
        return -1;
    }

    const hasVertecesPointingToItFromSameColumn = function(matrix, destinationVertexId, columnIndex){
        return productionLine
            .GetIncomingEdge(destinationVertexId)
            .some(
                incomingEdge => getColumnIndexByVertexId(matrix, incomingEdge.from.id) === columnIndex
            );
    }

    for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        const firstColumn = [];
        const secondColumn = [];
        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
            const currentShape = columnPartitionsWithShapes[rowIndex][columnIndex];
            if(currentShape === null){
                firstColumn.push(null);
                secondColumn.push(null);
                continue;
            }
            const currentVertex = productionLine.Get(currentShape.id);

            if(hasVertecesPointingToItFromSameColumn(columnPartitionsWithShapes, currentVertex.id, columnIndex)){
                firstColumn.push(new ImaginaryShape(currentShape.width, currentShape.height));
                secondColumn.push(currentShape);
            } else {
                firstColumn.push(currentShape);
                secondColumn.push(new ImaginaryShape(currentShape.width, currentShape.height));
            }
        }
        const secondColumnShouldBeAdded = secondColumn.some(x => !!x && x.id !== ImaginaryShape.Id);

        for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
            normalizedLayout[rowIndex] = normalizedLayout[rowIndex] || [];
            normalizedLayout[rowIndex].push(firstColumn[rowIndex]);
            if(secondColumnShouldBeAdded)
                normalizedLayout[rowIndex].push(secondColumn[rowIndex]);
        }
    }
    return normalizedLayout;
}
