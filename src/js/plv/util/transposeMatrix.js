// Takes matrix of dimensions m x n and transposes it to new matrix of dimensions n x m
// n - number of rows of initial matrix
// m - number of columns of initial matrix
export default function transposeMatrix(originalMatrix){
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
