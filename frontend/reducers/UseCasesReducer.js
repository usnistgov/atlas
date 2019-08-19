import type { Action } from './types';
import * as UseCasesActions from '../actions/UseCases'

const { sortByName } = require("../utils/utils");

const initialState = {
    use_cases: [],
    isLoadingUseCases: true,
    latestUseCase: {}
};

export default function UseCasesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case UseCasesActions.GET_USE_CASES:
        return {...state, isLoadingUseCases: true};
     case UseCasesActions.GET_USE_CASES_SUCCESS:
        return {...state, isLoadingUseCases: false, use_cases: action.res.sort(sortByName)};
     case UseCasesActions.GET_USE_CASES_ERROR400:
        console.log(action.res);
        break;
     case UseCasesActions.GET_USE_CASES_ERROR500:
        console.log(action.res);
        break;
     case UseCasesActions.GET_USE_CASES_FAILURE:
        return {...state, isLoadingUseCases: false}

     // CREATE
     case UseCasesActions.POST_USE_CASE:
        break;
     case UseCasesActions.POST_USE_CASE_SUCCESS:
        return {...state, latestUseCase: action.res}
     case UseCasesActions.POST_USE_CASE_ERROR400:
        console.log(action.res);
        break;
     case UseCasesActions.POST_USE_CASE_ERROR500:
        console.log(action.res);
        break;
     case UseCasesActions.POST_USE_CASE_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case UseCasesActions.PUT_USE_CASE:
        break;
     case UseCasesActions.PUT_USE_CASE_SUCCESS:
        break;
     case UseCasesActions.PUT_USE_CASE_ERROR400:
        console.log(action.res);
        break;
     case UseCasesActions.PUT_USE_CASE_ERROR500:
        console.log(action.res);
        break;
     case UseCasesActions.PUT_USE_CASE_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case UseCasesActions.DELETE_USE_CASE:
        break;
     case UseCasesActions.DELETE_USE_CASE_SUCCESS:
        break;
     case UseCasesActions.DELETE_USE_CASE_ERROR400:
        console.log(action.res);
        break;
     case UseCasesActions.DELETE_USE_CASE_ERROR500:
        console.log(action.res);
        break;
     case UseCasesActions.DELETE_USE_CASE_FAILURE:
        console.log(action.res);
        break;

  }

  return state
}