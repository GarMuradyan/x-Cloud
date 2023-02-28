window.onload = ()=> {
    main()
}

function main() {
    if (page === 'login') {
        document.getElementById('root').append(renderLoadingPage())
    }else if (page === 'menu') {
        document.getElementById('root').append(renderLoadingPage())
    }
}