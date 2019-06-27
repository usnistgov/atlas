const { request } = require('../utils/utils');

export const GET_ACTORS = 'GET_ACTORS';
export const GET_ACTORS_SUCCESS = "GET_ACTORS_SUCCESS";
export const GET_ACTORS_ERROR400 = "GET_ACTORS_ERROR400";
export const GET_ACTORS_ERROR500 = "GET_ACTORS_ERROR500";
export const GET_ACTORS_FAILURE = "GET_ACTORS_FAILURE";

export const POST_ACTOR = 'POST_ACTOR';
export const POST_ACTOR_SUCCESS = "POST_ACTOR_SUCCESS";
export const POST_ACTOR_ERROR400 = "POST_ACTOR_ERROR400";
export const POST_ACTOR_ERROR500 = "POST_ACTOR_ERROR500";
export const POST_ACTOR_FAILURE = "POST_ACTOR_FAILURE";

export const PUT_ACTOR = 'PUT_ACTOR';
export const PUT_ACTOR_SUCCESS = "PUT_ACTOR_SUCCESS";
export const PUT_ACTOR_ERROR400 = "PUT_ACTOR_ERROR400";
export const PUT_ACTOR_ERROR500 = "PUT_ACTOR_ERROR500";
export const PUT_ACTOR_FAILURE = "PUT_ACTOR_FAILURE";

export const DELETE_ACTOR = 'DELETE_ACTOR';
export const DELETE_ACTOR_SUCCESS = "DELETE_ACTOR_SUCCESS";
export const DELETE_ACTOR_ERROR400 = "DELETE_ACTOR_ERROR400";
export const DELETE_ACTOR_ERROR500 = "DELETE_ACTOR_ERROR500";
export const DELETE_ACTOR_FAILURE = "DELETE_ACTOR_FAILURE";

export const getActors = () => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Actors';
            dispatch({'type': GET_ACTORS});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_ACTORS_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_ACTORS_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_ACTORS_ERROR500, res: res}) },
                (ex) => { dispatch({type: GET_ACTORS_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateActor = (state) => {

    let actor = {
        'id': state.id,
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Actors';
            dispatch({'type': PUT_ACTOR})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(actor)},
                (json) => { dispatch({type: PUT_ACTOR_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_ACTOR_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_ACTOR_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_ACTOR_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createActor = (state) => {

    let actor = {
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Actors';
            dispatch({'type': POST_ACTOR})
            resolve(request(

            url, {method: "POST", body: JSON.stringify(actor)},
            (json) => { dispatch({type: POST_ACTOR_SUCCESS, res: json}) },
            (json) => { dispatch({type: POST_ACTOR_ERROR400, res: json}) },
            (res) => { dispatch({type: POST_ACTOR_ERROR500, res: res}) },
            (ex) => { dispatch({type: POST_ACTOR_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteActor = (state) => {

    let actor = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/Actors';
            dispatch({'type': DELETE_ACTOR})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(actor)},
                (json) => { dispatch({type: DELETE_ACTOR_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_ACTOR_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_ACTOR_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_ACTOR_FAILURE, error: ex}) },
            ))
        })
    }
}
