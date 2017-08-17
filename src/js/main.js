import Buffer from './plv/ProductionLineEntities/Buffer.js';
import Drain from './plv/ProductionLineEntities/Drain.js';
import Source from './plv/ProductionLineEntities/Source.js';
import Station from './plv/ProductionLineEntities/Station.js';

import EfficiencyLevel from './plv/EfficiencyLevel.js';
import ProductionLineModel from './plv/ProductionLineModel.js';

window.onload = function(){
    var a = { title: 'A', position: {c:0, r:0}, fill: '#8fb239' },
        b = { title: 'B', position: {c:1, r:0}, fill: '#8fb239' },
        c = { title: 'C', position: {c:1, r:1}, fill: '#BE120C' };

    a.links = [b, c];
    b.links = [];
    c.links = [];

    var columns = [a, b, c];

    const canvas =
    d3.select("body")
    .append("svg")
    .attr("width", 1800)
    .attr("height", 1000);

    const rectWidth = 25;
    const rectHeight = 100;
    const leftMargin = 120;
    const topMargin = 100;

    var g = canvas
    .selectAll('g')
    .data(columns)
    .enter()
    .append("g");

    g.append('rect')
        .attr("x", (d, i) => rectWidth * d.position.c + d.position.c*leftMargin)
        .attr("y", (d, i) => rectHeight * (d.position.r) + d.position.r*topMargin)
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .style("fill", (d, i) => d.fill);

    g.append('text')
        .attr("x", (d, i) => rectWidth * d.position.c + d.position.c*leftMargin + 7)
        .attr("y", (d, i) => rectHeight * (d.position.r) + d.position.r*topMargin + 50)
        .attr("fill", "white")
        .text((d, i) => d.title);

    var lineData1 = [
        { x: rectWidth, y: rectHeight * 0.25 },
        { x: rectWidth + leftMargin/2, y: rectHeight * 0.25},
        { x: rectWidth + leftMargin - leftMargin/2, y:  rectHeight * 0.25 + 1 },
        { x: rectWidth + leftMargin, y: rectHeight * 0.25 + 1 }
    ];
    var lineData2 = [
        { x: rectWidth, y: rectHeight * 0.75  },
        { x: rectWidth + leftMargin/2, y: rectHeight * 0.75 },
        { x: rectWidth + leftMargin - leftMargin/2, y: rectHeight + topMargin + rectHeight * 0.25 },
        { x: rectWidth + leftMargin, y: rectHeight + topMargin + rectHeight * 0.25 }
    ];

    var lineFunction =
        d3.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .curve(d3.curveBasis);

    canvas.append('path')
        .attr('d', lineFunction(lineData1))
        .attr('class', 'flow')
        .attr("stroke", "gray")
        .attr("stroke-width", rectHeight * 0.5)
        .attr('data-gradient-start', "red")
        .attr('data-gradient-end', "blue")
        .attr("fill", "none");

    canvas.append('path')
        .attr('class', 'gradient')
        .attr('d', lineFunction(lineData2))
        .attr('data-gradient-start', "#8fb239")
        .attr('data-gradient-end', "#be120c")
        .attr('class', 'flow')
        .attr("stroke", "gray")
        .attr("stroke-width", rectHeight * 0.5)
        .attr("fill", "none");

    var path = d3.selectAll('.flow').remove();

    ///SUPSTITUCIJA
    const allNodes = path.nodes();
    for (var index = 0; index < allNodes.length; index++) {
        var element = allNodes[index];
        var color = d3.interpolateRgb(element.dataset.gradientEnd, element.dataset.gradientEnd);
        canvas
        .selectAll('.flow')
        .data(quads(sampleSingle(element, 2)))
        .enter()
        .append("path")
        .style("fill", function (d) { return color(d.t); })
        .style("stroke", function (d) { return color(d.t); })
        .attr("d", function (d) { return lineJoin(d[0], d[1], d[2], d[3], 32); });
    }


    // Sample the SVG path uniformly with the specified precision.
    function sampleSingle(path, precision) {
        var n = path.getTotalLength(), t = [0], i = 0, dt = precision;
        while ((i += dt) < n) t.push(i);
        t.push(n);
        return t.map(function (t) {
            var p = path.getPointAtLength(t), a = [p.x, p.y];
            a.t = t / n;
            return a;
        });
    }

    // Compute quads of adjacent points [p0, p1, p2, p3].
    function quads(points) {
        return d3.range(points.length - 1).map(function (i) {
            var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];
            a.t = (points[i].t + points[i + 1].t) / 2;
            return a;
        });
    }

    // Compute stroke outline for segment p12.
    function lineJoin(p0, p1, p2, p3, width) {
        var u12 = perp(p1, p2),
            r = width / 2,
            a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
            b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
            c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
            d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

        if (p0) { // clip ad and dc using average of u01 and u12
            var u01 = perp(p0, p1), e = [p1[0] + u01[0] + u12[0], p1[1] + u01[1] + u12[1]];
            a = lineIntersect(p1, e, a, b);
            d = lineIntersect(p1, e, d, c);
        }

        if (p3) { // clip ab and dc using average of u12 and u23
            var u23 = perp(p2, p3), e = [p2[0] + u23[0] + u12[0], p2[1] + u23[1] + u12[1]];
            b = lineIntersect(p2, e, a, b);
            c = lineIntersect(p2, e, d, c);
        }

        return "M" + a + "L" + b + " " + c + " " + d + "Z";
    }

    // Compute intersection of two infinite lines ab and cd.
    function lineIntersect(a, b, c, d) {
        var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
            y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
            ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
        return [x1 + ua * x21, y1 + ua * y21];
    }

    // Compute unit vector perpendicular to p01.
    function perp(p0, p1) {
        var u01x = p0[1] - p1[1], u01y = p1[0] - p0[0],
            u01d = Math.sqrt(u01x * u01x + u01y * u01y);
        return [u01x / u01d, u01y / u01d];
    }
}
