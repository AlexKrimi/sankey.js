import applyDummyGraph from './applyDummyGraph.js';
import './mxGraphShapeExtensions/mxBufferShape.js';
import './mxGraphShapeExtensions/mxCyclicStationShape.js';
import './mxGraphShapeExtensions/mxDrainShape.js';
import './mxGraphShapeExtensions/mxSourceShape.js';
import './mxGraphShapeExtensions/mxStationShape.js';

import Buffer from './plv/ProductionLineEntities/Buffer.js';
import Drain from './plv/ProductionLineEntities/Drain.js';
import Source from './plv/ProductionLineEntities/Source.js';
import Station from './plv/ProductionLineEntities/Station.js';

import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';

(function(pieChart, applyDummyGraph){
    window.onload = function(){
        main(document.getElementById('graphContainer'), applyDummyGraph);
        let productionModel = new ProductionLineModel();
        let source = new Source();
        let a = new Station('S1', EfficiencyLevel.High, '80%');
        let b = new Buffer('Hoho', EfficiencyLevel.Low);
        productionModel.AddVertex(source);
        productionModel.AddVertex(a);
        productionModel.AddVertex(b);

        productionModel.AddEdges([
            [source, a],
            [a, b]
        ]);

        productionModel.AddEdges([
            [source, a]
        ]);

        productionModel.IsValid();
    }
})(window.pieChart, applyDummyGraph);

function main(container, renderDummyGraph) {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
        return;
    }

    mxEvent.disableContextMenu(container);

    var graph = new mxGraph(container);
    graph.setPanning(true);
    graph.setAllowDanglingEdges(false);
    graph.panningHandler.useLeftButtonForPanning = true;
    graph.connectionHandler.select = false;
    graph.view.setTranslate(20, 20);
    graph.container.style.backgroundColor = 'white';
    graph.setEnabled(false); // Makes the graph read-only
    graph.setCellsEditable(false); // Disables basic selection and cell handling

    var layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_WEST);
    layout.intraCellSpacing = 60; // The spacing buffer added between cells on the same layer.  Default is 30.
    layout.interRankCellSpacing = 50; // The spacing buffer added between cell on adjacent layers.  Default is 50.
    layout.interHierarchySpacing = 100; // The spacing buffer between unconnected hierarchies.  Default is 60.
    layout.parallelEdgeSpacing = 100; // The distance between each parallel edge on each ranks for long edges.

    var parent = graph.getDefaultParent();

    var executeLayout = function(change) {
        const model = graph.getModel();
        model.beginUpdate();
        try
        {
            if (change != null)
                change(graph, model, parent);

            layout.execute(graph.getDefaultParent());
        }
        catch (exception)
        {
            throw exception;
        }
        finally
        {
            graph.getModel().endUpdate();
        }
    };
    executeLayout(applyDummyGraph)
};
