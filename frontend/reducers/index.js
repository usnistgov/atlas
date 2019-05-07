// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import UseCasesReducer from './UseCasesReducer';
import ActivitiesReducer from './ActivitiesReducer';
import ActorsReducer from './ActorsReducer';
import CyberSecurityThreatsReducer from './CyberSecurityThreatsReducer';
import DisciplinesReducer from './DisciplinesReducer';
import InformationCategoriesReducer from './InformationCategoriesReducer';
import InformationTypesReducer from './InformationTypesReducer';
import LocationsReducer from './LocationsReducer';
import RespondingOrganizationsReducer from './RespondingOrganizationsReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    UseCasesReducer,
    ActivitiesReducer,
    ActorsReducer,
    CyberSecurityThreatsReducer,
    DisciplinesReducer,
    InformationCategoriesReducer,
    InformationTypesReducer,
    LocationsReducer,
    RespondingOrganizationsReducer
  });
}