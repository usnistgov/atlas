import type { Action } from './types';
import * as TechnologiesActions from '../actions/Technologies';

const { sortByName } = require("../utils/utils");

const initialState = {
    technologies: [],
    isLoadingTechnologies: true,
    latestTechnology: {}

};

export default function TechnologiesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case TechnologiesActions.GET_TECHNOLOGIES:
        return {...state,  isLoadingTechnologies: true};
     case TechnologiesActions.GET_TECHNOLOGIES_SUCCESS:
        return {...state, isLoadingTechnologies: false,  technologies: action.res.sort(sortByName)};
     case TechnologiesActions.GET_TECHNOLOGIES_ERROR400:
        console.log(action.res);
        break;
     case TechnologiesActions.GET_TECHNOLOGIES_ERROR500:
        console.log(action.res);
        break;
     case TechnologiesActions.GET_TECHNOLOGIES_FAILURE:
        return {...state, isLoadingTechnologies: false}

     // CREATE
     case TechnologiesActions.POST_TECHNOLOGY:
        break;
     case TechnologiesActions.POST_TECHNOLOGY_SUCCESS:
        return {...state, latestTechnology: action.res};
     case TechnologiesActions.POST_TECHNOLOGY_ERROR400:
        console.log(action.res);
        break;
     case TechnologiesActions.POST_TECHNOLOGY_ERROR500:
        console.log(action.res);
        break;
     case TechnologiesActions.POST_TECHNOLOGY_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case TechnologiesActions.PUT_TECHNOLOGY:
        break;
     case TechnologiesActions.PUT_TECHNOLOGY_SUCCESS:
        break;
     case TechnologiesActions.PUT_TECHNOLOGY_ERROR400:
        console.log(action.res);
        break;
     case TechnologiesActions.PUT_TECHNOLOGY_ERROR500:
        console.log(action.res);
        break;
     case TechnologiesActions.PUT_TECHNOLOGY_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case TechnologiesActions.DELETE_TECHNOLOGY:
        break;
     case TechnologiesActions.DELETE_TECHNOLOGY_SUCCESS:
        break;
     case TechnologiesActions.DELETE_TECHNOLOGY_ERROR400:
        console.log(action.res);
        break;
     case TechnologiesActions.DELETE_TECHNOLOGY_ERROR500:
        console.log(action.res);
        break;
     case TechnologiesActions.DELETE_TECHNOLOGY_FAILURE:
        console.log(action.res);
        break;

  }

  return state
}