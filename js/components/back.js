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
    if (document.querySelector('.movies-and-series-page-box')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMenu())
        controls.select = controls.menu
        controls.select.index = 0
        controls.select.addActive()
    }

    if (controls.privius === controls.search) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData))
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }

    if (document.querySelector('.movies-card-info-page')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData))
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }
}