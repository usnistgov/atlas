const { request } = require('../utils/utils');

export const GET_RESPONDING_ORGANIZATIONS = 'GET_RESPONDING_ORGANIZATIONS';
export const GET_RESPONDING_ORGANIZATIONS_SUCCESS = "GET_RESPONDING_ORGANIZATIONS_SUCCESS";
export const GET_RESPONDING_ORGANIZATIONS_ERROR400 = "GET_RESPONDING_ORGANIZATIONS_ERROR400";
export const GET_RESPONDING_ORGANIZATIONS_ERROR500 = "GET_RESPONDING_ORGANIZATIONS_ERROR500";
export const GET_RESPONDING_ORGANIZATIONS_FAILURE = "GET_RESPONDING_ORGANIZATIONS_FAILURE";

export const getRespondingOrganizations= () => {

    return dispatch => {

        let url = 'api/RespondingOrganizations';
        dispatch({'type': GET_RESPONDING_ORGANIZATIONS});
        return request(
        url, {},
        (json) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_FAILURE, error: ex}) },
        )
    }
}