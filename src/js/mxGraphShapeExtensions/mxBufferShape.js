
(function(mxUtils, mxBufferShape){
        const efficiencyLevelToSvgHref = {
        low:      '#buffer-low',
        moderate: '#buffer-moderate',
        high:     '#buffer-high'
    }
    function mxBufferShape(bounds, fill, stroke, strokewidth){
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    };
    mxUtils.extend(mxBufferShape, mxShape);

    mxBufferShape.prototype.cst = {
        TITLE : 'title',
        EFFICIENCY_LEVEL: 'efficiencyLevel'
    };

    mxBufferShape.prototype.paintVertexShape = function(context, x, y, w, h){
        const title = mxUtils.getValue(this.style, mxBufferShape.prototype.cst.TITLE, 'N/A');
        const efficiencyLevel = mxUtils.getValue(this.style, mxBufferShape.prototype.cst.EFFICIENCY_LEVEL, efficiencyLevelToSvgHref.high);
        const href = efficiencyLevelToSvgHref[efficiencyLevel];

        var gElement= context.root.appendChild(context.createElement('g'));

        var useElement = gElement.appendChild(context.createElement('use'));
        useElement.setAttribute('href', href);
        useElement.setAttribute('x', x);
        useElement.setAttribute('y', y);
        useElement.setAttribute('width', '54');
        useElement.setAttribute('height', '55.49');

        var textElement = gElement.appendChild(context.createElement('text'));
        textElement.setAttribute('font-family', 'Arial');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('fill', 'white');
        textElement.setAttribute('x', x + 27);
        textElement.setAttribute('y', y + 50);
        textElement.setAttribute('font-size', '12');
        textElement.textContent = title;
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.buffer'] = mxBufferShape;
})(window.mxUtils, window.mxBufferShape);
