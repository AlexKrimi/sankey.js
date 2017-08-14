export default class EntityBase {
    constructor(){
        this.flowsTo = [];
    }

    AddFlowTo(entity){
        this.flowsTo.push(entity);
    }
}
