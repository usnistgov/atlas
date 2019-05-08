const { request } = require('../utils/utils');

export const GET_CYBERSECURITY_THREATS = 'GET_CYBERSECURITY_THREATS';
export const GET_CYBERSECURITY_THREATS_SUCCESS = "GET_CYBERSECURITY_THREATS_SUCCESS";
export const GET_CYBERSECURITY_THREATS_ERROR400 = "GET_CYBERSECURITY_THREATS_ERROR400";
export const GET_CYBERSECURITY_THREATS_ERROR500 = "GET_CYBERSECURITY_THREATS_ERROR500";
export const GET_CYBERSECURITY_THREATS_FAILURE = "GET_CYBERSECURITY_THREATS_FAILURE";

export const getCyberSecurityThreats = () => {

    return dispatch => {

        let url = 'api/CyberSecurityThreats';
        dispatch({'type': GET_CYBERSECURITY_THREATS});
        return request(
        url, {},
        (json) => { dispatch({type: GET_CYBERSECURITY_THREATS_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_CYBERSECURITY_THREATS_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_CYBERSECURITY_THREATS_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_CYBERSECURITY_THREATS_FAILURE, error: ex}) },
        )
    }
}