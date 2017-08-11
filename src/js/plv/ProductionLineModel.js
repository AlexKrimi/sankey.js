import Station from './ProductionLineEntities/Station.js';
import Buffer from './ProductionLineEntities/Buffer.js';
import Source from './ProductionLineEntities/Source.js';
import Station from './ProductionLineEntities/Drain.js';
import EfficiencyLevel from './EfficiencyLevel.js';

export default class ProductionLineModel {
    constructor(){
        this.verteces = [];
        this.edges = [];
    }

    AddStation(title, efficiencyLevel, efficiencyRelativeAmount){
        let newVertex = new Station(title, EfficiencyLevel.low, efficiencyRelativeAmount) ;
        this.verteces.push(newVertex);
        return newVertex;
    }

    AddBuffer(label){
        let newVertex = new Buffer(label) ;
        this.verteces.push(newVertex);
        return newVertex;
    }

    AddSource(){
        let newVertex = new Source() ;
        this.verteces.push(newVertex);
        return newVertex;
    }

    AddDrain(){
        let newVertex = new Drain() ;
        this.verteces.push(newVertex);
        return newVertex;
    }

    AddEdge(from, to){

    }
}
