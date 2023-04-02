var seriesData = []

var moviesData = []

var moviesUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=a9ce31a5dd0e31bbced7b7b38bf16555&language=en-US&page=10'

var seriesUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=a9ce31a5dd0e31bbced7b7b38bf16555&language=en-US&page=9'

var moviesSeriesData = null

function renderMenu() {
    var menuBox = el('div','menu-page-box')
    var menuLogoBox = el('div','menu-logo-box')
    var menuCardsParentBox = el('div','menu-cards-parent-box')

    for (var i = 0; i < menuImagesLinks.length; i++) {
        menuCardsParentBox.append(renderMenuCards(menuImagesLinks[i].name,menuImagesLinks[i].url,menuImagesLinks[i].type))
    }

    menuBox.style.backgroundImage = 'url(bg.png)'

    menuLogoBox.append(renderSecondLogo())

    menuBox.append(menuLogoBox)
    menuBox.append(menuCardsParentBox)

    return menuBox
}

function renderMenuCards(name,url,type) {
    var menuCardBox = el('div','menu-card-box')
    var menuCardPosterBox = el('div','menu-card-poster-box')
    var menuCardPoster = el('img','menu-card-poster')
    var menuCardName = el('p','menu-card-name')

    menuCardBox.setAttribute('type',type)
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

function menuCardsClick(type) {

    if (type === 'live') {
        cardLive()
    }else if (type === 'movies') {
        cardMovies(moviesData,moviesUrl,'GET')
    }else if (type === 'series') {
        cardSeries(seriesData,seriesUrl,'GET')
    }else if (type === 'settings') {
        cardSettings()
    }
}

function cardSeries(data,url,method) {

    if (data.length) {
        controls.privius = controls.select
        moviesSeriesData = data

        document.getElementById('root').innerHTML = ''
        
        document.getElementById('root').append(renderMoviesAndSeries(data))

        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }else {
        controls.privius = controls.select

        document.getElementById('root').innerHTML = ''
        
        document.getElementById('root').append(renderMoviesAndSeries(data))
        getSeriesData(url,method)
    }

}

function cardMovies(data,url,method) {
    if (data.length) {
        controls.privius = controls.select
        moviesSeriesData = data

        document.getElementById('root').innerHTML = ''
        
        document.getElementById('root').append(renderMoviesAndSeries(data))

        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }else {
        controls.privius = controls.select

        document.getElementById('root').innerHTML = ''
        
        document.getElementById('root').append(renderMoviesAndSeries(data))
        getMoviesData(url,method)
    }
}

function cardSettings() {
    
    document.getElementById('root').innerHTML = ''

    document.getElementById('root').append(renderSettingsPage(settingsData))

    controls.select = controls.settings
    controls.select.firstActive()
}

function cardLive() {
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

function getSeriesData(url,method) {
    var xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    xhr.send()

    xhr.onload = ()=> {
        var data = JSON.parse(xhr.response)
        seriesData.push(data)
        moviesSeriesData = seriesData
        document.querySelector('.movies-and-series-page-box') ? document.querySelector('.movies-and-series-page-box').remove() : false
        document.getElementById('root').append(renderMoviesAndSeries(seriesData))
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }
}

function getMoviesData(url,method) {
    var xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    xhr.send()

    xhr.onload = ()=> {
        var data = JSON.parse(xhr.response)
        moviesData.push(data)
        moviesSeriesData = moviesData
        document.querySelector('.movies-and-series-page-box') ? document.querySelector('.movies-and-series-page-box').remove() : false
        document.getElementById('root').append(renderMoviesAndSeries(moviesData))
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
    }
}