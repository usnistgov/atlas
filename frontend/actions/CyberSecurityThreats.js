const { request } = require('../utils/utils');

export const GET_CYBERSECURITY_THREATS = 'GET_CYBERSECURITY_THREATS';
export const GET_CYBERSECURITY_THREATS_SUCCESS = "GET_CYBERSECURITY_THREATS_SUCCESS";
export const GET_CYBERSECURITY_THREATS_ERROR400 = "GET_CYBERSECURITY_THREATS_ERROR400";
export const GET_CYBERSECURITY_THREATS_ERROR500 = "GET_CYBERSECURITY_THREATS_ERROR500";
export const GET_CYBERSECURITY_THREATS_FAILURE = "GET_CYBERSECURITY_THREATS_FAILURE";

export const POST_CYBERSECURITY_THREAT = 'POST_CYBERSECURITY_THREAT';
export const POST_CYBERSECURITY_THREAT_SUCCESS = "POST_CYBERSECURITY_THREAT_SUCCESS";
export const POST_CYBERSECURITY_THREAT_ERROR400 = "POST_CYBERSECURITY_THREAT_ERROR400";
export const POST_CYBERSECURITY_THREAT_ERROR500 = "POST_CYBERSECURITY_THREAT_ERROR500";
export const POST_CYBERSECURITY_THREAT_FAILURE = "POST_CYBERSECURITY_THREAT_FAILURE";

export const PUT_CYBERSECURITY_THREAT = 'PUT_CYBERSECURITY_THREAT';
export const PUT_CYBERSECURITY_THREAT_SUCCESS = "PUT_CYBERSECURITY_THREAT_SUCCESS";
export const PUT_CYBERSECURITY_THREAT_ERROR400 = "PUT_CYBERSECURITY_THREAT_ERROR400";
export const PUT_CYBERSECURITY_THREAT_ERROR500 = "PUT_CYBERSECURITY_THREAT_ERROR500";
export const PUT_CYBERSECURITY_THREAT_FAILURE = "PUT_CYBERSECURITY_THREAT_FAILURE";

export const DELETE_CYBERSECURITY_THREAT = 'DELETE_CYBERSECURITY_THREAT';
export const DELETE_CYBERSECURITY_THREAT_SUCCESS = "DELETE_CYBERSECURITY_THREAT_SUCCESS";
export const DELETE_CYBERSECURITY_THREAT_ERROR400 = "DELETE_CYBERSECURITY_THREAT_ERROR400";
export const DELETE_CYBERSECURITY_THREAT_ERROR500 = "DELETE_CYBERSECURITY_THREAT_ERROR500";
export const DELETE_CYBERSECURITY_THREAT_FAILURE = "DELETE_CYBERSECURITY_THREAT_FAILURE";

export const getCyberSecurityThreats = () => {

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/CyberSecurityThreats';
            dispatch({'type': GET_CYBERSECURITY_THREATS});
            resolve(request(
                url, {},
                (json) => { dispatch({type: GET_CYBERSECURITY_THREATS_SUCCESS, res: json}) },
                (json) => { dispatch({type: GET_CYBERSECURITY_THREATS_ERROR400, res: json}) },
                (res) => { dispatch({type: GET_CYBERSECURITY_THREATS_ERROR500, res: res}) },
                (ex) => { dispatch({type: GET_CYBERSECURITY_THREATS_FAILURE, error: ex}) },
            ))
        })
    }
}

export const updateCyberSecurityThreat = (state) => {

    let cybersecurity_threat = {
        'id': state.id,
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/CyberSecurityThreats';
            dispatch({'type': PUT_CYBERSECURITY_THREAT})
            resolve(request(

                url, {method: "PUT", body: JSON.stringify(cybersecurity_threat)},
                (json) => { dispatch({type: PUT_CYBERSECURITY_THREAT_SUCCESS, res: json}) },
                (json) => { dispatch({type: PUT_CYBERSECURITY_THREAT_ERROR400, res: json}) },
                (res) => { dispatch({type: PUT_CYBERSECURITY_THREAT_ERROR500, res: res}) },
                (ex) => { dispatch({type: PUT_CYBERSECURITY_THREAT_FAILURE, error: ex}) },
            ))
        })
    }
}

export const createCyberSecurityThreat = (state) => {

    let cybersecurity_threat = {
        'name': state.name,
        'description': state.description,
        'resource_links': state.resource_links
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/CyberSecurityThreats';
            dispatch({'type': POST_CYBERSECURITY_THREAT})
            resolve(request(

                url, {method: "POST", body: JSON.stringify(cybersecurity_threat)},
                (json) => { dispatch({type: POST_CYBERSECURITY_THREAT_SUCCESS, res: json}) },
                (json) => { dispatch({type: POST_CYBERSECURITY_THREAT_ERROR400, res: json}) },
                (res) => { dispatch({type: POST_CYBERSECURITY_THREAT_ERROR500, res: res}) },
                (ex) => { dispatch({type: POST_CYBERSECURITY_THREAT_FAILURE, error: ex}) },
            ))
        })
    }
}

export const deleteCyberSecurityThreat = (state) => {

    let cybersecurity_threat = {
        'id': state.id
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            let url = 'api/CyberSecurityThreats';
            dispatch({'type': DELETE_CYBERSECURITY_THREAT})
            resolve(request(

                url, {method: "DELETE", body: JSON.stringify(cybersecurity_threat)},
                (json) => { dispatch({type: DELETE_CYBERSECURITY_THREAT_SUCCESS, res: json}) },
                (json) => { dispatch({type: DELETE_CYBERSECURITY_THREAT_ERROR400, res: json}) },
                (res) => { dispatch({type: DELETE_CYBERSECURITY_THREAT_ERROR500, res: res}) },
                (ex) => { dispatch({type: DELETE_CYBERSECURITY_THREAT_FAILURE, error: ex}) },
            ))
        })
    }
}
