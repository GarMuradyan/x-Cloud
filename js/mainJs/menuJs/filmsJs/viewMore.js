var viewMoreArray = []

function renderViewMorePage(categori) {
    console.log(categori);
    var viewMorePageBox = el('div','view-more-page-box')

    var quantArray = []

    for (var i = 0; i < categori.playlist.length; i++) {
        var elem = categori.playlist[i]
        quantArray.push(elem)
        if (quantArray.length == 7) {
            viewMoreArray.push(quantArray)
            quantArray = []
        }else if (i == categori.playlist.length-1 && quantArray.length < 7) {
            viewMoreArray.push(quantArray)
            quantArray = []
        }
    }

    viewMorePageBox.append(renderViewMoreHeader(categori))
    viewMorePageBox.append(renderViewMoreMovies(viewMoreArray))

    return viewMorePageBox
}

function renderViewMoreHeader(categori) {
    var viewMoreHeaderBox = el('div','view-more-header-box')
    var viewMoreHeaderBackAndSearchBox = el('div','view-more-header-back-and-search-box')
    var viewMoreBackBox = el('div','view-more-back-box')
    var viewMoreCategoryNameBox = el('div','view-more-category-name-box')

    viewMoreCategoryNameBox.textContent = categori.category_name

    viewMoreBackBox.append(renderBackButton())

    viewMoreHeaderBackAndSearchBox.append(viewMoreBackBox)
    viewMoreHeaderBackAndSearchBox.append(renderSearchButtonBox(categori.playlist,infoUrl))

    viewMoreHeaderBox.append(viewMoreHeaderBackAndSearchBox)
    viewMoreHeaderBox.append(viewMoreCategoryNameBox)

    return viewMoreHeaderBox

}

function renderViewMoreMovies(categori) {
    console.log(categori);
    var viewMoreMoviesBox = el('div','view-more-movies-box')
    var viewMoreMoviesContentBox = el('div','view-more-movies-content-box')

    for (var i = 0; i < 2; i++) {
        if (categori[i]) {
            viewMoreMoviesContentBox.append(renderViewMoreMoviesLists(categori[i],i))
        }
    }

    viewMoreMoviesBox.append(viewMoreMoviesContentBox)

    return viewMoreMoviesBox
}

function renderViewMoreMoviesLists(categori,rowsIndex) {
    var viewMoreMoviesListsBox = el('div','view-more-movies-lists-box')
    var viewMoreMoviesListsContentBox = el('div','view-more-movies-lists-content-box')

    viewMoreMoviesListsContentBox.setAttribute('position',0)

    viewMoreMoviesListsBox.style.top = rowsIndex * 344 + 'px'

    for (var i = 0; i < categori.length; i++) {
        viewMoreMoviesListsContentBox.append(renderListsCardBox(categori[i],categori,rowsIndex,infoUrl,i))
    }

    viewMoreMoviesListsBox.append(viewMoreMoviesListsContentBox)

    return viewMoreMoviesListsBox

}