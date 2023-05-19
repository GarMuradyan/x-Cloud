var videoDuration = null

var videoCurrentTime = null

var showPlay = false

var showControl = false

function renderMoviesVideo (data) {
    console.log(data);
    var link = 'http://kingtop10.net:7070/movie/QATeamTest/jby2jccj/' + data.stream_id + '.' + data.container_extension
    console.log(link);
    var moviesVideoPageBox = el('div', 'movies-video-page-box')
    var moviesVideoBox = el('video', 'movies-video-box')
    var showControlColorBox = el('div', 'show-control-color-box')

    moviesVideoBox.setAttribute('autoplay', true)
    moviesVideoBox.src = link

    if (data.continue) {
        moviesVideoBox.currentTime = data.continue
    }

    moviesVideoBox.onplaying = () => {
        moviesVideoOnPlaying()
    }

    moviesVideoBox.onwaiting = () => {
        moviesVideoOnWaiting(moviesVideoPageBox)
    }

    moviesVideoBox.onloadeddata = () => {
        moviesVideoOnLoadedData(moviesVideoBox)
    }

    moviesVideoBox.ontimeupdate = () => {
        moviesVideoOnTimeUpdate(moviesVideoBox, data)
    }

    moviesVideoBox.onclick = () => {
        showPlayPause(moviesVideoBox)
    }

    moviesVideoPageBox.append(moviesVideoBox)
    moviesVideoPageBox.append(showControlColorBox)
    moviesVideoPageBox.append(renderVideoProgres())
    moviesVideoPageBox.append(renderVideoSettingsBox())
    moviesVideoPageBox.append(renderVideoSettingsMenuBox())

    return moviesVideoPageBox
}

function moviesVideoOnLoadedData (elem) {
    if (document.querySelector('.progres-line-box')) {
        videoDuration = new Date(elem.duration * 1000).toISOString().slice(14, 19)
        document.getElementsByClassName('video-duration-time')[0].textContent = videoDuration
    }
}

function moviesVideoOnTimeUpdate (elem, data) {
    if (document.querySelector('.progres-line-box')) {
        data.continue = elem.currentTime
        data.progresDuration = (data.continue / elem.duration) * 100 + '%'
        document.querySelector('.progres-line-box').style.width = (elem.currentTime / elem.duration) * 100 + '%'
        videoCurrentTime = new Date(elem.currentTime * 1000).toISOString().slice(14, 19)
        document.getElementsByClassName('video-current-time')[0].textContent = videoCurrentTime
        if (videoCurrentTime === videoDuration) {
            elem.pause()
        }
    }
}

function moviesVideoOnWaiting (elem) {
    document.querySelector('.movies-video-loading-box') ? document.querySelector('.movies-video-loading-box').remove() : false
    elem.append(renderMoviesVideoLoading())
}

function moviesVideoOnPlaying () {
    if (document.querySelector('.movies-video-on-playing-box')) {
        document.querySelector('.movies-video-on-playing-box').remove()
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
    var moviesVideoOnPlayingBox = el('div', 'movies-video-on-playing-box')

    moviesVideoOnPlayingBox.append(renderLoading())

    return moviesVideoOnPlayingBox
}

function showPlayPause (video) {

    if (showPlay) {
        showPlay = false
        video.play()
    } else {
        video.pause()
        showPlay = true
        openControl()
    }
}

function openControl () {
    var controlElem = document.querySelector('.video-progres-box')
    var colorBox = document.querySelector('.video-progres-box')
    var settingsBox = document.querySelector('.video-settings-box')

    if (showControl) {
        false
    } else {
        showControl = true
        controlElem.classList.add('show-control')
        colorBox.classList.add('color-box')
        settingsBox.classList.add('settings-opacity')
        controls.select = controls.moviesVideoTimeLine
        controls.select.addActive()
    }
}

function hideControl () {
    var controlElem = document.querySelector('.video-progres-box')
    var colorBox = document.querySelector('.video-progres-box')
    var settingsBox = document.querySelector('.video-settings-box')

    if (showControl) {
        showControl = false
        controlElem.classList.remove('show-control')
        colorBox.classList.remove('color-box')
        settingsBox.classList.remove('settings-opacity')
    } else {
        false
    }
}