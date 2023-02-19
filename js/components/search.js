function renderSearchButtonBox() {
    var searchButtonBox = el('div','search-button-box')
    var searchIcon = el('span','material-symbols-outlined')
    var searchText = el('div','search-text')

    searchText.textContent = 'Search'
    searchIcon.textContent = 'search'

    searchButtonBox.append(searchIcon)
    searchButtonBox.append(searchText)

    return searchButtonBox
}