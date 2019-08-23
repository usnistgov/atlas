import React, { Component } from 'react';
import routes from '../../constants/routes';
import styles from './InformationTypeCatalog.css';
import { Button,
         ButtonToolbar,
         ButtonGroup,
         ToggleButtonGroup,
         ToggleButton,
         DropdownButton,
         Dropdown,
         Modal } from 'react-bootstrap';
import Select, { components, makeAnimated }  from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';
import Description from "@material-ui/icons/Description";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Popup from "reactjs-popup";
import BootstrapTable  from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

type Props = {
    information_types: object
}

var catalogHeight;
var searchOptions = []
const equal = require('fast-deep-equal');

const headerStyle =
        {
        height: 'calc(var(--vh, 1vh) * 5)',
        backgroundColor: 'darkgrey',
        fontWeight: 'bolder',
        whiteSpace: 'nowrap',
        headerAlign: 'center',
        border: 'outset',
        borderColor: 'darkgrey',
        borderRadius: '8px'
        }

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

const ITDescription = ({information_type: {description}, className: {className} }) => {
            return (
                <div className={styles.Rtable_cell}>
                    <h3>Description:</h3>
                    <p>{description}</p>
                </div>
            )
  }

const SecurityReasoning = ({information_type: {security_reasoning}}) => {
            if (security_reasoning){

                return (
                     <div>
                        <h3>Security Reasoning:</h3>
                        <p>{security_reasoning}</p>
                    </div>
                )
            }
            else{
                return <div/>
            }
}

