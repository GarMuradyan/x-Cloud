function renderMoviesCardInfo(data) {
    var moviesCardInfoPage = el('div','movies-card-info-page')
    var cardInfoAndPosterBox = el('div','card-info-and-poster-box')
    var cardInfoBackBox = el('div','card-info-back-box')


    cardInfoAndPosterBox.append(renderCardPosterBox(data))
    cardInfoAndPosterBox.append(renderCardInfoBox(data))

    cardInfoBackBox.append(renderBackButton())

    moviesCardInfoPage.append(cardInfoAndPosterBox)
    moviesCardInfoPage.append(cardInfoBackBox)

    return moviesCardInfoPage
}

function renderCardPosterBox(data) {
    var cardPosterBox = el('div','card-poster-box')
    var cardPoster = el('div','card-poter')
    var cardPosterPlayButtonBox = el('div','card-poster-play-button-box')

    cardPoster.style.backgroundImage = 'url(' + data.poster + ')'


    cardPosterPlayButtonBox.append(renderButton('card-poster-play-button','Play','play',data))

    cardPosterBox.append(cardPoster)
    cardPosterBox.append(cardPosterPlayButtonBox)

    return cardPosterBox
}

function renderCardInfoBox(data) {
    var cardInfoBox = el('div','card-info-box')
    var cardInfoNameBox = el('p','card-info-name-box')
    var cardInfoDescBox = el('p','card-info-desc-box')
    var cardInfoRatingAndDurationBox = el('div','card-info-rating-and-duration-box')
    var cardInfoSeasonBox = el('div','card-info-season-box') 
    var seasonTopBox = el('div','season-top-box')
    var seasonBottomBox = el('div','season-bottom-box')
    var seasonBottomContentBox = el('div','season-bottom-content-box')

    cardInfoNameBox.textContent = data.name
    cardInfoDescBox.textContent = data.description

    if (data.season) {
        for (var i = 0; i < data.season.length; i++) {
            seasonTopBox.append(renderSeasonCard(data.season[i].name,i,data))
        }
        for (var i = 0; i < data.season[0].seriesQuant.length; i++) {
            seasonBottomContentBox.append(renderSeasonEpisodesCard(data.season[0].seriesQuant[i]))
        }

        seasonBottomBox.append(seasonBottomContentBox)

        cardInfoSeasonBox.append(seasonTopBox)
        cardInfoSeasonBox.append(seasonBottomBox)
    }



    cardInfoRatingAndDurationBox.append(renderCardInfoRatingBox(data))
    cardInfoRatingAndDurationBox.append(renderCardInfoDurationBox(data))

    cardInfoBox.append(cardInfoNameBox)
    cardInfoBox.append(cardInfoDescBox)
    cardInfoBox.append(cardInfoRatingAndDurationBox)
    cardInfoBox.append(cardInfoSeasonBox)

    return cardInfoBox
}

function renderCardInfoRatingBox(data) {
    var cardInfoRatingBox = el('div','card-info-rating-box')

    cardInfoRatingBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/icons/favorite.png)'
    cardInfoRatingBox.textContent = data.rating

    return cardInfoRatingBox
}

function renderCardInfoDurationBox(data) {
    var cardInfoDurationBox = el('div','card-info-duration-box')
    var cardInfoDurationIcon = el('span','material-symbols-outlined')

    cardInfoDurationIcon.textContent = 'history_toggle_off'

    if (data.duration) {
        cardInfoDurationBox.textContent = data.duration

        cardInfoDurationBox.append(cardInfoDurationIcon)
    }

    return cardInfoDurationBox
}

function renderSeasonCard(name,i,data) {
    var seasonCardBox = el('div','season-card-box')
    
    seasonCardBox.textContent = name
    seasonCardBox.setAttribute('index',i)

    seasonCardBox.onclick =function () {
        seasonCardClick(data,this.getAttribute('index'))
    } 

    return seasonCardBox
}

function renderSeasonEpisodesCard(data) {
    var seasonEpisodeCardBox = el('div','season-episode-card-box')
    var seasonEpisodeCardPosterBox = el('div','season-episode-card-poster-box')
    var seasonEpisodeCardNameBox = el('div','season-episode-card-name-box')

    seasonEpisodeCardPosterBox.style.backgroundImage = 'url(' + data.poster + ')'
    seasonEpisodeCardNameBox.textContent = data.name

    seasonEpisodeCardBox.append(seasonEpisodeCardPosterBox)
    seasonEpisodeCardBox.append(seasonEpisodeCardNameBox)

    return seasonEpisodeCardBox
}

function seasonCardClick(data,num) {
    document.querySelector('.season-bottom-content-box').innerHTML = ''
    for (var i = 0; i < data.season[num].seriesQuant.length; i++) {
        document.querySelector('.season-bottom-content-box').append(renderSeasonEpisodesCard(data.season[num].seriesQuant[i]))
    }
}