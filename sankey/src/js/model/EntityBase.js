export default class EntityBase {
    constructor(){
        this.flowsTo = [];
        this.flowsFrom = [];
        this.id = Symbol('Vertex');
    }
}
