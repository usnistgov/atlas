// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TitleBar from '../components/TitleBar/TitleBar';
import * as UseCasesActions from '../actions/UseCases';
import * as ActivitiesActions from '../actions/Activities';
import * as ActorsActions from '../actions/Actors';
import * as CyberSecurityThreatsActions from '../actions/CyberSecurityThreats';
import * as DisciplinesActions from '../actions/Disciplines';
import * as InformationCategoriesActions from '../actions/InformationCategories';
import * as InformationTypesActions from '../actions/InformationTypes';
import * as LocationsActions from '../actions/Locations';
import * as RespondingOrganizationsActions from '../actions/RespondingOrganizations';

function mapStateToProps(state) {
  return {
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
                                              RespondingOrganizationsActions), dispatch);
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TitleBar));
