const { request } = require('../utils/utils');

export const GET_INFORMATION_TYPES = 'GET_INFORMATION_TYPES';
export const GET_INFORMATION_TYPES_SUCCESS = "GET_INFORMATION_TYPES_SUCCESS";
export const GET_INFORMATION_TYPES_ERROR400 = "GET_INFORMATION_TYPES_ERROR400";
export const GET_INFORMATION_TYPES_ERROR500 = "GET_INFORMATION_TYPES_ERROR500";
export const GET_INFORMATION_TYPES_FAILURE = "GET_INFORMATION_TYPES_FAILURE";

export const getInformationTypes = (state) => {

    let searchObject = {};
    let triadRating = {};
    let searchString = "";

    if(state !== undefined){


        state.map((entry) => {

            let group = entry.group;
            let value = entry.value;

            if(group === "triad_rating"){
                let values = value.split('-');
                let triadOption = {[values[0]]: values[1]};
                triadRating = {...triadRating, ...triadOption};
            }

            if(!(group in searchObject)){
                let option = {[group]: [value]};
                searchObject = {...searchObject, ...option};
            } else {
                searchObject[group].push(value);
            }
        });

        Object.entries(searchObject).forEach((searchItem, key, arr) => {

            if(searchItem[0] === "triad_rating"){
                searchString = searchItem[0] + "=" + JSON.stringify(triadRating);

            } else {

                searchString += searchItem[0] + "=" + searchItem[1].join();
             }

             if (!(Object.is(arr.length - 1, key))) {
                searchString += "&&"
             }
        });
    }

    return dispatch => {

         let url = "";

        if(searchString !== ""){

            url = 'api/InformationTypes?' + searchString;
        } else {

            url = 'api/InformationTypes';
        }
        dispatch({'type': GET_INFORMATION_TYPES});
        return request(
        url, {},
        (json) => { dispatch({type: GET_INFORMATION_TYPES_SUCCESS, res: json}) },
        (json) => { dispatch({type: GET_INFORMATION_TYPES_ERROR400, res: json}) },
        (res) => { dispatch({type: GET_INFORMATION_TYPES_ERROR500, res: res}) },
        (ex) => { dispatch({type: GET_INFORMATION_TYPES_FAILURE, error: ex}) },
        )
    }
}