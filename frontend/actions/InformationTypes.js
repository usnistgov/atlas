const { request } = require('../utils/utils');

export const GET_INFORMATION_TYPES = 'GET_INFORMATION_TYPES';
export const GET_INFORMATION_TYPES_SUCCESS = "GET_INFORMATION_TYPES_SUCCESS";
export const GET_INFORMATION_TYPES_ERROR400 = "GET_INFORMATION_TYPES_ERROR400";
export const GET_INFORMATION_TYPES_ERROR500 = "GET_INFORMATION_TYPES_ERROR500";
export const GET_INFORMATION_TYPES_FAILURE = "GET_INFORMATION_TYPES_FAILURE";

export const PUT_INFORMATION_TYPE = 'PUT_INFORMATION_TYPE';
export const PUT_INFORMATION_TYPE_SUCCESS = "PUT_INFORMATION_TYPE_SUCCESS";
export const PUT_INFORMATION_TYPE_ERROR400 = "PUT_INFORMATION_TYPE_ERROR400";
export const PUT_INFORMATION_TYPE_ERROR500 = "PUT_INFORMATION_TYPE_ERROR500";
export const PUT_INFORMATION_TYPE_FAILURE = "PUT_INFORMATION_TYPE_FAILURE";

export const POST_INFORMATION_TYPE = 'POST_INFORMATION_TYPE';
export const POST_INFORMATION_TYPE_SUCCESS = "POST_INFORMATION_TYPE_SUCCESS";
export const POST_INFORMATION_TYPE_ERROR400 = "POST_INFORMATION_TYPE_ERROR400";
export const POST_INFORMATION_TYPE_ERROR500 = "POST_INFORMATION_TYPE_ERROR500";
export const POST_INFORMATION_TYPE_FAILURE = "POST_INFORMATION_TYPE_FAILURE";

export const DELETE_INFORMATION_TYPE = 'DELETE_INFORMATION_TYPE';
export const DELETE_INFORMATION_TYPE_SUCCESS = "DELETE_INFORMATION_TYPE_SUCCESS";
export const DELETE_INFORMATION_TYPE_ERROR400 = "DELETE_INFORMATION_TYPE_ERROR400";
export const DELETE_INFORMATION_TYPE_ERROR500 = "DELETE_INFORMATION_TYPE_ERROR500";
export const DELETE_INFORMATION_TYPE_FAILURE = "DELETE_INFORMATION_TYPE_FAILURE";

export const getInformationTypes = (state) => {

    let searchObject = {};
    let triadRating = {};
    let searchString = "";

    if(state !== null && state !== undefined){
        const triadValuesPresent = Object.values(state.triad_rating).some(x => (x !== null && !['and', 'or', 'not', 'not or'].includes(x)));

        state.selectedOption.map((entry) => {

            let group = entry.group;
            let value = entry.value;
            let searchOption = entry.searchOption;

            if(group !== "triad_rating"){
                if(!(group in searchObject)){
                    let option = {
                        [group]: {'values': [value], 'searchOption': searchOption}
                        }
                    searchObject = {...searchObject, ...option};
                } else {
                    searchObject[group]['values'].push(value);
                }
            }
        });

        Object.entries(state.triad_rating).forEach(([key, value]) => {
            if(key !== "searchOption"){
                if(value !== null){
                    value = value.substring(value.indexOf('-') + 1)

                    triadRating = {...triadRating,
                                    [key]: value};

                    searchObject = {...searchObject,
                            triad_rating: {
                                ...searchObject.triad_rating,
                                values: triadRating
                            }
                    };
                }
            } else if(triadValuesPresent){

                searchObject = {...searchObject,
                            triad_rating: {
                                ...searchObject.triad_rating,
                                searchOption: value
                            }
                }
            }
        });

        Object.entries(searchObject).forEach(([group, entry], key, arr) => {

            if(group === "triad_rating"){
                if(Object.keys(entry).length > 1){
                    searchString += group + "=" + JSON.stringify(entry['values'])
                }
            } else {
                searchString += group + "=" + entry['values'].join();
            }

            if(entry.hasOwnProperty('values')){
                switch(entry['searchOption']){
                    case "and":
                        break;
                    case "or":
                        searchString += "[or]";
                        break;
                    case "not":
                        searchString += "[not]";
                        break;
                    case "not or":
                        searchString += "[not or]";
                        break;
                }
             }

            if (!(Object.is(arr.length - 1, key))) {
                    searchString += "&&"
                }
        });
    }


    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = "";

            if(searchString !== ""){
                url = 'api/InformationTypes?' + searchString;
            } else {
                url = 'api/InformationTypes';
            }
            dispatch({'type': GET_INFORMATION_TYPES});
            resolve(request(
                url, {},
            (json) => { dispatch({type: GET_INFORMATION_TYPES_SUCCESS, res: json}) },
            (json) => { dispatch({type: GET_INFORMATION_TYPES_ERROR400, res: json}) },
            (res) => { dispatch({type: GET_INFORMATION_TYPES_ERROR500, res: res}) },
            (ex) => { dispatch({type: GET_INFORMATION_TYPES_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateInformationType = (state) => {

    let information_type = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'triad_rating': state.triad_rating,
        'security_reasoning': state.security_reasoning,
        'information_categories': state.information_categories
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationTypes';
            dispatch({'type': PUT_INFORMATION_TYPE})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(information_type)},
                (json) => { dispatch({type: PUT_INFORMATION_TYPE_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_INFORMATION_TYPE_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_INFORMATION_TYPE_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_INFORMATION_TYPE_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createInformationType = (state) => {

    let information_type = {
        'name': state.name,
        'description': state.description,
        'triad_rating': state.triad_rating,
        'security_reasoning': state.security_reasoning,
        'information_categories': state.information_categories
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationTypes';
            dispatch({'type': POST_INFORMATION_TYPE})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(information_type)},
                (json) => { dispatch({type: POST_INFORMATION_TYPE_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_INFORMATION_TYPE_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_INFORMATION_TYPE_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_INFORMATION_TYPE_FAILURE, error: ex}) },
            ))

       })
    }
}

export const deleteInformationType = (state) => {

    let information_type = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/InformationTypes';
            dispatch({'type': DELETE_INFORMATION_TYPE})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(information_type)},
                (json) => { dispatch({type: DELETE_INFORMATION_TYPE_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_INFORMATION_TYPE_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_INFORMATION_TYPE_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_INFORMATION_TYPE_FAILURE, error: ex}) },
            ))
        })
    }
}

