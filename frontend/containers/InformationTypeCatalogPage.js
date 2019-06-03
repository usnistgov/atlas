// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InformationTypeCatalog from '../components/InformationTypeCatalog/InformationTypeCatalog';
import * as UseCasesActions from '../actions/UseCases';
import * as ActivitiesActions from '../actions/Activities';
import * as ActorsActions from '../actions/Actors';
import * as CyberSecurityThreatsActions from '../actions/CyberSecurityThreats';
import * as DisciplinesActions from '../actions/Disciplines';
import * as InformationCategoriesActions from '../actions/InformationCategories';
import * as InformationTypesActions from '../actions/InformationTypes';
import * as LocationsActions from '../actions/Locations';
import * as RespondingOrganizationsActions from '../actions/RespondingOrganizations';
import * as TechnologiesActions from '../actions/Technologies';

function mapStateToProps(state) {
  return {
        information_categories: state.InformationCategoriesReducer.information_categories,
        information_types: state.InformationTypesReducer.information_types,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, UseCasesActions,
                                              ActivitiesActions,
                                              ActorsActions,
                                              CyberSecurityThreatsActions,
                                              DisciplinesActions,
                                              InformationCategoriesActions,
                                              InformationTypesActions,
                                              LocationsActions,
                                              RespondingOrganizationsActions,
                                              TechnologiesActions), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationTypeCatalog);
