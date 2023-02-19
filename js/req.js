function req(url,method) {
    var xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    xhr.send()

    xhr.onload = ()=> {
        var data = JSON.parse(xhr.response)
        ress = data
        console.log(ress);
    }


}