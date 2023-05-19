function renderBackButton () {
    var backBox = el('div', 'back-box')
    var backBtnSvg =
        "<svg" +
        '  width="15"' +
        '  height="26"' +
        '  viewBox="0 0 15 26"' +
        '  fill="none"' +
        '  xmlns="http://www.w3.org/2000/svg"' +
        ">" +
        "  <path" +
        '    d="M11.6 24.7667L0.366667 13.5667C0.233333 13.4333 0.139111 13.2889 0.084 13.1333C0.028 12.9778 0 12.8111 0 12.6333C0 12.4556 0.028 12.2889 0.084 12.1333C0.139111 11.9778 0.233333 11.8333 0.366667 11.7L11.6 0.466667C11.9111 0.155555 12.3 0 12.7667 0C13.2333 0 13.6333 0.166667 13.9667 0.5C14.3 0.833333 14.4667 1.22222 14.4667 1.66667C14.4667 2.11111 14.3 2.5 13.9667 2.83333L4.16667 12.6333L13.9667 22.4333C14.2778 22.7444 14.4333 23.1276 14.4333 23.5827C14.4333 24.0387 14.2667 24.4333 13.9333 24.7667C13.6 25.1 13.2111 25.2667 12.7667 25.2667C12.3222 25.2667 11.9333 25.1 11.6 24.7667Z"' +
        '    fill="white"' +
        "  />" +
        "</svg>";


    backBox.onclick = () => {
        backButtonClick()
    }

    backBox.innerHTML = backBtnSvg

    return backBox
}

function backButtonClick () {
    if (document.querySelector('.movies-and-series-page-box')) {

        if (!document.querySelector('.movies-and-series-page-box').classList.contains('popup-display')) {
            document.getElementById('root').innerHTML = ''
            controls.moviesLists.index = 0
            page = 'menu'
            document.getElementById('root').append(renderLoadingPage())
        }
    }

    if (document.querySelector('.view-more-page-box')) {
        if (!document.querySelector('.view-more-page-box').classList.contains('popup-display')) {
            season = []
            document.querySelector('.view-more-page-box') ? document.querySelector('.view-more-page-box').remove() : false
            document.querySelector('.movies-and-series-page-box').classList.remove('popup-display')
            controls.select = controls.moviesLists
            controls.privius = ''
            controls.searchButton.index = 0
            controls.select.addActive()
            controls.select.listTransY()
        }
    }

    if (document.querySelector('.movies-series-search-page')) {
        if (!document.querySelector('.movies-series-search-page').classList.contains('popup-display')) {
            if (document.querySelector('.view-more-page-box')) {
                season = []
                filmsSearchArray = []
                activeInputText = ''
                controls.privius = ''
                document.querySelector('.movies-series-search-page').remove()
                document.querySelector('.keyboard-absolute-box').remove()
                document.querySelector('.view-more-page-box').classList.remove('popup-display')
                controls.searchLists.index = 0
                controls.select = controls.viewMore
                controls.select.addActive()
            }else {
                season = []
                filmsSearchArray = []
                activeInputText = ''
                controls.privius = ''
                document.querySelector('.movies-series-search-page').remove()
                document.querySelector('.keyboard-absolute-box').remove()
                document.querySelector('.movies-and-series-page-box').classList.remove('popup-display')
                controls.moviesLists.rowsIndex = 0
                controls.searchLists.index = 0
                controls.select = controls.headerComponents
                controls.select.listTransX()
                controls.select.addActive()
            }
        }
    }

    if (controls.privius === controls.moviesLists) {
        if (!document.querySelector('.view-more-page-box')) {
            if (season.length) {
                renderSeriesFavoritCategori()
            }else {
                renderFavoritCategori()
            }
        }
        season = []
        document.querySelector('.movies-card-info-page') ? document.querySelector('.movies-card-info-page').remove() : false
        document.querySelector('.view-more-page-box') ? document.querySelector('.view-more-page-box').remove() : false
        document.querySelector('.movies-and-series-page-box').classList.remove('popup-display')
        controls.select = controls.privius
        controls.privius = ''
        controls.searchButton.index = 0
        controls.select.addActive()
        controls.select.listTransX()
        controls.select.listTransY()
    }

    if (controls.privius === controls.viewMore) {
        if (season.length) {
            renderSeriesFavoritCategori()
        }else {
            renderFavoritCategori()
        }
        season = []
        document.querySelector('.movies-card-info-page') ? document.querySelector('.movies-card-info-page').remove() : false
        document.querySelector('.view-more-page-box').classList.remove('popup-display')
        controls.select = controls.privius
        controls.privius = ''
    }

    if (controls.privius === controls.searchLists) {
        if (season.length) {
            renderSeriesFavoritCategori()
        }else {
            renderFavoritCategori()
        }
        season = []
        document.querySelector('.movies-card-info-page').remove()
        document.querySelector('.keyboard-absolute-box').classList.remove('popup-display')
        document.querySelector('.movies-series-search-page').classList.remove('popup-display')
        activeInput = document.querySelector('.search-page-content-search-input')
        controls.select = controls.privius
        controls.privius = ''
        controls.select.addActive()
        controls.select.listTransX()
    }

    if (document.querySelector('.settings-page-box')) {
        document.getElementById('root').innerHTML = ''
        page = 'menu'
        document.getElementById('root').append(renderLoadingPage())
    }

    if (document.querySelector('.pin-code-page-box')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderSettingsPage(settingsData))
        controls.select = controls.settings
        controls.select.firstActive()
    }

    if (document.querySelector('.lock-categories-page-box')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderSettingsPage(settingsData))
        controls.select = controls.settings
        controls.select.firstActive()
    }
}

