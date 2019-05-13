import React, { Component } from 'react';
import styles from './UseCaseCatalog.css';
import ReactJson from 'react-json-view';

var equal = require('fast-deep-equal');

type Props = {
    use_cases: object,
    isLoadingUseCases: boolean
}

export default class UseCaseCatalog extends Component<Props> {
  props: Props;

  componentDidMount(){
    const {
        getActivities,
        getActors,
        getCyberSecurityThreats,
        getDisciplines,
        getRespondingOrganizations,
        getInformationCategories,
        getInformationTypes,
        getLocations,
        getUseCases
         } = this.props;

    getActivities();
    getActors();
    getCyberSecurityThreats();
    getDisciplines();
    getRespondingOrganizations();
    getInformationCategories();
    getInformationTypes();
    getLocations();
    getUseCases();

  }

  shouldComponentUpdate(nextProps){
    return(!equal(nextProps.use_cases, this.props.use_cases))
  }

  render(){

    const { use_cases } = this.props;

    if(use_cases !== undefined){

        return(
            <div className={styles.componentBody}>
               <h2>Use Case Catalog</h2>
            </div>
         )
    } else {

        return(
            <div className={styles.componentBody}></div>
        )
    }
  }
 }