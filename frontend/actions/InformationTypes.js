const { request } = require('../utils/utils');

export const GET_INFORMATION_TYPES = 'GET_INFORMATION_TYPES';
export const GET_INFORMATION_TYPES_SUCCESS = "GET_INFORMATION_TYPES_SUCCESS";
export const GET_INFORMATION_TYPES_ERROR400 = "GET_INFORMATION_TYPES_ERROR400";
export const GET_INFORMATION_TYPES_ERROR500 = "GET_INFORMATION_TYPES_ERROR500";
export const GET_INFORMATION_TYPES_FAILURE = "GET_INFORMATION_TYPES_FAILURE";

export const getInformationTypes = () => {

    return dispatch => {

        let url = 'api/InformationTypes';
        dispatch({'type': GET_INFORMATION_TYPES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_INFORMATION_TYPES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_INFORMATION_TYPES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_INFORMATION_TYPES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_INFORMATION_TYPES_FAILURE, error: ex}) },
        )
    }
}