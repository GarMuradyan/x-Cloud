var season = []

var seasonEpisodes = null

var infoData = null

function renderMoviesCardInfo (data, similiarContent) {

    console.log(data);

    //season = []

    if (data.episodes) {
        season = null
        season = Object.values(data.episodes)
        seasonEpisodes = season[controls.seasonContent.index]
    }
    var moviesCardInfoPage = el('div', 'movies-card-info-page')
    var gradientBox = el('div', 'gradient-box')
    var style = moviesCardInfoPage.style
    console.log(style);

    if (data.info.backdrop_path) {
        if (data.info.backdrop_path.length) {
            console.log('backdrop');
            style.setProperty('--background', 'url(' + data.info.backdrop_path[0] + ')');
        }
        else if (data.info.movie_image) {
            console.log('movies-nkar');
            console.log(data.info.backdrop);
            style.setProperty('--background', 'url(' + data.info.movie_image + ')');
        }
    } else if (data.info.movie_image) {
        console.log('movies-nkar');
        console.log(data.info.backdrop);
        style.setProperty('--background', 'url(' + data.info.movie_image + ')');
    }

    console.log(season);

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
        cardInfoNameBox.textContent = 'Not Found'
    }

    cardInfoNameAndRatingBox.append(cardInfoNameBox)
    cardInfoNameAndRatingBox.append(cardInfoStarsBox)

    return cardInfoNameAndRatingBox
}

function renderCardInfoDescription (data) {
    var cardInfoDescriptionBox = el('div', 'card-info-description-box')
    var cardInfoDescription = el('div', 'card-info-description')

    data.info.plot ? cardInfoDescription.textContent = data.info.plot : cardInfoDescription.textContent = 'Not Found'

    cardInfoDescriptionBox.append(cardInfoDescription)

    return cardInfoDescriptionBox
}

function renderCardInfoDirectedAndDuration (data) {
    var cardInfoDirectedAndDurationBox = el('div', 'card-info-directed-and-duration-box')
    var cardInfoDirectedBox = el('div', 'card-info-directed-box')
    var cardInfoDurationBox = el('div', 'card-info-duration-box')

    data.info.director ? cardInfoDirectedBox.textContent = 'Directed by:' + data.info.director : cardInfoDirectedBox.textContent = 'Not Found'
    data.info.duration ? cardInfoDurationBox.textContent = 'Duration:' + data.info.duration : cardInfoDurationBox.textContent = 'Not Found'

    cardInfoDirectedAndDurationBox.append(cardInfoDirectedBox)
    cardInfoDirectedAndDurationBox.append(cardInfoDurationBox)

    return cardInfoDirectedAndDurationBox

}

function renderCardInfoButtons (data) {
    var cardInfoButtonsBox = el('div', 'card-info-buttons-box')

    cardInfoButtonsBox.append(renderButton('card-info-button', 'Play', 'play', data))
    cardInfoButtonsBox.append(renderButton('card-info-button', 'Watch trailer', 'trailer', data))
    cardInfoButtonsBox.append(renderButton('card-info-button', 'Favorit', 'favorit-btn' ,clickedCard))

    return cardInfoButtonsBox

}

function renderInfoCardBottomContent (data, similiarContent, season) {
    var infoCardBottomContent = el('div', 'info-card-bottom-content')

    if (season.length) {
        console.log('season');
        infoCardBottomContent.append(renderBottomEpisodesContent(seasonEpisodes))
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
        seasonCardBox.classList.add('selectid-sezon')
        console.log(seasonEpisodes);
        document.querySelector('.info-card-bottom-content').append(renderBottomEpisodesContent(seasonEpisodes))
        controls.select.removeClass()
        controls.select = controls.episodesLists
        controls.select.index = 0
        controls.select.start = 3
        controls.select.transIndex = 0
        controls.select.addActive()

    }

    seasonCardBox.textContent = 'Season ' + (i + 1)
    seasonCardBox.setAttribute('index', i)

    return seasonCardBox
}

function removeSelectidSezon() {
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

    for (var i = 0; i < 4; i++) {
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
    console.log(data);
    var episodeCardBox = el('div', 'episode-card-box')
    var episodeCardInfoBox = el('div', 'episode-card-info-box')
    var episodeCardInfoNumber = el('div', 'episode-card-info-number')
    var episodeCardInfoName = el('div', 'episode-card-info-name')
    var episodeCardInfoProgresBox = el('div', 'episode-card-info-progres-box')
    var episodeCardInfoProgresLineBox = el('div', 'episode-card-info-progres-line-box')

    if (data.info.movie_image) {
        episodeCardBox.style.backgroundImage = 'url(' + data.info.movie_image + ')'
    } else {
        episodeCardBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/logo.png)'
        episodeCardBox.style.backgroundSize = '40%'
    }

    data.progresDuration ? episodeCardInfoProgresLineBox.style.width = data.progresDuration : false
    episodeCardInfoNumber.textContent = 'Episode ' + data.episode_num
    episodeCardInfoName.textContent = data.title
    episodeCardBox.style.left = i * 499 + 'px'

    episodeCardBox.onclick = ()=> {
        episodeCardClick(data)
    }


    data.progresDuration ? episodeCardInfoProgresBox.append(episodeCardInfoProgresLineBox) : false

    episodeCardInfoBox.append(episodeCardInfoNumber)
    episodeCardInfoBox.append(episodeCardInfoName)
    data.progresDuration ? episodeCardInfoBox.append(episodeCardInfoProgresBox) : false

    episodeCardBox.append(episodeCardInfoBox)

    return episodeCardBox

}

function episodeCardClick(data) {
    console.log(data);
    document.getElementsByClassName('movies-card-info-page')[0].remove()
    document.getElementById('root').append(renderMoviesVideoOnPlaying())
    controls.select = controls.moviesVideoLoad
    document.getElementById('root').append(renderMoviesVideo(data))
}

