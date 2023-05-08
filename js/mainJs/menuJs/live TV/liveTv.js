var channel = null
var selectedCategoriChannels = null

function renderLiveTvPage(data) {
    var liveTvPageBox = el('div','live-tv-page-box')

    liveTvPageBox.append(renderTvCategoriesBox(data))
    liveTvPageBox.append(renderTvPLayerBox(data[1].playlist[0],1))
    liveTvPageBox.append(renderLiveTvSearchBox())

    return liveTvPageBox

}

function renderTvCategoriesBox(data) {
    console.log(data);
    var tvCategoriesBox = el('div','tv-categories-box')
    var tvCategoriesTitleBox = el('div','tv-categories-title-box')
    var tvCatgoriesContentBox = el('div','tv-categories-content-box')

    tvCategoriesTitleBox.textContent = data[1].category_name

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
    
    for (var i = 0; i < 7; i++) {
        liveTvCategoriesContentBox.append(renderLiveTvCategoriesCardBox(data[i],i))
    }

    liveTvCategoriesBox.classList.add('display')

    liveTvCategoriesBox.append(liveTvCategoriesContentBox)

    return liveTvCategoriesBox
}

function renderLiveTvCategoriesCardBox(data,i) {
    var liveTvCategoriesCardBox = el('div','live-tv-categories-card-box')

    liveTvCategoriesCardBox.textContent = data.category_name
    liveTvCategoriesCardBox.style.top = i * 133 + 'px'
    liveTvCategoriesCardBox.setAttribute('name',data.name)
    liveTvCategoriesCardBox.onclick = function () {
        liveTvCategoriesCardClick(data)
    }

    return liveTvCategoriesCardBox
}

