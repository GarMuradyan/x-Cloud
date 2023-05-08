function localStorageSetItemMenuesData() {
    localStorage.setItem('live-locked',JSON.stringify(liveLocked))
    localStorage.setItem('movies-locked',JSON.stringify(moviesLocked))
    localStorage.setItem('series-locked',JSON.stringify(seriesLocked))
}