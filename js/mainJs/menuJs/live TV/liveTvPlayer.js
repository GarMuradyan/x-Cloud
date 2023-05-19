function renderTvPLayerBox(data,i) {
    var tvPlayerBox = el('div','tv-player-box')


    tvPlayerBox.append(renderTvPlayerTimeBox())
    tvPlayerBox.append(renderTvPlayerBottomBox())

    return tvPlayerBox

}

function renderTvPlayerTimeBox() {
    var tvPlayerTimeBox = el('div','tv-player-time-box')


    return tvPlayerTimeBox
}

function renderTvPlayerContentBox(data,i) {
    var playerContentBox = el('div','player-content-box')

    playerContentBox.append(renderPlayerContentVideoBox(data,i))
    playerContentBox.append(renderPlayerContentInfoBox(data,i))

    return playerContentBox

}

function renderPlayerContentVideoBox(data,i) {
    var playerContentVideoBox = el('div','player-content-video-box')
    var tvPlayerVideoBox = el('video','tv-player-video-box')

    tvPlayerVideoBox.onplaying = function () {
        liveTvVideoOnPlaying()
    }

    tvPlayerVideoBox.onwaiting = function() {
        liveTvVideoOnWaiting()
    };

    tvPlayerVideoBox.onclick = function () {
        this.pause()
    }

    tvPlayerVideoBox.setAttribute('autoplay',true)

    var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(tvPlayerVideoBox);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        tvPlayerVideoBox.src = videoSrc;
    }
    
    playerContentVideoBox.append(tvPlayerVideoBox)

    return playerContentVideoBox
}

function renderPlayerContentInfoBox(data,i) {
    var playerContentInfoBox = el('div','player-content-info-box')
    var playContentInfoNumberBox = el('div','player-content-info-number-box')
    var playerContentInfoPosterBox = el('div','player-content-info-poster-box')
    var channelInfoBox = el('div','channel-info-box')
    var channelInfoNameBox = el('div','channel-info-name-box')
    var channelInfoEpgBox = el('div','channel-info-epg-box')
    var currentEpg = el('div','current-epg')
    var nextEpg = el('div','next-epg')

    playContentInfoNumberBox.textContent = i
    data.stream_icon ? playerContentInfoPosterBox.style.backgroundImage = 'url('+ data.stream_icon + ')' : playerContentInfoPosterBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/logo.png)'
    channelInfoNameBox.textContent = data.name

    channelInfoEpgBox.append(currentEpg)
    channelInfoEpgBox.append(nextEpg)

    channelInfoBox.append(channelInfoNameBox)
    channelInfoBox.append(channelInfoEpgBox)

    playerContentInfoBox.append(playContentInfoNumberBox)
    playerContentInfoBox.append(playerContentInfoPosterBox)
    playerContentInfoBox.append(channelInfoBox)

    return playerContentInfoBox
}

function renderTvPlayerBottomBox() {
    var tvPlayerBottomBox = el('div','tv-player-bottom-box')

    for (var i = 0; i < liveTvPlayerBottomData.length; i++) {
        var tvPlayerBottomButtonBox = el('div','tv-player-bottom-button-box')
        var tvPlayerBottomButtonColorBox = el('div','tv-player-bottom-button-color-box')

        tvPlayerBottomButtonBox.textContent = liveTvPlayerBottomData[i].name
        tvPlayerBottomButtonBox.setAttribute('id',liveTvPlayerBottomData[i].id)
        tvPlayerBottomButtonColorBox.classList.add(liveTvPlayerBottomData[i].classList)

        tvPlayerBottomButtonBox.onclick = function () {
            tvPlayerButtonsClick(this.getAttribute('id'))
        }

        tvPlayerBottomButtonBox.append(tvPlayerBottomButtonColorBox)

        tvPlayerBottomBox.append(tvPlayerBottomButtonBox)
    }


    return tvPlayerBottomBox
}

function tvPlayerButtonsClick(id) {
    if (id === 'sort-btn') {
        
    }else if (id === 'categ-btn') {
        tvCategoriesTitleClick()

    }else if (id === 'favorit-btn') {
        liveFavoritButtonClick()
    }else if (id === 'menu-btn') {
        menuButtonClick()
    }
}

function sortButtonClick() {
    
}

function liveFavoritButtonClick() {
    if (channel.favorit) {
        liveChannels[channel.stream_id] = {favorit:false}
        channel.favorit = false
        for (var i = 0; i < liveTvFavorits.playlist.length; i++) {
            if (channel.stream_id === liveTvFavorits.playlist[i].stream_id) {
                liveTvFavorits.playlist.splice(i,1)
            }            
        }
        document.querySelectorAll("[id='"+channel.stream_id+"']")[0] ? document.querySelectorAll("[id='"+channel.stream_id+"']")[0].classList.remove('live-tv-favorit') : false
        localStorage.setItem('live-channels',JSON.stringify(liveChannels))
        if (controls.tvCategories.selectedCategories == 0) {
            id ? clearTimeout(id) : false
            document.querySelectorAll("[id='"+channel.stream_id+"']")[0].style.transform = 'translateX(-800px)'
            var id = setTimeout(() => {
                document.querySelectorAll("[id='"+channel.stream_id+"']")[0].remove()
                if (controls.select === controls.tvChannels) {
                    controls.tvCategories.ok()
                }
            }, 1000);
        }
    }else {
        liveChannels[channel.stream_id] = {favorit:true}
        channel.favorit = true
        liveTvFavorits.playlist.push(channel)
        document.querySelectorAll("[id='"+channel.stream_id+"']")[0] ? document.querySelectorAll("[id='"+channel.stream_id+"']")[0].classList.add('live-tv-favorit') : false
        localStorage.setItem('live-channels',JSON.stringify(liveChannels))
    }
}

function menuButtonClick() {
    document.getElementById('root').innerHTML = ''
    document.getElementById('root').append(renderLoadingPage())
}

function renderEpgTime(text) {
    var epgTime = el('span','epg-time')

    epgTime.textContent = text

    return epgTime
}

function renderLiveTvVideoLoading() {
    var videoLoadingEffect = el('div','video-loading-effect')

    videoLoadingEffect.append(renderLoading())

    if (document.querySelector('.player-content-video-box')) {
        document.querySelector('.player-content-video-box').append(videoLoadingEffect)
    }
}

function liveTvVideoOnPlaying() {
    if (document.querySelector('.video-loading-effect')) {
        document.querySelector('.video-loading-effect').remove()
    }
}

function liveTvVideoOnWaiting() {
    if (document.querySelector('.video-loading-effect')) {
        document.querySelector('.video-loading-effect').remove()
    }
    renderLiveTvVideoLoading()
}

function getLiveTvFavorits() {
    for (var i = 0; i < liveTvChannels.length; i++) {
        if (liveChannels[liveTvChannels[i].stream_id]) {
            if (liveChannels[liveTvChannels[i].stream_id].favorit) {
                liveTvChannels[i].favorit = liveChannels[liveTvChannels[i].stream_id].favorit
                liveTvFavorits.playlist.push(liveTvChannels[i])
            }
        }
        
    }
}