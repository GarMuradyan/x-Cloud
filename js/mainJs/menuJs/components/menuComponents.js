function renderHeaderComponents (name, index) {
    var headerComponentsBox = el('div', 'header-components-box')

    headerComponentsBox.textContent = name
    headerComponentsBox.setAttribute('index', index)
    headerComponentsBox.style.left = index * 275 + 'px'

    headerComponentsBox.onclick = clickHeaderComponents


    return headerComponentsBox
}

function renderHeaderLoadingComponents () {
    var headerLoadingComponentsBox = el('div', 'header-loading-components-box')

    return headerLoadingComponentsBox
}

function renderListsCardBox (data, array, i, infoUrl, j, newclass) {
    var contentRowsListsCardBox = el('div', 'content-rows-lists-card-box')
    var cardImageParentBox = el('div', 'card-image-parent-box')
    var cardStarsBox = el('div', 'card-stars-box')
    var cardImageBox = el('img', 'card-image-box')
    var cardNameBox = el('div', 'card-name-box')
    var cardName = el('div', 'card-name')
    var img = new Image();

    img.src = data.stream_icon || data.cover || 'notFound.png'

    if (data.series_id) {
        seriesLocked[data.category_id] ? data.locked = seriesLocked[data.category_id].locked : false
        contentRowsListsCardBox.setAttribute('id', data.series_id)
    } else if (data.stream_id) {
        moviesLocked[data.category_id] ? data.locked = moviesLocked[data.category_id].locked : false
        contentRowsListsCardBox.setAttribute('id', data.stream_id)
    }

    data.locked ? contentRowsListsCardBox.append(renderMoviesLockedBox(data)) : false

    contentRowsListsCardBox.setAttribute('rows-index', i)
    contentRowsListsCardBox.style.left = j * 259 + 'px'
    cardName.textContent = data.name

    data.progresDuration ? contentRowsListsCardBox.append(renderMoviesProgresBar(data)) : false

    for (var i = 0; i < Math.ceil(data.rating_5based); i++) {
        var cardStar = el('img', 'card-star')
        cardStar.src = 'Star 4.png'

        cardStarsBox.append(cardStar)
    }

    img.onload = function () {
        cardImageBox.src = data.stream_icon || data.cover || 'notFound.png'
        data.cover ? cardImageBox.style.objectFit = 'cover' : data.stream_icon ? cardImageBox.style.objectFit = 'cover' : cardImageBox.style.objectFit = 'none'
    }

    img.onerror = function () {
        console.log('error');
        cardImageBox.src = 'notFound.png'
        cardImageBox.style.objectFit = 'none'
    }

    contentRowsListsCardBox.onclick = function () {
        clickListsCard(data, array, infoUrl, this.getAttribute('id'), this)
    }

    cardNameBox.append(cardName)

    cardImageParentBox.append(cardImageBox)

    contentRowsListsCardBox.append(cardImageParentBox)
    contentRowsListsCardBox.append(cardNameBox)
    contentRowsListsCardBox.append(cardStarsBox)
    data.favorit ? contentRowsListsCardBox.append(renderMoviesPageFavoritBox(data)) : false

    renderViewMore(contentRowsListsCardBox, j, newclass)

    return contentRowsListsCardBox

}

function renderListsLoadingCardBox () {
    var listsLoadingCardBox = el('div', 'lists-loading-card-box')

    return listsLoadingCardBox
}

function renderMenuesSearchBox () {
    var searchPageContentSearchBox = el('div', 'search-page-content-search-box')
    var searchPageContentSearchInput = el('input', 'search-page-content-search-input')
    var searchInputIcon = el('div', 'search-input-icon')

    activeInputText ? searchPageContentSearchInput.value = activeInputText : false

    searchPageContentSearchBox.append(searchInputIcon)
    searchPageContentSearchBox.append(searchPageContentSearchInput)

    return searchPageContentSearchBox
}

function clickHeaderComponents () {
    controls.select.removeClass()
    controls.select = controls.moviesLists
    controls.select.rowsIndex = this.getAttribute('index')
    controls.select.index = document.getElementsByClassName('content-rows-lists-box')[controls.select.rowsIndex].getAttribute('position')
    controls.select.start = document.getElementsByClassName('content-rows-lists-box')[controls.select.rowsIndex].getAttribute('row-index')
    controls.select.transIndex = document.getElementsByClassName('content-rows-lists-box')[controls.select.rowsIndex].getAttribute('translate')
    controls.select.addActive()
    controls.select.listTransY()
    controls.select.listTransX()
}

function clickListsCard (data, array, infoUrl, id, elem) {
    similiarContent = []
    if (elem.getAttribute('type')) {
        moviesCardViewMoreClick(array, elem)
    } else {
        moviesCardClick(data, array, infoUrl, id, elem)
    }
}

function renderMoviesPageFavoritBox (data) {
    var moviesPageFavoritBox = el('div', 'movies-page-favorit-box')
    var moviesPageFavoritImage = el('img', 'movies-page-favorit-imge')

    data.locked ? moviesPageFavoritImage.style.left = '69%' : moviesPageFavoritImage.style.left = '85%'

    moviesPageFavoritImage.src = 'favorit.png'

    moviesPageFavoritBox.append(moviesPageFavoritImage)

    return moviesPageFavoritBox
}

