import type { Action } from './types';
import * as InformationTypesActions from '../actions/InformationTypes'

const initialState = {
    information_types: [],
    isLoadingInformationTypes: true

};

export default function InformationTypesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case InformationTypesActions.GET_INFORMATION_TYPES:
        return {...state,  isLoadingInformationTypes: true};
     case InformationTypesActions.GET_INFORMATION_TYPES_SUCCESS:
        return {...state, isLoadingInformationTypes: false,  information_types: action.res};
     case InformationTypesActions.GET_INFORMATION_TYPES_ERROR400:
     case InformationTypesActions.GET_INFORMATION_TYPES_ERROR500:
     case InformationTypesActions.GET_INFORMATION_TYPES_FAILURE:
        return {...state, isLoadingInformationTypes: false}

  }

  return state
}