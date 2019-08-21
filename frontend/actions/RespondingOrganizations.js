const { request } = require('../utils/utils');

export const GET_RESPONDING_ORGANIZATIONS = 'GET_RESPONDING_ORGANIZATIONS';
export const GET_RESPONDING_ORGANIZATIONS_SUCCESS = "GET_RESPONDING_ORGANIZATIONS_SUCCESS";
export const GET_RESPONDING_ORGANIZATIONS_ERROR400 = "GET_RESPONDING_ORGANIZATIONS_ERROR400";
export const GET_RESPONDING_ORGANIZATIONS_ERROR500 = "GET_RESPONDING_ORGANIZATIONS_ERROR500";
export const GET_RESPONDING_ORGANIZATIONS_FAILURE = "GET_RESPONDING_ORGANIZATIONS_FAILURE";

export const POST_RESPONDING_ORGANIZATION = 'POST_RESPONDING_ORGANIZATION';
export const POST_RESPONDING_ORGANIZATION_SUCCESS = "POST_RESPONDING_ORGANIZATION_SUCCESS";
export const POST_RESPONDING_ORGANIZATION_ERROR400 = "POST_RESPONDING_ORGANIZATION_ERROR400";
export const POST_RESPONDING_ORGANIZATION_ERROR500 = "POST_RESPONDING_ORGANIZATION_ERROR500";
export const POST_RESPONDING_ORGANIZATION_FAILURE = "POST_RESPONDING_ORGANIZATION_FAILURE";

export const PUT_RESPONDING_ORGANIZATION = 'PUT_RESPONDING_ORGANIZATION';
export const PUT_RESPONDING_ORGANIZATION_SUCCESS = "PUT_RESPONDING_ORGANIZATION_SUCCESS";
export const PUT_RESPONDING_ORGANIZATION_ERROR400 = "PUT_RESPONDING_ORGANIZATION_ERROR400";
export const PUT_RESPONDING_ORGANIZATION_ERROR500 = "PUT_RESPONDING_ORGANIZATION_ERROR500";
export const PUT_RESPONDING_ORGANIZATION_FAILURE = "PUT_RESPONDING_ORGANIZATION_FAILURE";

export const DELETE_RESPONDING_ORGANIZATION = 'DELETE_RESPONDING_ORGANIZATION';
export const DELETE_RESPONDING_ORGANIZATION_SUCCESS = "DELETE_RESPONDING_ORGANIZATION_SUCCESS";
export const DELETE_RESPONDING_ORGANIZATION_ERROR400 = "DELETE_RESPONDING_ORGANIZATION_ERROR400";
export const DELETE_RESPONDING_ORGANIZATION_ERROR500 = "DELETE_RESPONDING_ORGANIZATION_ERROR500";
export const DELETE_RESPONDING_ORGANIZATION_FAILURE = "DELETE_RESPONDING_ORGANIZATION_FAILURE";

export const getRespondingOrganizations= () => {

    return dispatch => {
        return new Promise((resolve, reject) => {

            let url = 'api/RespondingOrganizations';
            dispatch({'type': GET_RESPONDING_ORGANIZATIONS});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_ERROR500, res: res}) },
                (ex) => { dispatch({type: GET_RESPONDING_ORGANIZATIONS_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateRespondingOrganization = (state) => {

    let responding_organization = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/RespondingOrganizations';
            dispatch({'type': PUT_RESPONDING_ORGANIZATION })
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(responding_organization)},
                (json) => { dispatch({type: PUT_RESPONDING_ORGANIZATION_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_RESPONDING_ORGANIZATION_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_RESPONDING_ORGANIZATION_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_RESPONDING_ORGANIZATION_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createRespondingOrganization = (state) => {

    let responding_organization = {
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/RespondingOrganizations';
            dispatch({'type': POST_RESPONDING_ORGANIZATION})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(responding_organization)},
                (json) => { dispatch({type: POST_RESPONDING_ORGANIZATION_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_RESPONDING_ORGANIZATION_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_RESPONDING_ORGANIZATION_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_RESPONDING_ORGANIZATION_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteRespondingOrganization = (state) => {

    let responding_organization = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/RespondingOrganizations';
            dispatch({'type': DELETE_RESPONDING_ORGANIZATION})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(responding_organization)},
                (json) => { dispatch({type: DELETE_RESPONDING_ORGANIZATION_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_RESPONDING_ORGANIZATION_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_RESPONDING_ORGANIZATION_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_RESPONDING_ORGANIZATION_FAILURE, error: ex}) },
            ))
        })
    }
}