function renderMoviesLockedBox () {
    var moviesLockedBox = el('div', 'movies-locked-box')

    moviesLockedBox.append(renderLockIcon())

    return moviesLockedBox
}

function renderMoviesProgresBar (data) {
    var moviesProgresBarBox = el('div', 'movies-progres-bar-box')
    var moviesProgresBarContentBox = el('div', 'movies-progres-bar-content-box')

    moviesProgresBarContentBox.style.width = data.progresDuration

    moviesProgresBarBox.append(moviesProgresBarContentBox)

    return moviesProgresBarBox
}

function renderViewMore (elem, index, newclass) {
    if (newclass) {
        if (index == 6) {
            var viewMoreBox = el('div', 'view-more-box')

            viewMoreBox.textContent = 'View More...'

            elem.innerHTML = ''

            elem.setAttribute('type', 'view-more')

            elem.append(viewMoreBox)

        }
    }
}

function moviesCardClick (data, array, infoUrl, id, elem) {
    if (data.locked) {
        controls.pinInputs.privius = controls.select
        if (controls.select !== controls.similiarList) {
            controls.privius = controls.select
        }
        controls.select = ''
        lockedClick(data, array, infoUrl, id, elem)
    } else {
        if (controls.select !== controls.similiarList) {
            controls.privius = controls.select
        }
        controls.select = ''
        unLockedClick(data, array, infoUrl, id, elem)
    }


}

function lockedClick (data, array, infoUrl, id, elem) {
    clickedCard = data
    array.playlist ? similiarContent = array.playlist : similiarContent = array

    controls.episodesLists.transIndex = 0
    controls.episodesLists.start = 3
    controls.episodesLists.index = 0
    controls.seasonContent.index = 0
    controls.seasonContent.transIndex = 0

    document.getElementById('root').append(renderPinCodePage(controls.infoButtons, function () {
        renderInfoLogic(data, array, infoUrl, id, elem)
    }))

    controls.select = controls.pinInputs
    controls.select.firstActive()

    return
}

function unLockedClick (data, array, infoUrl, id, elem) {
    clickedCard = data
    array.playlist ? similiarContent = array.playlist : similiarContent = array

    controls.episodesLists.transIndex = 0
    controls.episodesLists.start = 3
    controls.episodesLists.index = 0
    controls.seasonContent.index = 0
    controls.seasonContent.transIndex = 0

    renderInfoLogic(data, array, infoUrl, id, elem)

}

function renderInfoLogic (data, array, infoUrl, id, elem) {
    if (controls.privius === controls.moviesLists) {
        document.getElementsByClassName('movies-and-series-page-box')[0].classList.add('popup-display')
    }
    if (controls.privius === controls.searchLists) {
        document.getElementsByClassName('movies-series-search-page')[0].classList.add('popup-display')
        document.getElementsByClassName('keyboard-absolute-box')[0].classList.add('popup-display')
    }
    if (document.querySelector('.movies-card-info-page')) {
        document.querySelector('.movies-card-info-page').remove()
    }
    if (controls.privius === controls.viewMore) {
        document.getElementsByClassName('view-more-page-box')[0].classList.add('popup-display')
    }
    document.getElementById('root').append(renderMoviesCardInfoLoading())

    req(infoUrl + id, 'GET').then(function (res) {
        console.log('info-respons', res);
        if (res.info) {
            if (document.querySelector('.movies-card-info-page')) {
                document.querySelector('.movies-card-info-page').remove()
            }
            controls.similiarList.index = 0
            controls.similiarList.start = 6
            controls.similiarList.transIndex = 0
            infoData = res
            document.querySelector('.movies-card-info-loading-box').remove()
            document.getElementById('root').append(renderMoviesCardInfo(res, similiarContent))
            controls.select = controls.infoButtons
            if (moviesSeriesData === seriesData) {
                controls.seasonContent.ok()
                controls.select.removeClass()
            }
            controls.select = controls.infoButtons
            controls.select.firstActive()
        } else {
            document.querySelector('.movies-card-info-loading-box').remove()
            document.getElementById('root').append(renderMoviesCardInfoNotFound())
        }
    }).catch(function (err) {
        console.log(err);
    })
}

function moviesCardViewMoreClick (categori, elem) {
    if (controls.select !== controls.similiarList) {
        controls.privius = controls.select
    }
    lowerCase()
    keyboard = englishKeyboard
    viewMoreArray = []
    controls.select = controls.viewMore
    controls.select.index = 0
    controls.select.rowsIndex = 0
    controls.select.start = 1
    controls.select.transIndex = 0
    document.getElementsByClassName('movies-and-series-page-box')[0].classList.add('popup-display')
    document.getElementById('root').append(renderViewMorePage(categori))
    controls.select.addActive()
    activeInput = document.querySelector('.search-page-content-search-input')
    activeInput.value = ''
}