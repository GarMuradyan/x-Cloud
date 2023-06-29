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
    menuCardBox.style.backgroundImage = 'url(elipse.png)'

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

    controls.privius = ''
    controls.moviesLists.rowsIndex = 0
    controls.moviesLists.index = 0

    if (data.length) {
        getSeriesLockedCategories()
        controls.privius = controls.select
        moviesSeriesData = data
        moviesSeriesStreams = seriesStreams
        infoUrl = seriesInfoUrl

        controls.select = controls.moviesLists

        document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(data, infoUrl))

        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 1
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.headerComponents.index = 0
        controls.select.addActive()
    } else {

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 1
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.privius = controls.select

        controls.select = controls.back

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(''))
        getSeriesData()
    }

}

function cardMovies (data) {

    controls.privius = ''
    controls.moviesLists.rowsIndex = 0
    controls.moviesLists.index = 0

    if (data.length) {
        getMoviesLockedCategories()
        controls.privius = controls.select
        moviesSeriesData = data
        moviesSeriesStreams = moviesStreams
        infoUrl = moviesInfoUrl

        controls.select = controls.moviesLists

        document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(data, infoUrl))

        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 1
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.headerComponents.index = 0
        controls.select.addActive()
    } else {

        controls.moviesLists.index = 0
        controls.moviesLists.rowsIndex = 0
        controls.moviesLists.start = 1
        controls.moviesLists.transIndex = 0
        controls.headerComponents.index = 0
        controls.headerComponents.rowsIndex = 0
        controls.headerComponents.start = 6
        controls.headerComponents.transIndex = 0

        controls.privius = controls.select

        controls.select = controls.back

        document.getElementById('root').innerHTML = ''

        document.getElementById('root').append(renderMoviesAndSeries(''))
        getMoviesData()
    }
}

function cardSettings () {

    controls.privius = ''
    document.getElementById('root').innerHTML = ''

    document.getElementById('root').append(renderSettingsPage(settingsData))

    controls.select = controls.settings
    controls.select.firstActive()
}

function cardLive () {

    controls.privius = ''
    if (liveTvData) {
        document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')
        document.getElementById('root').innerHTML = ''

        getLiveTvLockedCategories()

        document.getElementById('root').append(renderLiveTvPage(liveTvData))

        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')

        controls.select = controls.tvCategories
        controls.select.start = 6
        controls.select.index = 1
        controls.select.transIndex = 0
        controls.select.ok()
    } else {
        document.getElementById('root').innerHTML = ''
        document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')
        getLiveTvData()
    }
}

function getSeriesData () {
    request = req(reqUrl + '&action=get_series_categories', "GET").then(function (res) {
        seriesCategories = res
        for (var i = 0; i < res.length; i++) {
            seriesCategoriesData[res[i].category_id] = { category_id: res[i].category_id, category_name: res[i].category_name, playlist: [] }
        }

        if (seriesStreams) {
            for (var i = 0; i < seriesStreams.length; i++) {
                if (seriesCategoriesData[seriesStreams[i].category_id]) {
                    if (series[seriesStreams[i].series_id]) {
                        if (series[seriesStreams[i].series_id].favorit) {
                            seriesStreams[i].favorit = series[seriesStreams[i].series_id].favorit
                            seriesFavorits.playlist.push(seriesStreams[i])
                        }
                    }
                    seriesCategoriesData[seriesStreams[i].category_id].playlist.push(seriesStreams[i])
                }
            }

            var arr = Object.values(seriesCategoriesData)

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].playlist.length) {
                    seriesData.push(arr[i])
                }
            }
            getSeriesFavorits()
            getSeriesLockedCategories()
            moviesSeriesData = seriesData
            moviesSeriesStreams = seriesStreams
            infoUrl = seriesInfoUrl
            controls.select = controls.moviesLists
            document.getElementById('root').innerHTML = ''
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, seriesInfoUrl))
            controls.select.addActive()
        }
    }).catch(function (err) {
        console.log(err);
    })

    request = req(reqUrl + '&action=get_series', "GET").then(function (res) {
        seriesStreams = res
        if (seriesCategories) {
            for (var i = 0; i < seriesStreams.length; i++) {
                if (seriesCategoriesData[seriesStreams[i].category_id]) {
                    if (series[seriesStreams[i].series_id]) {
                        if (series[seriesStreams[i].series_id].favorit) {
                            seriesStreams[i].favorit = series[seriesStreams[i].series_id].favorit
                            seriesFavorits.playlist.push(seriesStreams[i])
                        }
                    }
                    seriesCategoriesData[seriesStreams[i].category_id].playlist.push(seriesStreams[i])
                }
            }

            var arr = Object.values(seriesCategoriesData)

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].playlist.length) {
                    seriesData.push(arr[i])
                }
            }
            getSeriesFavorits()
            getSeriesLockedCategories()
            moviesSeriesData = seriesData
            moviesSeriesStreams = seriesStreams
            infoUrl = seriesInfoUrl
            controls.select = controls.moviesLists
            document.getElementById('root').innerHTML = ''
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, seriesInfoUrl))
            controls.select.addActive()
        }
    }).catch(function (err) {

    })
}

