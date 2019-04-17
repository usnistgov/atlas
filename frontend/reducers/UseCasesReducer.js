import type { Action } from './types';
import * as UseCasesActions from '../actions/UseCases'

const initialState = {
    use_cases: [],
    isLoadingUseCases: true

};

export default function deviceReducer(state=initialState, action: Action) {

  switch (action.type) {
     case UseCasesActions.GET_USECASES:
        return {...state, isLoadingUseCases: true};
     case UseCasesActions.GET_USECASES_SUCCESS:
        return {...state, isLoadingUseCases: false,  use_cases: action.res};
     case UseCasesActions.GET_USECASES_ERROR400:
     case UseCasesActions.GET_USECASES_ERROR500:
     case UseCasesActions.GET_USECASES_FAILURE:
        return {...state, isLoadingUseCases: false}

  }

  return state
}