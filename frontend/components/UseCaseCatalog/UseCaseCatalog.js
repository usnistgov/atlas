import React, { Component } from 'react';
import _ from 'lodash';
import routes from '../../constants/routes';
import styles from './UseCaseCatalog.css';
import ReactJson from 'react-json-view';
import BootstrapTable  from 'react-bootstrap-table-next';
import Select, { components, makeAnimated } from 'react-select';
import UseCasePage from '../../containers/UseCasePage';
import UseCaseFormPage from '../../containers/UseCaseFormPage';
import NoteAdd from "@material-ui/icons/NoteAdd";
import Tooltip from '@material-ui/core/Tooltip';

var searchOptions = [];
const equal = require('fast-deep-equal');

const multiValueStyle = {
     multiValue: (base, { data }) => {

        let searchColor = '#F06449';

        switch(data.searchOption){
            case "or":
                searchColor = "lightgreen";
                break;
            case "not":
                searchColor = "red";
                break;
            case "not or":
                searchColor = "purple"
                break;
        }

        return {
            ...base,
            backgroundColor: searchColor,
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 'normal',
            borderRadius: '15px',
            opacity: '0.7',
            ':hover': {
                opacity: '1'
            }
        }
     },
     multiValueLabel: (base, { data }) => {
        return {
            ...base,
            color: 'snow',
            fontWeight: 'bolder'
            }
     },
     multiValueRemove: (base, { data }) => {
        return {
            ...base,
            color: 'snow',
            height: '30px',
            width: '30px',
            borderRadius: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            ':hover': {
                backgroundColor: '#F06449',
                color: 'white',
            }
        }
     }
};

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

var savedScrollTop;

