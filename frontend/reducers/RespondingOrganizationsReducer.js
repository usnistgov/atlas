import type { Action } from './types';
import * as RespondingOrganizationsActions from '../actions/RespondingOrganizations'

const initialState = {
    responding_organizations: [],
    isLoadingRespondingOrganizations: true

};

export default function RespondingOrganizationsReducer(state=initialState, action: Action) {

  switch (action.type) {
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS:
        return {...state,  isLoadingRespondingOrganizations: true};
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_SUCCESS:
        return {...state, isLoadingRespondingOrganizations: false,  responding_organizations: action.res};
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_ERROR400:
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_ERROR500:
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_FAILURE:
        return {...state, isLoadingRespondingOrganizations: false}

  }

  return state
}