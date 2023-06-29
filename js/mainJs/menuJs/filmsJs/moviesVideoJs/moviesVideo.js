var videoDuration = null

var videoCurrentTime = null

var showPlay = false

var showControl = false

var isNextEpisode = true

function renderMoviesVideo (data) {
    console.log(data);
    var id = null
    var type = null

    if (data.stream_id) {
        id = data.stream_id
        type = 'movie'
    } else if (data.id) {
        id = data.id
        type = 'series'
    }

    var link = 'http://diblax.spartacus.site/' + type + '/WOYQyy5YzT/2WawEOAw0d/' + id + '.' + data.container_extension
    console.log(link);
    var moviesVideoPageBox = el('div', 'movies-video-page-box')
    var moviesVideoBox = el('video', 'movies-video-box')
    var showControlColorBox = el('div', 'show-control-color-box')

    moviesVideoBox.setAttribute('autoplay', true)
    moviesVideoBox.src = link

    if (data.continue) {
        moviesVideoBox.currentTime = data.continue
    }

    moviesVideoBox.onplaying = function () {
        moviesVideoOnPlaying()
    }

    moviesVideoBox.onwaiting = function () {
        moviesVideoOnWaiting(moviesVideoPageBox)
    }

    moviesVideoBox.onloadeddata = function () {
        moviesVideoOnLoadedData(moviesVideoBox)
    }

    moviesVideoBox.ontimeupdate = function () {
        moviesVideoOnTimeUpdate(moviesVideoBox, data)
    }

    moviesVideoBox.onclick = function (e) {
        showPlayPause(moviesVideoBox, e)
    }

    moviesVideoPageBox.append(renderMoviesVideoPlayPause())

    moviesVideoPageBox.append(moviesVideoBox)
    moviesVideoPageBox.append(showControlColorBox)
    moviesVideoPageBox.append(renderVideoProgres())
    moviesVideoPageBox.append(renderVideoSettingsBox())
    moviesVideoPageBox.append(renderVideoSettingsMenuBox())

    return moviesVideoPageBox
}

function moviesVideoOnEnded (elem) {
    if (moviesSeriesData === seriesData) {
        console.log('next-episode');
        console.log(elem);
        if (seasonEpisodes[controls.episodesLists.nextIndex + 1]) {
            elem.append(renderNextEpisodePopupBox())
        }
    } else if (moviesSeriesData === moviesData) {
        console.log('next-movie');
    }
}

function renderMoviesVideoPlayPause () {
    var moviesVideoPlayPauseBox = el('div', 'movies-video-play-pause-box')

    moviesVideoPlayPauseBox.style.backgroundImage = 'url(../../../../../play.png)'

    return moviesVideoPlayPauseBox
}

function moviesVideoOnLoadedData (elem) {
    if (infoData.info.duration) {
        document.getElementsByClassName('video-duration-time')[0] ? document.getElementsByClassName('video-duration-time')[0].textContent = infoData.info.duration : false
    } else if (document.querySelector('.progres-line-box')) {
        videoDuration = formatTime(elem.duration)
        document.getElementsByClassName('video-duration-time')[0].textContent = videoDuration
    }
}

function formatTime (seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    var formattedMinutes = String(minutes);
    if (formattedMinutes.length < 2) {
        formattedMinutes = '0' + formattedMinutes;
    }

    var formattedSeconds = String(remainingSeconds);
    if (formattedSeconds.length < 2) {
        formattedSeconds = '0' + formattedSeconds;
    }

    return formattedMinutes + ':' + formattedSeconds;

}

function moviesVideoOnTimeUpdate (elem, data) {
    if (document.querySelector('.progres-line-box')) {
        data.continue = elem.currentTime
        data.progresDuration = (data.continue / elem.duration) * 100 + '%'
        document.querySelector('.progres-line-box').style.width = (elem.currentTime / elem.duration) * 100 + '%'
        videoCurrentTime = formatTime(elem.currentTime)
        document.getElementsByClassName('video-current-time')[0].textContent = videoCurrentTime
        // if (elem.currentTime >= elem.duration - 20) {
        //     if (isNextEpisode) {
        //         console.log('ended 20 sec');
        //         moviesVideoOnEnded(document.querySelector('.movies-video-page-box'))
        //         isNextEpisode = false
        //     }
        // }
    }
}

