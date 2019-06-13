import type { Action } from './types';
import * as DisciplinesActions from '../actions/Disciplines'

const initialState = {
    disciplines: [],
    isLoadingDisciplines: true,
    latestDiscipline: {}

};

export default function DisciplinesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case DisciplinesActions.GET_DISCIPLINES:
        return {...state,  isLoadingDisciplines: true};
     case DisciplinesActions.GET_DISCIPLINES_SUCCESS:
        return {...state, isLoadingDisciplines: false,  disciplines: action.res};
     case DisciplinesActions.GET_DISCIPLINES_ERROR400:
        console.log(action.res);
        break;
     case DisciplinesActions.GET_DISCIPLINES_ERROR500:
        console.log(action.res);
        break;
     case DisciplinesActions.GET_DISCIPLINES_FAILURE:
        return {...state, isLoadingDisciplines: false}

     // CREATE
     case DisciplinesActions.POST_DISCIPLINE:
        break;
     case DisciplinesActions.POST_DISCIPLINE_SUCCESS:
        return {...state, latestDiscipline: action.res};
     case DisciplinesActions.POST_DISCIPLINE_ERROR400:
        console.log(action.res);
        break;
     case DisciplinesActions.POST_DISCIPLINE_ERROR500:
        console.log(action.res);
        break;
     case DisciplinesActions.POST_DISCIPLINE_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case DisciplinesActions.PUT_DISCIPLINE:
        break;
     case DisciplinesActions.PUT_DISCIPLINE_SUCCESS:
        break;
     case DisciplinesActions.PUT_DISCIPLINE_ERROR400:
        console.log(action.res);
        break;
     case DisciplinesActions.PUT_DISCIPLINE_ERROR500:
        console.log(action.res);
        break;
     case DisciplinesActions.PUT_DISCIPLINE_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case DisciplinesActions.DELETE_DISCIPLINE:
        break;
     case DisciplinesActions.DELETE_DISCIPLINE_SUCCESS:
        break;
     case DisciplinesActions.DELETE_DISCIPLINE_ERROR400:
        console.log(action.res);
        break;
     case DisciplinesActions.DELETE_DISCIPLINE_ERROR500:
        console.log(action.res);
        break;
     case DisciplinesActions.DELETE_DISCIPLINE_FAILURE:
        console.log(action.res);
        break;

  }

  return state
}