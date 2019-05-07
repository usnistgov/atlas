import type { Action } from './types';
import * as ActorsActions from '../actions/Actors'

const initialState = {
    actors: [],
    isLoadingActors: true

};

export default function ActorsReducer(state=initialState, action: Action) {

  switch (action.type) {
     case ActorsActions.GET_ACTORS:
        return {...state,  isLoadingActors: true};
     case ActorsActions.GET_ACTORS_SUCCESS:
        return {...state, isLoadingActors: false,  actors: action.res};
     case ActorsActions.GET_ACTORS_ERROR400:
     case ActorsActions.GET_ACTORS_ERROR500:
     case ActorsActions.GET_ACTORS_FAILURE:
        return {...state, isLoadingActors: false}

  }

  return state
}