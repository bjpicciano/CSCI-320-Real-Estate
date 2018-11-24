/**
 * Functions to aid in API calls to the server.
 */

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response.json();
}

/**
 * Helper function for post API calls.
 * Verifies a 200 status code and turns the response to JSON.
 * @param url - the endpoint to call
 * @param data - object to pass to the server's body variable
 * @returns {Promise<Response>} - promise containing response data in JSON when resolved.
 */
function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleErrors);
}

/**
 * Helper function for get API calls.
 * Verifies a 200 status code and turns the response to JSON.
 * @param url - the endpoint to call
 * @returns {Promise<Response>} - promise containing response data in JSON when resolved.
 */
function get(url) {
    return fetch(url, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(handleErrors);
}