const { request } = require('../utils/utils');

export const GET_ACTORS = 'GET_ACTORS';
export const GET_ACTORS_SUCCESS = "GET_ACTORS_SUCCESS";
export const GET_ACTORS_ERROR400 = "GET_ACTORS_ERROR400";
export const GET_ACTORS_ERROR500 = "GET_ACTORS_ERROR500";
export const GET_ACTORS_FAILURE = "GET_ACTORS_FAILURE";

export const getActors = () => {

    return dispatch => {

        let url = 'api/Actors';
        dispatch({'type': GET_ACTORS});
        return request(
        url, {},
        (json) => { dispatch({type: GET_ACTORS_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_ACTORS_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_ACTORS_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_ACTORS_FAILURE, error: ex}) },
        )
    }
}