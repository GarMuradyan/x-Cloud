
function renderVideoProgres () {
    var videoProgresBox = el('div', 'video-progres-box')

    videoProgresBox.append(renderVideoCurrentTime())
    videoProgresBox.append(renderVideoProgresLine())
    videoProgresBox.append(renderVideoDurationTime())

    return videoProgresBox

}

function renderVideoCurrentTime () {
    var videoCurrentTimeParent = el('div', 'video-current-time-parent')
    var videoCurrentTime = el('span', 'video-current-time')

    videoCurrentTimeParent.append(videoCurrentTime)

    return videoCurrentTimeParent
}

function renderVideoDurationTime () {
    var videoDurationTimeParent = el('div', 'video-duration-time-parent')
    var videoDurationTime = el('span', 'video-duration-time')

    videoDurationTimeParent.append(videoDurationTime)

    return videoDurationTimeParent
}

function renderVideoProgresLine () {
    var videoProgresLineBox = el('div', 'video-progres-line-box')
    var progresLineBox = el('div', 'progres-line-box')

    videoProgresLineBox.append(progresLineBox)

    return videoProgresLineBox
}