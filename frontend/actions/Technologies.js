const { request } = require('../utils/utils');

export const GET_TECHNOLOGIES = 'GET_TECHNOLOGIES';
export const GET_TECHNOLOGIES_SUCCESS = "GET_TECHNOLOGIES_SUCCESS";
export const GET_TECHNOLOGIES_ERROR400 = "GET_TECHNOLOGIES_ERROR400";
export const GET_TECHNOLOGIES_ERROR500 = "GET_TECHNOLOGIES_ERROR500";
export const GET_TECHNOLOGIES_FAILURE = "GET_TECHNOLOGIES_FAILURE";

export const POST_TECHNOLOGY = 'POST_TECHNOLOGY';
export const POST_TECHNOLOGY_SUCCESS = "POST_TECHNOLOGY_SUCCESS";
export const POST_TECHNOLOGY_ERROR400 = "POST_TECHNOLOGY_ERROR400";
export const POST_TECHNOLOGY_ERROR500 = "POST_TECHNOLOGY_ERROR500";
export const POST_TECHNOLOGY_FAILURE = "POST_TECHNOLOGY_FAILURE";

export const PUT_TECHNOLOGY = 'PUT_TECHNOLOGY';
export const PUT_TECHNOLOGY_SUCCESS = "PUT_TECHNOLOGY_SUCCESS";
export const PUT_TECHNOLOGY_ERROR400 = "PUT_TECHNOLOGY_ERROR400";
export const PUT_TECHNOLOGY_ERROR500 = "PUT_TECHNOLOGY_ERROR500";
export const PUT_TECHNOLOGY_FAILURE = "PUT_TECHNOLOGY_FAILURE";

export const DELETE_TECHNOLOGY = 'DELETE_TECHNOLOGY';
export const DELETE_TECHNOLOGY_SUCCESS = "DELETE_TECHNOLOGY_SUCCESS";
export const DELETE_TECHNOLOGY_ERROR400 = "DELETE_TECHNOLOGY_ERROR400";
export const DELETE_TECHNOLOGY_ERROR500 = "DELETE_TECHNOLOGY_ERROR500";
export const DELETE_TECHNOLOGY_FAILURE = "DELETE_TECHNOLOGY_FAILURE";


export const getTechnologies = () => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Technologies';
            dispatch({'type': GET_TECHNOLOGIES});
            resolve(request(
                url, {},
            (json) => { dispatch({type: GET_TECHNOLOGIES_SUCCESS, res: json}) },
            (json) => { dispatch({type: GET_TECHNOLOGIES_ERROR400, res: json}) },
            (res) => { dispatch({type: GET_TECHNOLOGIES_ERROR500, res: res}) },
            (ex) => { dispatch({type: GET_TECHNOLOGIES_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateTechnology = (state) => {

    let technology = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'source': state.source
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Technologies';
            dispatch({'type': PUT_TECHNOLOGY})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(technology)},
                (json) => { dispatch({type: PUT_TECHNOLOGY_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_TECHNOLOGY_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_TECHNOLOGY_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_TECHNOLOGY_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createTechnology = (state) => {

    let technology = {
        'name': state.name,
        'description': state.description,
        'source': state.source
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Technologies';
            dispatch({'type': POST_TECHNOLOGY})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(technology)},
                (json) => { dispatch({type: POST_TECHNOLOGY_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_TECHNOLOGY_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_TECHNOLOGY_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_TECHNOLOGY_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteTechnology = (state) => {

    let technology = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Technologies';
            dispatch({'type': DELETE_TECHNOLOGY})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(technology)},
                (json) => { dispatch({type: DELETE_TECHNOLOGY_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_TECHNOLOGY_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_TECHNOLOGY_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_TECHNOLOGY_FAILURE, error: ex}) },
            ))
        })
    }
}
