import React, { Component } from 'react';
import styles from './UseCaseCatalog.css';
import ReactJson from 'react-json-view';
import BootstrapTable  from 'react-bootstrap-table-next';
import Select from 'react-select';
import UseCasePage from '../../containers/UseCasePage';
import NoteAdd from "@material-ui/icons/NoteAdd";
import Tooltip from '@material-ui/core/Tooltip';

var equal = require('fast-deep-equal');
var searchOptions = [];

type Props = {
    use_cases: object,
    actors: object,
    activities: object,
    cybersecurity_threats: object,
    disciplines: object,
    responding_organizations: object,
    technologies: object,
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
        selectedOption: [],
        useCaseSelection: null
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleUseCaseClick = this.handleUseCaseClick.bind(this);
  }

  componentDidMount(){
    const {
        getActivities,
        getActors,
        getCyberSecurityThreats,
        getDisciplines,
        getRespondingOrganizations,
        getTechnologies,
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
    getTechnologies();
    getInformationCategories();
    getInformationTypes();
    getLocations();
    getUseCases(this.state);

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

    let technologiesOptions = this.props.technologies.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "technologies"});
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
        "label": "Technologies",
        "options": technologiesOptions
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
        height: '4vh',
        backgroundColor: 'darkgrey',
        fontWeight: 'bolder'
        }
    }

  getRowStyle(row, rowIdx){

    return {
                backgroundColor: rowIdx % 2 === 0 ? 'black': '#303030',
              }
    }

  createNewUseCase(){

    let newUseCase = {
            'id': '',
            'name': '',
            'description': '',
            'actors': [],
            'information_types': [],
            'cybersecurity_threats': [],
            'disciplines': [],
            'responding_organizations': [],
            'technologies': [],
            'activities': [],
            'locations': []
        }

    this.setState(state => {
        return {
            useCaseSelection: newUseCase
        }
    });

  }


  handleSearch(option){

    const {
      getUseCases
    } = this.props;

    this.setState(state => {
        return {
            selectedOption: option
            }
    }, () => getUseCases(this.state.selectedOption));

  }

  handleUseCaseClick(use_case){

    const {
      getUseCases
    } = this.props;

    this.setState(state => {
        return {
            useCaseSelection: use_case
        }
    }, () => getUseCases(this.state))
  }


  render(){

    const { use_cases,
            actors,
            activities,
            cybersecurity_threats,
            disciplines,
            responding_organizations,
            technologies,
            information_categories,
            information_types,
            locations } = this.props;

    const {
        selectedOption,
        useCaseSelection
    } = this.state;

    if(use_cases !== undefined){

        this.setSearchOptions();

        let catalogView = use_cases.map((use_case) => {

            let use_case_actors = use_case['actors'].map((entry_id) => {
                let entry = actors.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_information_types = use_case['information_types'].map((entry_id) => {
                let entry = information_types.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_cybersecurity_threats = use_case['cybersecurity_threats'].map((entry_id) => {
                let entry = cybersecurity_threats.find(entry => entry.id == entry_id)
                return(entry)
            });
            let use_case_disciplines = use_case['disciplines'].map((entry_id) => {
                let entry = disciplines.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_responding_organizations = use_case['responding_organizations'].map((entry_id) => {
                let entry = responding_organizations.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_technologies = use_case['technologies'].map((entry_id) => {
                let entry = technologies.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_activities = use_case['activities'].map((entry_id) => {
                let entry = activities.find(entry => entry.id == entry_id)
                return(entry)
            });

            let use_case_locations = use_case['locations'].map((entry_id) => {
                let entry = locations.find(entry => entry.id == entry_id)
                return(entry)
            });

            return (
                <div className={styles.catalogBody} onClick={() => this.handleUseCaseClick(use_case)}>
                    <h2>{use_case.name}</h2>
                    <div className={styles.useCaseTables}>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_actors}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_information_types}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Information Types', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_cybersecurity_threats}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_disciplines}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_responding_organizations}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_technologies}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Technologies', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_activities}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_locations}
                            columns={[{dataField: "_id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            noDataIndication={noDataIndication}
                            keyField="_id">
                        </BootstrapTable>
                    </div>
                </div>
            )

        });

        let useCaseView =
                <UseCasePage
                    handleUseCaseClick={this.handleUseCaseClick}
                    getHeaderStyle={this.getHeaderStyle}
                    getRowStyle={this.getRowStyle}
                    use_case={useCaseSelection} />

        return(
            <div className={styles.componentBody}>
                <div className={styles.catalogContainer}>
                    <div className={styles.searchContainer}>
                        <Select
                            isMulti
                            className={styles.searchBar}
                            value={selectedOption}
                            options={searchOptions}
                            onChange={(e) => this.handleSearch(e)}
                            placeholder="Search Use Cases ..."
                        />
                        <Tooltip title="Add New Use Case">
                            <NoteAdd
                                className={styles.addButton}
                                style={{'color': 'snow', 'height': '50px', 'width': '40px'}}
                                onClick={() => this.createNewUseCase()}
                            />
                        </Tooltip>
                    </div>
                    <div className={styles.useCasesContainer}>
                        {useCaseSelection === null ? catalogView: useCaseView}
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