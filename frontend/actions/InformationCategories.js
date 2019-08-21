const { request } = require('../utils/utils');

export const GET_INFORMATION_CATEGORIES = 'GET_INFORMATION_CATEGORIES';
export const GET_INFORMATION_CATEGORIES_SUCCESS = "GET_INFORMATION_CATEGORIES_SUCCESS";
export const GET_INFORMATION_CATEGORIES_ERROR400 = "GET_INFORMATION_CATEGORIES_ERROR400";
export const GET_INFORMATION_CATEGORIES_ERROR500 = "GET_INFORMATION_CATEGORIES_ERROR500";
export const GET_INFORMATION_CATEGORIES_FAILURE = "GET_INFORMATION_CATEGORIES_FAILURE";

export const POST_INFORMATION_CATEGORY = 'POST_INFORMATION_CATEGORY';
export const POST_INFORMATION_CATEGORY_SUCCESS = "POST_INFORMATION_CATEGORY_SUCCESS";
export const POST_INFORMATION_CATEGORY_ERROR400 = "POST_INFORMATION_CATEGORY_ERROR400";
export const POST_INFORMATION_CATEGORY_ERROR500 = "POST_INFORMATION_CATEGORY_ERROR500";
export const POST_INFORMATION_CATEGORY_FAILURE = "POST_INFORMATION_CATEGORY_FAILURE";

export const PUT_INFORMATION_CATEGORY = 'PUT_INFORMATION_CATEGORY';
export const PUT_INFORMATION_CATEGORY_SUCCESS = "PUT_INFORMATION_CATEGORY_SUCCESS";
export const PUT_INFORMATION_CATEGORY_ERROR400 = "PUT_INFORMATION_CATEGORY_ERROR400";
export const PUT_INFORMATION_CATEGORY_ERROR500 = "PUT_INFORMATION_CATEGORY_ERROR500";
export const PUT_INFORMATION_CATEGORY_FAILURE = "PUT_INFORMATION_CATEGORY_FAILURE";

export const DELETE_INFORMATION_CATEGORY = 'DELETE_INFORMATION_CATEGORY_CATEGORY';
export const DELETE_INFORMATION_CATEGORY_SUCCESS = "DELETE_INFORMATION_CATEGORY_SUCCESS";
export const DELETE_INFORMATION_CATEGORY_ERROR400 = "DELETE_INFORMATION_CATEGORY_ERROR400";
export const DELETE_INFORMATION_CATEGORY_ERROR500 = "DELETE_INFORMATION_CATEGORY_ERROR500";
export const DELETE_INFORMATION_CATEGORY_FAILURE = "DELETE_INFORMATION_CATEGORY_FAILURE";

export const getInformationCategories = () => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationCategories';
            dispatch({'type': GET_INFORMATION_CATEGORIES});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_INFORMATION_CATEGORIES_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_INFORMATION_CATEGORIES_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_INFORMATION_CATEGORIES_ERROR500, res: res}) },
            (ex) => { dispatch({type: GET_INFORMATION_CATEGORIES_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateInformationCategory = (state) => {

    let information_category = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationCategories';
            dispatch({'type': PUT_INFORMATION_CATEGORY})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(information_category)},
                (json) => { dispatch({type: PUT_INFORMATION_CATEGORY_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_INFORMATION_CATEGORY_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_INFORMATION_CATEGORY_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_INFORMATION_CATEGORY_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createInformationCategory = (state) => {

    let information_category = {
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationCategories';
            dispatch({'type': POST_INFORMATION_CATEGORY})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(information_category)},
                (json) => { dispatch({type: POST_INFORMATION_CATEGORY_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_INFORMATION_CATEGORY_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_INFORMATION_CATEGORY_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_INFORMATION_CATEGORY_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteInformationCategory = (state) => {

    let information_category = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationCategories';
            dispatch({'type': DELETE_INFORMATION_CATEGORY})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(information_category)},
                (json) => { dispatch({type: DELETE_INFORMATION_CATEGORY_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_INFORMATION_CATEGORY_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_INFORMATION_CATEGORY_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_INFORMATION_CATEGORY_FAILURE, error: ex}) },
            ))
        })
    }
}
