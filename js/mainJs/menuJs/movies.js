function renderMoviesAndSeries(data) {
    var moviesAndSeriesPageBox = el('div','movies-and-series-page-box')
    var pageContentBox = el('div','page-content-box')  
    
    moviesAndSeriesPageBox.style.backgroundImage = "url(" + backgroundImage + ")"

    if (data) {
        pageContentBox.append(renderMoviesSeriesHeader(data))
        pageContentBox.append(renderMoviesSeriesLists(data))
    }else {
        pageContentBox.append(renderMoviesSeriesLoadingHeader())
        pageContentBox.append(renderMoviesSeriesLoadingLists())
    }


    moviesAndSeriesPageBox.append(pageContentBox)

    return moviesAndSeriesPageBox
}

function renderMoviesSeriesLoadingHeader() {
    var pageHeaderBox = el('div','page-header-box')
    var headerTopBox = el('div','header-top-box')
    var headerTopBackBox = el('div','header-top-back-box')
    var headerBottomBox = el('div','header-bottom-box')
    var headerBottomContentBox = el('div','header-bottom-content-box')

    for (var i = 0; i < 3; i++) {
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

function renderMoviesSeriesHeader(data) {
    var pageHeaderBox = el('div','page-header-box')
    var headerTopBox = el('div','header-top-box')
    var headerTopBackBox = el('div','header-top-back-box')
    var headerBottomBox = el('div','header-bottom-box')
    var headerBottomContentBox = el('div','header-bottom-content-box')

    for (var i = 0; i < data.length; i++) {
        headerBottomContentBox.append(renderHeaderComponents(data[i].page,i))
    }

    headerTopBackBox.append(renderBackButton())

    headerTopBox.append(headerTopBackBox)
    headerTopBox.append(renderSearchButtonBox(data))

    headerBottomBox.append(headerBottomContentBox)

    pageHeaderBox.append(headerTopBox)
    pageHeaderBox.append(headerBottomBox)

    return pageHeaderBox
}

function renderMoviesSeriesLoadingLists() {
    var pageListsParentBox = el('div','page-lists-parent-box')
    var parentConetntBox = el('div','parent-content-box')

    for (var i = 0; i < 2; i++) {
        var contentRowsBox = el('div','content-rows-box')
        var contentRowsNameBox = el('div','content-rows-name-box')
        var contentRowsListsBox = el('div','content-rows-lists-box')

        contentRowsListsBox.setAttribute('position',0)

        contentRowsBox.append(contentRowsNameBox)
        contentRowsBox.append(contentRowsListsBox)

        parentConetntBox.append(contentRowsBox)

        for (var j = 0; j < 6; j++) {
            contentRowsListsBox.append(renderListsLoadingCardBox())
        }
    }

    pageListsParentBox.append(parentConetntBox)

    return pageListsParentBox
}

function renderMoviesSeriesLists(data) {
    var pageListsParentBox = el('div','page-lists-parent-box')
    var parentConetntBox = el('div','parent-content-box')

    for (var i = 0; i < data.length; i++) {
        var contentRowsBox = el('div','content-rows-box')
        var contentRowsNameBox = el('div','content-rows-name-box')
        var contentRowsListsBox = el('div','content-rows-lists-box')

        contentRowsListsBox.setAttribute('position',0)

        contentRowsBox.append(contentRowsNameBox)
        contentRowsBox.append(contentRowsListsBox)

        parentConetntBox.append(contentRowsBox)

        contentRowsNameBox.textContent = data[i].name
        for (var j = 0; j < data[i].results.length; j++) {
            contentRowsListsBox.append(renderListsCardBox(data[i].results[j],data[i]))
        }
    }

    pageListsParentBox.append(parentConetntBox)

    return pageListsParentBox
}