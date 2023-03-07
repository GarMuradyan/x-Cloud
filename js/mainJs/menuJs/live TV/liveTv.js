function renderLiveTvPage(data) {
    var liveTvPageBox = el('div','live-tv-page-box')

    liveTvPageBox.append(renderTvCategoriesBox(data))
    liveTvPageBox.append(renderTvPLayerBox(data[1].playlist[0],1))

    return liveTvPageBox

}

function renderTvCategoriesBox(data) {
    var tvCategoriesBox = el('div','tv-categories-box')
    var tvCategoriesTitleBox = el('div','tv-categories-title-box')
    var tvCatgoriesContentBox = el('div','tv-categories-content-box')

    tvCategoriesTitleBox.textContent = data[1].name

    tvCategoriesTitleBox.onclick = tvCategoriesTitleClick

    tvCategoriesTitleBox.append(titleIcon())

    tvCatgoriesContentBox.append(renderLiveTvCategoriesBox(data))
    tvCatgoriesContentBox.append(renderLiveTvChannelsBox(data[1].playlist))

    tvCategoriesBox.append(tvCategoriesTitleBox)
    tvCategoriesBox.append(tvCatgoriesContentBox)

    return tvCategoriesBox
}

function tvCategoriesTitleClick() {
    document.querySelector('.live-tv-channels-box').classList.add('scale-tv')
    document.querySelector('.live-tv-categories-box').classList.remove('display')
}

function titleIcon() {
    
    var tvCategoriesTitleIconBox = el('div','tv-categories-title-icon-box')

    tvCategoriesTitleIconBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/icons/category.png)'

    return tvCategoriesTitleIconBox
}

function renderLiveTvCategoriesBox(data) {
    var liveTvCategoriesBox = el('div','live-tv-categories-box')
    var liveTvCategoriesContentBox = el('div','live-tv-categories-content-box')
    
    for (var i = 0; i < data.length; i++) {
        liveTvCategoriesContentBox.append(renderLiveTvCategoriesCardBox(data[i]))
    }

    liveTvCategoriesBox.classList.add('display')

    liveTvCategoriesBox.append(liveTvCategoriesContentBox)

    return liveTvCategoriesBox
}

function renderLiveTvCategoriesCardBox(data) {
    var liveTvCategoriesCardBox = el('div','live-tv-categories-card-box')

    liveTvCategoriesCardBox.textContent = data.name
    liveTvCategoriesCardBox.setAttribute('name',data.name)
    liveTvCategoriesCardBox.onclick = function () {
        liveTvCategoriesCardClick(data)
    }

    return liveTvCategoriesCardBox
}

function liveTvCategoriesCardClick(data) {

    document.querySelector('.tv-categories-title-box').innerText = data.name
    document.querySelector('.tv-categories-title-box').append(titleIcon())

    if (data.playlist) {
        
        document.querySelector('.live-tv-channels-content-box').innerHTML = ''

        for (var i = 0; i < data.playlist.length; i++) {
            document.querySelector('.live-tv-channels-content-box').append(renderLiveTvChannelsCardBox(data.playlist[i],i))
        }
    
        document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
        document.querySelector('.live-tv-categories-box').classList.add('display')
        
    }else {
        document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
        document.querySelector('.live-tv-categories-box').classList.add('display')
    }
    controls.select = controls.tvChannels
    controls.select.firstActive()
}

function renderLiveTvChannelsBox(playlist) {
    var liveTvChannelsBox = el('div','live-tv-channels-box')
    var liveTvChannelsContentBox = el('div','live-tv-channels-content-box')
    
    for (var i = 0; i < playlist.length; i++) {
        liveTvChannelsContentBox.append(renderLiveTvChannelsCardBox(playlist[i],i))
    }

    liveTvChannelsBox.append(liveTvChannelsContentBox)

    return liveTvChannelsBox
}

function renderLiveTvChannelsCardBox(data,i) {
    var liveTvChannelsCardBox = el('div','live-tv-channels-card-box')
    var channelCardNumberBox = el('div','channel-card-number-box')
    var channelCardPosterAndNameBox = el('div','channel-card-poster-and-name-box')
    var channelCardPosterBox = el('div','channel-card-poster-box')
    var channelCardNameBox = el('div','channel-card-name-box')

    channelCardNumberBox.textContent = i+1
    channelCardNameBox.textContent = data.name
    channelCardPosterBox.style.backgroundImage = 'url(' + data.poster + ')'

    liveTvChannelsCardBox.onclick = function () {
        liveTvChannelsCardClick(this,data,i)
    }

    channelCardPosterAndNameBox.append(channelCardPosterBox)
    channelCardPosterAndNameBox.append(channelCardNameBox)

    liveTvChannelsCardBox.append(channelCardNumberBox)
    liveTvChannelsCardBox.append(channelCardPosterAndNameBox)

    return liveTvChannelsCardBox
    
}

function liveTvChannelsCardClick(elem,data,i) {
    removeLiveTvChannelsActive()
    elem.classList.add('active-border')
    if (document.querySelector('.player-content-box')) {
        document.querySelector('.player-content-box').remove()
    }
    document.querySelector('.tv-player-box').insertBefore(renderTvPlayerContentBox(data,i+1),document.querySelector('.tv-player-box').children[1])
}

function removeLiveTvChannelsActive() {
    for (var i = 0; i < document.getElementsByClassName('live-tv-channels-card-box').length; i++) {
        document.getElementsByClassName('live-tv-channels-card-box')[i].classList.remove(('active-border'))
    }
}