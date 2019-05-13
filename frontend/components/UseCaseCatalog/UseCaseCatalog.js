import React, { Component } from 'react';
import styles from './UseCaseCatalog.css';
import ReactJson from 'react-json-view';
import BootstrapTable  from 'react-bootstrap-table-next';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';


var equal = require('fast-deep-equal');
var searchOptions = [];

type Props = {
    use_cases: object,
    actors: object,
    activities: object,
    cybersecurity_threats: object,
    disciplines: object,
    responding_organizations: object,
    information_categories: object,
    information_types: object,
    locations: object
}

const noDataIndication = () => (
    <div className = {styles.noDataIndication}>
      <p>None</p>
    </div>
);

export default class UseCaseCatalog extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        selectedOption: []
    };

    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    const {
        getActivities,
        getActors,
        getCyberSecurityThreats,
        getDisciplines,
        getRespondingOrganizations,
        getInformationCategories,
        getInformationTypes,
        getLocations,
        getUseCases
         } = this.props;

    getActivities();
    getActors();
    getCyberSecurityThreats();
    getDisciplines();
    getRespondingOrganizations();
    getInformationCategories();
    getInformationTypes();
    getLocations();
    getUseCases();

  }

  shouldComponentUpdate(nextState, nextProps){
    if(!equal(nextProps, this.props)){
        return(true)
    }
    if(!equal(nextState, this.state)){
        return(true);
    }
    return(false);
  }

  componentDidUpdate(){
    console.log(this.state);
  }

  setSearchOptions(){

    let actorOptions = this.props.actors.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "actors"});
     });

    let activitiesOptions = this.props.activities.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "activities"});
    });

    let cyberOptions = this.props.cybersecurity_threats.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "cybersecurity_threats"});
    });

    let disciplineOptions = this.props.disciplines.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "disciplines"});
    });

    let respondingOptions = this.props.responding_organizations.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "responding_organizations"});
    });

    let informationTypeOptions = this.props.information_types.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "information_types"});
    });

    let locationOptions = this.props.locations.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "locations"});
    });

    searchOptions = [
        {
        "label": "Actors",
        "options": actorOptions
        },
        {
        "label": "Activities",
        "options": activitiesOptions
        },
        {
        "label": "Cybersecurity Threats",
        "options": cyberOptions
        },
        {
        "label": "Disciplines",
        "options": disciplineOptions
        },
        {
        "label": "Responding Organizations",
        "options": respondingOptions
        },
        {
        "label": "Information Types",
        "options": informationTypeOptions
        },
        {
        "label": "Locations",
        "options": locationOptions
        }
    ]

  }

  getHeaderStyle(){

    return {

        backgroundColor: 'darkgrey',
        color: 'snow',
        fontWeight: 'bolder',
        height: '4vh',
        textAlign: 'center'
        }
    }

  getRowStyle(row, rowIdx){

    return {
                backgroundColor: rowIdx % 2 === 0 ? 'black': '#303030',
                color: 'snow',
                textAlign: 'center'
              }
    }

  handleChange(option){
    this.setState(state => {
        return {
            selectedOption: option
            }
    });
  }

  render(){

    const { use_cases,
            actors,
            activities,
            cybersecurity_threats,
            disciplines,
            responding_organizations,
            information_categories,
            information_types,
            locations } = this.props;

    const {
        selectedOption
    } = this.state;

    if(use_cases !== undefined){

        this.setSearchOptions();

        let listAllUseCases = use_cases.map((use_case) => {

            let use_case_actors = use_case['actors'].map((idx, actor_id) => {
                return(actors[actor_id])
            });

            let use_case_information_types = use_case['information_types'].map((idx, type_id) => {
                return(information_types[type_id])
            });

            let use_case_cybersecurity_threats = use_case['cybersecurity_threats'].map((idx, cyber_threat_id) => {
                return(cybersecurity_threats[cyber_threat_id])
            });

            let use_case_disciplines = use_case['discipline'].map((idx, discipline_id) => {
                return(disciplines[discipline_id])
            });

            let use_case_responding_organizations = use_case['responding_organizations'].map((idx, organization_id) => {
                return(responding_organizations[organization_id])
            });

             let use_case_activities = use_case['activities'].map((idx, activity_id) => {
                return(activities[activity_id])
            });

            let use_case_locations = use_case['locations'].map((idx, location_id) => {
                return(locations[location_id])
            });

            return (
                <div className={styles.catalogBody}>
                    <h2>{use_case.name}</h2>
                    <div className={styles.useCaseTables}>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_actors}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_information_types}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Information Types', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_cybersecurity_threats}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_disciplines}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_responding_organizations}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_activities}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_locations}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id"
                            striped
                            hover
                            condensed>
                        </BootstrapTable>
                    </div>
                </div>
            )

        });

        return(
            <div className={styles.componentBody}>
                <div className={styles.searchContainer}>
                    <Select
                        isMulti
                        className={styles.searchBar}
                        value={selectedOption}
                        options={searchOptions}
                        onChange={(e) => this.handleChange(e)}
                        placeholder="Search Use Cases ..."
                    />
                    <div className={styles.useCasesContainer}>
                        {listAllUseCases}
                    </div>
                </div>
            </div>
         )
    } else {

        return(
            <div className={styles.componentBody}></div>
        )
    }
  }
 }