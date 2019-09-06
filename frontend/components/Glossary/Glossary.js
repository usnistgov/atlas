import React, { Component } from 'react';
import _ from 'lodash';
import styles from './Glossary.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAdd from "@material-ui/icons/NoteAdd";
import Description from "@material-ui/icons/Description";
import Delete from "@material-ui/icons/Delete";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import { DisplayResourceLinks } from './resourceLinks';

type Props = {
    actors: object,
    activities: object,
    cybersecurity_threats: object,
    disciplines: object,
    responding_organizations: object,
    technologies: object,
    information_categories: object,
    locations: object
}

const equal = require('fast-deep-equal');

export default class Glossary extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    const {
        getActivities,
        getActors,
        getCyberSecurityThreats,
        getDisciplines,
        getRespondingOrganizations,
        getTechnologies,
        getInformationCategories,
        getLocations
         } = props;

    getActivities();
    getActors();
    getCyberSecurityThreats();
    getDisciplines();
    getRespondingOrganizations();
    getTechnologies();
    getInformationCategories();
    getLocations();

    this.state = {
        glossarySelection: this.props.history.hasOwnProperty('glossarySearch') ? this.props.history.glossarySearch['glossarySelection'] :  "information_categories",
        actors: [],
        activities: [],
        cybersecurity_threats: [],
        disciplines: [],
        locations: [],
        responding_organizations: [],
        information_categories: [],
        technologies: [],
        latestAction: 'start-up'

    }

    this.glossaryRefs = {};

    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }

 static getDerivedStateFromProps(props, state){

    const stateUpdateOptions = ['start-up',
                                'start-editor',
                                'stop-editor',
                                'partial-update-save',
                                'partial-update-reset'];

    const stateData = ['information_categories',
                             'actors',
                             'activities',
                             'disciplines',
                             'responding_organizations',
                             'technologies',
                             'locations',
                             'cybersecurity_threats'];

    if(stateUpdateOptions.includes(state.latestAction)){

        _.map(stateData, item => {

            if(!equal(props[item], state[item])){

                state[item] = _.map(props[item], (entry) => {
                    let stateEntry = state[item].find(x => x.id === entry.id);

                    if(stateEntry !== undefined){
                        if(stateEntry.action === 'save'){
                            entry.name = stateEntry.name;
                            entry.description = stateEntry.description;
                            entry.resource_links = stateEntry.resource_links;
                        }
                        entry.isEditing = stateEntry.isEditing;
                        entry.action = stateEntry.action;
                    }
                    return entry;
                });
            }
        });
    }
    return state;
  }

  componentDidUpdate(props, state){

    if(this.props.history.hasOwnProperty("glossarySearch")){
        let entryId = this.props.history.glossarySearch['entryId'];
        let searchRef = this.glossaryRefs[entryId];

        searchRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        delete this.props.history.glossarySearch;

      }

  }

  addNewGlossaryEntry(category){

    let newEntry = {
        'id': '',
        'name': '',
        'description': '',
        'source': '',
        'isEditing': true
    }

    this.setState(state => {
        return {
            [category]: [...state[category], newEntry],
            latestAction: 'add-new-entry'
        }
    }, () => {
        let catalogElement = document.getElementById("glossaryContainer");
        catalogElement.scrollTop = catalogElement.scrollHeight;
    });

  }

  onSelect(value){

    this.setState(state => {
        return {
            glossarySelection: value,
            latestAction: 'change-glossary-selection'
        }
    });
  }

  partialUpdate(category, option){

    const {
        getActivities,
        getActors,
        getCyberSecurityThreats,
        getDisciplines,
        getRespondingOrganizations,
        getTechnologies,
        getInformationCategories,
        getLocations
         } = this.props;

    switch(category){
        case "activities":
            getActivities();
            break;
        case "actors":
            getActors();
            break;
        case "cybersecurity_threats":
            getCyberSecurityThreats();
            break;
        case "disciplines":
            getDisciplines();
            break;
        case "responding_organizations":
            getRespondingOrganizations();
            break;
        case "technologies":
            getTechnologies();
            break;
        case "information_categories":
            getInformationCategories();
            break;
        case "locations":
            getLocations();
            break;
    }

    this.setState({
        latestAction: 'partial-update-' + option
    })
  }

  onChange(category, label, value, glossaryEntry){

    this.setState(state => {

        glossaryEntry[label] = value;

        return {
            glossaryEntry,
            latestAction: 'change-entry-value'
        }
    });
  }

  startEditor(category, glossaryEntry){
    this.setState(state => {

        return {
            [category]: state[category].map((entry) => {
                if(entry.id === glossaryEntry.id){
                    entry.isEditing = true;
                    entry.action = 'save';
                }
                return(entry)
            }),
            latestAction: 'start-editor'
        }
    });
  }

  stopEditor(category, glossaryEntry, option){

    this.setState(state => {

        return {
            [category]: _.map(state[category], (entry) => {
                if(entry.id === glossaryEntry.id){
                    entry.isEditing = false;
                    entry.action = option;
                }
                return(entry)
            }),
            latestAction: 'stop-editor'
        }
    }, () => {
        this.partialUpdate(category, option);
    });
  }

  cancelChanges(category, glossaryEntry){
    this.stopEditor(category, glossaryEntry, 'reset')
  }

  saveChanges(category, entry){

    if(entry.name !== ''){
        if(entry.id === ''){
            switch(category){
                case "activities":
                    this.props.createActivity(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "actors":
                    this.props.createActor(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "cybersecurity_threats":
                    this.props.createCyberSecurityThreat(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "disciplines":
                    this.props.createDiscipline(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "responding_organizations":
                    this.props.createRespondingOrganization(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "technologies":
                    this.props.createTechnology(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "information_categories":
                    this.props.createInformationCategory(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "locations":
                    this.props.createLocation(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
            }

        } else {
            switch(category){
                case "activities":
                    this.props.updateActivity(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "actors":
                    this.props.updateActor(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "cybersecurity_threats":
                    this.props.updateCyberSecurityThreat(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "disciplines":
                    this.props.updateDiscipline(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "responding_organizations":
                    this.props.updateRespondingOrganization(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "technologies":
                    this.props.updateTechnology(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "information_categories":
                    this.props.updateInformationCategory(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
                case "locations":
                    this.props.updateLocation(entry).then(() => {
                        this.stopEditor(category, entry, 'save');
                    });
                    break;
            }
        }

    } else {
        alert("Glossary Entry must Have a Name to be Saved !!!");
    }
  }

  deleteGlossaryEntry(category, entry){

    let deleteConfirm = confirm("Are You Sure You Want to Delete This Glossary Entry?");
    if(deleteConfirm){

        switch(category){
                case "activities":
                    this.props.deleteActivity(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "actors":
                    this.props.deleteActor(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "cybersecurity_threats":
                    this.props.deleteCyberSecurityThreat(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "disciplines":
                    this.props.deleteDiscipline(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "responding_organizations":
                    this.props.deleteRespondingOrganization(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "technologies":
                    this.props.deleteTechnology(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "information_categories":
                    this.props.deleteInformationCategory(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
                case "locations":
                    this.props.deleteLocation(entry).then(() => {
                        this.partialUpdate(category, 'save')
                    });
                    break;
            }
    }
  }

  render(){

    const {
        glossarySelection
    } = this.state;

    let selectionOptions = {
                            "information_categories": "Information Categories",
                            "actors": "Actors",
                            "disciplines": "Disciplines",
                            "responding_organizations": "Responding Organizations",
                            "activities": "Activities",
                            "technologies": "Technologies",
                            "locations": "Locations",
                            "cybersecurity_threats": "Cybersecurity Threats"
                            };

    let selectionComponent = Object.entries(selectionOptions).map((option) => {
        return (
                <Button
                    id={option[1]}
                    key={option[1]}
                    className={this.state.glossarySelection === option[0] ? styles.selectedButton : styles.notSelectedButton}
                    variant="primary"
                    value={option[0]}
                    onClick={(e) => this.onSelect(option[0])}
                    active
                >
                {option[1]}
                </Button>
        )
    });

    let glossaryComponent = _.map(this.state[glossarySelection], (entry) => {

        let resourceLinks = DisplayResourceLinks(entry);

        this.glossaryRefs[entry.id] = React.createRef();

        let cleanView =  (
            <div key={entry.id} ref={this.glossaryRefs[entry.id]} className={styles.glossaryEntryView}>
                <div className={styles.optionsBar}>
                    <h3>{entry.name}</h3>
                    <Tooltip title="Edit">
                        <Description
                            className={styles.editButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => { this.startEditor(glossarySelection, entry)}}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Delete
                            className={styles.deleteButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => { this.deleteGlossaryEntry(glossarySelection, entry)} }
                        />
                    </Tooltip>
                </div>
                <div className={styles.descriptionContainer}>
                    <p>{entry.description}</p>
                </div>
                { resourceLinks }
            </div>
        )

        let editView =  (
            <div key={entry.id} ref={this.glossaryRefs[entry.id]} className={styles.glossaryEntryView}>
                <div className={styles.optionsBar}>
                    <input
                        label="name"
                        className={styles.nameInput}
                        type="text"
                        onChange={(e) => {this.onChange(glossarySelection, "name", e.target.value, entry)}}
                        value={entry.name}>
                    </input>
                    <Tooltip title="Save">
                        <Check
                            className={styles.saveButton}
                            style={{"color": "green", "height": "40px", "width": "50px"}}
                            onClick={() => {this.saveChanges(glossarySelection, entry)}}
                        />
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <Clear
                            className={styles.clearButton}
                            style={{"color": "#F06449", "height": "40px", "width": "40px"}}
                            onClick={() => {
                                this.cancelChanges(glossarySelection, entry);
                                }
                            }
                    />
                    </Tooltip>
                </div>
                <div className={styles.descriptionContainer}>
                    <textarea
                            label="description"
                            className={styles.descriptionInput}
                            onChange={(e) => this.onChange(glossarySelection, "description", e.target.value, entry)}
                            value={entry.description}>
                          </textarea>
                </div>
                { resourceLinks }
            </div>
        )

        return(entry.isEditing ? editView: cleanView);
    })

    return (
        <div className={styles.componentBody}>
            <div className={styles.catalogContainer}>
                <ButtonToolbar className={styles.selectionOptions}>
                    {selectionComponent}
                </ButtonToolbar>
                 <Tooltip title="Add New Entry">
                            <NoteAdd
                                className={styles.addButton}
                                style={{'color': 'snow', 'height': '50px', 'width': '40px'}}
                                onClick={() => this.addNewGlossaryEntry(glossarySelection)}
                            />
                 </Tooltip>
            </div>
            <div id="glossaryContainer" className={styles.glossaryContainer}>
                {glossaryComponent}
            </div>
        </div>
    )


  }
 }