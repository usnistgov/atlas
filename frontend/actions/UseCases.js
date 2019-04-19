const { request } = require('../utils/utils');

export const GET_USECASES = 'GET_USECASES';
export const GET_USECASES_SUCCESS = "GET_USECASES_SUCCESS";
export const GET_USECASES_ERROR400 = "GET_USECASES_ERROR400";
export const GET_USECASES_ERROR500 = "GET_USECASES_ERROR500";
export const GET_USECASES_FAILURE = "GET_USECASES_FAILURE";

export const getUseCases = () => {

    return dispatch => {

        let url = 'api/UseCases';
        dispatch({'type': GET_USECASES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_USECASES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_USECASES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_USECASES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_USECASES_FAILURE, error: ex}) },
        )
    }
}