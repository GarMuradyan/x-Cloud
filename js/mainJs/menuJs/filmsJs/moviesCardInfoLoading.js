function renderMoviesCardInfoLoading() {
    var moviesCardInfoLoadingBox = el('div','movies-card-info-loading-box')
    var infoLoadingBox = el('div','info-loading-box')
    var infoLoadingTextBox = el('div','info-loading-text-box')

    infoLoadingTextBox.textContent = 'Loading Info Page'

    infoLoadingBox.append(renderLoading())

    moviesCardInfoLoadingBox.append(infoLoadingBox)
    moviesCardInfoLoadingBox.append(infoLoadingTextBox)


    return moviesCardInfoLoadingBox
}