export default class UseCaseCatalog extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        selectedOption: [],
        useCaseSelection: null,
        isEditing: false
    };

    this.multiValue = props => {

        let labelProps = {'children': props['children']}

        return (
            <components.MultiValue {...props}
                style={props.getStyles('multiValue', props)}
            >
                <div onClick={() => {
                    this.Select.state.menuIsOpen = false;
                    this.handleSearchOptionClick(props.data);
                }}>
                    <components.MultiValueLabel
                        {...labelProps}
                    />
                </div>
            </components.MultiValue>
        );
    };

    this.rowEvents = (tableName) => {

            return {
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

    this.handleSearch = this.handleSearch.bind(this);
    this.handleUseCaseClick = this.handleUseCaseClick.bind(this);
    this.startEditor = this.startEditor.bind(this);
    this.stopEditor = this.stopEditor.bind(this);
    this.handleSearchOptionClick = this.handleSearchOptionClick.bind(this);
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

  setSearchOptions(){

    let actorOptions = _.map(this.props.actors, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "actors", "searchOption": "and"});
     });

    let activitiesOptions = _.map(this.props.activities, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "activities", "searchOption": "and"});
    });

    let cyberOptions = _.map(this.props.cybersecurity_threats, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "cybersecurity_threats", "searchOption": "and"});
    });

    let disciplineOptions = _.map(this.props.disciplines, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "disciplines", "searchOption": "and"});
    });

    let respondingOptions = _.map(this.props.responding_organizations, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "responding_organizations", "searchOption": "and"});
    });

    let technologiesOptions = _.map(this.props.technologies, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "technologies", "searchOption": "and"});
    });

    let informationTypeOptions = _.map(this.props.information_types, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "information_types", "searchOption": "and"});
    });

    let locationOptions = _.map(this.props.locations, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "locations", "searchOption": "and"});
    });

    let useCaseNames = _.map(this.props.use_cases, (entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "name", "searchOption": "and"});
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
        height: 'calc(var(--vh, 1vh) * 5)',
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
         height: 'calc(var(--vh, 1vh) * 5)'
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


  handleSearch(option, action){

    const {
      getUseCases
    } = this.props;

    this.setState(state => {
        return {
            selectedOption: option
            }
    }, () => getUseCases(this.state));

  }

  handleUseCaseClick(use_case){

    const {
      getUseCases,
      updateUseCase
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
    }, () => {

            getUseCases(this.state);
    });
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

  handleSearchOptionClick(option){

    if(option.group !== "name"){
        this.setState(state => {
            let optionToChange = state.selectedOption.filter(x => x.group === option.group);

            let groupOption = optionToChange[0].searchOption;

            for(let entry in optionToChange){
                switch(groupOption){
                    case "and":
                        optionToChange[entry]['searchOption'] = "or";
                        break;
                    case "or":
                        optionToChange[entry]['searchOption'] = "not";
                        break;
                    case "not":
                        optionToChange[entry]['searchOption'] = "not or";
                        break;
                    case "not or":
                        optionToChange[entry]['searchOption'] = "and";
                        break;
                }
            }
            return {
                optionToChange
            }
        }, () => this.props.getUseCases(this.state));
    }
  }

  getCatalogView(){

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

    const catalogView = _.map(use_cases, (use_case) => {

            let use_case_actors = actors.filter(x => use_case.actors.includes(x.id));

            let use_case_information_types = information_types.filter(x => use_case.information_types.includes(x.id))

            let use_case_cybersecurity_threats = cybersecurity_threats.filter(x => use_case.cybersecurity_threats.includes(x.id));

            let use_case_disciplines = disciplines.filter(x => use_case.disciplines.includes(x.id));

            let use_case_responding_organizations = responding_organizations.filter(x => use_case.responding_organizations.includes(x.id));

            let use_case_technologies = technologies.filter(x => use_case.technologies.includes(x.id));

            let use_case_activities = activities.filter(x => use_case.activities.includes(x.id));

            let use_case_locations = locations.filter(x => use_case.locations.includes(x.id));

            return (
                <div key={use_case.id} className={styles.catalogBody} >
                    <div className={styles.optionsBar} onClick={() => this.handleUseCaseClick(use_case)}>
                        <h2>{use_case.name}</h2>
                    </div>
                    <div className={styles.useCaseTables}>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_information_types}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Information Types', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Information Types")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_actors}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Actors', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Actors")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_disciplines}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Disciplines', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Disciplines")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_responding_organizations}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Responding Organizations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Responding Organizations")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_activities}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Activities', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Activities")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_technologies}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Technologies', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Technologies")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_locations}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Locations', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Locations")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                        <BootstrapTable
                            classes={styles.attrTable}
                            data={use_case_cybersecurity_threats}
                            columns={[{dataField: "id", text: "ID", hidden: true}, {dataField: "name", text: 'Cybersecurity Threats', headerStyle: this.getHeaderStyle()}]}
                            rowStyle={this.getRowStyle}
                            rowEvents={this.rowEvents("Cybersecurity Threats")}
                            noDataIndication={noDataIndication}
                            keyField="id">
                        </BootstrapTable>
                    </div>
                </div>
            )
        });

        return(catalogView)
  }

  getUseCaseView(UseCase){

    const UseCaseView = (
        <UseCasePage
            handleUseCaseClick={this.handleUseCaseClick}
            getHeaderStyle={this.getHeaderStyle}
            getRowStyle={this.getRowStyle}
            startEditor={this.startEditor}
            stopEditor={this.stopEditor}
            use_case={UseCase}
         />
     )

     return(UseCaseView)
  }

  getEditView(UseCase){

    const editView = (
        <UseCaseFormPage
            handleUseCaseClick={this.handleUseCaseClick}
            getHeaderStyle={this.getHeaderStyle}
            getRowStyle={this.getRowStyle}
            startEditor={this.startEditor}
            stopEditor={this.stopEditor}
            use_case={UseCase} />
    )
    return(editView)
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

    let currentView;
    this.setSearchOptions();

    const animatedComponents = makeAnimated({ MultiValue: this.multiValue });

    this.catalogElement = document.getElementById("UseCaseCatalog");
    currentView = this.getCatalogView();

    if(useCaseSelection){

        let UseCase = {...this.state.useCaseSelection};

        UseCase.actors = actors.filter(x => this.state.useCaseSelection.actors.includes(x.id));

        UseCase.information_types = information_types.filter(x => this.state.useCaseSelection.information_types.includes(x.id));

        UseCase.cybersecurity_threats = cybersecurity_threats.filter(x => this.state.useCaseSelection.cybersecurity_threats.includes(x.id));

        UseCase.disciplines = disciplines.filter(x => this.state.useCaseSelection.disciplines.includes(x.id));

        UseCase.responding_organizations = responding_organizations.filter(x => this.state.useCaseSelection.responding_organizations.includes(x.id));

        UseCase.technologies = technologies.filter(x => this.state.useCaseSelection.technologies.includes(x.id));

        UseCase.activities = activities.filter(x => this.state.useCaseSelection.activities.includes(x.id));

        UseCase.locations = locations.filter(x => this.state.useCaseSelection.locations.includes(x.id));

        currentView = isEditing ? this.getEditView(UseCase) : this.getUseCaseView(UseCase);
        this.catalogElement.scrollTop = 0;
    }

    return(
        <div className={styles.componentBody}>
            <div className={styles.catalogContainer}>
                <div className={styles.searchContainer}>
                    <Select
                        ref={(ref) => this.Select = ref}
                        isMulti
                        components={animatedComponents}
                        styles={multiValueStyle}
                        className={styles.searchBar}
                        classNamePrefix={styles.searchBar}
                        value={selectedOption}
                        options={searchOptions}
                        onChange={(option, action) => {
                            this.handleSearch(option, action)
                            }
                        }
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
            </div>
            <div id="UseCaseCatalog" className={styles.useCasesContainer}>
                {currentView}
            </div>
        </div>
         )
  }
 }