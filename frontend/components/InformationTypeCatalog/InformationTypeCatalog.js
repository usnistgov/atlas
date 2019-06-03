import React, { Component } from 'react';
import styles from './InformationTypeCatalog.css';

type Props = {
    information_types: object
}

export default class InformationTypeCatalog extends Component<Props> {
  props: Props;

  render(){

    const {
        information_types
    } = this.props;

    let informationTypesViewer = information_types.map((information_type) => {
        return (
            <div className={styles.informationTypeContainer}>

            </div>
        )
    });


    return (
        <div className={styles.componentBody}>
            <h2>Information Type Catalog</h2>
        </div>
    )


  }
 }