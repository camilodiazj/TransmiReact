export var putFetch = async function (uri, object) {
    let response = await
        fetch(uri, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    let data = await response.status
    return data;
}

export var postFetch = async function (uri, object) {
    let response = await
        fetch(uri, {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    let data = await response.status
    return data;
}

export var getFetch = async function (uri){
    let response = await
    fetch(uri);
    let data = await response.json()
    return data;
}

export var deleteFetch = async function(uri){
    let response = 
    await fetch(uri, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.status
    return data
}

