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

     case UseCasesActions.POST_USE_CASE:
     case UseCasesActions.POST_USE_CASE_SUCCESS:
        return {...state}
     case UseCasesActions.POST_USE_CASE_ERROR400:
        console.log(action.res)
     case UseCasesActions.POST_USE_CASE_ERROR500:
     case UseCasesActions.POST_USE_CASE_FAILURE:

     case UseCasesActions.PUT_USE_CASE:
     case UseCasesActions.PUT_USE_CASE_SUCCESS:
         return {...state}
     case UseCasesActions.PUT_USE_CASE_ERROR400:
     case UseCasesActions.PUT_USE_CASE_ERROR500:
     case UseCasesActions.PUT_USE_CASE_FAILURE:

     case UseCasesActions.DELETE_USE_CASE:
     case UseCasesActions.DELETE_USE_CASE_SUCCESS:
         return {...state}
     case UseCasesActions.DELETE_USE_CASE_ERROR400:
     case UseCasesActions.DELETE_USE_CASE_ERROR500:
              console.log(action.res);
     case UseCasesActions.DELETE_USE_CASE_FAILURE:


  }

  return state
}