function liveTvCategoriesCardClick(data) {

    document.querySelector('.tv-categories-title-box').innerText = data.category_name
    document.querySelector('.tv-categories-title-box').append(titleIcon())

    document.getElementsByClassName('tv-player-bottom-button-box')[0].classList.remove('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[1].classList.remove('opacity')
    document.getElementsByClassName('tv-player-bottom-button-box')[2].classList.remove('opacity')

    channel = null

    if (data.type !== 'search' && data.type !== 'favorites') {
        liveTvCategoriesClicks(data)
    }else if (data.type === 'favorites') {
        liveTvCategoriesFavoritClick(data)
    }else if (data.type === 'search') {
        liveTvCategoriesSearchClick(data)
    }
    
}

function liveTvCategoriesFavoritClick(data) {
    if (liveTvFavorits.playlist.length) {
        selectedCategoriChannels = data.playlist

        controls.tvChannels.start = 6
        controls.tvChannels.transIndex = 0
        controls.tvChannels.index = 0
    
        renderLiveTvChannelsCards(data.playlist,data)
    
        document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
        document.querySelector('.live-tv-categories-box').classList.add('display')

        controls.tvCategories.selectedCategories = controls.tvCategories.index
    
        controls.select = controls.tvChannels
        controls.select.firstActive()
        controls.select.listTransY()
        controls.select.ok()
        
    }else {
        if (document.querySelector('.live-tv-categories-box').classList.contains('display')) {
            document.querySelector('.live-tv-categories-box').classList.remove('display')
            controls.select = controls.tvCategories
            controls.select.firstActive()
        }
        console.log('favorites');
    }
}

function liveTvCategoriesClicks(data) {

    selectedCategoriChannels = data.playlist

    controls.tvChannels.start = 6
    controls.tvChannels.transIndex = 0
    controls.tvChannels.index = 0

    renderLiveTvChannelsCards(data.playlist,data)

    document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
    document.querySelector('.live-tv-categories-box').classList.add('display')

    controls.tvCategories.selectedCategories = controls.tvCategories.index

    controls.select = controls.tvChannels
    controls.select.firstActive()
    controls.select.listTransY()
    controls.select.ok()
    
}

function liveTvCategoriesSearchClick(data) {

    controls.tvChannels.start = 6
    controls.tvChannels.transIndex = 0
    controls.tvChannels.index = 0
    controls.tvChannels.listTransY()

    selectedCategoriChannels = data.playlist

    renderLiveTvChannelsCards(data.playlist,data)

    controls.tvCategories.selectedCategories = controls.tvCategories.index

    document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
    document.querySelector('.tv-player-box').classList.add('translate-right')
    document.querySelector('.live-tv-categories-box').classList.add('display')
    document.querySelector('.live-tv-search-box').classList.remove('translate-right')
    activeInput = document.querySelector('.search-page-content-search-input')
    activeInput.value = ''
    controls.tvChannels.firstActive()
    controls.select = controls.keyboard
    controls.select.firstActive()
    document.querySelector('.tv-player-video-box').pause()
}

function renderLiveTvChannelsCards(playlist,data) {
    console.log(playlist);
    document.querySelector('.live-tv-channels-content-box').innerHTML = ''
    if (playlist.length) {
        console.log('playlist-length-true');
        for (var i = 0; i < 7; i++) {
            if (playlist[i]) {
                document.querySelector('.live-tv-channels-content-box').append(renderLiveTvChannelsCardBox(playlist[i],i,data))
            }
        }
    }
}

function renderLiveTvChannelsBox(playlist,data) {
    selectedCategoriChannels = playlist
    var liveTvChannelsBox = el('div','live-tv-channels-box')
    var liveTvChannelsContentBox = el('div','live-tv-channels-content-box')
    
    for (var i = 0; i < 7; i++) {
        liveTvChannelsContentBox.append(renderLiveTvChannelsCardBox(playlist[i],i,data))
    }

    liveTvChannelsBox.append(liveTvChannelsContentBox)

    return liveTvChannelsBox
}

function renderLiveTvChannelsCardBox(data,i,array) {
    console.log(data);
    var liveTvChannelsCardBox = el('div','live-tv-channels-card-box')
    var channelCardNumberBox = el('div','channel-card-number-box')
    var channelCardPosterAndNameBox = el('div','channel-card-poster-and-name-box')
    var channelCardPosterBox = el('div','channel-card-poster-box')
    var channelCardNameBox = el('div','channel-card-name-box')

    data.favorit ? liveTvChannelsCardBox.classList.add('live-tv-favorit') : false

    if (liveLocked[data.category_id]) {
        data.locked = liveLocked[data.category_id].locked
    }

    data.locked ? liveTvChannelsCardBox.append(renderLiveTvLocked()) : false

    channelCardNumberBox.textContent = i+1
    channelCardNameBox.textContent = data.name
    data.stream_icon ? channelCardPosterBox.style.backgroundImage = 'url(' + data.stream_icon + ')' : channelCardPosterBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/logo.png)'
    liveTvChannelsCardBox.setAttribute('id',data.stream_id)
    liveTvChannelsCardBox.style.top = i * 133 + 'px'

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
    controls.select.selectIndex = controls.select.index
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

        // req(reqUrl+'&action=get_short_epg&stream_id='+ elem.getAttribute('id'),'GET','').then((res)=> {
        //     console.log(res);
        // }).catch((err)=> {
        //     console.log(err);
        // })

        document.querySelector('.tv-player-box').insertBefore(renderTvPlayerContentBox(data,i+1),document.querySelector('.tv-player-box').children[1])
    
        renderLiveTvVideoLoading()
    }

}

function removeLiveTvChannelsActive() {
    for (var i = 0; i < document.getElementsByClassName('live-tv-channels-card-box').length; i++) {
        document.getElementsByClassName('live-tv-channels-card-box')[i].classList.remove(('active-border'))
    }
}

function renderLiveTvLocked() {
    var liveTvLockedBox = el('div','live-tv-locked-box')

    liveTvLockedBox.append(renderLockIcon())

    return liveTvLockedBox
}