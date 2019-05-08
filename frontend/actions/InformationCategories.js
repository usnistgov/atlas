const { request } = require('../utils/utils');

export const GET_INFORMATION_CATEGORIES = 'GET_INFORMATION_CATEGORIES';
export const GET_INFORMATION_CATEGORIES_SUCCESS = "GET_INFORMATION_CATEGORIES_SUCCESS";
export const GET_INFORMATION_CATEGORIES_ERROR400 = "GET_INFORMATION_CATEGORIES_ERROR400";
export const GET_INFORMATION_CATEGORIES_ERROR500 = "GET_INFORMATION_CATEGORIES_ERROR500";
export const GET_INFORMATION_CATEGORIES_FAILURE = "GET_INFORMATION_CATEGORIES_FAILURE";

export const getInformationCategories = () => {

    return dispatch => {

        let url = 'api/InformationCategories';
        dispatch({'type': GET_INFORMATION_CATEGORIES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_INFORMATION_CATEGORIES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_INFORMATION_CATEGORIES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_INFORMATION_CATEGORIES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_INFORMATION_CATEGORIES_FAILURE, error: ex}) },
        )
    }
}