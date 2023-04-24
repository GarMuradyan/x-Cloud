function localStorageSetItemMenuesData(seriesData,moviesData) {
    localStorage.setItem('movies-categories',JSON.stringify(moviesData))
    localStorage.setItem('series-categories',JSON.stringify(seriesData))
}