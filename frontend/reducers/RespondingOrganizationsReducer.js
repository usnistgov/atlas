import type { Action } from './types';
import * as RespondingOrganizationsActions from '../actions/RespondingOrganizations'

const initialState = {
    responding_organizations: [],
    isLoadingRespondingOrganizations: true,
    latestRespondingOrganization: {}
};

export default function RespondingOrganizationsReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS:
        return {...state,  isLoadingRespondingOrganizations: true};
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_SUCCESS:
        return {...state, isLoadingRespondingOrganizations: false,  responding_organizations: action.res};
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_ERROR400:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_ERROR500:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.GET_RESPONDING_ORGANIZATIONS_FAILURE:
        return {...state, isLoadingRespondingOrganizations: false}

     // CREATE
     case RespondingOrganizationsActions.POST_RESPONDING_ORGANIZATION:
        break;
     case RespondingOrganizationsActions.POST_RESPONDING_ORGANIZATION_SUCCESS:
        return {...state, latestRespondingOrganization: action.res};
     case RespondingOrganizationsActions.POST_RESPONDING_ORGANIZATION_ERROR400:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.POST_RESPONDING_ORGANIZATION_ERROR500:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.POST_RESPONDING_ORGANIZATION_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case RespondingOrganizationsActions.PUT_RESPONDING_ORGANIZATION:
        break;
     case RespondingOrganizationsActions.PUT_RESPONDING_ORGANIZATION_SUCCESS:
        break;
     case RespondingOrganizationsActions.PUT_RESPONDING_ORGANIZATION_ERROR400:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.PUT_RESPONDING_ORGANIZATION_ERROR500:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.PUT_RESPONDING_ORGANIZATION_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case RespondingOrganizationsActions.DELETE_RESPONDING_ORGANIZATION:
        break;
     case RespondingOrganizationsActions.DELETE_RESPONDING_ORGANIZATION_SUCCESS:
        break;
     case RespondingOrganizationsActions.DELETE_RESPONDING_ORGANIZATION_ERROR400:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.DELETE_RESPONDING_ORGANIZATION_ERROR500:
        console.log(action.res);
        break;
     case RespondingOrganizationsActions.DELETE_RESPONDING_ORGANIZATION_FAILURE:
        console.log(action.res);
        break;
  }

  return state
}