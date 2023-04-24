function req(url,method,data,params) {

    return new Promise((resolve,reject)=> {
        var xhr = new XMLHttpRequest()

        xhr.open(method,url)

        data ? xhr.setRequestHeader('Content-Type', 'aplication/json') : false

        data ? xhr.send(JSON.stringify(data)) : xhr.send()

        xhr.onload = ()=> {
            resolve(JSON.parse(xhr.response))
        }

        xhr.onerror = ()=> {
            reject('error')
        }
    })


}