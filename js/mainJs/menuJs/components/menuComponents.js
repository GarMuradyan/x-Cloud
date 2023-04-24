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

function renderListsCardBox (data, array, i, infoUrl, j) {
    console.log(data);
    var contentRowsListsCardBox = el('div', 'content-rows-lists-card-box')
    var cardImageParentBox = el('div', 'card-image-parent-box')
    var cardStarsBox = el('div', 'card-stars-box')
    var cardImageBox = el('img', 'card-image-box')
    var cardNameBox = el('div', 'card-name-box')
    var cardName = el('div', 'card-name')

    if (data.series_id) {
        console.log('series-id');
        contentRowsListsCardBox.setAttribute('id', data.series_id)
    } else if (data.stream_id) {
        console.log('stream-id');
        contentRowsListsCardBox.setAttribute('id', data.stream_id)
    }

    contentRowsListsCardBox.setAttribute('rows-index', i)
    contentRowsListsCardBox.style.left = j * 259 + 'px'
    cardName.textContent = data.name


    if (data.stream_icon) {
        cardImageBox.src = data.stream_icon
    } else if (data.cover) {
        cardImageBox.src = data.cover

    }

    for (var i = 0; i < Math.ceil(data.rating_5based); i++) {
        var cardStar = el('img', 'card-star')
        cardStar.src = 'Star 4.png'

        cardStarsBox.append(cardStar)
    }

    cardImageBox.onload = () => {
        console.log('loaded');
    }

    cardImageBox.onerror = () => {
        cardImageBox.src = 'http://smarttv.xtream.cloud/img/logo.png'
    }


    contentRowsListsCardBox.onclick = function () {
        clickListsCard(data, array, infoUrl, this.getAttribute('id'))
    }

    cardNameBox.append(cardName)

    cardImageParentBox.append(cardImageBox)

    contentRowsListsCardBox.append(cardImageParentBox)
    contentRowsListsCardBox.append(cardNameBox)
    contentRowsListsCardBox.append(cardStarsBox)

    return contentRowsListsCardBox

}

function renderListsLoadingCardBox () {
    var listsLoadingCardBox = el('div', 'lists-loading-card-box')

    return listsLoadingCardBox
}

function renderMenuesSearchBox () {
    var searchPageContentSearchBox = el('div', 'search-page-content-search-box')
    var searchPageContentSearchInput = el('input', 'search-page-content-search-input')
    var searchInputIcon = el('span', 'material-symbols-outlined')

    searchInputIcon.textContent = 'search'

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

function clickListsCard (data, array, infoUrl, id) {
    console.log(data.rating_5based);
    console.log(array);
    array.playlist ? similiarContent = array.playlist : similiarContent = array

    similiarContent = array


    if (controls.select !== controls.similiarList) {
        controls.privius = controls.select
    }

    controls.select = ''

    console.log(similiarContent);

    controls.similiarList.index = 0
    controls.similiarList.start = 6
    controls.similiarList.transIndex = 0
    controls.episodesLists.transIndex = 0
    controls.episodesLists.start = 3
    controls.episodesLists.index = 0
    controls.seasonContent.index = 0

    if (controls.privius === controls.moviesLists) {
        console.log('movies-popup');
        document.getElementsByClassName('movies-and-series-page-box')[0].classList.add('popup-display')
    }
    if (controls.privius === controls.searchLists) {
        document.getElementsByClassName('movies-series-search-page')[0].classList.add('popup-display')
        document.getElementsByClassName('keyboard-absolute-box')[0].classList.add('popup-display')
    }
    if (document.querySelector('.movies-card-info-page')) {
        document.querySelector('.movies-card-info-page').remove()
    }

    document.getElementById('root').append(renderMoviesCardInfoLoading())

    req(infoUrl + id, 'GET').then((res) => {
        console.log(res);
        if (res.info) {
            infoData = res
            document.querySelector('.movies-card-info-loading-box').remove()
            document.getElementById('root').append(renderMoviesCardInfo(res, similiarContent))
            controls.select = controls.infoButtons
            controls.select.addActive()
        } else {
            document.querySelector('.movies-card-info-loading-box').remove()
            document.getElementById('root').append(renderMoviesCardInfoNotFound())
        }
    }).catch((err) => {
        console.log(err);
    })
}

function renderMoviesPageLockBox () {
    var moviesPageLockBox = el('div', 'movies-page-lock-box')

    moviesPageLockBox.append(renderLockIcon())

    return moviesPageLockBox
}