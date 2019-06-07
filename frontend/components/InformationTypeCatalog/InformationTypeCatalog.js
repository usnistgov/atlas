import React, { Component } from 'react';
import styles from './InformationTypeCatalog.css';
import { Button, ButtonToolbar, ButtonGroup, ToggleButtonGroup, ToggleButton, DropdownButton, Dropdown} from 'react-bootstrap';
import Select from 'react-select';
import Tooltip from '@material-ui/core/Tooltip';
import Description from "@material-ui/icons/Description";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import BootstrapTable  from 'react-bootstrap-table-next';

type Props = {
    information_types: object
}

var searchOptions = []

export default class InformationTypeCatalog extends Component<Props> {
  props: Props;

  constructor(props){
    super(props);

    this.state = {
        selectedOption: null,
        triad_rating: {
            'confidentiality': null,
            'integrity': null,
            'availability': null
        },
        information_types: []
    }

    this.onChange = this.onChange.bind(this);
    this.startEditor = this.startEditor.bind(this);

  }

  componentWillReceiveProps(newProps){
     if(newProps.information_types != this.props.information_types){
         this.setState(state => {

          let info_types = newProps.information_types.map((entry) => {

            entry.isEditing = false;
            return(entry);

            })

          return {
                information_types: info_types
            }
         });
     }
  }

  componentDidMount(){
    const {
        getInformationCategories,
        getInformationTypes,
    } = this.props;

    getInformationCategories();
    getInformationTypes();

  }

  buttonSearch(triad_key, value){

        return(
          <ToggleButtonGroup
                type="radio"
                name={triad_key}
                value={value}
                onChange={(e) => {
                    this.handleSearch(
                        {"label": this.buttonSearch(triad_key, e),
                        "group": "triad_rating",
                        "name": triad_key,
                        "value": e
                        }
                        )
                    }}
                >
                {triad_key}:
                <ToggleButton className={styles.ciaButton} value={triad_key + '-high'}>High</ToggleButton>
                <ToggleButton className={styles.ciaButton} value={triad_key + '-medium'}>Medium</ToggleButton>
                <ToggleButton className={styles.ciaButton} value={triad_key + '-low'}>Low</ToggleButton>
            </ToggleButtonGroup>
            );

  }

