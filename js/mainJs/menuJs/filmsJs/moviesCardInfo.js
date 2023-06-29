var season = []

var selectedEpisode = null

var seasonEpisodes = null

var infoData = null

function renderMoviesCardInfo (data, similiarContent) {

    console.log(data);

    season = []

    if (data.episodes) {
        season = null
        season = Object.values(data.episodes)
        seasonEpisodes = season[controls.seasonContent.index]
        getEpisodesContinue()
    }
    var moviesCardInfoPage = el('div', 'movies-card-info-page')
    var gradientBox = el('div', 'gradient-box')
    var style = moviesCardInfoPage.style

    if (data.info.backdrop_path) {
        if (data.info.backdrop_path.length) {
            style.setProperty('--background', 'url(' + data.info.backdrop_path[0] + ')');
        }
        else if (data.info.movie_image) {
            style.setProperty('--background', 'url(' + data.info.movie_image + ')');
        }
    } else if (data.info.movie_image) {
        style.setProperty('--background', 'url(' + data.info.movie_image + ')');
    }


    moviesCardInfoPage.append(renderCardInfo(data))
    season.length ? moviesCardInfoPage.append(renderSeasonContent(data, season)) : false
    moviesCardInfoPage.append(renderInfoCardBottomContent(data, similiarContent, season))
    moviesCardInfoPage.append(gradientBox)

    return moviesCardInfoPage
}

function renderCardInfo (data) {
    var cardInfoBox = el('div', 'card-info-box')

    cardInfoBox.append(renderCardInfoNameAndRating(data))
    cardInfoBox.append(renderCardInfoDescription(data))
    cardInfoBox.append(renderCardInfoDirectedAndDuration(data))
    cardInfoBox.append(renderCardInfoButtons(data))

    return cardInfoBox
}

function renderCardInfoNameAndRating (data) {
    var cardInfoNameAndRatingBox = el('div', 'card-info-name-and-rating-box')
    var cardInfoNameBox = el('div', 'card-info-name-box')
    var cardInfoStarsBox = el('div', 'card-info-stars-box')

    for (var i = 0; i < parseInt(Math.ceil(data.info.rating_5based)); i++) {
        var cardInfoStar = el('img', 'card-info-star')

        cardInfoStar.src = 'Star 4.png'

        cardInfoStarsBox.append(cardInfoStar)
    }

    if (data.movie_data) {
        cardInfoNameBox.textContent = data.movie_data.name
    } else if (data.info.name) {
        cardInfoNameBox.textContent = data.info.name
    } else {
        cardInfoNameBox.textContent = ''
    }

    cardInfoNameAndRatingBox.append(cardInfoNameBox)
    cardInfoNameAndRatingBox.append(cardInfoStarsBox)

    return cardInfoNameAndRatingBox
}

function renderCardInfoDescription (data) {
    var cardInfoDescriptionBox = el('div', 'card-info-description-box')
    var cardInfoDescription = el('div', 'card-info-description')

    data.info.plot ? cardInfoDescription.textContent = data.info.plot : cardInfoDescription.textContent = ''

    cardInfoDescriptionBox.append(cardInfoDescription)

    return cardInfoDescriptionBox
}

function renderCardInfoDirectedAndDuration (data) {
    var cardInfoDirectedAndDurationBox = el('div', 'card-info-directed-and-duration-box')
    var cardInfoDirectedBox = el('div', 'card-info-directed-box')
    var cardInfoDurationBox = el('div', 'card-info-duration-box')

    data.info.director ? cardInfoDirectedBox.textContent = 'Directed by:' + data.info.director : cardInfoDirectedBox.textContent = ''
    data.info.duration ? cardInfoDurationBox.textContent = 'Duration:' + data.info.duration : cardInfoDurationBox.textContent = ''

    cardInfoDirectedAndDurationBox.append(cardInfoDirectedBox)
    cardInfoDirectedAndDurationBox.append(cardInfoDurationBox)

    return cardInfoDirectedAndDurationBox

}

