export default function fromProductionModelToVisualisationModel(productionModel){
    const columns = [];

    function scanVertecesByOutgoingFlows(currentVertex, columnIndex){
        const isAlreadyAdded = !!columns.find(column => column.find(vertex => vertex === currentVertex));
        if(isAlreadyAdded)
            return;

        columns[columnIndex] = columns[columnIndex] || [];
        columns[columnIndex].push(currentVertex);
        for(let nextVertex of currentVertex.flowsTo)
            scanVertecesByOutgoingFlows(nextVertex, columnIndex + 1);
    }
    scanVertecesByOutgoingFlows(productionModel.source, 0);

    return columns;
}
