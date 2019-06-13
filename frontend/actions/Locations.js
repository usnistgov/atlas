const { request } = require('../utils/utils');

export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
export const GET_LOCATIONS_ERROR400 = "GET_LOCATIONS_ERROR400";
export const GET_LOCATIONS_ERROR500 = "GET_LOCATIONS_ERROR500";
export const GET_LOCATIONS_FAILURE = "GET_LOCATIONS_FAILURE";

export const POST_LOCATION = 'POST_LOCATION';
export const POST_LOCATION_SUCCESS = "POST_LOCATION_SUCCESS";
export const POST_LOCATION_ERROR400 = "POST_LOCATION_ERROR400";
export const POST_LOCATION_ERROR500 = "POST_LOCATION_ERROR500";
export const POST_LOCATION_FAILURE = "POST_LOCATION_FAILURE";

export const PUT_LOCATION = 'PUT_LOCATION';
export const PUT_LOCATION_SUCCESS = "PUT_LOCATION_SUCCESS";
export const PUT_LOCATION_ERROR400 = "PUT_LOCATION_ERROR400";
export const PUT_LOCATION_ERROR500 = "PUT_LOCATION_ERROR500";
export const PUT_LOCATION_FAILURE = "PUT_LOCATION_FAILURE";

export const DELETE_LOCATION = 'DELETE_LOCATION';
export const DELETE_LOCATION_SUCCESS = "DELETE_LOCATION_SUCCESS";
export const DELETE_LOCATION_ERROR400 = "DELETE_LOCATION_ERROR400";
export const DELETE_LOCATION_ERROR500 = "DELETE_LOCATION_ERROR500";
export const DELETE_LOCATION_FAILURE = "DELETE_LOCATION_FAILURE";

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

export const updateLocation = (state) => {

    let location = {
        'id': state.id,
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        let url = 'api/Locations';
        dispatch({'type': PUT_LOCATION})
        return request(

            url, {method: "PUT", body: JSON.stringify(location)},
            (json) => { dispatch({type: PUT_LOCATION_SUCCESS, res: json}) },
            (json) => { dispatch({type: PUT_LOCATION_ERROR400, res: json}) },
            (res) => { dispatch({type: PUT_LOCATION_ERROR500, res: res}) },
            (ex) => { dispatch({type: PUT_LOCATION_FAILURE, error: ex}) },
        )
    }
}

export const createLocation = (state) => {

    let location = {
        'name': state.name,
        'description': state.description
    }

    return dispatch => {
        let url = 'api/Locations';
        dispatch({'type': POST_LOCATION})
        return request(

            url, {method: "POST", body: JSON.stringify(location)},
            (json) => { dispatch({type: POST_LOCATION_SUCCESS, res: json}) },
            (json) => { dispatch({type: POST_LOCATION_ERROR400, res: json}) },
            (res) => { dispatch({type: POST_LOCATION_ERROR500, res: res}) },
            (ex) => { dispatch({type: POST_LOCATION_FAILURE, error: ex}) },
        )
    }
}

export const deleteLocation = (state) => {

    let location = {
        'id': state.id
    }

    return dispatch => {
        let url = 'api/Locations';
        dispatch({'type': DELETE_LOCATION})
        return request(

            url, {method: "DELETE", body: JSON.stringify(location)},
            (json) => { dispatch({type: DELETE_LOCATION_SUCCESS, res: json}) },
            (json) => { dispatch({type: DELETE_LOCATION_ERROR400, res: json}) },
            (res) => { dispatch({type: DELETE_LOCATION_ERROR500, res: res}) },
            (ex) => { dispatch({type: DELETE_LOCATION_FAILURE, error: ex}) },
        )
    }
}
