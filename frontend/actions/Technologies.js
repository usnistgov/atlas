const { request } = require('../utils/utils');

export const GET_TECHNOLOGIES = 'GET_TECHNOLOGIES';
export const GET_TECHNOLOGIES_SUCCESS = "GET_TECHNOLOGIES_SUCCESS";
export const GET_TECHNOLOGIES_ERROR400 = "GET_TECHNOLOGIES_ERROR400";
export const GET_TECHNOLOGIES_ERROR500 = "GET_TECHNOLOGIES_ERROR500";
export const GET_TECHNOLOGIES_FAILURE = "GET_TECHNOLOGIES_FAILURE";

export const getTechnologies = () => {

    return dispatch => {

        let url = 'api/Technologies';
        dispatch({'type': GET_TECHNOLOGIES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_TECHNOLOGIES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_TECHNOLOGIES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_TECHNOLOGIES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_TECHNOLOGIES_FAILURE, error: ex}) },
        )
    }
}