function renderMoviesCardInfoNotFound() {
    var moviesCardInfoNotFound = el('div','movies-card-info-not-found')

    moviesCardInfoNotFound.textContent = 'Info Not Found'

    setTimeout(() => {
        if (controls.privius === controls.moviesLists) {
            document.querySelector('.movies-card-info-not-found').remove()
            document.querySelector('.movies-and-series-page-box').classList.remove('popup-display')
            controls.select = controls.privius
            controls.privius = ''
            controls.select.addActive()
            controls.select.listTransX()
            controls.select.listTransY()
            console.log(moviesSeriesData);
        }
    
        if (controls.privius === controls.searchLists) {
            document.querySelector('.movies-card-info-not-found').remove()
            document.querySelector('.keyboard-absolute-box').classList.remove('popup-display')
            document.querySelector('.movies-series-search-page').classList.remove('popup-display')
            activeInput = document.querySelector('.search-page-content-search-input')
            controls.select = controls.privius
            controls.privius = ''
            controls.select.addActive()
            controls.select.listTransX()
        }
    }, 2500);

    return moviesCardInfoNotFound
}