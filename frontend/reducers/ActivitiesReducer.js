import type { Action } from './types';
import * as ActivitiesActions from '../actions/Activities'

const initialState = {
    activities: [],
    isLoadingActivities: true

};

export default function ActivitiesReducer(state=initialState, action: Action) {

  switch (action.type) {
     case ActivitiesActions.GET_ACTIVITIES:
        return {...state,  isLoadingActivities: true};
     case ActivitiesActions.GET_ACTIVITIES_SUCCESS:
        return {...state, isLoadingActivities: false,  activities: action.res};
     case ActivitiesActions.GET_ACTIVITIES_ERROR400:
     case ActivitiesActions.GET_ACTIVITIES_ERROR500:
     case ActivitiesActions.GET_ACTIVITIES_FAILURE:
        return {...state, isLoadingActivities: false}

  }

  return state
}