function getMoviesData () {

    request = req(reqUrl + '&action=get_vod_categories', "GET").then(function (res) {
        moviesCategories = res
        for (var i = 0; i < res.length; i++) {
            moviesCategoriesData[res[i].category_id] = { category_id: res[i].category_id, category_name: res[i].category_name, playlist: [] }
        }
        if (moviesStreams) {
            for (var i = 0; i < moviesStreams.length; i++) {
                if (moviesCategoriesData[moviesStreams[i].category_id]) {
                    if (vodes[moviesStreams[i].stream_id]) {
                        if (vodes[moviesStreams[i].stream_id].favorit) {
                            moviesStreams[i].favorit = vodes[moviesStreams[i].stream_id].favorit
                            moviesFavorits.playlist.push(moviesStreams[i])
                        }
                        if (vodes[moviesStreams[i].stream_id].continue) {
                            moviesStreams[i].continue = vodes[moviesStreams[i].stream_id].continue
                        }
                        if (vodes[moviesStreams[i].stream_id].progresDuration) {
                            moviesStreams[i].progresDuration = vodes[moviesStreams[i].stream_id].progresDuration
                        }
                    }
                    moviesCategoriesData[moviesStreams[i].category_id].playlist.push(moviesStreams[i])
                }
            }

            var arr = Object.values(moviesCategoriesData)

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].playlist.length) {
                    moviesData.push(arr[i])
                }
            }
            getMoviesFavorits()
            getMoviesLockedCategories()
            moviesSeriesData = moviesData
            moviesSeriesStreams = moviesStreams
            infoUrl = moviesInfoUrl
            controls.select = controls.moviesLists
            document.getElementById('root').innerHTML = ''
            console.log('render');
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, moviesInfoUrl))
            controls.select.addActive()
        }
    }).catch(function (err) {
        console.log(err);
    })

    request = req(reqUrl + '&action=get_vod_streams', "GET").then(function (res) {
        moviesStreams = res
        if (moviesCategories) {
            for (var i = 0; i < moviesStreams.length; i++) {
                if (moviesCategoriesData[moviesStreams[i].category_id]) {
                    if (vodes[moviesStreams[i].stream_id]) {
                        if (vodes[moviesStreams[i].stream_id].favorit) {
                            moviesStreams[i].favorit = vodes[moviesStreams[i].stream_id].favorit
                            moviesFavorits.playlist.push(moviesStreams[i])
                        }
                        if (vodes[moviesStreams[i].stream_id].continue) {
                            moviesStreams[i].continue = vodes[moviesStreams[i].stream_id].continue
                        }
                        if (vodes[moviesStreams[i].stream_id].progresDuration) {
                            moviesStreams[i].progresDuration = vodes[moviesStreams[i].stream_id].progresDuration
                        }
                    }
                    moviesCategoriesData[moviesStreams[i].category_id].playlist.push(moviesStreams[i])
                }
            }

            var arr = Object.values(moviesCategoriesData)

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].playlist.length) {
                    moviesData.push(arr[i])
                }
            }
            getMoviesFavorits()
            getMoviesLockedCategories()
            moviesSeriesData = moviesData
            moviesSeriesStreams = moviesStreams
            infoUrl = moviesInfoUrl
            controls.select = controls.moviesLists
            document.getElementById('root').innerHTML = ''
            console.log('render');
            document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData, moviesInfoUrl))
            controls.select.addActive()
        }
    }).catch(function (err) {

    })
}

function getLiveTvData () {

    req(reqUrl + '&action=get_live_categories', "GET", '').then(function (res) {
        liveTvCategories = res
        for (var i = 0; i < res.length; i++) {
            liveCategories[res[i].category_id] = { category_id: res[i].category_id, category_name: res[i].category_name, playlist: [] }
        }

        if (liveTvChannels) {
            for (var i = 0; i < liveTvChannels.length; i++) {
                if (liveCategories[liveTvChannels[i].category_id]) {
                    liveCategories[liveTvChannels[i].category_id].playlist.push(liveTvChannels[i])
                }
            }

            liveTvAll.playlist = liveTvChannels
            liveTvSearch.playlist = liveTvChannels
            liveTvData = Object.values(liveCategories)
            liveTvData.unshift(liveTvSearch)
            liveTvData.unshift(liveTvAll)
            liveTvData.unshift(liveTvFavorits)
            getLiveTvFavorits()
            getLiveTvLockedCategories()
            document.getElementById('root').innerHTML = ''

            document.getElementById('root').append(renderLiveTvPage(liveTvData))
            document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')

            controls.select = controls.tvCategories
            controls.select.start = 6
            controls.select.index = 1
            controls.select.transIndex = 0
            controls.select.ok()
        }

    }).catch(function (err) {
        console.log(err);
    })

    req(reqUrl + '&action=get_live_streams', "GET", '').then(function (res) {
        liveTvChannels = res
        if (liveTvCategories) {
            for (var i = 0; i < res.length; i++) {
                if (liveCategories[res[i].category_id]) {
                    liveCategories[res[i].category_id].playlist.push(res[i])
                }
            }

            liveTvAll.playlist = liveTvChannels
            liveTvSearch.playlist = liveTvChannels
            liveTvData = Object.values(liveCategories)
            liveTvData.unshift(liveTvSearch)
            liveTvData.unshift(liveTvAll)
            liveTvData.unshift(liveTvFavorits)
            getLiveTvFavorits()
            getLiveTvLockedCategories()
            document.getElementById('root').innerHTML = ''

            document.getElementById('root').append(renderLiveTvPage(liveTvData))
            document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')

            controls.select = controls.tvCategories
            controls.select.start = 6
            controls.select.index = 1
            controls.select.transIndex = 0
            controls.select.ok()
        }
    }).catch(function (err) {
        console.log(err);
    })
}