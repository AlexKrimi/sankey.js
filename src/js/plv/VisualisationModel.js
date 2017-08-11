// export default class ProductionLineModel(mxGraph) {
//     constructor(){
//         this.nodes = [];
//         this.mxGraph = mxGraph;
//         this.mxGraphParent = mxGraphs.getDefaultParent();
//     }

//     AddStation(title, efficiencyLevel, efficiencyRelativeAmount){
//         var description = `shape=mxgraph.custom.station;title=${title};`;
//         description += !!efficiencyLevel ? `efficiencyLevel=${efficiencyLevel};` : '';
//         description += !!efficiencyRelativeAmount ? `efficiencyRelativeAmount=${efficiencyRelativeAmount};` : '';
//         let newVertex = graph.insertVertex(this.mxGraph, null, null, null, null, x, y, shapeDefinition);
//         this.nodes.push(newVertex);
//         return newVertex;
//     }
// }
