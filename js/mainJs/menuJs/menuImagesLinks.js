var moviesSeriesData = null

var infoUrl = null

var similiarContent = null

var clickedCard = null

var moviesCategories = null

var moviesSeriesStreams = null

var isAnimated = false

var seriesData = []

var moviesData = []

var vodes = {

}

var series = {

}

var moviesCategoriesData = {}

var seriesCategoriesData = {}

if (localStorage.getItem('vods')) {
    vodes = JSON.parse(localStorage.getItem('vods'))
}

if (localStorage.getItem('series')) {
    series = JSON.parse(localStorage.getItem('series'))
}

var moviesStreams = null

var seriesCategories = null

var seriesStreams = null

var moviesFavorits = {
    category_name:'Movies Favorit',
    type:'favorit',
    playlist: [

    ]
}

var seriesFavorits = {
    category_name:'Series Favorit',
    type:'favorit',
    playlist: [

    ]
}

var reqUrl = 'http://kingtop10.net:7070/player_api.php?username=QATeamTest&password=jby2jccj'

var moviesInfoUrl = reqUrl + '&action=get_vod_info&vod_id='

var seriesInfoUrl = reqUrl + '&action=get_series_info&series_id='

var activeInputText = null

var cardInfo = null

var menuImagesLinks = [
    {
        url: 'monitor.png',
        name: 'Live Tv',
        type: 'live'
    },
    {
        url: 'video-play.png',
        name: 'Movies',
        type: 'movies'
    },
    {
        url: 'video-vertical.png',
        name: 'Series',
        type: 'series'
    },
    {
        url: 'setting-3.png',
        name: 'Settings',
        type: 'settings'
    }
]