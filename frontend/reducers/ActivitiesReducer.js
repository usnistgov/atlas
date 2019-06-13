import type { Action } from './types';
import * as ActivitiesActions from '../actions/Activities'

const initialState = {
    activities: [],
    isLoadingActivities: true,
    latestActivity: {}

};

export default function ActivitiesReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case ActivitiesActions.GET_ACTIVITIES:
        return {...state,  isLoadingActivities: true};
     case ActivitiesActions.GET_ACTIVITIES_SUCCESS:
        return {...state, isLoadingActivities: false,  activities: action.res};
     case ActivitiesActions.GET_ACTIVITIES_ERROR400:
        console.log(action.res);
        break;
     case ActivitiesActions.GET_ACTIVITIES_ERROR500:
        console.log(action.res);
        break;
     case ActivitiesActions.GET_ACTIVITIES_FAILURE:
        return {...state, isLoadingActivities: false}

     // CREATE
     case ActivitiesActions.POST_ACTIVITY:
        break;
     case ActivitiesActions.POST_ACTIVITY_SUCCESS:
        return {...state, isLoadingActivities: false,  latestActivity: action.res};
     case ActivitiesActions.POST_ACTIVITY_ERROR400:
        console.log(action.res);
        break;
     case ActivitiesActions.POST_ACTIVITY_ERROR500:
        console.log(action.res);
        break;
     case ActivitiesActions.POST_ACTIVITY_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case ActivitiesActions.PUT_ACTIVITY:
        break;
     case ActivitiesActions.PUT_ACTIVITY_SUCCESS:
        break;
     case ActivitiesActions.PUT_ACTIVITY_ERROR400:
        console.log(action.res);
        break;
     case ActivitiesActions.PUT_ACTIVITY_ERROR500:
        console.log(action.res);
        break;
     case ActivitiesActions.PUT_ACTIVITY_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case ActivitiesActions.DELETE_ACTIVITY:
        break;
     case ActivitiesActions.DELETE_ACTIVITY_SUCCESS:
        break;
     case ActivitiesActions.DELETE_ACTIVITY_ERROR400:
        console.log(action.res);
        break;
     case ActivitiesActions.DELETE_ACTIVITY_ERROR500:
        console.log(action.res);
        break;
     case ActivitiesActions.DELETE_ACTIVITY_FAILURE:
        console.log(action.res);
        break;
  }

  return state
}