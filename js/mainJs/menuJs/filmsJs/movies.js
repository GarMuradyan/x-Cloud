function renderMoviesAndSeries (data, infoUrl) {
    var moviesAndSeriesPageBox = el('div', 'movies-and-series-page-box')
    var pageContentBox = el('div', 'page-content-box')

    if (data) {
        pageContentBox.append(renderMoviesSeriesHeader(data, infoUrl))
        pageContentBox.append(renderMovies(data,infoUrl))
    } else {
        pageContentBox.append(renderMoviesSeriesLoadingHeader())
        pageContentBox.append(renderMoviesSeriesLoadingLists())
    }


    moviesAndSeriesPageBox.append(pageContentBox)

    return moviesAndSeriesPageBox
}

function renderMoviesSeriesLoadingHeader () {
    var pageHeaderBox = el('div', 'page-header-box')
    var headerTopBox = el('div', 'header-top-box')
    var headerTopBackBox = el('div', 'header-top-back-box')
    var headerBottomBox = el('div', 'header-bottom-box')
    var headerBottomContentBox = el('div', 'header-bottom-content-box')

    for (var i = 0; i < 7; i++) {
        headerBottomContentBox.append(renderHeaderLoadingComponents())
    }

    headerTopBackBox.append(renderBackButton())

    headerTopBox.append(headerTopBackBox)
    headerTopBox.append(renderSearchButtonBox())

    headerBottomBox.append(headerBottomContentBox)

    pageHeaderBox.append(headerTopBox)
    pageHeaderBox.append(headerBottomBox)

    return pageHeaderBox
}

function renderMoviesSeriesHeader (data, infoUrl) {
    var pageHeaderBox = el('div', 'page-header-box')
    var headerTopBox = el('div', 'header-top-box')
    var headerTopBackBox = el('div', 'header-top-back-box')

    headerTopBackBox.append(renderBackButton())

    headerTopBox.append(headerTopBackBox)
    headerTopBox.append(renderSearchButtonBox(data, infoUrl))

    pageHeaderBox.append(headerTopBox)
    pageHeaderBox.append(renderMoviesHeaderBottomBox(data,infoUrl))

    return pageHeaderBox
}

function renderMoviesHeaderBottomBox(data,infoUrl) {
    var headerBottomBox = el('div', 'header-bottom-box')
    var headerBottomContentBox = el('div', 'header-bottom-content-box')

    for (var i = 0; i < 7; i++) {
        if (data[i]) {
            headerBottomContentBox.append(renderHeaderComponents(data[i].category_name, i))
        }
    }

    headerBottomBox.append(headerBottomContentBox)

    return headerBottomBox
}

function renderMoviesSeriesLoadingLists () {
    var pageListsParentBox = el('div', 'page-lists-parent-box')
    var parentConetntBox = el('div', 'parent-content-box')

    for (var i = 0; i < 2; i++) {
        var contentRowsBox = el('div', 'content-rows-box')
        var contentRowsNameBox = el('div', 'content-rows-name-box')
        var contentRowsListsBox = el('div', 'content-rows-lists-box')

        contentRowsListsBox.setAttribute('position', 0)

        contentRowsBox.append(contentRowsNameBox)
        contentRowsBox.append(contentRowsListsBox)

        parentConetntBox.append(contentRowsBox)

        for (var j = 0; j < 7; j++) {
            contentRowsListsBox.append(renderListsLoadingCardBox())
        }
    }

    pageListsParentBox.append(parentConetntBox)

    return pageListsParentBox
}

function renderMovies(data,infoUrl) {
    var pageListsParentBox = el('div', 'page-lists-parent-box')
    var parentConetntBox = el('div', 'parent-content-box')

    for (var i = 0; i < data.length; i++) {
        if (data[i].playlist.length) {
            parentConetntBox.append(renderMoviesSeriesLists(data[i],infoUrl,data[i],i)) 
        }
    }

    pageListsParentBox.append(parentConetntBox)

    return pageListsParentBox
}

function renderMoviesSeriesLists (categori, infoUrl,data,i) {

    var contentRowsBox = el('div', 'content-rows-box')
    var contentRowsNameBox = el('div', 'content-rows-name-box')
    var contentRowsListsBox = el('div', 'content-rows-lists-box')

    contentRowsListsBox.setAttribute('position', 0)
    contentRowsListsBox.setAttribute('row-index', 6)
    contentRowsListsBox.setAttribute('translate', 0)
    contentRowsNameBox.textContent = categori.category_name

    for (var j = 0; j < 7; j++) {
        if (categori.playlist.length) {
            console.log('render');
            if (categori.playlist[j]) {
                contentRowsListsBox.append(renderListsCardBox(categori.playlist[j], data, i, infoUrl, j))
            }
        }
    }

    contentRowsBox.append(contentRowsNameBox)
    contentRowsBox.append(contentRowsListsBox)

    return contentRowsBox
}