function renderMoviesSeriesSearchingBox() {
    var moviesSeriesSearchPage = el('div','movies-series-search-page')
    var searchPageContentBox = el('div','search-page-content-box')
    var searchPageContentBackBox = el('div','search-page-content-back-box')
    var searchPageBackBox = el('div','search-page-back-box')
    var searchListBox = el('div','search-list-box')
    var searchSystemBox = el('div','search-system-box')

    searchPageContentBackBox.textContent = 'Search'
    moviesSeriesSearchPage.style.backgroundImage = 'url(bg.png)'

    searchPageBackBox.append(renderBackButton())
    
    searchPageContentBackBox.append(searchPageBackBox)

    searchSystemBox.append(renderMenuesSearchBox())

    searchPageContentBox.append(searchPageContentBackBox)
    searchPageContentBox.append(searchSystemBox)
    searchPageContentBox.append(searchListBox)

    moviesSeriesSearchPage.append(searchPageContentBox)

    return moviesSeriesSearchPage
}