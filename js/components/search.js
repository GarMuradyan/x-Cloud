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
    controls.privius = controls.search
    document.getElementById('root').innerHTML = ''
    document.getElementById('root').append(renderMoviesSeriesSearchingBox())

    var arr = []

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].results.length; j++) {
            arr.push(data[i].results[j])
        }
    }

    document.getElementById('root').append(renderKyeboardAbsolute(arr))
    activeInput = document.querySelector('.search-page-content-search-input')
    controls.select = controls.keyboard
    controls.select.firstActive()
}

function renderKyeboardAbsolute(arr) {
    var keyboadrAbsoluteBox = el('div','keyboard-absolute-box')
    keyboadrAbsoluteBox.append(renderKeyboard(keyboard,arr,loginAndMoviesPage))

    return keyboadrAbsoluteBox
}