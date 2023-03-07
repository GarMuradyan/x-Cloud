function renderTvPLayerBox(data,i) {
    var tvPlayerBox = el('div','tv-player-box')


    tvPlayerBox.append(renderTvPlayerTimeBox())
    tvPlayerBox.append(renderTvPlayerContentBox(data,i))

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

    tvPlayerVideoBox.setAttribute('autoplay',true)

    var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(tvPlayerVideoBox);
    }else if (tvPlayerVideoBox.canPlayType('application/vnd.apple.mpegurl')) {
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

function renderEpgTime(text) {
    var epgTime = el('span','epg-time')

    epgTime.textContent = text

    return epgTime
}