import BufferEntity from './plv/model/domain/Buffer.js';
import DrainEntity from './plv/model/domain/Drain.js';
import SourceEntity from './plv/model/domain/Source.js';
import StationEntity from './plv/model/domain/Station.js';
import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ModelManager from './plv/model/ModelManager.js';

export default function (){
    const modelManager = new ModelManager();

    const source = new SourceEntity();
    const drain = new DrainEntity();

    const
        s1  = new StationEntity('1STAR-0A', EfficiencyLevel.High, '90%'),
        s2  = new StationEntity('2STAR-06', EfficiencyLevel.High, '90%'),
        s3  = new StationEntity('3FA01', EfficiencyLevel.High, '90%'),
        s4  = new StationEntity('4FB02', EfficiencyLevel.High, '90%'),
        s5  = new StationEntity('5FC03', EfficiencyLevel.Low, '90%'),
        s6  = new StationEntity('6FC04', EfficiencyLevel.High, '90%'),
        s7  = new StationEntity('7FD01', EfficiencyLevel.Medium, '90%'),
        s8  = new StationEntity('8KAR9605', EfficiencyLevel.Medium),
        s9  = new StationEntity('9MAN8695', EfficiencyLevel.High),
        s10 = new StationEntity('10FRS', EfficiencyLevel.Low, '20%'),
        s11 = new StationEntity('11QP-98', EfficiencyLevel.Medium, '70%'),
        s12 = new StationEntity('12QA', EfficiencyLevel.High),
        s13 = new StationEntity('13FIN', EfficiencyLevel.High, '90%');

    const
        buffer1 = new BufferEntity('3/12', EfficiencyLevel.High),
        buffer2 = new BufferEntity('80%', EfficiencyLevel.Low),
        buffer3 = new BufferEntity('10%', EfficiencyLevel.Medium);

    [source, drain, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, buffer1, buffer2, buffer3]
    .forEach(vertex => modelManager.AddVertex(vertex));

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
    ].forEach(edge =>  modelManager.AddEdge(edge));

    return modelManager;
}
