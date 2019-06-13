import type { Action } from './types';
import * as ActorsActions from '../actions/Actors'

const initialState = {
    actors: [],
    isLoadingActors: true,
    latestActor: {}

};

export default function ActorsReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case ActorsActions.GET_ACTORS:
        return {...state,  isLoadingActors: true};
     case ActorsActions.GET_ACTORS_SUCCESS:
        return {...state, isLoadingActors: false,  actors: action.res};
     case ActorsActions.GET_ACTORS_ERROR400:
        console.log(action.res);
        break;
     case ActorsActions.GET_ACTORS_ERROR500:
        console.log(action.res);
        break;
     case ActorsActions.GET_ACTORS_FAILURE:
        return {...state, isLoadingActors: false}

     // CREATE
     case ActorsActions.POST_ACTOR:
        break;
     case ActorsActions.POST_ACTOR_SUCCESS:
        return {...state,  latestActor: action.res};
     case ActorsActions.POST_ACTOR_ERROR400:
        console.log(action.res);
        break;
     case ActorsActions.POST_ACTOR_ERROR500:
        console.log(action.res);
        break;
     case ActorsActions.POST_ACTOR_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case ActorsActions.PUT_ACTOR:
        break;
     case ActorsActions.PUT_ACTOR_SUCCESS:
        break;
     case ActorsActions.PUT_ACTOR_ERROR400:
        console.log(action.res);
        break;
     case ActorsActions.PUT_ACTOR_ERROR500:
        console.log(action.res);
        break;
     case ActorsActions.PUT_ACTOR_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case ActorsActions.DELETE_ACTOR:
        break;
     case ActorsActions.DELETE_ACTOR_SUCCESS:
        break;
     case ActorsActions.DELETE_ACTOR_ERROR400:
        console.log(action.res);
        break;
     case ActorsActions.DELETE_ACTOR_ERROR500:
        console.log(action.res);
        break;
     case ActorsActions.DELETE_ACTOR_FAILURE:
        console.log(action.res);
        break;
  }

  return state
}