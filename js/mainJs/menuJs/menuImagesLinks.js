var moviesSeriesData = null

var infoUrl = null

var similiarContent = null

var moviesCategories = null

var seriesData = []

var moviesData = []

var moviesStreams = null

var seriesCategories = null

var seriesStreams = null

var reqUrl = 'https://xtream-ie.com/player_api.php?username=MYOWN1&password=Meins321'

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

if (localStorage.getItem('series-categories')) {
    console.log('seriesCategories');
    seriesCategories = (JSON.parse(localStorage.getItem('series-categories')))
}

if (localStorage.getItem('movies-categories')) {
    console.log('moviesCategories');
    moviesCategories = (JSON.parse(localStorage.getItem('movies-categories')))
}