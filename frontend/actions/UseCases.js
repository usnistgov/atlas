const { request } = require('../utils/utils');

export const GET_USE_CASES = 'GET_USE_CASES';
export const GET_USE_CASES_SUCCESS = "GET_USE_CASES_SUCCESS";
export const GET_USE_CASES_ERROR400 = "GET_USE_CASES_ERROR400";
export const GET_USE_CASES_ERROR500 = "GET_USE_CASES_ERROR500";
export const GET_USE_CASES_FAILURE = "GET_USE_CASES_FAILURE";

export const PUT_USE_CASE = 'PUT_USE_CASE';
export const PUT_USE_CASE_SUCCESS = "PUT_USE_CASE_SUCCESS";
export const PUT_USE_CASE_ERROR400 = "PUT_USE_CASE_ERROR400";
export const PUT_USE_CASE_ERROR500 = "PUT_USE_CASE_ERROR500";
export const PUT_USE_CASE_FAILURE = "PUT_USE_CASE_FAILURE";

export const POST_USE_CASE = 'POST_USE_CASE';
export const POST_USE_CASE_SUCCESS = "POST_USE_CASE_SUCCESS";
export const POST_USE_CASE_ERROR400 = "POST_USE_CASE_ERROR400";
export const POST_USE_CASE_ERROR500 = "POST_USE_CASE_ERROR500";
export const POST_USE_CASE_FAILURE = "POST_USE_CASE_FAILURE";

export const DELETE_USE_CASE = 'DELETE_USE_CASE';
export const DELETE_USE_CASE_SUCCESS = "DELETE_USE_CASE_SUCCESS";
export const DELETE_USE_CASE_ERROR400 = "DELETE_USE_CASE_ERROR400";
export const DELETE_USE_CASE_ERROR500 = "DELETE_USE_CASE_ERROR500";
export const DELETE_USE_CASE_FAILURE = "DELETE_USE_CASE_FAILURE";

export const getUseCases = (state) => {

    let searchObject = {};
    let searchString = "";

    if(state.selectedOption.length !== undefined){

        state.selectedOption.map((entry) => {

            let group = entry.group;
            let value = entry.value;
            let searchOption = entry.searchOption;

            if(!(group in searchObject)){
                let option = {
                    [group]: {'values': [value], 'searchOption': searchOption}
                    };
                searchObject = {...searchObject, ...option};
            } else {
                searchObject[group]['values'].push(value);
                searchObject[group]['searchOption'] = searchOption;
            }
        });

        Object.entries(searchObject).forEach((searchItem, key, arr) => {
            searchString += searchItem[0] + "=" + searchItem[1]['values'].join();

            switch(searchItem[1]['searchOption']){
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

             if (!(Object.is(arr.length - 1, key))) {
                searchString += "&&"
             }
        });
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = "";

            if(searchString !== ""){
                url = 'api/UseCases?' + searchString;
            } else {
                url = 'api/UseCases';
            }
            dispatch({'type': GET_USE_CASES});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_USE_CASES_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_USE_CASES_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_USE_CASES_ERROR500, res: res}) },
                (ex) => { dispatch({type: GET_USE_CASES_FAILURE, error: ex}) },
            ))
        })
    }
}


export const updateUseCase = (state) => {

    let use_case = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'source': state.source,
        'actors': state.actors,
        'information_types': state.information_types,
        'cybersecurity_threats': state.cybersecurity_threats,
        'disciplines': state.disciplines,
        'responding_organizations': state.responding_organizations,
        'technologies': state.technologies,
        'activities': state.activities,
        'locations': state.locations,
        'concept_links': state.concept_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/UseCases';
            dispatch({'type': PUT_USE_CASE})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(use_case)},
                (json) => { dispatch({type: PUT_USE_CASE_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_USE_CASE_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_USE_CASE_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_USE_CASE_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createUseCase = (state) => {

    let use_case = {
        'name': state.name,
        'description': state.description,
        'source': state.source,
        'actors': state.actors,
        'information_types': state.information_types,
        'cybersecurity_threats': state.cybersecurity_threats,
        'disciplines': state.disciplines,
        'responding_organizations': state.responding_organizations,
        'technologies': state.technologies,
        'activities': state.activities,
        'locations': state.locations,
        'concept_links': state.concept_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/UseCases';
            dispatch({'type': POST_USE_CASE})
            resolve(request(

            url, {method: "POST", body: JSON.stringify(use_case)},
            (json) => { dispatch({type: POST_USE_CASE_SUCCESS, res: json}) },
            (json) => { dispatch({type: POST_USE_CASE_ERROR400, res: json}) },
            (res) => { dispatch({type: POST_USE_CASE_ERROR500, res: res}) },
            (ex) => { dispatch({type: POST_USE_CASE_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteUseCase = (state) => {

    let use_case = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/UseCases';
            dispatch({'type': DELETE_USE_CASE})
            resolve(request(

            url, {method: "DELETE", body: JSON.stringify(use_case)},
            (json) => { dispatch({type: DELETE_USE_CASE_SUCCESS, res: json}) },
            (json) => { dispatch({type: DELETE_USE_CASE_ERROR400, res: json}) },
            (res) => { dispatch({type: DELETE_USE_CASE_ERROR500, res: res}) },
            (ex) => { dispatch({type: DELETE_USE_CASE_FAILURE, error: ex}) },
            ))
        })
    }
}
