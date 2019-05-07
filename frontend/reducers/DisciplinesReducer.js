import type { Action } from './types';
import * as DisciplinesActions from '../actions/Disciplines'

const initialState = {
    disciplines: [],
    isLoadingDisciplines: true

};

export default function DisciplinesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case DisciplinesActions.GET_DISCIPLINES:
        return {...state,  isLoadingDisciplines: true};
     case DisciplinesActions.GET_DISCIPLINES_SUCCESS:
        return {...state, isLoadingDisciplines: false,  disciplines: action.res};
     case DisciplinesActions.GET_DISCIPLINES_ERROR400:
     case DisciplinesActions.GET_DISCIPLINES_ERROR500:
     case DisciplinesActions.GET_DISCIPLINES_FAILURE:
        return {...state, isLoadingDisciplines: false}

  }

  return state
}