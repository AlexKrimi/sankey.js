(function(){
    const efficiencyLevelToSvgHref = {
        low:      '#station-low',
        moderate: '#station-moderate',
        high:     '#station-high'
    }

    function mxStationShape(bounds, fill, stroke, strokewidth){
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    };
    mxUtils.extend(mxStationShape, mxShape);

    mxStationShape.prototype.cst = {
        TITLE : 'title',
        EFFICIENCY_LEVEL: 'efficiencyLevel',
        EFFICIENCY_RELATIVE_AMOUNT: 'efficiencyRelativeAmount',
    };

    mxStationShape.prototype.paintVertexShape = function(context, x, y, w, h){
        const title = mxUtils.getValue(this.style, mxStationShape.prototype.cst.TITLE, 'N/A');
        const efficiencyLevel = mxUtils.getValue(this.style, mxStationShape.prototype.cst.EFFICIENCY_LEVEL, efficiencyLevelToSvgHref.high);
        const efficiencyRelativeAmount = mxUtils.getValue(this.style, mxStationShape.prototype.cst.EFFICIENCY_RELATIVE_AMOUNT, 'N/A');
        const href = efficiencyLevelToSvgHref[efficiencyLevel];

        var gElement= context.root.appendChild(context.createElement('g'));

        var useElement = gElement.appendChild(context.createElement('use'));
        useElement.setAttribute('href', href);
        useElement.setAttribute('x', x);
        useElement.setAttribute('y', y);
        useElement.setAttribute('width', '75');
        useElement.setAttribute('height', '68.05');

        var titleElement = gElement.appendChild(context.createElement('text'));
        titleElement.setAttribute('font-family', 'Arial');
        titleElement.setAttribute('fill', 'white');
        titleElement.setAttribute('x', x + 5);
        titleElement.setAttribute('y', y + 48);
        titleElement.setAttribute('font-size', '12');
        titleElement.textContent = title;

        var efficiencyElement = gElement.appendChild(context.createElement('text'));
        efficiencyElement.setAttribute('font-family', 'Arial');
        efficiencyElement.setAttribute('fill', 'white');
        efficiencyElement.setAttribute('x', x + 5);
        efficiencyElement.setAttribute('y', y + 64);
        efficiencyElement.setAttribute('font-size', '12');
        efficiencyElement.textContent = efficiencyRelativeAmount;
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.station'] = mxStationShape;
})();
