import React, { Component } from 'react';
import styles from './UseCaseForceGraph.css';
import ReactDOM from 'react-dom';
import ReactLoading from 'react-loading';
import * as d3 from 'd3';
import Node from './GraphNode';
import Link from './GraphLink';
import ForceGraph from './d3Graph';

type Props = {
    use_case: object;
    actors: object,
    cybersecurity_threats: object,
    disciplines: object,
    activities: object,
    responding_organizations: object,
    technologies: object,
    information_categories: object,
    information_types: object,
    locations: object
};

var width = 1300;
var height = 800;


export default class UseCaseForceGraph extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.staticFields = ['id', 'name', 'description', 'source', 'concept_links'];

    this.state = {
        nodes: [],
        links: []
    }

  }

  componentDidMount(){
    this.setGraphNodes()
  }

  setGraphNodes(){

    let nodeCount = 1;
    let latestCategoryNode;

    let colorCategories = {
            'information_types': "green",
            'actors': 'indigo',
            'activities': 'darkkhaki',
            'responding_organizations': 'red',
            'disciplines': 'orange',
            'technologies': 'grey',
            'locations': 'sienna',
            'cybersecurity_threats': 'teal'
     }

    let createNodes = [{
        'key': nodeCount,
        'data': {'name': this.props.use_case.name, 'id': -1, 'color': 'dodgerblue'},
        'size': 100,
        'weight': 3
    }]

    createNodes =  createNodes.concat(_.compact(_.flatten(_.map(this.props.use_case, (item, category) => {

        if(!this.staticFields.includes(category)){
            ++nodeCount;
            let newNodes = [{
                    'key': nodeCount,
                    'data': {'name': category, 'id': 0, 'color': colorCategories[category]},
                    'size': 75,
                    'weight': 5
            }];

            newNodes = newNodes.concat(_.map(item, (entry) => {
                ++nodeCount;
                return {
                    'key': nodeCount,
                    'data': {...entry, 'color': colorCategories[category]},
                    'size': 50,
                    'weight': 1
                    }
            }))

            return newNodes;
        }
    }))));

    let createLinks = _.compact(_.map(createNodes, (node, index) => {

        if(node.data.id !== -1){
            let newLink;

            if(node.data.id === 0){

                latestCategoryNode = node;

                newLink = {
                    'key': node.key + "," + 1,
                    'source': node,
                    'target': createNodes[0],
                    'size': 3,
                    'weight': 1,
                    'color': createNodes[0].data.color
                }

            } else {

                newLink =  {
                    'key': node.key + "," + 1,
                    'source': node,
                    'target': latestCategoryNode,
                    'size': 3,
                    'weight': 1,
                    'color': latestCategoryNode.data.color
                }

            }
            console.log()
            return newLink;
        }
    }));

    this.setState({
            nodes: createNodes,
            links: createLinks
        });
    }

  render(){

    return(
        <div className={styles.useCaseGraph}>
            <ForceGraph
                nodes={this.state.nodes}
                links={this.state.links}
            />
        </div>
        )

    }
}