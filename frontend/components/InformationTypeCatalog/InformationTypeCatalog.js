import React, { Component } from 'react';
import styles from './InformationTypeCatalog.css';

type Props = {

}

export default class InformationTypeCatalog extends Component<Props> {
  props: Props;

  render(){

    return (
        <div className={styles.componentBody}>
            <h2>Information Type Catalog</h2>
        </div>
    )


  }
 }