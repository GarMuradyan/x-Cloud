function renderSearchButtonBox (data, infoUrl) {
    console.log(data);
    var searchButtonBox = el('div', 'search-button-box')
    var searchIcon = el('span', 'material-symbols-outlined')
    var searchText = el('div', 'search-text')

    searchText.textContent = 'Search'
    searchIcon.textContent = 'search'

    searchButtonBox.onclick = () => {
        searchButtonClick(data, infoUrl)
    }

    searchButtonBox.append(searchIcon)
    searchButtonBox.append(searchText)

    return searchButtonBox
}

function searchButtonClick (data, infoUrl) {
    document.querySelector('.movies-and-series-page-box').classList.add('popup-display')
    document.getElementById('root').append(renderMoviesSeriesSearchingBox(infoUrl))

    document.getElementById('root').append(renderKyeboardAbsolute(moviesSeriesStreams))
    activeInput = document.querySelector('.search-page-content-search-input')
    controls.searchLists.start = 6
    controls.searchLists.transIndex = 0
    controls.select.removeClass()
    controls.select = controls.keyboard
    controls.select.firstActive()
}

function renderKyeboardAbsolute (arr) {
    var keyboadrAbsoluteBox = el('div', 'keyboard-absolute-box')
    keyboadrAbsoluteBox.append(renderKeyboard(keyboard, arr, loginAndMoviesPage))

    return keyboadrAbsoluteBox
}