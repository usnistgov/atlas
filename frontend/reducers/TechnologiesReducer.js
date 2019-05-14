import type { Action } from './types';
import * as TechnologiesActions from '../actions/Technologies'

const initialState = {
    technologies: [],
    isLoadingTechnologies: true

};

export default function TechnologiesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case TechnologiesActions.GET_TECHNOLOGIES:
        return {...state,  isLoadingTechnologies: true};
     case TechnologiesActions.GET_TECHNOLOGIES_SUCCESS:
        return {...state, isLoadingTechnologies: false,  technologies: action.res};
     case TechnologiesActions.GET_TECHNOLOGIES_ERROR400:
     case TechnologiesActions.GET_TECHNOLOGIES_ERROR500:
     case TechnologiesActions.GET_TECHNOLOGIES_FAILURE:
        return {...state, isLoadingTechnologies: false}

  }

  return state
}