  setSearchOptions(){

      let informationTypeNames = this.props.information_types.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "name"});
      });

      let informationCategoryOptions = this.props.information_categories.map((entry) => {
        return({"value": entry.name,  "label": entry.name, "group": "information_categories"});
      });


      let CIAOptions = [
      {
      "label": this.buttonSearch("confidentiality", null),
      "group": "triad_rating",
      "name": "confidentiality",
      "value": this.state.triad_rating["confidentiality"]
      },
      {
      "label": this.buttonSearch("integrity", null),
      "group": "triad_rating",
      "name": "integrity",
      "value": this.state.triad_rating["integrity"]
      },
      {
      "label": this.buttonSearch("availability", null),
      "group": "triad_rating",
      "name": "availability",
      "value": this.state.triad_rating["availability"]
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

  onChange(information_type){

    let label = event.target.attributes.label.value;
    let value = event.target.value;

    console.log(label, value);
    this.setState(state => {

        let entry = state.information_types.find(x => x.id === information_type.id)
        entry[label] = value
        return {
            entry
            }
    });
  }

  startEditor(information_type){

    this.setState(state => {

        let entry = state.information_types.find(x => x.id === information_type.id);
        entry.isEditing = true;

        return {
            entry
        }
    });
  }

  handleSearch(option, action){

    const {
      getInformationTypes
    } = this.props;

    if(option.group === "triad_rating"){

        this.setState(state => {

             let selectedOption = state.selectedOption;
             let entryIndex = state.selectedOption.findIndex(x => x.name === option.name);
             selectedOption[entryIndex].label = option.label;
             selectedOption[entryIndex].value = option.value;

             return {
                selectedOption,
                triad_rating: {...state.triad_rating, [option.name]: option.value}
                }
        }, () => getInformationTypes(this.state.selectedOption));

    } else {

        this.setState(state => {
            return {
                selectedOption: option
                }
            }, () => getInformationTypes(this.state.selectedOption));
    }
  }

  getHeaderStyle(){

    return {
        height: '4vh',
        backgroundColor: 'darkgrey',
        fontWeight: 'bolder',
        textAlign: 'center'
        }
    }

  getRowStyle(row, rowIdx){

    return {
         backgroundColor: rowIdx % 2 === 0 ? 'black': '#303030',
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

    let informationTypesViewer = information_types.map((information_type) => {

        let information_type_categories = information_type.information_categories.map((entry_id) => {
                let entry = information_categories.find(entry => entry.id == entry_id);
                if(entry !== undefined){
                    return(
                         <Button
                            className={styles.informationCategoryTag}
                            variant="primary"
                            value={entry.name}
                            onClick={(e) => {}}
                            active
                            >
                            {entry.name}
                         </Button>)
                    }
        });

        let cleanView = (
            <div key={information_type.id} className={styles.informationTypeView}>
                <div className={styles.optionsBar}>
                    <h3>{information_type.name}</h3>
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
                <div className={styles.informationTypeInfo}>
                    <div className={styles.mainInfo}>
                         <BootstrapTable
                            classes={styles.ciaTable}
                            data={[information_type]}
                            columns={[
                                {dataField: "_id", text: "ID", hidden: true},
                                {dataField: "triad_rating.confidentiality", text: 'Confidentiality', headerStyle: this.getHeaderStyle()},
                                {dataField: "triad_rating.integrity", text: 'Integrity', headerStyle: this.getHeaderStyle()},
                                {dataField: "triad_rating.availability", text: 'Availability', headerStyle: this.getHeaderStyle()}
                                ]}
                            rowStyle={this.getRowStyle}
                            keyField="_id">
                        </BootstrapTable>
                         <p> Security Reasoning: {information_type.security_reasoning} </p>
                     </div>
                <ButtonToolbar className={styles.informationCategories}>
                        {information_type_categories}
                </ButtonToolbar>
                </div>
            </div>
        )

        let editView = (
            <div key={information_type.id} className={styles.informationTypeView}>
                <div className={styles.optionsBar}>
                    <input
                            label="name"
                            className={styles.nameInput}
                            type="text"
                            onChange={() => this.onChange(information_type)}
                            value={information_type.name}>
                        </input>
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
                <div className={styles.informationTypeInfo}>
                    <div className={styles.mainInfo}>
                          <BootstrapTable
                            keyField="id"
                            classes={styles.ciaTable}
                            data={[information_type]}
                            columns={[
                                {
                                    dataField: "id",
                                    text: "ID",
                                    hidden: true
                                    },
                                {
                                    dataField: "triad_rating.confidentiality",
                                    text: 'Confidentiality',
                                    headerStyle: this.getHeaderStyle()
                                    },
                                {
                                    dataField: "triad_rating.integrity",
                                    text: 'Integrity',
                                    headerStyle: this.getHeaderStyle()
                                    },
                                {
                                    dataField: "triad_rating.availability",
                                    text: 'Availability',
                                    headerStyle: this.getHeaderStyle()
                                }]}
                            rowStyle={this.getRowStyle}
                            >
                        </BootstrapTable>
                         <textarea
                            label="security_reasoning"
                            className={styles.descriptionInput}
                            onChange={() => this.onChange(information_type)}
                            value={information_type.security_reasoning}>
                        </textarea>
                     </div>
                <ButtonToolbar className={styles.informationCategories}>
                        {information_type_categories}
                </ButtonToolbar>
                </div>
            </div>
        )

        if(information_type.isEditing){
            return(
                editView
            )
        } else {
            return(
                cleanView
            )
        }
    });


    return (
        <div className={styles.componentBody}>
            <div className={styles.catalogContainer}>
                <Select
                    isMulti
                    className={styles.searchBar}
                    value={this.state.selectedOption}
                    options={searchOptions}
                    onChange={(value, action) => {
                        this.handleSearch(value, action)
                        }
                    }
                    placeholder="Search Information Types ..."
                />
                <div className={styles.informationTypesContainer}>
                {informationTypesViewer}
                </div>
            </div>
        </div>
    )


  }
 }