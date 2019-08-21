const { request } = require('../utils/utils');

export const GET_DISCIPLINES = 'GET_DISCIPLINES';
export const GET_DISCIPLINES_SUCCESS = "GET_DISCIPLINES_SUCCESS";
export const GET_DISCIPLINES_ERROR400 = "GET_DISCIPLINES_ERROR400";
export const GET_DISCIPLINES_ERROR500 = "GET_DISCIPLINES_ERROR500";
export const GET_DISCIPLINES_FAILURE = "GET_DISCIPLINES_FAILURE";

export const POST_DISCIPLINE = 'POST_DISCIPLINE';
export const POST_DISCIPLINE_SUCCESS = "POST_DISCIPLINE_SUCCESS";
export const POST_DISCIPLINE_ERROR400 = "POST_DISCIPLINE_ERROR400";
export const POST_DISCIPLINE_ERROR500 = "POST_DISCIPLINE_ERROR500";
export const POST_DISCIPLINE_FAILURE = "POST_DISCIPLINE_FAILURE";

export const PUT_DISCIPLINE = 'PUT_DISCIPLINE';
export const PUT_DISCIPLINE_SUCCESS = "PUT_DISCIPLINE_SUCCESS";
export const PUT_DISCIPLINE_ERROR400 = "PUT_DISCIPLINE_ERROR400";
export const PUT_DISCIPLINE_ERROR500 = "PUT_DISCIPLINE_ERROR500";
export const PUT_DISCIPLINE_FAILURE = "PUT_DISCIPLINE_FAILURE";

export const DELETE_DISCIPLINE = 'DELETE_DISCIPLINE';
export const DELETE_DISCIPLINE_SUCCESS = "DELETE_DISCIPLINE_SUCCESS";
export const DELETE_DISCIPLINE_ERROR400 = "DELETE_DISCIPLINE_ERROR400";
export const DELETE_DISCIPLINE_ERROR500 = "DELETE_DISCIPLINE_ERROR500";
export const DELETE_DISCIPLINE_FAILURE = "DELETE_DISCIPLINE_FAILURE";

export const getDisciplines = () => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Disciplines';
            dispatch({'type': GET_DISCIPLINES});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_DISCIPLINES_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_DISCIPLINES_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_DISCIPLINES_ERROR500, res: res}) },
                (ex) => { dispatch({type: GET_DISCIPLINES_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateDiscipline = (state) => {

    let discipline = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Disciplines';
            dispatch({'type': PUT_DISCIPLINE})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(discipline)},
                (json) => { dispatch({type: PUT_DISCIPLINE_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_DISCIPLINE_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_DISCIPLINE_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_DISCIPLINE_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createDiscipline = (state) => {

    let discipline = {
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Disciplines';
            dispatch({'type': POST_DISCIPLINE})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(discipline)},
                (json) => { dispatch({type: POST_DISCIPLINE_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_DISCIPLINE_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_DISCIPLINE_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_DISCIPLINE_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteDiscipline = (state) => {

    let discipline = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Disciplines';
            dispatch({'type': DELETE_DISCIPLINE})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(discipline)},
                (json) => { dispatch({type: DELETE_DISCIPLINE_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_DISCIPLINE_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_DISCIPLINE_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_DISCIPLINE_FAILURE, error: ex}) },
            ))
        })
    }
}
