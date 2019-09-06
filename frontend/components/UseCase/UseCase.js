import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import routes from '../../constants/routes';
import styles from './UseCase.css';
import BootstrapTable  from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Description from "@material-ui/icons/Description";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Delete from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';
import SanitizedHTML from 'react-sanitized-html';
import Switch from 'react-switch';
import UseCaseForceGraph from '../UseCaseGraph/UseCaseForceGraph';

type Props = {
    use_case: object;
};

const noDataIndication = () => (
    <div className = {styles.noDataIndication}>
      <p>None</p>
    </div>
);

export default class UseCase extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        showGraphView: false,
        showConceptLinks: false

    }

    this.rowEvents =  (tableName) => {

        return {

            onMouseEnter: (e, row, rowIndex) => {

                if(this.inConceptLinks(row)){
                    this.setState(state => {
                        return {
                            showConceptLinks: true
                        }
                    });
                }
            },

            onMouseLeave: (e, row, rowIndex) => {
                this.setState(state => {
                    return {
                        showConceptLinks: false
                    }
                })
            },

            onDoubleClick: (e, row, rowIndex) => {
               let selectionOptions = {
                    "Information Categories": "information_categories",
                    "Actors": "actors",
                    "Disciplines": "disciplines",
                    "Responding Organizations": "responding_organizations",
                    "Activities": "activities",
                    "Technologies": "technologies",
                    "Locations": "locations",
                    "Cybersecurity Threats": "cybersecurity_threats"
               };

               if(tableName === "Information Types"){
                    this.props.history.informationTypeSearch = {'entryId': row['id']}
                    this.props.history.push(routes.INFORMATION_TYPE_CATALOG);
               } else {
                    this.props.history.glossarySearch = {'glossarySelection': selectionOptions[tableName], 'entryId': row['id']}
                    this.props.history.push(routes.GLOSSARY);
               }
            }
        }
    };

    this.conceptLinkRowStyle = this.conceptLinkRowStyle.bind(this);
    this.formatCIARating = this.formatCIARating.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);

  }

  formatCIARating(cell, row){

    let ciaEntry = this.props.information_types.find(x => x.id === row.id);

    const style_lookup = {
        "high": styles.cia_high,
        "medium": styles.cia_medium,
        "low": styles.cia_low
    }

    let c_className = styles.cia_high;
    return (
        <div className={styles.cia_table}>
            <div className={style_lookup[ciaEntry.triad_rating.confidentiality]}>
                {ciaEntry.triad_rating.confidentiality}
             </div>
             <div className={style_lookup[ciaEntry.triad_rating.integrity]}>
                {ciaEntry.triad_rating.integrity }
            </div>
            <div className={style_lookup[ciaEntry.triad_rating.availability]}>
                {ciaEntry.triad_rating.availability}
            </div>
        </div>
    )
  }

  deleteUseCase(){

    let deleteConfirm = confirm("Are you sure you want to delete this Use Case?");
    if(deleteConfirm){

        this.props.deleteUseCase(this.props.use_case).then(() => {
              this.props.handleUseCaseClick(null);
        });
    }
  }

  inConceptLinks(row) {

    for(let key in this.props.use_case.concept_links){
        if(this.props.use_case.concept_links[key].includes(row['id'])){
            return true;
        }
    }

    return false;
  }

  conceptLinkRowStyle(row, rowIdx){
    if(this.inConceptLinks(row)){
        return {
         backgroundColor: '#F06449',
         color: 'white',
         fontWeight: 'bolder',
         height: 'calc(var(--vh, 1vh) * 5)'
              }
    } else {
        return this.props.getRowStyle(row, rowIdx)
    }
  }

  handleSwitch(checked){
    this.setState(state => {
        return {
            showGraphView: checked
        }
    });
  }

  getGraphView(){
    return(<div className={styles.useCaseBody}>
                <UseCaseForceGraph
                    use_case={this.props.use_case}
                />
           </div>)
  }

  getPlainView(){

    return(
        <div className={styles.useCaseBody}>
                <div className={styles.useCaseInfo}>
                    <div className={styles.headerFormat}>
                        <SanitizedHTML
                            allowedTags={['p','br', 'ul', 'li', 'b', 'h3']}
                            html={this.props.use_case.description}
                        >
                        </SanitizedHTML>
                    </div>
                    <h3 className={styles.sourceInfo}>Source: {this.props.use_case.source}</h3>
                    <div className={styles.informationTypes}>
                        <div className={styles.informationTypesTitle}><h3>Information Types</h3></div>
                        <BootstrapTable
                            classes={styles.informationTypeTable}
                            data={this.props.use_case.information_types}
                            columns={[
                                {dataField: "id", text: "ID", hidden: true},
                                {dataField: "name", text: 'Name', headerStyle: this.props.getHeaderStyle()},
                                {dataField: "triad_rating", text: "CIA Rating", formatter: this.formatCIARating, headerStyle: this.props.getHeaderStyle()},
                                {dataField: "description", text: "Description", headerStyle: this.props.getHeaderStyle()}
                                ]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Information Types")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                        </BootstrapTable>
                    </div>
                </div>
                <div className={styles.useCaseTables}>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.actors}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Actors")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.cybersecurity_threats}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Cybersecurity Threats")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.disciplines}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Disciplines")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.responding_organizations}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Responding Organizations")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.activities}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Activities")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.technologies}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Technologies', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Technologies")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={this.props.use_case.locations}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Locations")}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                </div>
            </div>
    )
  }

  render(){

    let viewName;
    let useCaseCurrentView;

    if(this.state.showGraphView){
        viewName = "Graph View";
        useCaseCurrentView = this.getGraphView();
    } else {
        viewName = "Regular View";
        useCaseCurrentView = this.getPlainView();
    }

    return (
        <div className={styles.componentBody}>
            <div className={styles.optionsBar}>
                <Tooltip title="Back to Catalog">
                    <KeyboardBackspace
                        className={styles.backButton}
                        style={{'color': '#F06449', 'height': '50px', 'width': '60px'}}
                        onClick={() => this.props.handleUseCaseClick(null)}
                    />
                </Tooltip>
                <h2>{this.props.use_case.name}</h2>
                <div className={styles.viewSwitcher}>
                    <Tooltip title={viewName}>
                        <label htmlFor="normal-switch">
                            <Switch
                                onChange={this.handleSwitch}
                                checked={this.state.showGraphView}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                width={48}
                                onColor='#F06449'
                                id="normal-switch"
                            />
                        </label>
                    </Tooltip>
                </div>
                <Tooltip title="Edit">
                    <Description
                        className={styles.editButton}
                        style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                        onClick={() => this.props.startEditor() }
                    />
                </Tooltip>
                <Tooltip title="Delete">
                    <Delete
                        className={styles.deleteButton}
                        style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                        onClick={() => this.deleteUseCase() }
                    />
                </Tooltip>
            </div>
            { useCaseCurrentView }
        </div>
        );
  }
 }