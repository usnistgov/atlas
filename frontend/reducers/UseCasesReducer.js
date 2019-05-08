import type { Action } from './types';
import * as UseCasesActions from '../actions/UseCases'

const initialState = {
    use_cases: [],
    isLoadingUseCases: true

};

export default function UseCasesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case UseCasesActions.GET_USE_CASES:
        return {...state, isLoadingUseCases: true};
     case UseCasesActions.GET_USE_CASES_SUCCESS:
        return {...state, isLoadingUseCases: false,  use_cases: action.res};
     case UseCasesActions.GET_USE_CASES_ERROR400:
     case UseCasesActions.GET_USE_CASES_ERROR500:
     case UseCasesActions.GET_USE_CASES_FAILURE:
        return {...state, isLoadingUseCases: false}

  }

  return state
}