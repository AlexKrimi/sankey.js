import Buffer from './plv/ProductionLineEntities/Buffer.js';
import Drain from './plv/ProductionLineEntities/Drain.js';
import Source from './plv/ProductionLineEntities/Source.js';
import Station from './plv/ProductionLineEntities/Station.js';

import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';


window.onload = function(){
    d3.select("body")
    .append("svg")
    .attr("width", 50)
    .attr("height", 50)
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .style("fill", "purple");
    // let productionModel = new ProductionLineModel();
    // let source = new Source();
    // let a = new Station('S1', EfficiencyLevel.High, '80%');
    // let b = new Buffer('Hoho', EfficiencyLevel.Low);
    // productionModel.AddVertex(source);
    // productionModel.AddVertex(a);
    // productionModel.AddVertex(b);

    // productionModel.AddEdges([
    //     [source, a],
    //     [a, b]
    // ]);

    // productionModel.AddEdges([
    //     [source, a]
    // ]);

    // productionModel.IsValid();
}
