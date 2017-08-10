'use strict';

function applyDummyGraph(graph, model, parent){
    function createVertex(x, y, shapeDefinition){
        return graph.insertVertex(parent, null, null, null, null, x, y, shapeDefinition);
    }
    function createStation(title, efficiencyLevel, efficiencyRelativeAmount){
        var description = `shape=mxgraph.custom.station;title=${title};`;
        description += !!efficiencyLevel ? `efficiencyLevel=${efficiencyLevel};` : '';
        description += !!efficiencyRelativeAmount ? `efficiencyRelativeAmount=${efficiencyRelativeAmount};` : '';
        return createVertex(75, 68.05, description);
    }
    function createCyclicStation(title, efficiencyLevel, efficiencyRelativeAmount){
        var description = `shape=mxgraph.custom.cyclicStation;title=${title};`;
        description += !!efficiencyLevel ? `efficiencyLevel=${efficiencyLevel};` : '';
        description += !!efficiencyRelativeAmount ? `efficiencyRelativeAmount=${efficiencyRelativeAmount};` : '';
        return createVertex(75, 95.25, description);
    }
    function createBuffer(title, efficiencyLevel){
        return createVertex(54, 55.49, `shape=mxgraph.custom.buffer;title=${title};efficiencyLevel=${efficiencyLevel};`);
    }
    function createDivergentOrConvergent(title, efficiencyLevel){
        return graph.insertVertex(parent, null, null, null, null, 1, 1);
    }
    var source = createVertex(30, 30, 'shape=mxgraph.custom.source;');
    var drain = createVertex(30, 30, 'shape=mxgraph.custom.drain;');
    
    var s1 = createStation('1STAR-0A', 'high;', '90%');
    var s2 = createStation('2STAR-06', 'high;', '90%');
    var s3 = createStation('3FA01','high;', '90%');
    var s4  = createStation('4FB02','high;', '90%');
    var s5  = createStation('5FC03','high;', '90%');
    var s6  = createStation('6FC04','high;', '90%');
    var s7  = createStation('7FD01','high;', '90%');
    var s8  = createCyclicStation('8KAR9605','moderate');
    var s9  = createStation('9MAN8695','high;');
    var s10  = createStation('10FRS','low;', '20%');
    var s11  = createStation('11QP-98','moderate;', '70%');
    var s12  = createStation('12QA','high;');
    var s13  = createStation('13FIN','high;', '90%');

    var buffer1  = createBuffer('3/12', 'high');
    var buffer2  = createBuffer('80%', 'low');
    var buffer3  = createBuffer('10%', 'moderate');

    var div1  = createDivergentOrConvergent();
    var conv1  = createDivergentOrConvergent();
    var div2  = createDivergentOrConvergent();
    var conv2  = createDivergentOrConvergent();

    [
        [source, s1],
        [s1, s2],
        [s2, buffer1],
            [buffer1, div1],

            [div1, s3],
            [ s3, s4],
                [s4, div2],
                [ div2, s5],
                [div2, s6],
                [s5, conv2],
                [s6, conv2],
            [conv2, s7],
            
            [div1, s8],
            [s8, buffer2],
            [buffer2, s9],
            [s9, s10],
            [s10, s11],

            [s7, conv1],
            [s11, conv1],
        
        [conv1, buffer3],
        [buffer3, s12],
        [s12, s13],
        [s13, drain],

        // Feedback loops
        [conv2, s3],
        //[s8, s8],
        [ s13, s1]
    ].forEach(function(edge) { graph.insertEdge(parent, null, '', edge[0], edge[1]); });
}