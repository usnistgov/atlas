import React, { Component } from 'react';
import styles from './InformationTypeCatalog.css';
import { Button, ButtonToolbar } from 'react-bootstrap';

type Props = {
    information_types: object
}

export default class InformationTypeCatalog extends Component<Props> {
  props: Props;

  componentDidMount(){
    const {
        getInformationCategories,
        getInformationTypes,
    } = this.props;

    getInformationCategories();
    getInformationTypes();
  }

  render(){

    const {
        information_types,
        information_categories
    } = this.props;

    let informationTypesViewer = information_types.map((information_type) => {

        let information_type_categories = information_categories.map((entry_id) => {
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
                <h2>Information Type Catalog</h2>
                <div className={styles.informationTypesContainer}>
                {informationTypesViewer}
                </div>
            </div>
        </div>
    )


  }
 }