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
    playerContentInfoPosterBox.style.backgroundImage = 'url('+ data.poster + ')'
    channelInfoNameBox.textContent = data.name
    currentEpg.textContent = data.epg[0].desc
    nextEpg.textContent = data.epg[1].desc

    currentEpg.append(renderEpgTime(data.epg[0].time))
    nextEpg.append(renderEpgTime(data.epg[1].time))

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

    }else if (id === 'menu-btn') {
        menuButtonClick()
    }
}

function sortButtonClick() {
    
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
    console.log('play');
    if (document.querySelector('.video-loading-effect')) {
        document.querySelector('.video-loading-effect').remove()
    }
}

function liveTvVideoOnWaiting() {
    console.log("Wait!");
    if (document.querySelector('.video-loading-effect')) {
        document.querySelector('.video-loading-effect').remove()
    }
    renderLiveTvVideoLoading()
}