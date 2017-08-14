import Buffer from './ProductionLineEntities/Buffer.js';
import Drain from './ProductionLineEntities/Drain.js';
import Source from './ProductionLineEntities/Source.js';
import Station from './ProductionLineEntities/Station.js';
import EfficiencyLevel from './EfficiencyLevel.js';

export default class ProductionLineModel {
    constructor(){
        this.verteces = [];
        this.edges = [];
    }

    AddVertex(entity){

        this.verteces.push(entity);
        return this;
    }

    AddEdge(from, to){

    }
}
