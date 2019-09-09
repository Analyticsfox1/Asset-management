var fetchApi = {};
exports.fetchApi = function() {
    return fetchApi;
}

fetchApi.fetchData = function(url, method, body, callback) {
    console.log(url, method, body, callback)

    var options = { 
        method: method
    }

    options["headers"] = {'Content-Type': 'application/json'}

    if(body !== null){
        options["body"] = body
    }

    console.log('Optios', options)
    
    try {
        fetch(url, options)
        .then(response => response.json())
        .then(res => {
            console.log('From fetch', res)
            if(callback !== null) {
                callback(res)
            }
        })
    }
    catch(err) {
        alert(err)
    }
}