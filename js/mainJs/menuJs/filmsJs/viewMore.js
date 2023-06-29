var viewMoreArray = []

function renderViewMorePage (categori) {
    console.log(categori);
    var viewMorePageBox = el('div', 'view-more-page-box')

    var playlist = categori.playlist

    wiewMoreArrayFiltering(playlist)

    viewMorePageBox.append(renderViewMoreHeader(categori))
    viewMorePageBox.append(renderViewMoreMovies(viewMoreArray))
    viewMorePageBox.append(renderViewMoreKeyboard(categori.playlist, englishKeyboard))

    return viewMorePageBox
}

function renderViewMoreHeader (categori) {
    var viewMoreHeaderBox = el('div', 'view-more-header-box')
    var viewMoreHeaderBackAndSearchBox = el('div', 'view-more-header-back-and-search-box')
    var viewMoreBackBox = el('div', 'view-more-back-box')
    var viewMoreCategoryNameBox = el('div', 'view-more-category-name-box')
    var viewMoreInputBox = el('div', 'view-more-input-box')

    viewMoreCategoryNameBox.textContent = categori.category_name

    viewMoreBackBox.append(renderBackButton())

    viewMoreInputBox.append(renderMenuesSearchBox())

    viewMoreInputBox.onclick = function () {
        console.log('view-more');
        document.querySelector('.view-more-keyboard').classList.add('keyboard-translate')
        controls.select.removeClass()
        controls.select = controls.keyboard
        controls.select.firstActive()
    }

    viewMoreHeaderBackAndSearchBox.append(viewMoreBackBox)
    viewMoreHeaderBackAndSearchBox.append(viewMoreInputBox)

    viewMoreHeaderBox.append(viewMoreHeaderBackAndSearchBox)
    viewMoreHeaderBox.append(viewMoreCategoryNameBox)

    return viewMoreHeaderBox

}

function renderViewMoreMovies (categori) {
    console.log(categori);
    var viewMoreMoviesBox = el('div', 'view-more-movies-box')
    var viewMoreMoviesContentBox = el('div', 'view-more-movies-content-box')

    for (var i = 0; i < 2; i++) {
        if (categori[i]) {
            viewMoreMoviesContentBox.append(renderViewMoreMoviesLists(categori[i], i))
        }
    }

    viewMoreMoviesBox.append(viewMoreMoviesContentBox)

    return viewMoreMoviesBox
}

function renderViewMoreMoviesLists (categori, rowsIndex) {
    var viewMoreMoviesListsBox = el('div', 'view-more-movies-lists-box')
    var viewMoreMoviesListsContentBox = el('div', 'view-more-movies-lists-content-box')

    viewMoreMoviesListsContentBox.setAttribute('position', 0)

    viewMoreMoviesListsBox.style.top = rowsIndex * 344 + 'px'

    for (var i = 0; i < categori.length; i++) {
        viewMoreMoviesListsContentBox.append(renderListsCardBox(categori[i], categori, rowsIndex, infoUrl, i))
    }

    viewMoreMoviesListsBox.append(viewMoreMoviesListsContentBox)

    return viewMoreMoviesListsBox

}

function renderViewMoreKeyboard (playlist, array) {
    keyboard = array


    console.log(playlist);
    var viewMoreKeyboard = el('div', 'view-more-keyboard')
    var viewMoreKeyboardContent = el('div', 'view-more-keyboard-content')

    viewMoreKeyboardContent.append(renderKeyboard(keyboard, playlist, loginAndMoviesPage))

    viewMoreKeyboard.append(viewMoreKeyboardContent)

    return viewMoreKeyboard
}


function wiewMoreArrayFiltering (playlist) {

    var quantArray = []

    for (var i = 0; i < playlist.length; i++) {
        var elem = playlist[i]
        quantArray.push(elem)
        if (quantArray.length == 7) {
            viewMoreArray.push(quantArray)
            quantArray = []
        } else if (i == playlist.length - 1 && quantArray.length < 7) {
            viewMoreArray.push(quantArray)
            quantArray = []
        }
    }
}


function renderViewMoreSearching (data) {
    var viewSearch = []
    viewMoreArray = []

    controls.viewMore.index = 0
    controls.viewMore.rowsIndex = 0
    controls.viewMore.start = 1
    controls.viewMore.transIndex = 0
    controls.viewMore.listTransY()

    document.querySelector('.view-more-movies-content-box').innerHTML = ''
    document.getElementById('root').append(renderFilmsSearchingLoading())

    if (activeInput.value) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name.toLowerCase().indexOf(activeInput.value.toLowerCase()) !== -1) {
                viewSearch.push(data[i])
            }
        }
    }

    wiewMoreArrayFiltering(viewSearch)


    document.querySelector('.films-searching-load-box') ? document.querySelector('.films-searching-load-box').remove() : false
    if (viewMoreArray.length) {
        for (var i = 0; i < 2; i++) {
            if (viewMoreArray[i]) {
                document.querySelector('.view-more-movies-content-box').append(renderViewMoreMoviesLists(viewMoreArray[i], i))
            }
        }
    }
}