function renderFavoritCategori() {
    if (moviesFavorits.playlist) {
        for (var i = 0; i < moviesSeriesData.length; i++) {
            if (moviesSeriesData[i] === moviesFavorits) {
                document.getElementsByClassName('parent-content-box')[0].getElementsByClassName('content-rows-box')[0].remove()
                moviesSeriesData.splice(i,1)
                controls.moviesLists.rowsIndex-=1
            }
        }

        if (moviesFavorits.playlist.length) {

            moviesSeriesData.unshift(moviesFavorits)

            document.getElementsByClassName('parent-content-box')[0].insertBefore(renderMoviesSeriesLists(moviesFavorits,infoUrl,moviesFavorits,0),document.getElementsByClassName('parent-content-box')[0].children[0])
            controls.moviesLists.rowsIndex+=1
            if (controls.moviesLists.rowsIndex == 0) {
                controls.moviesLists.start = 6
                controls.moviesLists.index = 0
                controls.moviesLists.transIndex = 0
            }
        }else {
            controls.moviesLists.rowsIndex === -1 ? controls.moviesLists.rowsIndex = 0 : false
            controls.moviesLists.index = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('position')
            controls.moviesLists.transIndex = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('translate')
            controls.moviesLists.start = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('row-index')
        }

        if (document.querySelector('.header-bottom-box')) {
            document.querySelector('.header-bottom-box').remove()
            document.querySelector('.page-header-box').append(renderMoviesHeaderBottomBox(moviesData))
            controls.headerComponents.start = 6
            controls.headerComponents.transIndex = 0
            controls.headerComponents.index = 0
        }
    }
}

function renderSeriesFavoritCategori() {
    if (seriesFavorits.playlist) {
        for (var i = 0; i < moviesSeriesData.length; i++) {
            if (moviesSeriesData[i] === seriesFavorits) {
                document.getElementsByClassName('parent-content-box')[0].getElementsByClassName('content-rows-box')[0].remove()
                moviesSeriesData.splice(i,1)
                controls.moviesLists.rowsIndex-=1
            }
        }

        if (seriesFavorits.playlist.length) {

            moviesSeriesData.unshift(seriesFavorits)

            document.getElementsByClassName('parent-content-box')[0].insertBefore(renderMoviesSeriesLists(seriesFavorits,infoUrl,seriesFavorits,0),document.getElementsByClassName('parent-content-box')[0].children[0])
            controls.moviesLists.rowsIndex+=1
            if (controls.moviesLists.rowsIndex == 0) {
                controls.moviesLists.start = 6
                controls.moviesLists.index = 0
                controls.moviesLists.transIndex = 0
            }
        }
        else {
            controls.moviesLists.rowsIndex === -1 ? controls.moviesLists.rowsIndex = 0 : false
            controls.moviesLists.index = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('position')
            controls.moviesLists.transIndex = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('translate')
            controls.moviesLists.start = controls.moviesLists.items[controls.moviesLists.rowsIndex].getAttribute('row-index')
        }

        if (document.querySelector('.header-bottom-box')) {
            document.querySelector('.header-bottom-box').remove()
            document.querySelector('.page-header-box').append(renderMoviesHeaderBottomBox(seriesData))
            controls.headerComponents.start = 6
            controls.headerComponents.transIndex = 0
            controls.headerComponents.index = 0
        }
    }
}


document.onwheel = (e)=> {
    if (controls.select === controls.moviesLists) {
        if (e.deltaY > 0) {
            controls.select.down()
        }
        if (e.deltaY < 0) {
            controls.select.up()
        }
    }
}