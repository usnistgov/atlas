const { request } = require('../utils/utils');

export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
export const GET_LOCATIONS_ERROR400 = "GET_LOCATIONS_ERROR400";
export const GET_LOCATIONS_ERROR500 = "GET_LOCATIONS_ERROR500";
export const GET_LOCATIONS_FAILURE = "GET_LOCATIONS_FAILURE";

export const getLocations = () => {

    return dispatch => {

        let url = 'api/Locations';
        dispatch({'type': GET_LOCATIONS});
        return request(
        url, {},
        (json) => { dispatch({type: GET_LOCATIONS_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_LOCATIONS_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_LOCATIONS_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_LOCATIONS_FAILURE, error: ex}) },
        )
    }
}