function moviesVideoOnWaiting (elem) {
    var playPauseBox = document.querySelector('.movies-video-play-pause-box')

    playPauseBox.classList.remove('settings-opacity')

    console.log('wait');
    document.querySelector('.movies-video-loading-box') ? document.querySelector('.movies-video-loading-box').remove() : false
    elem.append(renderMoviesVideoLoading())
}

function moviesVideoOnPlaying () {
    if (document.querySelector('.movies-video-on-playing-parent-box')) {
        document.querySelector('.movies-video-on-playing-parent-box').remove()
        controls.select = controls.moviesVideo
        document.querySelector('.movies-video-page-box').classList.add('movies-video-display')
    }

    if (document.querySelector('.movies-video-loading-box')) {
        document.querySelector('.movies-video-loading-box').remove()
    }

}

function renderVideoSettingsBox () {
    var videoSettingsBox = el('div', 'video-settings-box')

    videoSettingsBox.onclick = function () {
        this.classList.remove('settings-opacity')
        document.querySelector('.video-settings-menu-box').classList.add('settings-menu-animated')
    }

    videoSettingsBox.style.backgroundImage = 'url(Vector.png)'

    return videoSettingsBox
}

function renderVideoSettingsMenuBox () {

    var attributs = [{ type: 'letter-box', name: 'Letter box' }, { type: 'full-screen', name: 'Full screen' }]

    var videoSettingsMenuBox = el('div', 'video-settings-menu-box')
    var videoSettingsMenuTitleBox = el('div', 'video-settings-menu-title-box')
    var videoSettingsMenuItemsBox = el('div', 'video-settings-menu-items-box')

    videoSettingsMenuTitleBox.textContent = 'Display mode'

    for (var i = 0; i < attributs.length; i++) {
        var videoSettingsMenuItemBox = el('div', 'video-settings-menu-item-box')

        videoSettingsMenuItemBox.onclick = function () {

        }

        videoSettingsMenuItemBox.textContent = attributs[i].name
        videoSettingsMenuItemBox.setAttribute('type', attributs[i].type)

        videoSettingsMenuItemsBox.append(videoSettingsMenuItemBox)
    }

    videoSettingsMenuBox.append(videoSettingsMenuTitleBox)
    videoSettingsMenuBox.append(videoSettingsMenuItemsBox)

    return videoSettingsMenuBox
}

function renderMoviesVideoLoading () {
    var moviesVideoLoadingBox = el('div', 'movies-video-loading-box')

    moviesVideoLoadingBox.append(renderLoading())

    return moviesVideoLoadingBox
}


function renderMoviesVideoOnPlaying () {
    var moviesVideoOnPlayingParentBox = el('div', 'movies-video-on-playing-parent-box')
    var moviesVideoOnPlayingBox = el('div', 'movies-video-on-playing-box')

    moviesVideoOnPlayingBox.append(renderLoading())

    moviesVideoOnPlayingParentBox.append(moviesVideoOnPlayingBox)

    return moviesVideoOnPlayingParentBox
}

function showPlayPause (video, e) {

    e.preventDefault()

    var playPauseBox = document.querySelector('.movies-video-play-pause-box')

    if (showPlay) {
        showPlay = false
        video.play()
        playPauseBox.style.backgroundImage = 'url(../../../../../play.png)'
    } else {
        video.pause()
        showPlay = true
        openControl()
        playPauseBox.style.backgroundImage = 'url(../../../../../pause.png)'
    }
}

function openControl () {
    var controlElem = document.querySelector('.video-progres-box')
    var colorBox = document.querySelector('.video-progres-box')
    var settingsBox = document.querySelector('.video-settings-box')
    var playPauseBox = document.querySelector('.movies-video-play-pause-box')

    if (showControl) {
        false
    } else {
        showControl = true
        controlElem.classList.add('show-control')
        colorBox.classList.add('color-box')
        settingsBox.classList.add('settings-opacity')
        playPauseBox.classList.add('settings-opacity')
        controls.select = controls.moviesVideoTimeLine
        controls.select.addActive()
    }
}

function hideControl () {
    var controlElem = document.querySelector('.video-progres-box')
    var colorBox = document.querySelector('.video-progres-box')
    var settingsBox = document.querySelector('.video-settings-box')
    var playPauseBox = document.querySelector('.movies-video-play-pause-box')

    if (showControl) {
        showControl = false
        controlElem.classList.remove('show-control')
        colorBox.classList.remove('color-box')
        settingsBox.classList.remove('settings-opacity')
        playPauseBox.classList.remove('settings-opacity')
    } else {
        false
    }
}