const { request } = require('../utils/utils');

export const GET_USE_CASES = 'GET_USE_CASES';
export const GET_USE_CASES_SUCCESS = "GET_USE_CASES_SUCCESS";
export const GET_USE_CASES_ERROR400 = "GET_USE_CASES_ERROR400";
export const GET_USE_CASES_ERROR500 = "GET_USE_CASES_ERROR500";
export const GET_USE_CASES_FAILURE = "GET_USE_CASES_FAILURE";

export const getUseCases = (state) => {

    let searchObject = {};
    let searchString = "";

    if(state.length !== undefined){


        state.map((entry) => {

            let group = entry.group;
            let value = entry.value;

            if(!(group in searchObject)){
                let option = {[group]: [value]};
                searchObject = {...searchObject, ...option};
            } else {
                searchObject[group].push(value);
            }
        });

        Object.entries(searchObject).forEach((searchItem, key, arr) => {
            searchString += searchItem[0] + "=" + searchItem[1].join();

             if (!(Object.is(arr.length - 1, key))) {
                searchString += "&&"
             }
        });
    }

    return dispatch => {

        let url = "";

        if(searchString !== ""){

            console.log(searchString);
            url = 'api/UseCases?' + searchString;
        } else {

            url = 'api/UseCases';
        }
        dispatch({'type': GET_USE_CASES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_USE_CASES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_USE_CASES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_USE_CASES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_USE_CASES_FAILURE, error: ex}) },
        )
    }
}