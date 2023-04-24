var videoDuration = null

var videoCurrentTime = null

var showPlay = false

var showControl = false

function renderMoviesVideo (data) {
    var moviesVideoPageBox = el('div', 'movies-video-page-box')
    var moviesVideoBox = el('video', 'movies-video-box')
    var showControlColorBox = el('div', 'show-control-color-box')

    moviesVideoBox.setAttribute('autoplay', true)

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
        moviesVideoOnTimeUpdate(moviesVideoBox)
    }

    moviesVideoBox.onclick = () => {
        showPlayPause(moviesVideoBox)
    }

    var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(moviesVideoBox);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        moviesVideoBox.src = videoSrc;
    }

    moviesVideoPageBox.append(moviesVideoBox)
    moviesVideoPageBox.append(showControlColorBox)
    moviesVideoPageBox.append(renderVideoProgres())

    return moviesVideoPageBox
}

function moviesVideoOnLoadedData (elem) {
    if (document.querySelector('.progres-line-box')) {
        videoDuration = new Date(elem.duration * 1000).toISOString().slice(14, 19)
        console.log(videoDuration);
        document.getElementsByClassName('video-duration-time')[0].textContent = videoDuration
    }
}

function moviesVideoOnTimeUpdate (elem) {
    if (document.querySelector('.progres-line-box')) {
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
    console.log('onplaying');
    if (document.querySelector('.movies-video-on-playing-box')) {
        document.querySelector('.movies-video-on-playing-box').remove()
        controls.select = controls.moviesVideo
        document.querySelector('.movies-video-page-box').classList.add('movies-video-display')
    }

    if (document.querySelector('.movies-video-loading-box')) {
        document.querySelector('.movies-video-loading-box').remove()
    }

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

    if (showControl) {
        false
    } else {
        showControl = true
        controlElem.classList.add('show-control')
        colorBox.classList.add('color-box')
        controls.select = controls.moviesVideoTimeLine
        controls.select.addActive()
    }
}

function hideControl () {
    var controlElem = document.querySelector('.video-progres-box')
    var colorBox = document.querySelector('.video-progres-box')

    if (showControl) {
        showControl = false
        controlElem.classList.remove('show-control')
        colorBox.classList.remove('color-box')
    } else {
        false
    }
}