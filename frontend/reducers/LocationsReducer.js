import type { Action } from './types';
import * as LocationsActions from '../actions/Locations'

const initialState = {
    locations: [],
    isLoadingLocations: true

};

export default function LocationsReducer(state=initialState, action: Action) {

  switch (action.type) {
     case LocationsActions.GET_LOCATIONS:
        return {...state,  isLoadingLocations: true};
     case LocationsActions.GET_LOCATIONS_SUCCESS:
        return {...state, isLoadingLocations: false,  locations: action.res};
     case LocationsActions.GET_LOCATIONS_ERROR400:
     case LocationsActions.GET_LOCATIONS_ERROR500:
     case LocationsActions.GET_LOCATIONS_FAILURE:
        return {...state, isLoadingLocations: false}

  }

  return state
}