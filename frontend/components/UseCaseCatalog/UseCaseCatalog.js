import React, { Component } from 'react';
import styles from './UseCaseCatalog.css';
import ReactJson from 'react-json-view';
import BootstrapTable  from 'react-bootstrap-table-next';
import Select from 'react-select';
import UseCasePage from '../../containers/UseCasePage';
import UseCaseFormPage from '../../containers/UseCaseFormPage';
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
        useCaseSelection: null,
        isEditing: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleUseCaseClick = this.handleUseCaseClick.bind(this);
    this.startEditor = this.startEditor.bind(this);
    this.stopEditor = this.stopEditor.bind(this);

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

    let useCaseNames = this.props.use_cases.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "name"});
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
        },
        {
        "label": "Use Cases",
        "options": useCaseNames
        }
    ]

  }

  getHeaderStyle(){

    return {
        height: '6vh',
        backgroundColor: 'darkgrey',
        fontWeight: 'bolder',
        headerAlign: 'center',
        border: 'outset',
        borderColor: 'darkgrey',
        borderRadius: '8px'
        }
    }

  getRowStyle(row, rowIdx){

    return {
         backgroundColor: rowIdx % 2 === 0 ? 'black': '#303030',
         height: '5vh'
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
            useCaseSelection: newUseCase,
            isEditing: true
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
      use_cases,
      getUseCases
    } = this.props;

    this.setState(state => {
        let isEditing = state.isEditing;

        if(use_case === null){
            isEditing = false;
        }

        return {
            useCaseSelection: use_case,
            isEditing: isEditing
        }
    }, () => getUseCases(this.state));
  }

  startEditor(){
    this.setState(state => {
        return {
            isEditing: true
            }
        });
  }

  stopEditor(){

    const {
      getUseCases
    } = this.props;

    this.setState(state => {
        return {
            isEditing: false
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
            technologies,
            information_categories,
            information_types,
            locations } = this.props;

    const {
        selectedOption,
        useCaseSelection,
        isEditing
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
                <div key={use_case.id} className={styles.catalogBody} onClick={() => this.handleUseCaseClick(use_case)}>
                    <div className={styles.optionsBar}>
                        <h2>{use_case.name}</h2>
                    </div>
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

        let UseCaseView =
                <UseCasePage
                    handleUseCaseClick={this.handleUseCaseClick}
                    getHeaderStyle={this.getHeaderStyle}
                    getRowStyle={this.getRowStyle}
                    startEditor={this.startEditor}
                    stopEditor={this.stopEditor}
                    use_case={useCaseSelection}
                    />

        let editorView =
                <UseCaseFormPage
                    handleUseCaseClick={this.handleUseCaseClick}
                    getHeaderStyle={this.getHeaderStyle}
                    getRowStyle={this.getRowStyle}
                    startEditor={this.startEditor}
                    stopEditor={this.stopEditor}
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
                        {useCaseSelection === null ? catalogView: isEditing ? editorView : UseCaseView}
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