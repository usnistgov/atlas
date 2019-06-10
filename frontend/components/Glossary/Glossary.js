import React, { Component } from 'react';
import styles from './Glossary.css';
import { Button, ButtonToolbar } from 'react-bootstrap';
import Tooltip from '@material-ui/core/Tooltip';
import NoteAdd from "@material-ui/icons/NoteAdd";
import Description from "@material-ui/icons/Description";
import Delete from "@material-ui/icons/Delete";

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

export default class Glossary extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        glossarySelection: "actors"
    }

    this.onSelect = this.onSelect.bind(this);
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
        getLocations
         } = this.props;

    getActivities();
    getActors();
    getCyberSecurityThreats();
    getDisciplines();
    getRespondingOrganizations();
    getTechnologies();
    getInformationCategories();
    getLocations();

  }

  onSelect(value){

    this.setState(state => {
        return {
            glossarySelection: value
        }
    });
  }

  render(){

    const {
        glossarySelection
    } = this.state

    let selectionOptions = {"actors": "Actors",
                            "cybersecurity_threats": "Cybersecurity Threats",
                            "disciplines": "Disciplines",
                            "responding_organizations": "Responding Organizations",
                            "activities": "Activities",
                            "technologies": "Technologies",
                            "locations": "Locations",
                            "information_categories": "Information Categories"
                            };

    let selectionComponent = Object.entries(selectionOptions).map((option) => {
        return (
                <Button
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

    let glossaryComponent = this.props[glossarySelection].map((entry) => {
        return (
            <div className={styles.glossaryEntryView}>
                <div className={styles.optionsBar}>
                    <h3>{entry.name}</h3>
                    <Tooltip title="Edit">
                        <Description
                            className={styles.editButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => { this.startEditor(information_type)}}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Delete
                            className={styles.deleteButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => {} }
                        />
                    </Tooltip>
                </div>
                <div className={styles.descriptionContainer}>
                    <p>{entry.description}</p>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.componentBody}>
            <div className={styles.catalogContainer}>
                <ButtonToolbar className={styles.selectionOptions}>
                    {selectionComponent}
                    <Tooltip title="Add New Entry">
                            <NoteAdd
                                className={styles.addButton}
                                style={{'color': 'snow', 'height': '50px', 'width': '40px'}}
                            />
                    </Tooltip>
                </ButtonToolbar>
                <div className={styles.glossaryContainer}>
                    {glossaryComponent}
                </div>
            </div>
        </div>
    )


  }
 }