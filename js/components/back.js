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
    if (controls.privius === controls.headerComponents || controls.privius === controls.menu) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMenu())
        controls.select = controls.menu
        controls.select.index = 0
        controls.select.addActive()
    }

    if (controls.privius === controls.search) {
        document.getElementById('root').innerHTML = ''
        if (document.querySelector('.keyboard-box')) {
            document.querySelector('.keyboard-box').remove()
        }
        document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData))
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }
}