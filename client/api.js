function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function get(url) {
    return fetch(url, {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}