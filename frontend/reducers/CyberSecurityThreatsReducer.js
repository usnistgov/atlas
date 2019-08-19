import type { Action } from './types';
import * as CyberSecurityThreatsActions from '../actions/CyberSecurityThreats';

const { sortByName } = require("../utils/utils");

const initialState = {
    cybersecurity_threats: [],
    isLoadingCyberSecurityThreats: true,
    latestCyberSecurityThreat: {}
};

export default function CyberSecurityThreatsReducer(state=initialState, action: Action) {

  switch (action.type) {

     // RETRIEVE
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS:
        return {...state, isLoadingCyberSecurityThreats: true};
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_SUCCESS:
        return {...state, isLoadingCyberSecurityThreats: false, cybersecurity_threats: action.res.sort(sortByName)};
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_ERROR400:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_ERROR500:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.GET_CYBERSECURITY_THREATS_FAILURE:
        return {...state, isLoadingCyberSecurityThreats: false}

     // CREATE
     case CyberSecurityThreatsActions.POST_CYBERSECURITY_THREAT:
        break;
     case CyberSecurityThreatsActions.POST_CYBERSECURITY_THREAT_SUCCESS:
        return {...state, latestCyberSecurityThreat: action.res};
     case CyberSecurityThreatsActions.POST_CYBERSECURITY_THREAT_ERROR400:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.POST_CYBERSECURITY_THREAT_ERROR500:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.POST_CYBERSECURITY_THREAT_FAILURE:
        console.log(action.res);
        break;

     // UPDATE
     case CyberSecurityThreatsActions.PUT_CYBERSECURITY_THREAT:
        break;
     case CyberSecurityThreatsActions.PUT_CYBERSECURITY_THREAT_SUCCESS:
        break;
     case CyberSecurityThreatsActions.PUT_CYBERSECURITY_THREAT_ERROR400:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.PUT_CYBERSECURITY_THREAT_ERROR500:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.PUT_CYBERSECURITY_THREAT_FAILURE:
        console.log(action.res);
        break;

     // DESTROY
     case CyberSecurityThreatsActions.DELETE_CYBERSECURITY_THREAT:
        break;
     case CyberSecurityThreatsActions.DELETE_CYBERSECURITY_THREAT_SUCCESS:
        break;
     case CyberSecurityThreatsActions.DELETE_CYBERSECURITY_THREAT_ERROR400:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.DELETE_CYBERSECURITY_THREAT_ERROR500:
        console.log(action.res);
        break;
     case CyberSecurityThreatsActions.DELETE_CYBERSECURITY_THREAT_FAILURE:
        console.log(action.res);
        break;

  }

  return state
}