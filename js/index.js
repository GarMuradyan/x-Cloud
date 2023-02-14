window.onload = ()=> {
    main()
}

function main() {
    document.getElementById('root').append(renderLogin())
    controls.select = controls.login
    controls.select.addActive()
}