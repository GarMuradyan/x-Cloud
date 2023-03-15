function renderMoviesSeriesSearchingBox() {
    var moviesSeriesSearchPage = el('div','movies-series-search-page')
    var searchPageContentBox = el('div','search-page-content-box')
    var searchPageContentBackBox = el('div','search-page-content-back-box')
    var searchListBox = el('div','search-list-box')
    var searchSystemBox = el('div','search-system-box')

    searchPageContentBackBox.textContent = 'Search'
    moviesSeriesSearchPage.style.backgroundImage = 'url(bg.png)'

    
    searchPageContentBackBox.append(renderBackButton())

    searchSystemBox.append(renderMenuesSearchBox())

    searchPageContentBox.append(searchPageContentBackBox)
    searchPageContentBox.append(searchSystemBox)
    searchPageContentBox.append(searchListBox)

    moviesSeriesSearchPage.append(searchPageContentBox)

    return moviesSeriesSearchPage
}