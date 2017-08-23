import ShapeBase from './ShapeBase.js'
import EfficiencyLevel from '../../EfficiencyLevel.js';

export default class ImaginaryShape extends ShapeBase {
    constructor(id, imaginaryWidth, imaginaryHeight){
        super(id, imaginaryWidth,imaginaryHeight);
    }

    Render(){
        // It is imaginary, used for layouting and is not renderable.
    }
}
