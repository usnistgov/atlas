const { request } = require('../utils/utils');

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_SUCCESS = "GET_ACTIVITIES_SUCCESS";
export const GET_ACTIVITIES_ERROR400 = "GET_ACTIVITIES_ERROR400";
export const GET_ACTIVITIES_ERROR500 = "GET_ACTIVITIES_ERROR500";
export const GET_ACTIVITIES_FAILURE = "GET_ACTIVITIES_FAILURE";

export const getActivities = () => {

    return dispatch => {

        let url = 'api/Activities';
        dispatch({'type': GET_ACTIVITIES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_ACTIVITIES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_ACTIVITIES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_ACTIVITIES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_ACTIVITIES_FAILURE, error: ex}) },
        )
    }
}