function renderSearchButtonBox(data) {
    var searchButtonBox = el('div','search-button-box')
    var searchIcon = el('span','material-symbols-outlined')
    var searchText = el('div','search-text')

    searchText.textContent = 'Search'
    searchIcon.textContent = 'search'

    searchButtonBox.onclick = ()=> {
        searchButtonClick(data)
    }

    searchButtonBox.append(searchIcon)
    searchButtonBox.append(searchText)

    return searchButtonBox
}

function searchButtonClick(data) {
    controls.privius = controls.select
    document.querySelector('.movies-and-series-page-box').remove()
    document.getElementById('root').append(renderMoviesSeriesSearchingBox(data))
    var keyboadrAbsoluteBox = el('div','keyboard-absolute-box')

    var arr = []

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].playlist.length; j++) {
            arr.push(data[i].playlist[j])
        }
    }

    keyboadrAbsoluteBox.append(renderKeyboard(keyboard,arr))
    document.getElementById('root').append(keyboadrAbsoluteBox)
    activeInput = document.querySelector('.search-page-content-search-input')
    controls.select = controls.keyboard
    controls.select.firstActive()
}