function renderCardInfoButtons (data) {
    var cardInfoButtonsBox = el('div', 'card-info-buttons-box')

    cardInfoButtonsBox.append(renderButton('card-info-button', 'Play', 'play', data))
    cardInfoButtonsBox.append(renderButton('card-info-button', 'Watch trailer', 'trailer', data))
    cardInfoButtonsBox.append(renderButton('card-info-button', 'Favorite', 'favorit-btn', clickedCard))

    return cardInfoButtonsBox

}

function renderInfoCardBottomContent (data, similiarContent, season) {
    var infoCardBottomContent = el('div', 'info-card-bottom-content')

    if (season.length) {
        // infoCardBottomContent.append(renderBottomEpisodesContent(seasonEpisodes))
    } else {
        infoCardBottomContent.append(renderBottomSimiliarContent(similiarContent))
    }

    return infoCardBottomContent
}

function renderBottomSimiliarContent (data) {
    var bottomSimiliarContent = el('div', 'bottom-similiar-content')
    var similiarContentName = el('div', 'similiar-content-name')
    var similiarContentListBox = el('div', 'similiar-content-list-box')
    var similiarContentListContentBox = el('div', 'similiar-content-list-content-box')

    similiarContentName.textContent = 'Suggested movies'

    var count = 7;

    if (data.playlist) {
        if (count > data.playlist.length) count = data.playlist.length
    } else {
        if (count > data.length) count = data.length
    }

    if (data.playlist) {
        for (var i = 0; i < count; i++) {
            similiarContentListContentBox.append(renderListsCardBox(data.playlist[i], data, 0, infoUrl, i))
        }
    } else {
        for (var i = 0; i < count; i++) {
            similiarContentListContentBox.append(renderListsCardBox(data[i], data, 0, infoUrl, i))
        }
    }

    similiarContentListBox.append(similiarContentListContentBox)

    bottomSimiliarContent.append(similiarContentName)
    bottomSimiliarContent.append(similiarContentListBox)

    return bottomSimiliarContent
}

function renderSeasonContent (data, season) {
    var seasonContentParentBox = el('div', 'season-content-parent-box')
    var seasonListBox = el('div', 'season-list-box')
    var seasonListContentBox = el('div', 'season-list-content-box')

    for (var i = 0; i < season.length; i++) {
        seasonListContentBox.append(renderSeasonCard(i))
    }

    seasonListBox.append(seasonListContentBox)

    seasonContentParentBox.append(seasonListBox)

    return seasonContentParentBox
}

function renderSeasonCard (i) {
    var seasonCardBox = el('div', 'season-card-box')

    seasonCardBox.onclick = function () {
        removeSelectidSezon()
        seasonEpisodes = season[this.getAttribute('index')]
        getEpisodesContinue()
        seasonCardBox.classList.add('selectid-sezon')
        document.querySelector('.info-card-bottom-content').append(renderBottomEpisodesContent(seasonEpisodes))
        controls.select.removeClass()
        controls.select = controls.episodesLists
        controls.select.index = 0
        controls.select.start = 3
        controls.select.transIndex = 0
        controls.select.nextIndex = 0
        controls.select.addActive()

    }

    seasonCardBox.textContent = 'Season ' + (i + 1)
    seasonCardBox.setAttribute('index', i)

    return seasonCardBox
}

function removeSelectidSezon () {
    for (var i = 0; i < document.getElementsByClassName('season-card-box').length; i++) {
        document.getElementsByClassName('season-card-box')[i].classList.remove('selectid-sezon')

    }
}

