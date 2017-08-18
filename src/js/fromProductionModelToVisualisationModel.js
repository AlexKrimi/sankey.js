export default function fromProductionModelToVisualisationModel(productionModel){
    const columns = [];

    function scanVertecesByOutgoingFlows(vertex, columnIndex){
        const isAlreadyAdded = !!columns.find(column => column.find(v => v === vertex));
        if(isAlreadyAdded)
            return;

        columns[columnIndex] = columns[columnIndex] || [];
        columns[columnIndex].push(vertex);
        for(let nextVertex of vertex.flowsTo)
            scanVertecesByOutgoingFlows(nextVertex, columnIndex + 1);
    }

    scanVertecesByOutgoingFlows(productionModel.source, 0);
    console.table(columns);
}
