const { request } = require('../utils/utils');

export const GET_USE_CASES = 'GET_USE_CASES';
export const GET_USE_CASES_SUCCESS = "GET_USE_CASES_SUCCESS";
export const GET_USE_CASES_ERROR400 = "GET_USE_CASES_ERROR400";
export const GET_USE_CASES_ERROR500 = "GET_USE_CASES_ERROR500";
export const GET_USE_CASES_FAILURE = "GET_USE_CASES_FAILURE";

export const getUseCases = () => {

    return dispatch => {

        let url = 'api/UseCases';
        dispatch({'type': GET_USE_CASES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_USE_CASES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_USE_CASES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_USE_CASES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_USE_CASES_FAILURE, error: ex}) },
        )
    }
}