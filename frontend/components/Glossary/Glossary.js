import React, { Component } from 'react';
import styles from './Glossary.css';

type Props = {

}

export default class Glossary extends Component<Props> {
  props: Props;

  render(){

    return (
        <div className={styles.componentBody}>
            <h2>Glossary</h2>
        </div>
    )


  }
 }