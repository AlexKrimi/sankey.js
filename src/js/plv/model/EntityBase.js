export default class EntityBase {
    constructor(){
        this.flowsTo = [];
        this.flowsFrom = [];
        this.id = Symbol('Vertex');
    }

    AddFlowTo(entity){
        this.flowsTo.push(entity);
    }
    AddFlowFrom(entity){
        this.flowsFrom.push(entity);
    }
}
