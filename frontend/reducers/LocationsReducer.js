import type { Action } from './types';
import * as LocationsActions from '../actions/Locations'

const initialState = {
    locations: [],
    isLoadingLocations: true,
    latestLocation: {}

};

export default function LocationsReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case LocationsActions.GET_LOCATIONS:
        return {...state,  isLoadingLocations: true};
     case LocationsActions.GET_LOCATIONS_SUCCESS:
        return {...state, isLoadingLocations: false,  locations: action.res};
     case LocationsActions.GET_LOCATIONS_ERROR400:
        console.log(action.res);
        break;
     case LocationsActions.GET_LOCATIONS_ERROR500:
        console.log(action.res);
        break;
     case LocationsActions.GET_LOCATIONS_FAILURE:
        return {...state, isLoadingLocations: false}

     // CREATE
     case LocationsActions.POST_LOCATION:
        break;
     case LocationsActions.POST_LOCATION_SUCCESS:
        return {...state, latestLocation: action.res};
     case LocationsActions.POST_LOCATION_ERROR400:
        console.log(action.res);
        break;
     case LocationsActions.POST_LOCATION_ERROR500:
        console.log(action.res);
        break;
     case LocationsActions.POST_LOCATION_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case LocationsActions.PUT_LOCATION:
        break;
     case LocationsActions.PUT_LOCATION_SUCCESS:
        break;
     case LocationsActions.PUT_LOCATION_ERROR400:
        console.log(action.res);
        break;
     case LocationsActions.PUT_LOCATION_ERROR500:
        console.log(action.res);
        break;
     case LocationsActions.PUT_LOCATION_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case LocationsActions.DELETE_LOCATION:
        break;
     case LocationsActions.DELETE_LOCATION_SUCCESS:
        break;
     case LocationsActions.DELETE_LOCATION_ERROR400:
        console.log(action.res);
        break;
     case LocationsActions.DELETE_LOCATION_ERROR500:
        console.log(action.res);
        break;
     case LocationsActions.DELETE_LOCATION_FAILURE:
        console.log(action.res);
        break;
  }

  return state
}