export default class InformationTypeCatalog extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    const {
        getInformationCategories,
        getInformationTypes,
    } = props;

    this.state = {
        selectedOption: [],
        latestAction: null,
        triad_rating: {
            'confidentiality': null,
            'integrity': null,
            'availability': null,
            'searchOption': "and"
        },
        information_types: [],
        latestAction: 'start-up'
    }

    this.informationTypeRefs = {};

    this.onChange = this.onChange.bind(this);
    this.startEditor = this.startEditor.bind(this);
    this.addNewInformationType = this.addNewInformationType.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.handleSearchOptionClick = this.handleSearchOptionClick.bind(this);
    this.triadButtons = {}

    this.multiValue = props => {

        let labelProps = {'children': props['children']}

        return (
            <components.MultiValue {...props}
                style={props.getStyles('multiValue', props)}
            >
                <div onClickCapture={(event) => {
                    this.Select.setState({'menuIsOpen': false}, () => {

                        if(props.data.group === "triad_rating"){
                            this.triadButtons[props.data.name].setState({'fire': false});
                            this.triadButtons[props.data.name].props.onChange(props.data.label.props.value);
                        } else {
                            this.handleSearchOptionClick(props.data);
                        }

                    })

                }}>
                    <components.MultiValueContainer
                        {...labelProps}
                    />
                 </div>
            </components.MultiValue>
        );
    };

    getInformationCategories();
    getInformationTypes(this.state);
  }

  static getDerivedStateFromProps(props, state){

    const stateUpdateOptions = ['start-up',
                                'start-editor',
                                'stop-editor',
                                'update-button-search-value',
                                'set-button-search-value',
                                'remove-value',
                                'clear'
                                ];

    if(stateUpdateOptions.includes(state.latestAction)){

        if(!equal(props.information_types, state.information_types)){

                state.information_types = props.information_types.map((entry, index, array) => {
                    let stateEntry = state.information_types.find(x => x.id === entry.id);

                    if(stateEntry !== undefined){
                        if(stateEntry.action === 'save'){
                            entry.name = stateEntry.name;
                            entry.description = stateEntry.description;
                            entry.triad_rating = stateEntry.triad_rating;
                            entry.security_reasoning = stateEntry.security_reasoning;
                        }
                        entry.isEditing = stateEntry.isEditing;
                        entry.action = stateEntry.action;
                    }
                    return entry;
                });
            }
    }
    return state;
  }

  componentDidUpdate(props, state){

    if(this.props.history.hasOwnProperty("informationTypeSearch")){
        let entryId = this.props.history.informationTypeSearch['entryId'];
        let searchRef = this.informationTypeRefs[entryId];

        searchRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        delete this.props.history.informationTypeSearch;

      }

  }


  buttonSearch(triad_key){

       let buttonContainer = (
          <ToggleButtonGroup
                ref={ref => { this.triadButtons[triad_key] = ref }}
                name={triad_key}
                value={this.state.triad_rating[triad_key]}
                onChange={(e) => {
                    this.setState(state => {

                        let entryIndex = state.selectedOption.findIndex(x => x.name === triad_key);

                        state.selectedOption[entryIndex].label =  {
                             ...state.selectedOption[entryIndex].label,
                             props: {
                                ...state.selectedOption[entryIndex].label.props,
                                value: e
                            }
                        },
                        state.latestAction = "set-button-search-value"

                    }, () => {
                        let entry = this.state.selectedOption.find(x => x.name === triad_key);
                        this.handleSearch(entry, {'action': this.state.latestAction})

                    });
                }}
                >
                {triad_key}:
                <ToggleButton
                    className={styles.ciaButton}
                    value={triad_key + '-high'}>High</ToggleButton>
                <ToggleButton
                    className={styles.ciaButton}
                    value={triad_key + '-medium'}>Medium</ToggleButton>
                <ToggleButton
                    className={styles.ciaButton}
                    value={triad_key + '-low'}>Low</ToggleButton>
            </ToggleButtonGroup>
            );

       return(buttonContainer);
  }

  setSearchOptions(){

      let informationTypeNames = this.props.information_types.map((entry) => {
        return({"id" : entry.id, "value": entry.name,  "label": entry.name, "group": "name", "searchOption": "and"});
      });

      let informationCategoryOptions = this.props.information_categories.map((entry) => {
        return({"id": entry.id, "value": entry.name,  "label": entry.name, "group": "information_categories", "searchOption": "and"});
      });


      let confidentialityButton = this.buttonSearch("confidentiality");
      let integrityButton = this.buttonSearch("integrity");
      let availabilityButton = this.buttonSearch("availability");

      let CIAOptions = [
      {
      "label": this.buttonSearch("confidentiality"),
      "group": "triad_rating",
      "name": "confidentiality",
      "value": 1,
      "searchOption": "and"
      },
      {
      "label": this.buttonSearch("integrity"),
      "group": "triad_rating",
      "name": "integrity",
      "value": 2,
      "searchOption": "and"
      },
      {
      "label": this.buttonSearch("availability"),
      "group": "triad_rating",
      "name": "availability",
      "value": 3,
      "searchOption": "and"
      }
      ]

      searchOptions = [
        {
        "label": "CIA Rating",
        "options": CIAOptions
        },
        {
        "label": "Information Categories",
        "options": informationCategoryOptions
        },
        {
        "label": "Information Types",
        "options": informationTypeNames
        }
    ]
  }

  addNewInformationType(){

    let newInfoType = {
        'id': '',
        'name': '',
        'description': '',
        'triad_rating': {
            'confidentiality': 'medium',
            'integrity': 'medium',
            'availability': 'medium'
        },
        'security_reasoning': '',
        'information_categories': [],
        'isEditing': true
    }

    this.setState(state => {
        return {
            information_types: [...state.information_types, newInfoType],
            latestAction: 'add-new-entry'
        }
    }, () => {

        let catalogElement = document.getElementById("informationTypesCatalog");
        catalogElement.scrollTop = catalogElement.scrollHeight;
    });
  }

  deleteInformationType(information_type){

    let deleteConfirm = confirm("Are You Sure You Want to Delete This Information Type?");
    if(deleteConfirm){

        this.props.deleteInformationType(information_type).then(() => {
             this.props.getInformationTypes(this.state);
        })
    }
  }

  cancelChanges(information_type){

      this.stopEditor(information_type, 'reset')
  }

  saveChanges(information_type){

    if(information_type.name !== ''){
        if(information_type.id === ''){
            this.props.createInformationType(information_type).then(() => {
                 this.stopEditor(information_type, 'save');
            });
        } else {
            this.props.updateInformationType(information_type).then(() => {
                 this.stopEditor(information_type, 'save');
            });
        }

    } else {
        alert("Information Type must Have a Name to be Saved !!!");
    }
  }

  onChange(label, value, information_type){

    this.setState(state => {

        return {
            information_types: state.information_types.map((entry) => {
                if(entry.id === information_type.id){
                    entry[label] = value;
                }
                return(entry);
            }),
            latestAction: 'change-entry-value'
            }
    });
  }

  startEditor(information_type){

    this.setState(state => {

        return {
            information_types: state.information_types.map((entry) => {
                if(entry.id === information_type.id){
                    entry.isEditing = true;
                    entry.action = 'save';
                }
                return(entry);
            }),
            latestAction: 'start-editor'
        }
    });
  }

  stopEditor(information_type, option){

    this.setState(state => {

        return {
            information_types: state.information_types.map((entry) => {
                if(entry.id === information_type.id){
                    entry.isEditing = false;
                    entry.action = option;
                }
                return(entry);
            }),
            latestAction: 'stop-editor'
        }
    }, () => {
        this.props.getInformationTypes(this.state);
    });
  }

  handleSearch(option, action){

    const {
      getInformationTypes
    } = this.props;

    if(option.group === "triad_rating"){

        if(action.action === "set-button-search-value"){
            if(option.label.props.value === this.state.triad_rating[option.name]){

                this.handleSearchOptionClick(option)

            } else {

                this.setState(state => {

                    return {
                        triad_rating: {
                            ...state.triad_rating,
                            [option.name]: option.label.props.value
                        },
                        latestAction: "update-button-search-value"
                    }
                }, () => {
                     getInformationTypes(this.state);
                });
            }
        }
    } else {

        this.setState(state => {
            if(action.action === 'remove-value' && action.removedValue.group === "triad_rating"){
                state.triad_rating[action.removedValue.name] = null;
                this.triadButtons[action.removedValue.name].setState({'fire': undefined});
            }

            if(action.action === 'clear'){
                state.triad_rating = {
                    'confidentiality': null,
                    'integrity': null,
                    'availability': null,
                    'searchOption': "and"
                }
            }

            return {
                selectedOption: option,
                latestAction: action.action
                }
            }, () => {

                if(action.hasOwnProperty('option') && action.option.group === "triad_rating"){
                    ;
                } else {

                    getInformationTypes(this.state)
                }
            }
        );
    }
  }

  handleSearchOptionClick(option){

    if(option.group !== "name"){
        this.setState(state => {

            switch(option.searchOption){
                case "and":
                    option.searchOption = "or";
                    break;
                case "or":
                    option.searchOption = "not";
                    break;
                case "not":
                    option.searchOption = "not or";
                    break;
                case "not or":
                    option.searchOption = "and";
                    break;
            }

                        let groupOption;

            if(option.group === "triad_rating"){
                    state.triad_rating.searchOption = option.searchOption;
            }

            state.selectedOption.forEach(entry => {
                if(entry.group === option.group){
                    entry.searchOption = option.searchOption;
                }
            });

        }, () => {
                this.props.getInformationTypes(this.state)
            });
        }
  }

  getRowStyle(row, rowIdx){

    return {
         backgroundColor: rowIdx % 2 === 0 ? 'black': '#303030',
         height: 'calc(var(--vh, 1vh) * 5)'
              }
    }

  getCIAStyle(cell, row, rowIndex, colIndex) {
    let cia_background_color;

    switch(cell){
        case "high": cia_background_color="#ff9696"; break;
        case "medium": cia_background_color="#ffff91"; break;
        case "low": cia_background_color="#c6ff91"; break;
    }

    return {
        backgroundColor: cia_background_color,
        borderRadius: "10px",
        fontWeight: "Bold",
        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
        }
  }

  render(){

    const {
        information_categories
    } = this.props;

    const {
        information_types
    } = this.state;

    this.setSearchOptions();

    const animatedComponents = makeAnimated({ MultiValue: this.multiValue });

    let informationTypesViewer = information_types.map((information_type) => {

        let tableData = [information_type];

        this.informationTypeRefs[information_type.id] = React.createRef();

        let information_type_categories = information_type.information_categories.map((entry_id) => {

                let entry = information_categories.find(entry => entry.id === entry_id);
                if(entry !== undefined){
                    if(information_type.isEditing){

                         return(
                         <Button
                            key={entry.id}
                            className={styles.informationCategoryTagEdit}
                            variant="primary"
                            value={entry.name}
                            onDoubleClick={(e) => {
                                this.props.history.glossaryOptions = {'glossarySelection': 'information_categories', 'entryId': entry.id}
                                this.props.history.push(routes.GLOSSARY);
                            }}
                            active
                            >
                            <div className={styles.removeButtonContainer}>
                                {entry.name}
                                <Tooltip title="Remove Information Category">
                                    <Remove
                                        className={styles.removeButton}
                                        style={{"color": "snow", "height": "30px", "width": "30px"}}
                                        onClick={(e) => {
                                                    let new_categories = information_type.information_categories.filter(x => x !== entry_id);
                                                    this.onChange("information_categories",
                                                                        new_categories,
                                                                        information_type)}}
                                    />
                                </Tooltip>
                            </div>
                         </Button>)

                    } else {


                        return(
                         <Button
                            key={entry.id}
                            className={styles.informationCategoryTag}
                            variant="primary"
                            value={entry.name}
                            onDoubleClick={(e) => {
                                this.props.history.glossarySearch = {'glossarySelection': 'information_categories', 'entryId': entry.id}
                                this.props.history.push(routes.GLOSSARY);
                            }}
                            active
                            >
                            {entry.name}
                         </Button>)
                    }
                }
        });

        let cleanView = (
            <div key={information_type.id} ref={this.informationTypeRefs[information_type.id]} className={styles.informationTypeView}>
                <div className={styles.optionsBar}>
                    <h3>{information_type.name}</h3>
                    <Tooltip title="Edit">
                        <Description
                            className={styles.editButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => {
                                this.startEditor(information_type)
                                }}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Delete
                            className={styles.deleteButton}
                            style={{'color': '#F06449', 'height': '50px', 'width': '40px'}}
                            onClick={() => {
                                    this.deleteInformationType(information_type)
                                    }}
                        />
                    </Tooltip>
                </div>
                <div className={styles.informationTypeInfo}>
                    <div className={styles.Rtable} >
                         <ITDescription information_type={information_type} className={styles.Rtable_cell}/>
                         <div className={styles.Rtable_cell}>
                            <h3>Security Classification</h3>
                             <BootstrapTable
                                classes={styles.ciaTable}
                                data={tableData}
                                columns={[
                                    {dataField: "id", text: "ID", hidden: true},
                                    {dataField: "triad_rating.confidentiality", text: 'Confidentiality', editable: false, headerStyle: headerStyle, style: this.getCIAStyle},
                                    {dataField: "triad_rating.integrity", text: 'Integrity', editable: false, headerStyle: headerStyle, style: this.getCIAStyle},
                                    {dataField: "triad_rating.availability", text: 'Availability', editable: false, headerStyle: headerStyle, style: this.getCIAStyle}
                                    ]}
                                cellEdit={ cellEditFactory({ mode:'dbclick' }) }
                                rowStyle={this.getRowStyle}
                                keyField="id">
                            </BootstrapTable>
                         </div>
                         <div className={styles.Rtable_cell}>
                            <h3>Information Categories</h3>
                            <ButtonToolbar className={styles.informationCategories}>
                                    {information_type_categories}
                            </ButtonToolbar>
                        </div>
                        <div className={styles.Rtable_cell}>
                            <SecurityReasoning information_type={information_type}/>
                        </div>
                     </div>
                </div>
            </div>
        )

        let editView = (
            <div key={information_type.id} ref={this.informationTypeRefs[information_type.id]} className={styles.informationTypeView}>
                <div className={styles.optionsBar}>
                    <input
                            label="name"
                            className={styles.nameInput}
                            type="text"
                            onChange={(e) => this.onChange("name", e.target.value, information_type)}
                            value={information_type.name}>
                        </input>
                    <Tooltip title="Save">
                        <Check
                            className={styles.saveButton}
                            style={{"color": "green", "height": "40px", "width": "50px"}}
                            onClick={() => this.saveChanges(information_type)}
                        />
                    </Tooltip>
                    <Tooltip title="Cancel">
                        <Clear
                            className={styles.clearButton}
                            style={{"color": "#F06449", "height": "40px", "width": "40px"}}
                            onClick={() => {
                                    this.cancelChanges(information_type);
                                    this.stopEditor(information_type);
                                    }
                            }
                    />
                </Tooltip>
                </div>
                <div className={styles.informationTypeInfo}>
                    <div className={styles.Rtable}>
                        <div className={styles.Rtable_cell}>
                          <h3>Description:</h3>
                          <textarea
                            label="description"
                            className={styles.descriptionInput}
                            onChange={(e) => this.onChange("description", e.target.value, information_type)}
                            value={information_type.description}>
                          </textarea>
                        </div>
                        <div className={styles.Rtable_cell}>
                            <h3>Security Classification</h3>
                            <BootstrapTable
                                keyField="id"
                                classes={styles.ciaTable}
                                data={tableData}
                                columns={[
                                    {
                                    dataField: "id",
                                    text: "ID",
                                    hidden: true
                                    },
                                    {
                                    dataField: "triad_rating.confidentiality",
                                    text: 'Confidentiality',
                                    headerStyle: headerStyle,
                                    style: this.getCIAStyle,
                                    editable: true,
                                    editor: {
                                        type: Type.SELECT,
                                        options: [
                                        {
                                        value: "high",
                                        label: "high"
                                        },
                                        {
                                        value: "medium",
                                        label: "medium"
                                        },
                                        {
                                        value: "low",
                                        label: "low"
                                        }]}
                                    },
                                    {
                                    dataField: "triad_rating.integrity",
                                    text: 'Integrity',
                                    headerStyle: headerStyle,
                                    style: this.getCIAStyle,
                                    editable: true,
                                    editor: {
                                        type: Type.SELECT,
                                        options: [
                                        {
                                        value: "high",
                                        label: "high"
                                        },
                                        {
                                        value: "medium",
                                        label: "medium"
                                        },
                                        {
                                        value: "low",
                                        label: "low"
                                        }]}
                                    },
                                    {
                                    dataField: "triad_rating.availability",
                                    text: 'Availability',
                                    headerStyle: headerStyle,
                                    style: this.getCIAStyle,
                                    editable: true,
                                    editor: {
                                        type: Type.SELECT,
                                        options: [
                                        {
                                        value: "high",
                                        label: "high"
                                        },
                                        {
                                        value: "medium",
                                        label: "medium"
                                        },
                                        {
                                        value: "low",
                                        label: "low"
                                        }]}
                                    }]
                                    }
                                cellEdit={ cellEditFactory({ mode:'dbclick', blurToSave: true }) }
                                rowStyle={this.getRowStyle}
                            >
                            </BootstrapTable>
                        </div>
                        <div className={styles.Rtable_cell}>
                            <ButtonToolbar className={styles.informationCategories}>
                                {information_type_categories}
                                <Popup
                                    className={styles.addModal}
                                    trigger={<Tooltip title="Add Information Category"><Add className={styles.addButton} style={{"color": "green", "height": "35px", "width": "35px", "marginTop": "2px"}} /></Tooltip>}
                                    modal
                                >
                                {close => {

                                    let categoryOptions = searchOptions.filter(x => x.label === "Information Categories");
                                    let selectedCategories = categoryOptions[0]['options'].filter(x => {
                                        if(information_type.information_categories.includes(x.id)){
                                            return(x)
                                        }
                                    })


                                    return (
                                    <div className={styles.addSearchBar}>
                                        <Select
                                            isMulti
                                            value={selectedCategories}
                                            options={categoryOptions}
                                            onChange={(e) =>
                                                {
                                                    let info_categories = e.map(entry => entry.id);
                                                    this.onChange("information_categories", info_categories, information_type);
                                                    close();
                                                }
                                            }
                                            placeholder={"Add Item to Information Categories"}
                                        />
                                    </div>
                                    )
                                    }
                                }
                                </Popup>
                            </ButtonToolbar>
                        </div>
                        <div className={styles.Rtable_cell}>
                            <h3>Security Reasoning:</h3>
                            <textarea
                                label="security_reasoning"
                                className={styles.descriptionInput}
                                onChange={(e) => this.onChange("security_reasoning", e.target.value, information_type)}
                                value={information_type.security_reasoning}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        )

        return(information_type.isEditing ? editView : cleanView)
    });


    return (
        <div className={styles.componentBody}>
            <div className={styles.catalogContainer}>
                <Select
                    ref={(ref) => this.Select = ref}
                    isMulti
                    components={animatedComponents}
                    styles={multiValueStyle}
                    className={styles.searchBar}
                    classNamePrefix={styles.searchBar}
                    value={this.state.selectedOption}
                    options={searchOptions}
                    onChange={(option, action) => {
                        this.handleSearch(option, action)
                        }
                    }
                    placeholder="Search Information Types ..."
                />
                <Tooltip title="Add New Information Type">
                            <NoteAdd
                                className={styles.addButton}
                                style={{'color': 'snow', 'height': '50px', 'width': '40px'}}
                                onClick={() => this.addNewInformationType()}
                            />
                </Tooltip>
            </div>
            <div id="informationTypesCatalog" className={styles.informationTypesContainer}>
                {informationTypesViewer}
            </div>
        </div>
    )


  }
 }