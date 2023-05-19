window.onload = ()=> {
    main()
}

function main() {
    document.getElementById('root').style.backgroundImage = 'url(Film.png)'
    document.body.append(renderHiddenLoading())
    if (page === 'login') {
        document.getElementById('root').append(renderLoadingPage())
    }else if (page === 'menu') {
        document.getElementById('root').append(renderLoadingPage())
    }
}