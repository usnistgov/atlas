import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

const equal = require('fast-deep-equal');

type Props = {
    nodes: object,
    links: object
};

var width = 1350;
var height = 850;

var center = {'x': (width / 2), 'y': (height / 2)}

var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(center.x).y(center.y))
    .force("charge",d3.forceManyBody().strength([-700]))
    .force("link", d3.forceLink().id(d =>
                   d.key).distance((link) => {
                            if(link.target.data.id === 0){
                                return 40;
                            } else {
                                return 200;
                            }
                    }))
    .force("collide",d3.forceCollide().radius(d => {
            return d.size + 10
        }))

var dragstarted = (d) => {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

var dragged = (d) => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

var dragended = (d) => {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

var enterNode = (selection) => {
  selection.classed('node', true);

  selection.append('circle')
    .attr("r", (d) => d.size)
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .attr("fill", (d) => d.data.color)
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  selection.append('text')
    .attr("fill", "white")
    .attr("text-anchor", "middle")
    .text((d) => d.data.name);
};

var updateNode = (selection) => {

  selection.attr("transform", (d) => "translate(" + Math.max(d.size, Math.min(width - d.size, d.x)) + ","
                                                  + Math.max(d.size, Math.min(height - d.size, d.y)) + ")");
};

var enterLink = (selection) => {
  selection.classed('link', true)
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", 5);
};

var updateLink = (selection) => {
  selection.attr("x1", (d) => Math.max(d.source.size, Math.min(width - d.source.size, d.source.x)))
    .attr("y1", (d) => Math.max(d.source.size, Math.min(height - d.source.size, d.source.y)))
    .attr("x2", (d) => Math.max(d.target.size, Math.min(width - d.target.size, d.target.x)))
    .attr("y2", (d) => Math.max(d.target.size, Math.min(height - d.target.size, d.target.y)));
};

var updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
};

export default class ForceGraph extends Component<Props> {
  props: Props;

  componentDidMount(){

    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    this.d3Graph.call(updateGraph);

    simulation.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick

      this.d3Graph.call(updateGraph);
    });
   }

  shouldComponentUpdate(nextProps) {

     this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

     var d3Nodes = this.d3Graph.selectAll('.node')
        .data(nextProps.nodes, (node) => node.key);
     d3Nodes.enter().append('g').call(enterNode);
     d3Nodes.exit().remove();
     d3Nodes.call(updateNode);

    var d3Links = this.d3Graph.selectAll('.link')
      .data(nextProps.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(enterLink);
    d3Links.exit().remove();
    d3Links.call(updateLink);

    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    simulation.nodes(nextProps.nodes)
    simulation.force("link").links(nextProps.links);

    return false;
  }

  render(){

    return (
        <svg width={width} height={height}>
            <g ref='graph' />
        </svg>
    );
  }
}