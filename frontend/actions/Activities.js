const { request } = require('../utils/utils');

export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITIES_SUCCESS = "GET_ACTIVITIES_SUCCESS";
export const GET_ACTIVITIES_ERROR400 = "GET_ACTIVITIES_ERROR400";
export const GET_ACTIVITIES_ERROR500 = "GET_ACTIVITIES_ERROR500";
export const GET_ACTIVITIES_FAILURE = "GET_ACTIVITIES_FAILURE";

export const POST_ACTIVITY = 'POST_ACTIVITY';
export const POST_ACTIVITY_SUCCESS = "POST_ACTIVITY_SUCCESS";
export const POST_ACTIVITY_ERROR400 = "POST_ACTIVITY_ERROR400";
export const POST_ACTIVITY_ERROR500 = "POST_ACTIVITY_ERROR500";
export const POST_ACTIVITY_FAILURE = "POST_ACTIVITY_FAILURE";

export const PUT_ACTIVITY = 'PUT_ACTIVITY';
export const PUT_ACTIVITY_SUCCESS = "PUT_ACTIVITY_SUCCESS";
export const PUT_ACTIVITY_ERROR400 = "PUT_ACTIVITY_ERROR400";
export const PUT_ACTIVITY_ERROR500 = "PUT_ACTIVITY_ERROR500";
export const PUT_ACTIVITY_FAILURE = "PUT_ACTIVITY_FAILURE";

export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const DELETE_ACTIVITY_SUCCESS = "DELETE_ACTIVITY_SUCCESS";
export const DELETE_ACTIVITY_ERROR400 = "DELETE_ACTIVITY_ERROR400";
export const DELETE_ACTIVITY_ERROR500 = "DELETE_ACTIVITY_ERROR500";
export const DELETE_ACTIVITY_FAILURE = "DELETE_ACTIVITY_FAILURE";

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

export const updateActivity = (state) => {

    let activity = {
        'id': state.id,
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        let url = 'api/Activities';
        dispatch({'type': PUT_ACTIVITY})
        return request(

            url, {method: "PUT", body: JSON.stringify(activity)},
            (json) => { dispatch({type: PUT_ACTIVITY_SUCCESS, res: json}) },
            (json) => { dispatch({type: PUT_ACTIVITY_ERROR400, res: json}) },
            (res) => { dispatch({type: PUT_ACTIVITY_ERROR500, res: res}) },
            (ex) => { dispatch({type: PUT_ACTIVITY_FAILURE, error: ex}) },
        )
    }
}

export const createActivity = (state) => {

    let activity = {
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        let url = 'api/Activities';
        dispatch({'type': POST_ACTIVITY})
        return request(

            url, {method: "POST", body: JSON.stringify(activity)},
            (json) => { dispatch({type: POST_ACTIVITY_SUCCESS, res: json}) },
            (json) => { dispatch({type: POST_ACTIVITY_ERROR400, res: json}) },
            (res) => { dispatch({type: POST_ACTIVITY_ERROR500, res: res}) },
            (ex) => { dispatch({type: POST_ACTIVITY_FAILURE, error: ex}) },
        )
    }
}

export const deleteActivity = (state) => {

    let activity = {
        'id': state.id
    }

    return dispatch => {
        let url = 'api/Activities';
        dispatch({'type': DELETE_ACTIVITY})
        return request(

            url, {method: "DELETE", body: JSON.stringify(activity)},
            (json) => { dispatch({type: DELETE_ACTIVITY_SUCCESS, res: json}) },
            (json) => { dispatch({type: DELETE_ACTIVITY_ERROR400, res: json}) },
            (res) => { dispatch({type: DELETE_ACTIVITY_ERROR500, res: res}) },
            (ex) => { dispatch({type: DELETE_ACTIVITY_FAILURE, error: ex}) },
        )
    }
}
