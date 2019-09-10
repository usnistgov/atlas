import React, { Component } from 'react';
import styles from './UseCaseForceGraph.css';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

const equal = require('fast-deep-equal');

type Props = {
    nodes: object,
    links: object
};

/*
this.updateNode = (selection) => {

        selection.attr("transform", (d) => "translate(" + Math.max(d.size, Math.min(this.props.width - d.size, d.x)) + ","
                                                        + Math.max(d.size, Math.min(this.props.height - d.size, d.y)) + ")");
    };

    this.enterLink = (selection) => {
        selection.classed('link', true)
            .attr("stroke", (d) => d.color)
            .attr("stroke-width", 5);
    };

    this.updateLink = (selection) => {
        selection.attr("x1", (d) => Math.max(d.source.size, Math.min(this.props.width - d.source.size, d.source.x)))
            .attr("y1", (d) => Math.max(d.source.size, Math.min(this.props.height - d.source.size, d.source.y)))
            .attr("x2", (d) => Math.max(d.target.size, Math.min(this.props.width - d.target.size, d.target.x)))
            .attr("y2", (d) => Math.max(d.target.size, Math.min(this.props.height - d.target.size, d.target.y)));
    };
*/

export default class ForceGraph extends Component<Props> {
  props: Props;

  componentDidMount(){

    this.center = {'x': (this.props.width / 2), 'y': (this.props.height / 2)}

    this.simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-1000).distanceMax(600))
        .force("link", d3.forceLink().id(d => d.key).distance((link) => {
                            if(link.target.data.id === 0){
                                return 50;
                            } else {
                                return 200;
                            }
                    }))
        .force("collide",d3.forceCollide().radius(node => {
                if(node.data.id === -1){
                    return node.size + (6 * node.data.name.length)
                } else if (node.data.id === 0){
                    return node.size + (3 * node.data.name.length)
                } else {
                    return node.size + 20
                }
            }))
        .force("x", d3.forceX().x(this.center.x))
        .force("y", d3.forceY().y(this.center.y))

    this.dragstarted = (d) => {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
    }

    this.dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    this.dragended = (d) => {
        if (!d3.event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
    }

    // *****************************************************
    // ** d3 functions to manipulate attributes
    // *****************************************************

    this.enterNode = (selection) => {
        selection.classed('node', true);

        selection.append('circle')
            .attr("r", (node) => node.size)
            .attr("stroke", "white")
            .attr("stroke-width", "2px")
            .attr("fill", (node) => node.data.color)
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended));

        selection.append('text')
            .attr("fill", "white")
            .attr("stroke", (node) => {
                if(node.data.id === -1 || node.data.id === 0){
                    return "black"
                }
            })
            .attr("text-anchor", "middle")
            .attr("font-size", (node) => {
                if(node.data.id === -1){
                    return "36px"
                } else if(node.data.id === 0){
                    return "24px"
                } else {
                    return "20px"
                }
            })
            .attr("font-weight", (node) => {
                if(node.data.id === -1){
                    return "bolder"
                } else if(node.data.id === 0){
                    return "bold"
                } else {
                    return "medium"
                }
            })
            .text((node) => node.data.name);
    };

    this.updateNode = (selection) => {

        selection.attr("transform", (node) => "translate(" + node.x + "," + node.y + ")");
    };

    this.enterLink = (selection) => {
        selection.classed('link', true)
            .attr("stroke", (link) => link.color)
            .attr("stroke-width", 5);
    };

    this.updateLink = (selection) => {
        selection.attr("x1", (link) => link.source.x)
            .attr("y1", (link) => link.source.y)
            .attr("x2", (link) => link.target.x)
            .attr("y2", (link) => link.target.y);
    };

    this.updateGraph = (selection) => {
        selection.selectAll('.node')
            .call(this.updateNode);
        selection.selectAll('.link')
            .call(this.updateLink);
    };


    this.d3GraphContainer = d3.select(ReactDOM.findDOMNode(this.refs.svg))
        .attr("width", this.props.width)
        .attr("height", this.props.height)
        .call(d3.zoom().on('zoom', () => {
                            this.d3Graph.attr('transform', d3.event.transform)
                            }))

    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph))
                        .call(this.updateGraph);

    this.simulation.on('tick', () => {
      // after force calculation starts, call updateGraph
      // which uses d3 to manipulate the attributes,
      // and React doesn't have to go through lifecycle on each tick

      this.d3Graph.call(this.updateGraph);
    });
   }

  shouldComponentUpdate(nextProps) {

     this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

     var d3Nodes = this.d3Graph.selectAll('.node')
        .data(nextProps.nodes, (node) => node.key);
     d3Nodes.enter().append('g').call(this.enterNode);
     d3Nodes.exit().remove();
     d3Nodes.call(this.updateNode);

    var d3Links = this.d3Graph.selectAll('.link')
      .data(nextProps.links, (link) => link.key);
    d3Links.enter().insert('line', '.node').call(this.enterLink);
    d3Links.exit().remove();
    d3Links.call(this.updateLink);

    // we should actually clone the nodes and links
    // since we're not supposed to directly mutate
    // props passed in from parent, and d3's force function
    // mutates the nodes and links array directly
    // we're bypassing that here for sake of brevity in example
    this.simulation.nodes(nextProps.nodes)
    this.simulation.force("link").links(nextProps.links);

    return false;
  }



  render(){

    return (
        <svg ref="svg" className={styles.useCaseGraph}>
            <g ref="graph" />
        </svg>
    );
  }
}