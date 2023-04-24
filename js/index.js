window.onload = ()=> {
    main()
}

function main() {
    document.getElementById('root').style.backgroundImage = 'url(40.png)'
    if (page === 'login') {
        document.getElementById('root').append(renderLoadingPage())
    }else if (page === 'menu') {
        document.getElementById('root').append(renderLoadingPage())
    }
}