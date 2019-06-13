// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Glossary from '../components/Glossary/Glossary';
import * as ActivitiesActions from '../actions/Activities';
import * as ActorsActions from '../actions/Actors';
import * as CyberSecurityThreatsActions from '../actions/CyberSecurityThreats';
import * as DisciplinesActions from '../actions/Disciplines';
import * as InformationCategoriesActions from '../actions/InformationCategories';
import * as LocationsActions from '../actions/Locations';
import * as RespondingOrganizationsActions from '../actions/RespondingOrganizations';
import * as TechnologiesActions from '../actions/Technologies';

function mapStateToProps(state) {
  return {
    actors: state.ActorsReducer.actors,
    cybersecurity_threats: state.CyberSecurityThreatsReducer.cybersecurity_threats,
    disciplines: state.DisciplinesReducer.disciplines,
    activities: state.ActivitiesReducer.activities,
    responding_organizations: state.RespondingOrganizationsReducer.responding_organizations,
    technologies: state.TechnologiesReducer.technologies,
    information_categories: state.InformationCategoriesReducer.information_categories,
    locations: state.LocationsReducer.locations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActivitiesActions,
                                              ActorsActions,
                                              CyberSecurityThreatsActions,
                                              DisciplinesActions,
                                              InformationCategoriesActions,
                                              LocationsActions,
                                              RespondingOrganizationsActions,
                                              TechnologiesActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Glossary);