function renderBottomEpisodesContent (seasonEpisodes) {
    document.querySelector('.bottom-episodes-content') ? document.querySelector('.bottom-episodes-content').remove() : false
    var bottomEpisodesContent = el('div', 'bottom-episodes-content')
    var episodesContentName = el('div', 'episodes-content-name')
    var episodesListBox = el('div', 'episodes-list-box')
    var episodesListContentBox = el('div', 'episodes-list-content-box')

    episodesContentName.textContent = 'Epizodes'

    for (var i = 0; i < seasonEpisodes.length; i++) {
        if (seasonEpisodes[i]) {
            episodesListContentBox.append(renderEpisodesCard(seasonEpisodes[i], i))
        }
    }

    episodesListBox.append(episodesListContentBox)

    bottomEpisodesContent.append(episodesContentName)
    bottomEpisodesContent.append(episodesListBox)

    return bottomEpisodesContent

}

function renderEpisodesCard (data, i) {
    var episodeCardBox = el('div', 'episode-card-box')
    var episodeCardPosterBox = el('img', 'episode-card-poster-box')
    var episodeCardInfoBox = el('div', 'episode-card-info-box')
    var episodeCardInfoNumber = el('div', 'episode-card-info-number')
    var episodeCardInfoName = el('div', 'episode-card-info-name')
    var img = new Image();

    img.src = data.info.movie_image

    episodeCardPosterBox.src = 'notFound.png'
    episodeCardPosterBox.style.width = '200px'
    episodeCardPosterBox.style.height = '200px'
    episodeCardPosterBox.style.objectFit = 'none'

    img.onload = function () {
        console.log('onload');
        episodeCardPosterBox.src = data.info.movie_image
        episodeCardPosterBox.style.width = '100%'
        episodeCardPosterBox.style.height = '100%'
        episodeCardPosterBox.style.objectFit = 'cover'
    }

    img.onerror = function () {
        console.log('onerror');
        episodeCardPosterBox.src = 'notFound.png'
        episodeCardPosterBox.style.width = '200px'
        episodeCardPosterBox.style.height = '200px'
        episodeCardPosterBox.style.objectFit = 'none'
    }
    episodeCardInfoNumber.textContent = 'Episode ' + data.episode_num
    episodeCardInfoName.textContent = data.title
    episodeCardBox.style.left = i * 499 + 'px'
    episodeCardInfoBox.setAttribute('id', data.id)
    episodeCardBox.setAttribute('index', i)

    episodeCardBox.onclick = function () {
        episodeCardClick(this.getAttribute('index'), data)
    }

    episodeCardInfoBox.append(episodeCardInfoNumber)
    episodeCardInfoBox.append(episodeCardInfoName)
    data.continue ? episodeCardInfoBox.append(renderEpisodeCardProgressBar(data)) : false

    episodeCardBox.append(episodeCardPosterBox)
    episodeCardBox.append(episodeCardInfoBox)

    return episodeCardBox

}

function renderEpisodeCardProgressBar (data) {
    var episodeCardInfoProgresBox = el('div', 'episode-card-info-progres-box')
    var episodeCardInfoProgresLineBox = el('div', 'episode-card-info-progres-line-box')

    data.progresDuration ? episodeCardInfoProgresLineBox.style.width = data.progresDuration : false

    data.progresDuration ? episodeCardInfoProgresBox.append(episodeCardInfoProgresLineBox) : false

    return episodeCardInfoProgresBox
}

function episodeCardClick (index, data) {
    selectedEpisode = data
    isNextEpisode = true
    showControl = false
    showPlay = false
    console.log(data, selectedEpisode);
    if (data.continue) {
        console.log('continue');
        if (document.querySelector('.info-continue-popup-parent-box')) {
            document.querySelector('.info-continue-popup-parent-box').remove()
        }
        controls.select.removeClass()

        document.getElementsByClassName('movies-card-info-page')[0].append(renderInfoContinuePopupBox(data))

        controls.select = controls.infoPopup
        controls.select.privius = controls.episodesLists
        controls.select.firstActive()
    } else {
        document.getElementsByClassName('movies-card-info-page')[0].classList.add('popup-display')
        document.getElementById('root').append(renderMoviesVideoOnPlaying())
        controls.select = controls.moviesVideoLoad
        document.getElementById('root').append(renderMoviesVideo(data))
    }
}

