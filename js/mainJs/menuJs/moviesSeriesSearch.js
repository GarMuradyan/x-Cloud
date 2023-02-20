function renderMoviesSeriesSearchingBox() {
    var moviesSeriesSearchPage = el('div','movies-series-search-page')
    var searchPageContentBox = el('div','search-page-content-box')
    var searchPageContentBackBox = el('div','search-page-content-back-box')
    var searchPageContentSearchInput = el('input','search-page-content-search-input')
    var searchInputIcon = el('span','material-symbols-outlined')
    var searchListBox = el('div','search-list-box')

    searchPageContentBackBox.textContent = 'Search'
    searchInputIcon.textContent = 'search'
    moviesSeriesSearchPage.style.backgroundImage = 'url(bg.png)'

    
    searchPageContentBackBox.append(renderBackButton())
    searchPageContentSearchInput.append(searchInputIcon)

    searchPageContentBox.append(searchPageContentBackBox)
    searchPageContentBox.append(searchPageContentSearchInput)
    searchPageContentBox.append(searchListBox)

    moviesSeriesSearchPage.append(searchPageContentBox)

    return moviesSeriesSearchPage
}