import ShapeBase from './ShapeBase.js'
import EfficiencyLevel from '../../EfficiencyLevel.js';

export default class ImaginaryShape extends ShapeBase {
    static get Id(){
        return Symbol('ImaginaryVertex');
    }

    constructor(imaginaryWidth, imaginaryHeight){
        super(ImaginaryShape.Id, imaginaryWidth,imaginaryHeight);
    }

    Render(){
        // It is imaginary, used for layouting and is not renderable.
    }
}
