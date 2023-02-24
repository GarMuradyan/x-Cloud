window.onload = ()=> {
    main()
}

function main() {
    if (page === 'login') {
        document.getElementById('root').append(renderLogin())
        controls.select = controls.login
        controls.select.addActive()
    }else if (page === 'menu') {
        document.getElementById('root').append(renderMenu())
        controls.select = controls.menu
        controls.select.index = 0
        controls.select.addActive()
    }
}