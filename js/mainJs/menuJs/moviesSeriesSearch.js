function renderMoviesSeriesSearchingBox() {
    var moviesSeriesSearchPage = el('div','movies-series-search-page')
    var searchPageContentBox = el('div','search-page-content-box')
    var searchPageContentBackBox = el('div','search-page-content-back-box')
    var searchPageContentSearchBox = el('div','search-page-content-search-box')
    var searchPageContentSearchInput = el('input','search-page-content-search-input')
    var searchInputIcon = el('span','material-symbols-outlined')
    var searchListBox = el('div','search-list-box')

    searchPageContentBackBox.textContent = 'Search'
    searchInputIcon.textContent = 'search'
    moviesSeriesSearchPage.style.backgroundImage = 'url(bg.png)'

    
    searchPageContentBackBox.append(renderBackButton())
    
    searchPageContentSearchBox.append(searchInputIcon)
    searchPageContentSearchBox.append(searchPageContentSearchInput)

    searchPageContentBox.append(searchPageContentBackBox)
    searchPageContentBox.append(searchPageContentSearchBox)
    searchPageContentBox.append(searchListBox)

    moviesSeriesSearchPage.append(searchPageContentBox)

    return moviesSeriesSearchPage
}