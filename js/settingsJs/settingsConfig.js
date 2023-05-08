var liveLocked = {}

var moviesLocked = {}

var seriesLocked = {}

if (localStorage.getItem('live-locked')) {
    liveLocked = JSON.parse(localStorage.getItem('live-locked'))
}

if (localStorage.getItem('movies-locked')) {
    moviesLocked = JSON.parse(localStorage.getItem('movies-locked'))
}

if (localStorage.getItem('series-locked')) {
    seriesLocked = JSON.parse(localStorage.getItem('series-locked'))
}