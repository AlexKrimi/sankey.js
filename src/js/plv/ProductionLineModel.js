import Buffer from './ProductionLineEntities/Buffer.js';
import Drain from './ProductionLineEntities/Drain.js';
import Source from './ProductionLineEntities/Source.js';
import Station from './ProductionLineEntities/Station.js';
import EntityBase from './ProductionLineEntities/EntityBase.js';
import EfficiencyLevel from './EfficiencyLevel.js';

export default class ProductionLineModel {
    constructor(){
        this.verteces = [];
        this.edges = [];
    }

    AddVertex(entity){
        const immediateParentPrototypeName = Object.getPrototypeOf(entity.constructor).name;
        if(!immediateParentPrototypeName)
            throw new Error(`Immediate parent prototype of entity should be of type "EntityBase". Instead it has no parent.`);
        if(immediateParentPrototypeName !== 'EntityBase')
            throw new Error(`Immediate parent prototype of entity should be of type "EntityBase". Found "${immediateParentPrototypeName}" instead.`);
        if(this.verteces.includes(entity)) {
            console.warn(`Vertex already added to the model. Vertex:`, entity);
            return this;
        }

        this.verteces.push(entity);
        return this;
    }

    AddEdge(vertexTuple){
        const isElementAlreadyAddedToModel = this.edges.findIndex(existingVertex => existingVertex[0] === vertexTuple[0] && existingVertex[1] && vertexTuple[1]) !== -1;

        if(isElementAlreadyAddedToModel){
            console.warn('Identical edge already added to the model.', vertexTuple);
            return;
        }
        this.edges.push(vertexTuple);
    }

    AddEdges(newVertexTuples){
        newVertexTuples.forEach(function(newVertexTuple) {
            this.AddEdge(newVertexTuple);
        }, this);
    }

    AddVertecesAndEdges(vertecesAndOutgoingFlowsCollection){
        for(let collectionIndex = 0; collectionIndex < vertecesAndOutgoingFlowsCollection.length; collectionIndex++){
            const currentCollection = vertecesAndOutgoingFlowsCollection[vertexIndex];
            const vertex = currentCollection[0];
            const outgoingFlows = currentCollection[1];
            this.verteces.push(vertex)


            for(let flowIndex = 0; flowIndex < outgoingFlows.length; flowIndex++){
                this.AddEdge([vertex, outgoingFlows[flowIndex]]);
            }
        }
    }

    IsValid(){
        const numberOfSources = this.verteces.filter(vertex => vertex.constructor.name === 'Source').length;
        if(numberOfSources !== 1) {
            console.warn(`Model should have exactly one source vertex. Instead found ${numberOfSources} of them.`);
            return false;
        }

        const numberOfDrains = this.verteces.filter(vertex => vertex.constructor.name === 'Drain').length;
        if(numberOfDrains !== 1) {
            console.warn(`Model should have exactly one drain vertex. Instead found ${numberOfDrains} of them.`);
            return false;
        }

        return true;
    }
}
