import React, { Component } from 'react';
import styles from './Home.css';
import ReactJson from 'react-json-view';

var equal = require('fast-deep-equal');

type Props = {
    use_cases: object,
    isLoadingUseCases: boolean
}

export default class Home extends Component<Props> {
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
    //return(!equal(nextProps.use_cases, this.props.use_cases))
    return(true);
  }

  render(){

    const { use_cases } = this.props;

    if(use_cases !== undefined){

        let listAllUseCases = use_cases.map((element) => {

            return (
                <ReactJson
                    key={element['_id']}
                    src={element}
                    theme="summerfruit:inverted"
                    iconStyle="triangle"
                    displayDataTypes={false}
                    indentWidth={6}
                    name={element['name']}
                    collapsed={true}
                />
            )
        });

        return(
            <div className={styles.componentBody}>
                { listAllUseCases }
            </div>
         )
    } else {

        return(
            <div className={styles.componentBody}></div>
        )
    }
  }
 }