var filmsSearchArray = []

var searchArray = []

function renderMoviesSeriesSearchingBox (infoUrl) {
    var moviesSeriesSearchPage = el('div', 'movies-series-search-page')
    var searchPageContentBox = el('div', 'search-page-content-box')
    var searchPageContentBackBox = el('div', 'search-page-content-back-box')
    var searchPageBackBox = el('div', 'search-page-back-box')
    var searchListBox = el('div', 'search-list-box')
    var searchListContentBox = el('div', 'search-list-content-box')
    var searchSystemBox = el('div', 'search-system-box')

    searchPageBackBox.append(renderBackButton())

    searchPageContentBackBox.append(searchPageBackBox)

    searchSystemBox.append(renderMenuesSearchBox())

    searchListBox.append(searchListContentBox)

    searchPageContentBox.append(searchPageContentBackBox)
    searchPageContentBox.append(searchSystemBox)
    searchPageContentBox.append(searchListBox)

    moviesSeriesSearchPage.append(searchPageContentBox)

    return moviesSeriesSearchPage
}

function renderFilmsSearching (data, infoUrl) {
    id ? clearTimeout(id) : false
    filmsSearchArray = []
    searchArray = []


    controls.searchLists.index = 0
    controls.searchLists.transIndex = 0
    controls.searchLists.start = 6
    controls.searchLists.listTransX()

    document.querySelector('.search-list-content-box').innerHTML = ''

    document.getElementById('root').append(renderFilmsSearchingLoading())

    if (activeInput.value) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name.indexOf(activeInput.value) !== -1) {
                searchArray.push(data[i])
            }
        }
    }

    if (searchArray.length) {
        for (var i = 0; i < 7; i++) {
            if (searchArray[i]) {
                filmsSearchArray.push(searchArray[i])
            }
        }
    }

    var id = setTimeout(() => {
        renderSearchListCards(filmsSearchArray, searchArray, infoUrl)
    }, 300);
}

function renderSearchListCards (data, searchArray, infoUrl) {

    document.querySelector('.films-searching-load-box') ? document.querySelector('.films-searching-load-box').remove() : false

    for (var i = 0; i < data.length; i++) {
        document.querySelector('.search-list-content-box').append(renderListsCardBox(data[i], searchArray, '', infoUrl, i))
    }
}

function renderFilmsSearchingLoading () {

    document.querySelector('.films-searching-load-box') ? document.querySelector('.films-searching-load-box').remove() : false

    var filmsSearchingLoadBox = el('div', 'films-searching-load-box')

    filmsSearchingLoadBox.append(renderLoading())

    return filmsSearchingLoadBox
}
