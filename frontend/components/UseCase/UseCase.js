import React, { PureComponent } from 'react';
import styles from './UseCase.css';
import BootstrapTable  from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Description from "@material-ui/icons/Description";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";
import Delete from "@material-ui/icons/Delete";
import Tooltip from '@material-ui/core/Tooltip';

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

export default class UseCase extends PureComponent<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        showConceptLinks: false
    }

    this.rowEvents = {
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
        }
  };

  this.conceptLinkRowStyle = this.conceptLinkRowStyle.bind(this);

  }

  formatCIARating(cell, row){
    return cell.confidentiality +  " | " + cell.integrity + " | " + cell.availability;
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


  render(){

     const { actors,
             activities,
             cybersecurity_threats,
             disciplines,
             responding_organizations,
             technologies,
             information_categories,
             information_types,
             locations } = this.props;

     let use_case_actors = this.props.use_case['actors'].map((entry_id) => {
                let entry = actors.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_information_types = this.props.use_case['information_types'].map((entry_id) => {
                let entry = information_types.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_cybersecurity_threats = this.props.use_case['cybersecurity_threats'].map((entry_id) => {
                let entry = cybersecurity_threats.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_disciplines = this.props.use_case['disciplines'].map((entry_id) => {
                let entry = disciplines.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_responding_organizations = this.props.use_case['responding_organizations'].map((entry_id) => {
                let entry = responding_organizations.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_technologies = this.props.use_case['technologies'].map((entry_id) => {
                let entry = technologies.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_activities = this.props.use_case['activities'].map((entry_id) => {
                let entry = activities.find(entry => entry.id == entry_id)
                return(entry)
            });

     let use_case_locations = this.props.use_case['locations'].map((entry_id) => {
                let entry = locations.find(entry => entry.id == entry_id)
                return(entry)
            });

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
            <div className={styles.useCaseBody}>
                <div className={styles.useCaseInfo}>
                    <div className={styles.headerFormat}>
                        <p>{this.props.use_case.description}</p>
                    </div>
                    <div className={styles.informationTypes}>
                        <p className={styles.sourceTitle}>Source: {this.props.use_case.source}</p>
                        <div className={styles.informationTypesTitle}><h3>Information Types</h3></div>
                        <BootstrapTable
                            classes={styles.informationTypeTable}
                            data={use_case_information_types}
                            columns={[
                                {dataField: "id", text: "ID", hidden: true},
                                {dataField: "name", text: 'Name', headerStyle: this.props.getHeaderStyle()},
                                {dataField: "triad_rating", text: "CIA Rating", formatter: this.formatCIARating, headerStyle: this.props.getHeaderStyle()},
                                {dataField: "description", text: "Description", headerStyle: this.props.getHeaderStyle()}
                                ]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
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
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_cybersecurity_threats}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_disciplines}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_responding_organizations}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_activities}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_technologies}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Technologies', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                    <BootstrapTable
                        classes={styles.attrTable}
                        data={use_case_locations}
                        columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.props.getHeaderStyle()}]}
                        rowStyle={this.state.showConceptLinks ? this.conceptLinkRowStyle : this.props.getRowStyle}
                        rowEvents={this.rowEvents}
                        noDataIndication={noDataIndication}
                        keyField="id"
                        striped
                        hover
                        condensed>
                    </BootstrapTable>
                </div>
            </div>
        </div>
        );
  }
 }