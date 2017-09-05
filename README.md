_Readme and wikis are work in progress._
# plv.js
JavaScript framework for creating Sankey diagrams with custom graphics.
<img src="readme-resources/screenshot.png" alt="Screenshot" width="100%"/>

# Specifics
## Supported diagrams
Diagrams that are supported can be characterized with following properties.

| Supported | Property | Elaboration |
| ------------- | ------------- | ------------- |
| ✅ Yes | Planar graphs  | |
| ✅ Yes | Non-planar graphs  | It should work. Haven't tested that one yet. 🤔 |
| ✅ Yes | Directed graph  | Graph should be directed. |
| ✅ Yes | Acyclic graph  | Graph should be acyclic (e.g. no feedback loops, no material refinement loops). |
| ❌ No | More than one entry point (i.e. source)?  | There should be only one entry point. Lay outing algorithm will use it starting point. |
| ❌ No | More than one exit points (i.e. drains)?  | There should be only one drain point. Framework does not currently support this but it can be easily upgraded. |
| ❌ No | Orthogonal polyline drawings  | "Orthogonal means that all lines must be drawn either horizontal or vertical, with no intermediate slopes. Polyline means that each graph edge is represented by a chain of straight-line segments, connected by vertices or bends."<sup>[1]</sup>.  Nodes can be connected only using relatively straight line that bends as it gets closer to the nodes (implemented using B-spline).  |

[1] Skiena, Steven S. “15.10 Drawing Graphs Nicely.” The Algorithm Design Manual, Springer, 2012, pp. 513–516.

## Features
## Very general technical information

# Setup
## How to run example project?
## How to include plv.js in my project?
## How to setup dev environment?

# API Details and Implementation details


