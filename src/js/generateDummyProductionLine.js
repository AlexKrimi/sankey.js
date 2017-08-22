import Buffer from './plv/productionLineEntities/Buffer.js';
import Drain from './plv/productionLineEntities/Drain.js';
import Source from './plv/productionLineEntities/Source.js';
import Station from './plv/productionLineEntities/Station.js';
import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';

export default function (){
    const productionLine = new ProductionLineModel();

    const source = new Source();
    const drain = new Drain();

    const
        s1  = new Station('1STAR-0A', EfficiencyLevel.High, '90%'),
        s2  = new Station('2STAR-06', EfficiencyLevel.High, '90%'),
        s3  = new Station('3FA01', EfficiencyLevel.High, '90%'),
        s4  = new Station('4FB02', EfficiencyLevel.High, '90%'),
        s5  = new Station('5FC03', EfficiencyLevel.Low, '90%'),
        s6  = new Station('6FC04', EfficiencyLevel.High, '90%'),
        s7  = new Station('7FD01', EfficiencyLevel.Medium, '90%'),
        s8  = new Station('8KAR9605', EfficiencyLevel.Medium),
        s9  = new Station('9MAN8695', EfficiencyLevel.High),
        s10 = new Station('10FRS', EfficiencyLevel.Low, '20%'),
        s11 = new Station('11QP-98', EfficiencyLevel.Medium, '70%'),
        s12 = new Station('12QA', EfficiencyLevel.High),
        s13 = new Station('13FIN', EfficiencyLevel.High, '90%');

    const
        buffer1 = new Buffer('3/12', EfficiencyLevel.High),
        buffer2 = new Buffer('80%', EfficiencyLevel.Low),
        buffer3 = new Buffer('10%', EfficiencyLevel.Medium);

    [source, drain, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, buffer1, buffer2, buffer3]
    .forEach(vertex => productionLine.AddVertex(vertex));

    [
        [source, s1],
        [s1, s2],
        [s2, buffer1],

            [buffer1, s3],
            [ s3, s4],
                [s4, s5],
                [s4, s6],
                [s5, s7],
                [s6, s7],

            [buffer1, s8],
            [s8, buffer2],
            [buffer2, s9],
            [s9, s10],
            [s10, s11],

        [s7, buffer3],
        [s11, buffer3],
        [buffer3, s12],
        [s12, s13],
        [s13, drain],
    ].forEach(edge =>  productionLine.AddEdge(edge));

    return productionLine;
}
