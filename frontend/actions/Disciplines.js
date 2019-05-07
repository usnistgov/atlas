const { request } = require('../utils/utils');

export const GET_DISCIPLINES = 'GET_DISCIPLINES';
export const GET_DISCIPLINES_SUCCESS = "GET_DISCIPLINES_SUCCESS";
export const GET_DISCIPLINES_ERROR400 = "GET_DISCIPLINES_ERROR400";
export const GET_DISCIPLINES_ERROR500 = "GET_DISCIPLINES_ERROR500";
export const GET_DISCIPLINES_FAILURE = "GET_DISCIPLINES_FAILURE";

export const getDisciplines = () => {

    return dispatch => {

        let url = 'api/Disciplines';
        dispatch({'type': GET_DISCIPLINES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_DISCIPLINES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_DISCIPLINES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_DISCIPLINES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_DISCIPLINES_FAILURE, error: ex}) },
        )
    }
}