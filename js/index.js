window.onload = function () {
    main()
}

function main () {
    Element.prototype.append = function (element) {
        this.appendChild(element)
    }
    document.getElementById('root').style.backgroundImage = 'url(Film.png)'
    document.body.append(renderHiddenLoading())
    if (page === 'login') {
        document.getElementById('root').append(renderLoadingPage())
    } else if (page === 'menu') {
        document.getElementById('root').append(renderLoadingPage())
    }
}