function renderMenu () {
    var menuBox = el('div', 'menu-page-box')
    var menuLogoBox = el('div', 'menu-logo-box')
    var menuCardsParentBox = el('div', 'menu-cards-parent-box')

    for (var i = 0; i < menuImagesLinks.length; i++) {
        menuCardsParentBox.append(renderMenuCards(menuImagesLinks[i].name, menuImagesLinks[i].url, menuImagesLinks[i].type))
    }

    menuLogoBox.append(renderSecondLogo())

    menuBox.append(menuLogoBox)
    menuBox.append(menuCardsParentBox)

    return menuBox
}

function renderMenuCards (name, url, type) {
    var menuCardBox = el('div', 'menu-card-box')
    var menuCardPosterBox = el('div', 'menu-card-poster-box')
    var menuCardPoster = el('img', 'menu-card-poster')
    var menuCardName = el('p', 'menu-card-name')

    menuCardBox.setAttribute('type', type)
    menuCardPoster.src = url
    menuCardName.textContent = name

    menuCardBox.onclick = function () {
        menuCardsClick(this.getAttribute('type'))
    }


    menuCardPosterBox.append(menuCardPoster)

    menuCardBox.append(menuCardPosterBox)
    menuCardBox.append(menuCardName)


    return menuCardBox
}

function menuCardsClick (type) {

    if (type === 'live') {
        cardLive()
    } else if (type === 'movies') {
        cardMovies(moviesData)
    } else if (type === 'series') {
        cardSeries(seriesData)
    } else if (type === 'settings') {
        cardSettings()
    }
}

function cardSeries (data) {

    controls.moviesLists.rowsIndex = 0
    controls.moviesLists.index = 0

    if (data.length) {
        controls.privius = controls.select
        moviesSeriesData = data
        infoUrl = seriesInfoUrl

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(data, infoUrl))

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 6
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    } else {

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 6
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.privius = controls.select

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(''))
        getSeriesData()
    }

}

function cardMovies (data) {

    controls.moviesLists.rowsIndex = 0
    controls.moviesLists.index = 0

    if (data.length) {
        controls.privius = controls.select
        moviesSeriesData = data
        infoUrl = moviesInfoUrl

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(data, infoUrl))

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 6
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    } else {

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 6
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.privius = controls.select

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(''))
        getMoviesData()
    }
}

function cardSettings () {

    document.getElementById('root').innerHTML = ''

    document.getElementById('root').append(renderSettingsPage(settingsData))

    controls.select = controls.settings
    controls.select.firstActive()
}

function cardLive () {
    document.getElementById('root').innerHTML = ''

    document.getElementById('root').append(renderLiveTvPage(liveTvData))

    controls.select = controls.tvCategories
    if (controls.select.index === 0 || controls.select.index === '0') {
        controls.select.index = 1
    }

    if (controls.select.index === 2 || controls.select.index === '2') {
        controls.select.index = 1
    }
    controls.select.ok()
}

function getSeriesData () {
    req(reqUrl + '&action=get_series_categories', "GET").then((res) => {
        console.log(res);
        seriesCategories = res
        for (var i = 0; i < seriesCategories.length; i++) {
            seriesCategories[i].playlist = []
        }
        if (seriesStreams) {
            for (var i = 0; i < seriesCategories.length; i++) {
                for (var j = 0; j < seriesStreams.length; j++) {
                    if (seriesCategories[i].category_id === seriesStreams[j].category_id) {
                        seriesCategories[i].playlist.push(seriesStreams[j])
                    }
                }
            }
            for (var i = 0; i < seriesCategories.length; i++) {
                if (seriesCategories[i].playlist.length) {
                    seriesData.push(seriesCategories[i])
                }
            }
            document.getElementById('root').innerHTML = ''
            infoUrl = seriesInfoUrl
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, seriesInfoUrl))
            controls.select = controls.headerComponents
            controls.select.addActive()
        }
    }).catch((err) => {
        console.log(err);
    })

    req(reqUrl + '&action=get_series', "GET").then((res) => {
        console.log(res);
        seriesStreams = res
        if (seriesCategories) {
            for (var i = 0; i < seriesCategories.length; i++) {
                for (var j = 0; j < seriesStreams.length; j++) {
                    if (seriesCategories[i].category_id === seriesStreams[j].category_id) {
                        seriesCategories[i].playlist.push(seriesStreams[j])
                    }
                }
            }
            for (var i = 0; i < seriesCategories.length; i++) {
                if (seriesCategories[i].playlist.length) {
                    seriesData.push(seriesCategories[i])
                }
            }
            moviesSeriesData = seriesData
            document.getElementById('root').innerHTML = ''
            infoUrl = seriesInfoUrl
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, seriesInfoUrl))
            controls.select = controls.headerComponents
            controls.select.addActive()
        }
    }).catch((err) => {

    })
}

function getMoviesData () {

    req(reqUrl + '&action=get_vod_categories', "GET").then((res) => {
        console.log(res);
        moviesCategories = res
        for (var i = 0; i < moviesCategories.length; i++) {
            moviesCategories[i].playlist = []
        }
        if (moviesStreams) {
            for (var i = 0; i < moviesCategories.length; i++) {
                for (var j = 0; j < moviesStreams.length; j++) {
                    if (moviesCategories[i].category_id === moviesStreams[j].category_id) {
                        moviesCategories[i].playlist.push(moviesStreams[j])
                    }
                }
            }
            for (var i = 0; i < moviesCategories.length; i++) {
                if (moviesCategories[i].playlist.length) {
                    moviesData.push(moviesCategories[i])
                }
            }
            console.log(moviesData);
            moviesSeriesData = moviesData
            document.getElementById('root').innerHTML = ''
            infoUrl = moviesInfoUrl
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, moviesInfoUrl))
            controls.select = controls.headerComponents
            controls.select.addActive()
        }
    }).catch((err) => {
        console.log(err);
    })

    req(reqUrl + '&action=get_vod_streams', "GET").then((res) => {
        console.log(res);
        moviesStreams = res
        if (moviesCategories) {
            for (var i = 0; i < moviesCategories.length; i++) {
                for (var j = 0; j < moviesStreams.length; j++) {
                    if (moviesCategories[i].category_id === moviesStreams[j].category_id) {
                        moviesCategories[i].playlist.push(moviesStreams[j])
                    }
                }
            }

            for (var i = 0; i < moviesCategories.length; i++) {
                if (moviesCategories[i].playlist.length) {
                    moviesData.push(moviesCategories[i])
                }
            }
            console.log(moviesData);
            moviesSeriesData = moviesData
            document.getElementById('root').innerHTML = ''
            infoUrl = moviesInfoUrl
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, moviesInfoUrl))
            controls.select = controls.headerComponents
            controls.select.addActive()
        }
    }).catch((err) => {

    })
}