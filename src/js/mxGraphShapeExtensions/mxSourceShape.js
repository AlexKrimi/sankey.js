(function(){
    function mxSourceShape(bounds, fill, stroke, strokewidth){
        mxShape.call(this);
        this.bounds = bounds;
        this.fill = fill;
        this.stroke = stroke;
        this.strokewidth = (strokewidth != null) ? strokewidth : 1;
    };
    mxUtils.extend(mxSourceShape, mxShape);

    mxSourceShape.prototype.paintVertexShape = function(context, x, y, w, h){
        const radius = 15;

        context.begin();
        context.setStrokeColor('#000000');
        context.setFillColor('#ffffff');
        context.setStrokeWidth(3.5)
        context.ellipse(x, y, 2 * radius, 2 * radius)
        context.close();
        context.fillAndStroke();
    };

    mxCellRenderer.prototype.defaultShapes['mxgraph.custom.source'] = mxSourceShape;
})();
