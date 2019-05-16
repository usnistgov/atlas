import React, { Component } from 'react';
import styles from './UseCase.css';
import BootstrapTable  from 'react-bootstrap-table-next';

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
    <div className = {styles.noDataIndication}>
      <p>None</p>
    </div>
);

export default class UseCase extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

  }

  formatCIARating(cell, row){
    return cell.confidentiality +  " | " + cell.integrity + " | " + cell.availability;
  }

  render(){

     const { use_case,
             actors,
             activities,
             cybersecurity_threats,
             disciplines,
             responding_organizations,
             technologies,
             information_categories,
             information_types,
             locations } = this.props;

     let use_case_actors = use_case['actors'].map((entry_id) => {
                let entry = actors.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_information_types = use_case['information_types'].map((entry_id) => {
                let entry = information_types.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_cybersecurity_threats = use_case['cybersecurity_threats'].map((entry_id) => {
                let entry = cybersecurity_threats.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_disciplines = use_case['disciplines'].map((entry_id) => {
                let entry = disciplines.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_responding_organizations = use_case['responding_organizations'].map((entry_id) => {
                let entry = responding_organizations.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_technologies = use_case['technologies'].map((entry_id) => {
                let entry = technologies.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_activities = use_case['activities'].map((entry_id) => {
                let entry = activities.find(entry => entry._id == entry_id)
                return(entry)
            });

     let use_case_locations = use_case['locations'].map((entry_id) => {
                let entry = locations.find(entry => entry._id == entry_id)
                return(entry)
            });


    return (
        <div className={styles.componentBody} onClick={() => this.props.handleUseCaseClick(null)}>
            <div className={styles.useCaseInfo}>
                <div className={styles.headerFormat}>`
                    <h2>{use_case.name}</h2>
                    <p>{use_case.description}</p>
                </div>
                <div className={styles.informationTypes}>
                    <h3>Information Types</h3>
                    <BootstrapTable
                    classes={styles.informationTypeTable}
                    data={use_case_information_types}
                    columns={[
                            {dataField: "_id", text: "ID", hidden: true},
                            {dataField: "name", text: 'Name', headerStyle: this.props.getHeaderStyle()},
                            {dataField: "description", text: "Description", headerStyle: this.props.getHeaderStyle()},
                            {dataField: "triad_rating", text: "CIA Rating", formatter: this.formatCIARating, headerStyle: this.props.getHeaderStyle()}
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
            <div className={styles.useCaseTables}>
                <BootstrapTable
                    classes={styles.attrTable}
                    data={use_case_actors}
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Technologies', headerStyle: this.props.getHeaderStyle()}]}
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
                    columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.props.getHeaderStyle()}]}
                    rowStyle={this.props.getRowStyle}
                    noDataIndication={noDataIndication}
                    keyField="_id"
                    striped
                    hover
                    condensed>
                </BootstrapTable>
           </div>
        </div>
    )

  }
 }