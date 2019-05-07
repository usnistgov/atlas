import type { Action } from './types';
import * as CyberSecurityThreatsActions from '../actions/CyberSecurityThreats'

const initialState = {
    cybersecurity_threats: [],
    isLoadingCyberSecurityThreats: true

};

export default function CyberSecurityThreatsReducer(state=initialState, action: Action) {

  switch (action.type) {
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS:
        return {...state, isLoadingCyberSecurityThreats: true};
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_SUCCESS:
        return {...state, isLoadingCyberSecurityThreats: false, cybersecurity_threats: action.res};
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_ERROR400:
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_ERROR500:
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_FAILURE:
        return {...state, isLoadingCyberSecurityThreats: false}

  }

  return state
}