import type { Action } from './types';
import * as InformationTypesActions from '../actions/InformationTypes'

const { sortByName } = require("../utils/utils");

const initialState = {
    information_types: [],
    isLoadingInformationTypes: true,
    latestInformationType: {}
};

export default function InformationTypesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case InformationTypesActions.GET_INFORMATION_TYPES:
        return {...state,  isLoadingInformationTypes: true};
     case InformationTypesActions.GET_INFORMATION_TYPES_SUCCESS:
        return {...state, isLoadingInformationTypes: false,  information_types: action.res.sort(sortByName)};
     case InformationTypesActions.GET_INFORMATION_TYPES_ERROR400:
        console.log(action.res);
        break;
     case InformationTypesActions.GET_INFORMATION_TYPES_ERROR500:
        console.log(action.res);
        break;
     case InformationTypesActions.GET_INFORMATION_TYPES_FAILURE:
        return {...state, isLoadingInformationTypes: false}

     // CREATE
     case InformationTypesActions.POST_INFORMATION_TYPE:
        break;
     case InformationTypesActions.POST_INFORMATION_TYPE_SUCCESS:
        return {...state, isLoadingInformationTypes: false,  latestInformationType: action.res};
     case InformationTypesActions.POST_INFORMATION_TYPE_ERROR400:
        console.log(action.res);
        break;
     case InformationTypesActions.POST_INFORMATION_TYPE_ERROR500:
        console.log(action.res);
        break;
     case InformationTypesActions.POST_INFORMATION_TYPE_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case InformationTypesActions.PUT_INFORMATION_TYPE:
        break;
     case InformationTypesActions.PUT_INFORMATION_TYPE_SUCCESS:
        break;
     case InformationTypesActions.PUT_INFORMATION_TYPE_ERROR400:
        console.log(action.res);
        break;
     case InformationTypesActions.PUT_INFORMATION_TYPE_ERROR500:
        console.log(action.res);
        break;
     case InformationTypesActions.PUT_INFORMATION_TYPE_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case InformationTypesActions.DELETE_INFORMATION_TYPE:
        break;
     case InformationTypesActions.DELETE_INFORMATION_TYPE_SUCCESS:
        break;
     case InformationTypesActions.DELETE_INFORMATION_TYPE_ERROR400:
        console.log(action.res);
        break;
     case InformationTypesActions.DELETE_INFORMATION_TYPE_ERROR500:
        console.log(action.res);
        break;
     case InformationTypesActions.DELETE_INFORMATION_TYPE_FAILURE:
        console.log(action.res);
        break;


  }

  return state
}