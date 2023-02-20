function renderBackButton() {
    var backBox = el('div','back-box')
    var backIcon = el('span','material-symbols-outlined')

    backIcon.textContent = 'chevron_left'

    backBox.onclick = ()=> {
        backButtonClick()
    }

    backBox.append(backIcon)

    return backBox
}

function backButtonClick() {
    if (controls.privius === controls.menu) {
        document.querySelector('.movies-and-series-page-box').remove()
        document.getElementById('root').append(renderMenu())
        controls.select = controls.menu
        controls.select.index = 0
        controls.select.addActive()
    }
}