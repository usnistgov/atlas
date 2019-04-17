import React, { Component } from 'react';
import styles from './Home.css';

export default class Home extends Component<Props> {
  props: Props;

  render(){

    return(
        <div className={styles.componentBody}>
            <h2>Welcome From React</h2>
        </div>
    )
  }
 }