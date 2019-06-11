import React, { Component } from 'react';
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
            locations: this.props.use_case.locations
        }

        this.onChange = this.onChange.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        this.deleteRow = this.deleteRow.bind(this);

        this.addRowIcon = this.addRowIcon.bind(this);
        this.deleteRowIcon = this.deleteRowIcon.bind(this);

  }

  formatCIARating(cell, row){
    return cell.confidentiality +  " | " + cell.integrity + " | " + cell.availability;
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
            trigger={<Add style={{"color": "green", "height": "25px", "width": "25px"}} />}
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
            this.props.createUseCase(this.state);
        } else {
            this.props.updateUseCase(this.state);
        }
        this.props.handleUseCaseClick(this.state);
        this.props.stopEditor();
    }
    else {
        alert("Name and Description Must Not Be Empty to create a new Use Case")
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
                        style={{"color": "#F06449", "height": "60px", "width": "70px"}}
                        onClick={() => this.props.handleUseCaseClick(null)}
                    />
                </Tooltip>
                <div className={styles.saveButton} onClick={() => this.saveChanges()}>
                    <p>Save Changes</p>
                    <Check style={{"height": "50px", "width": "60px"}} />
                </div>
                <Tooltip title="Cancel">
                    <Clear
                        className={styles.clearButton}
                        style={{"color": "#F06449", "height": "50px", "width": "50px"}}
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
                        <input
                            label="name"
                            className={styles.nameInput}
                            type="text"
                            onChange={this.onChange}
                            value={this.state.name}>
                        </input>
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
                        <h3>Information Types</h3>
                        <BootstrapTable
                            classes={styles.informationTypeTable}
                            data={use_case_information_types}
                            columns={[
                                {dataField: "_id", text: "ID", hidden: true},
                                {dataField: "name", text: 'Name', headerStyle: this.props.getHeaderStyle()},
                                {dataField: "triad_rating", text: "CIA Rating", formatter: this.formatCIARating, headerStyle: this.props.getHeaderStyle()},
                                {dataField: "description", text: "Description", headerStyle: this.props.getHeaderStyle()},
                                {   isDummyField: true,
                                    dataField: "information_types",
                                    text: this.addRowIcon("Information Types", "information_types"),
                                    formatter: this.deleteRowIcon,
                                    events: { onClick: (e, column, columnIndex, row, rowIndex) => this.deleteRow(e, column, columnIndex, row, rowIndex)},
                                    headerStyle: {...this.props.getHeaderStyle(), width: '2%'},
                                    style: { width: '3%' }
                                }
                            ]}
                        rowStyle={this.props.getRowStyle}
                        cellEdit={ cellEditFactory({ mode: "dbclick" }) }
                        noDataIndication={noDataIndication}
                        keyField="_id"
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
                            {   dataField: "_id",
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
                                style: { width: '12%' }
                            }
                            ]}
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_cybersecurity_threats}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_disciplines}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_responding_organizations}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_activities}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_technologies}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_locations}
                        columns={[
                            {dataField: "_id", text: "ID", hidden: true},
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
                        rowStyle={this.props.getRowStyle}
                        noDataIndication={noDataIndication}
                        keyField="_id"
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
