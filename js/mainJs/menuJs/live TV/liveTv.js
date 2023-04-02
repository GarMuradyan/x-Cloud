var channel = null

function renderLiveTvPage(data) {
    var liveTvPageBox = el('div','live-tv-page-box')

    liveTvPageBox.append(renderTvCategoriesBox(data))
    liveTvPageBox.append(renderTvPLayerBox(data[1].playlist[0],1))
    liveTvPageBox.append(renderLiveTvSearchBox())

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
    tvCatgoriesContentBox.append(renderLiveTvChannelsBox(data[1].playlist,data[1]))

    tvCategoriesBox.append(tvCategoriesTitleBox)
    tvCategoriesBox.append(tvCatgoriesContentBox)

    return tvCategoriesBox
}

function tvCategoriesTitleClick() {
    document.querySelector('.live-tv-channels-box').classList.add('scale-tv')
    document.querySelector('.live-tv-categories-box').classList.remove('display')
    controls.select = controls.tvCategories
    controls.select.addActive()
    document.getElementsByClassName('tv-player-bottom-button-box')[0].classList.add('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[1].classList.add('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[2].classList.add('opacity')
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

    document.getElementsByClassName('tv-player-bottom-button-box')[0].classList.remove('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[1].classList.remove('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[2].classList.remove('opacity')

    channel = null

    if (data.type !== 'search' && data.type !== 'favorites') {
        liveTvCategoriesClicks(data)
    }else if (data.type === 'favorites') {
        console.log('favorites');
    }else if (data.type === 'search') {
        liveTvCategoriesSearchClick()
    }
    
}

function liveTvCategoriesClicks(data) {

    renderLiveTvChannelsCards(data.playlist,data)

    document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
    document.querySelector('.live-tv-categories-box').classList.add('display')

    controls.select = controls.tvChannels
    controls.select.firstActive()
    controls.select.ok()
    
}

function liveTvCategoriesSearchClick() {

    renderLiveTvChannelsCards(liveTvData[1].playlist,liveTvData[1])

    document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
    document.querySelector('.tv-player-box').classList.add('translate-right')
    document.querySelector('.live-tv-categories-box').classList.add('display')
    document.querySelector('.live-tv-search-box').classList.remove('translate-right')
    activeInput = document.querySelector('.search-page-content-search-input')
    controls.select = controls.keyboard
    controls.select.firstActive()
    document.querySelector('.tv-player-video-box').pause()
}

function renderLiveTvChannelsCards(playlist,data) {
    console.log(playlist);
    console.log(data);
    document.querySelector('.live-tv-channels-content-box').innerHTML = ''
    for (var i = 0; i < playlist.length; i++) {
        document.querySelector('.live-tv-channels-content-box').append(renderLiveTvChannelsCardBox(playlist[i],i,data))
    }
}

function renderLiveTvChannelsBox(playlist,data) {
    var liveTvChannelsBox = el('div','live-tv-channels-box')
    var liveTvChannelsContentBox = el('div','live-tv-channels-content-box')
    
    for (var i = 0; i < playlist.length; i++) {
        liveTvChannelsContentBox.append(renderLiveTvChannelsCardBox(playlist[i],i,data))
    }

    liveTvChannelsBox.append(liveTvChannelsContentBox)

    return liveTvChannelsBox
}

function renderLiveTvChannelsCardBox(data,i,array) {
    console.log(array);
    var liveTvChannelsCardBox = el('div','live-tv-channels-card-box')
    var channelCardNumberBox = el('div','channel-card-number-box')
    var channelCardPosterAndNameBox = el('div','channel-card-poster-and-name-box')
    var channelCardPosterBox = el('div','channel-card-poster-box')
    var channelCardNameBox = el('div','channel-card-name-box')

    if (i === 0) {
        liveTvChannelsCardBox.classList.add('active-border')
    }

    if (data.locked) {
        liveTvChannelsCardBox.classList.add('live-tv-lock')
    }

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
    if (data.locked) {
        console.log('locked-true');
        if (channel === data) {
            if (document.querySelector('.tv-player-video-box')) {
                document.querySelector('.tv-player-video-box').requestFullscreen()
                controls.select.removeClass()
                controls.select = controls.liveTv
                return
            }
        }
    
        channel = data
    
        removeLiveTvChannelsActive()
        elem.classList.add('active-border')
        if (document.querySelector('.player-content-box')) {
            document.querySelector('.player-content-box').remove()
        }
        document.querySelector('.tv-player-box').insertBefore(renderTvPlayerContentBox(data,i+1),document.querySelector('.tv-player-box').children[1])
    
        renderLiveTvVideoLoading()
    }else {
        console.log('locked-false');
        if (channel === data) {
            if (document.querySelector('.tv-player-video-box')) {
                document.querySelector('.tv-player-video-box').requestFullscreen()
                controls.select.removeClass()
                controls.select = controls.liveTv
                return
            }
        }
    
        channel = data
    
        removeLiveTvChannelsActive()
        elem.classList.add('active-border')
        if (document.querySelector('.player-content-box')) {
            document.querySelector('.player-content-box').remove()
        }
        document.querySelector('.tv-player-box').insertBefore(renderTvPlayerContentBox(data,i+1),document.querySelector('.tv-player-box').children[1])
    
        renderLiveTvVideoLoading()
    }

}

function removeLiveTvChannelsActive() {
    for (var i = 0; i < document.getElementsByClassName('live-tv-channels-card-box').length; i++) {
        document.getElementsByClassName('live-tv-channels-card-box')[i].classList.remove(('active-border'))
    }
}