function renderNextEpisodePopupBox () {
    var nextEpisodePopupBox = el('div', 'next-episode-popup-box')
    var nextEpisodePopupContentBox = el('div', 'next-episode-popup-content-box')
    var nextEpisodePopupTitleBox = el('div', 'next-episode-popup-title-box')
    var nextEpisodePosterBox = el('div', 'next-episode-poster-box')

    if (seasonEpisodes[controls.episodesLists.nextIndex + 1].info.movie_image) {
        nextEpisodePosterBox.style.backgroundImage = 'url(' + seasonEpisodes[controls.episodesLists.nextIndex + 1].info.movie_image + ')'
    } else {
        nextEpisodePosterBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/logo.png)'
    }

    nextEpisodePosterBox.onclick = function () {
        nextEpisodeClick()
    }

    nextEpisodePopupContentBox.append(nextEpisodePopupTitleBox)
    nextEpisodePopupContentBox.append(nextEpisodePosterBox)

    nextEpisodePopupBox.append(nextEpisodePopupContentBox)

    return nextEpisodePopupBox
}

function nextEpisodeClick () {
    if (controls.moviesVideo.item[0].currentTime >= controls.moviesVideo.item[0].duration - 20) {
        console.log('continue', selectedEpisode.continue);
        console.log('progresDuration', selectedEpisode.progresDuration);
        selectedEpisode.continue = 0
        selectedEpisode.progresDuration = 0
        console.log('20 sec ');
        console.log('continue', selectedEpisode.continue);
        console.log('progresDuration', selectedEpisode.progresDuration);
        console.log(selectedEpisode);
    }

    renderSeriesContinueWatched()

    document.querySelector('.movies-video-page-box').remove()
    document.getElementById('root').append(renderMoviesVideoOnPlaying())
    controls.select = controls.moviesVideoLoad
    selectedEpisode = seasonEpisodes[controls.episodesLists.nextIndex + 1]
    document.getElementById('root').append(renderMoviesVideo(seasonEpisodes[controls.episodesLists.nextIndex + 1]))
    controls.episodesLists.nextIndex++
    isNextEpisode = true
    showControl = false
    showPlay = false
}