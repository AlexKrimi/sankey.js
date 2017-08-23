export default class EntityBase {
    constructor(){
        this.flowsTo = [];
        this.id = Symbol('Vertex');
    }

    AddFlowTo(entity){
        this.flowsTo.push(entity);
    }
}
