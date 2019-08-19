import React, { Component } from 'react';
import routes from '../../constants/routes';
import { Modal, Button } from "react-bootstrap";
import styles from './UseCaseForm.css';
import BootstrapTable  from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Tooltip from '@material-ui/core/Tooltip';
import Popup from "reactjs-popup";
import Select from 'react-select';

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

const noDataIndication = () => (
    <div className={styles.noDataIndication}>
      None
    </div>
);

const equal = require('fast-deep-equal');

export default class UseCase extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

        this.state = {
            id: this.props.use_case.id,
            name: this.props.use_case.name,
            source: this.props.use_case.source,
            description: this.props.use_case.description,
            cybersecurity_threats: this.props.use_case.cybersecurity_threats,
            actors: this.props.use_case.actors,
            information_types: this.props.use_case.information_types,
            disciplines: this.props.use_case.disciplines,
            responding_organizations: this.props.use_case.responding_organizations,
            activities: this.props.use_case.activities,
            technologies: this.props.use_case.technologies,
            locations: this.props.use_case.locations,
            concept_links: this.props.use_case.concept_links,
            showConceptLinks: false
        }

        this.rowEvents = (tableName) => {

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

                    this.props.history.glossaryOptions = {'glossarySelection': selectionOptions[tableName], 'entryId': row['id']}
                    this.props.history.push(routes.GLOSSARY);
                }
            }
       };

        this.onChange = this.onChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        this.deleteRow = this.deleteRow.bind(this);

        this.addRowIcon = this.addRowIcon.bind(this);
        this.deleteRowIcon = this.deleteRowIcon.bind(this);
        this.conceptLinkRowStyle = this.conceptLinkRowStyle.bind(this);

  }

  shouldComponentUpdate(nextProps, nextState){
    if(!equal(nextProps, this.props)){
        return true;
    }

    if(!equal(nextState, this.state)){
        return true;
    }

    return false;

  }

  formatCIARating(cell, row){

    const style_lookup = {
        "high": styles.cia_high,
        "medium": styles.cia_medium,
        "low": styles.cia_low
    }

    let c_className = styles.cia_high;
    return (
        <div className={styles.cia_table}>
            <div className={style_lookup[cell.confidentiality]}>
                {cell.confidentiality}
             </div>
             <div className={style_lookup[cell.integrity]}>
                {cell.integrity }
            </div>
            <div className={style_lookup[cell.availability]}>
                {cell.availability}
            </div>
        </div>
    )
  }

  deleteRow(e, column, columnIndex, row, rowIndex){

    let updatedArray = this.state[column["dataField"]].filter((value, index, arr) => {

        return value !== row["id"];

    });

    this.setState(state => {
        return {
            [column["dataField"]] : updatedArray
        }
    })
  }

  addRow(row, tableName, tableData){

    if(!this.state[tableData].includes(row["id"])){
        this.setState(state => {
            return {
                [tableData]: [...state[tableData], row["id"]]
            }
        });
    } else {
        alert("Item: '" + row["name"] + "' is already in " + tableName);
    }

  }

  addRowIcon(tableName, tableData){

    let addOptions = this.props[tableData].map((entry) => {
        return({"label": entry.name, "id": entry.id, "name": entry.name, "description": entry.description});
     });

    let value;
    let placeholderMessage = "Add Item to " + tableName + " Table";

    return(
        <Popup
            className={styles.addModal}
            trigger={<Add className={styles.addButton} style={{"color": "green", "height": "25px", "width": "25px"}} />}
            modal
            >
            {close => (
            <div
                className={styles.addSearchBar}
                >
                 <Select
                    value={value}
                    options={addOptions}
                    onChange={(e) =>
                            {
                                this.addRow(e, tableName, tableData);
                                close();
                            }
                        }
                    placeholder={placeholderMessage}
                    />
            </div>
            )
            }
        </Popup>

    )
  }

  deleteRowIcon(){

    return(
        <Remove
            style={{"color": "red", "height": "30px", "width": "30px"}}
        />

    )
  }

  onChange(event){

    let label = event.target.attributes.label.value;
    let value = event.target.value;

    this.setState(state => {
        return {
            [label]: value
            }
    });
  }

  saveChanges(){

    if(this.state.name !== "" && this.state.description !== ""){

        if(this.state.id === ""){
            this.props.createUseCase(this.state).then(() => {
                this.props.handleUseCaseClick(this.state);
                this.props.stopEditor();
            });
        } else {
            this.props.updateUseCase(this.state).then(() => {
                this.props.handleUseCaseClick(this.state);
                this.props.stopEditor();
            });
        }
    }
    else {
        alert("Name and Description Must Not Be Empty to Create a New Use Case")
        }

  }

  inConceptLinks(row) {

    for(let key in this.state.concept_links){
        if(this.state.concept_links[key].includes(row['id'])){
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

  render(){

     const {
        actors,
        information_types,
        cybersecurity_threats,
        disciplines,
        responding_organizations,
        technologies,
        activities,
        locations
     } = this.props;

     let use_case_actors = this.state.actors.map((entry_id) => {
                let entry = actors.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_information_types = this.state.information_types.map((entry_id) => {
                let entry = information_types.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_cybersecurity_threats = this.state.cybersecurity_threats.map((entry_id) => {
                let entry = cybersecurity_threats.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_disciplines = this.state.disciplines.map((entry_id) => {
                let entry = disciplines.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_responding_organizations = this.state.responding_organizations.map((entry_id) => {
                let entry = responding_organizations.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_technologies = this.state.technologies.map((entry_id) => {
                let entry = technologies.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_activities = this.state.activities.map((entry_id) => {
                let entry = activities.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_locations = this.state.locations.map((entry_id) => {
                let entry = locations.find(entry => entry.id == entry_id)
                return(entry)
            });

    return (
        <div className={styles.componentBody}>
            <div className={styles.optionsBar}>
                <Tooltip title="Back to Catalog">
                    <KeyboardBackspace
                        className={styles.backButton}
                        style={{"color": "#F06449", "height": "50px", "width": "60px"}}
                        onClick={() => this.props.handleUseCaseClick(null)}
                    />
                </Tooltip>
                <input
                    label="name"
                    className={styles.nameInput}
                    type="text"
                    onChange={this.onChange}
                    value={this.state.name}>
                </input>
                <Tooltip title="Save">
                        <Check
                            className={styles.saveButton}
                            style={{"color": "green", "height": "40px", "width": "50px"}}
                            onClick={() => this.saveChanges()}
                        />
                    </Tooltip>
                <Tooltip title="Cancel">
                    <Clear
                        className={styles.clearButton}
                        style={{"color": "#F06449", "height": "40px", "width": "40px"}}
                        onClick={() => {
                            this.props.stopEditor();
                            if(this.state.name === "" || this.state.description === ""){
                                this.props.handleUseCaseClick(null);
                            }
                            }}
                    />
                </Tooltip>
            </div>
            <div className={styles.useCaseBody}>
                <div className={styles.useCaseInfo}>
                    <div className={styles.headerFormat}>
                        <textarea
                            label="description"
                            className={styles.descriptionInput}
                            onChange={this.onChange}
                            value={this.state.description}>
                        </textarea>
                    </div>
                    <div className={styles.informationTypes}>
                        <div className={styles.sourceContainer}>
                            <p className={styles.sourceTitle}>Source: </p>
                            <input
                                    label="source"
                                    className={styles.sourceInput}
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.source}>
                            </input>
                        </div>
                        <div className={styles.informationTypesTitle}><h3>Information Types</h3></div>
                        <BootstrapTable
                            classes={styles.informationTypeTable}
                            data={use_case_information_types}
                            columns={[
                                {dataField: "id", text: "ID", hidden: true},
                                {dataField: "name", text: 'Name', headerStyle: this.props.getHeaderStyle()},
                                {dataField: "triad_rating", text: "CIA Rating", formatter: this.formatCIARating, headerStyle: this.props.getHeaderStyle()},
                                {dataField: "description", text: "Description", headerStyle: this.props.getHeaderStyle()},
                                {   isDummyField: true,
                                    dataField: "information_types",
                                    text: this.addRowIcon("Information Types", "information_types"),
                                    formatter: this.deleteRowIcon,
                                    events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                    headerStyle: {...this.props.getHeaderStyle(), width: '5%'},
                                    style: { width: '5%' }
                                }
                            ]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents("Information Types")}
                        cellEdit={ cellEditFactory({ mode: "dbclick" }) }
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
                        data={use_case_actors}
                        columns = {
                            [
                            {   dataField: "id",
                                text: "ID",
                                hidden: true
                            },
                            {   dataField: "name",
                                text: "Actors",
                                headerStyle: this.props.getHeaderStyle(),

                            },
                            {   isDummyField: true,
                                editable: false,
                                dataField: "actors",
                                text: this.addRowIcon("Actors", "actors"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '11%' }
                            }
                            ]}
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
                        data={use_case_cybersecurity_threats}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Cybersecurity Threats", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "cybersecurity_threats",
                                text: this.addRowIcon("Cybersecurity Threats", "cybersecurity_threats"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
                        data={use_case_disciplines}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Disciplines", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "disciplines",
                                text: this.addRowIcon("Disciplines", "disciplines"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
                        data={use_case_responding_organizations}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Responding Organizations", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "responding_organizations",
                                text: this.addRowIcon("Responding Organizations", "responding_organizations"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
                        data={use_case_activities}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Activities", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "activities",
                                text: this.addRowIcon("Activities", "activities"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
                        data={use_case_technologies}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Technologies", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "technologies",
                                text: this.addRowIcon("Technologies", "technologies"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
                        data={use_case_locations}
                        columns={[
                            {dataField: "id", text: "ID", hidden: true},
                            {dataField: "name", text: "Locations", headerStyle: this.props.getHeaderStyle()},
                            {   isDummyField: true,
                                editable: false,
                                dataField: "locations",
                                text: this.addRowIcon("Locations", "locations"),
                                formatter: this.deleteRowIcon,
                                events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                headerStyle: {...this.props.getHeaderStyle(), width: '6%'},
                                style: { width: '12%' }
                            }
                            ]}
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
        </div>
    )

  }
 }
