import React, { Component } from 'react';
import styles from './InformationTypeCatalog.css';
import { Button, ButtonToolbar, ButtonGroup, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Select from 'react-select';

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
        }
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
                <ToggleButton value={triad_key + '-high'}>High</ToggleButton>
                <ToggleButton value={triad_key + '-medium'}>Medium</ToggleButton>
                <ToggleButton value={triad_key + '-low'}>Low</ToggleButton>
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

  render(){

    const {
        information_types,
        information_categories
    } = this.props;

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

        return (
            <div key={information_type.id} className={styles.informationTypeView}>
                <p>{information_type.name}</p>
                <div className={styles.CIARating}>CIA Rating: <ul>
                                    <li>Confidentiality: {information_type.triad_rating.confidentiality}</li>
                                    <li>Integrity: {information_type.triad_rating.integrity}</li>
                                    <li>Availability: {information_type.triad_rating.availability}</li>
                               </ul>
                </div>
                <ButtonToolbar>
                    {information_type_categories}
                </ButtonToolbar>
            </div>
        )
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