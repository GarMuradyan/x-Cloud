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
        moviesSeriesData = menuMoviesData
        cardMoviesAndSeries(moviesSeriesData)
    }else if (type === 'series') {
        moviesSeriesData = menuSeriesData
        cardMoviesAndSeries(moviesSeriesData)
    }else if (type === 'settings') {
        cardSettings()
    }
}

function cardMoviesAndSeries(data) {
    controls.privius = controls.select

    document.getElementById('root').innerHTML = ''
    
    document.getElementById('root').append(renderMoviesAndSeries(data))
    controls.select = controls.headerComponents
    controls.select.index = 0
    controls.select.addActive()

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
    controls.select.ok()
}

function getLIveData(url,method) {
    var xhr = new XMLHttpRequest()
    xhr.open(method,url,true)
    xhr.send()

    xhr.onload = ()=> {
        var data = JSON.parse(xhr.response)
        console.log(data);
    }
}