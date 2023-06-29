function renderSeriesContinueWatched () {
    if (episodes[selectedEpisode.id]) {
        console.log(selectedEpisode);
        episodes[selectedEpisode.id].continue = selectedEpisode.continue
        episodes[selectedEpisode.id].progresDuration = selectedEpisode.progresDuration
    } else {
        episodes[selectedEpisode.id] = { continue: selectedEpisode.continue, progresDuration: selectedEpisode.progresDuration }
    }
    localStorage.setItem('episodes', JSON.stringify(episodes))
    if (selectedEpisode.continue != 0 && selectedEpisode.progresDuration != 0) {
        console.log('renderSeriesContinueWatched');
        for (var i = 0; i < document.querySelectorAll("[id='" + selectedEpisode.id + "']").length; i++) {
            if (document.querySelectorAll("[id='" + selectedEpisode.id + "']")[i].getElementsByClassName('episode-card-info-progres-box')[0]) {
                document.querySelectorAll("[id='" + selectedEpisode.id + "']")[i].getElementsByClassName('episode-card-info-progres-box')[0].remove()
            }
            document.querySelectorAll("[id='" + selectedEpisode.id + "']")[i].append(renderEpisodeCardProgressBar(selectedEpisode))
        }
    } else {
        console.log('remove SeriesContinueWatched');
        for (var i = 0; i < document.querySelectorAll("[id='" + selectedEpisode.id + "']").length; i++) {
            if (document.querySelectorAll("[id='" + selectedEpisode.id + "']")[i].getElementsByClassName('episode-card-info-progres-box')[0]) {
                document.querySelectorAll("[id='" + selectedEpisode.id + "']")[i].getElementsByClassName('episode-card-info-progres-box')[0].remove()
            }
        }
    }
}

function getEpisodesContinue () {
    for (var i = 0; i < seasonEpisodes.length; i++) {
        if (episodes[seasonEpisodes[i].id]) {
            seasonEpisodes[i].continue = episodes[seasonEpisodes[i].id].continue
            seasonEpisodes[i].progresDuration = episodes[seasonEpisodes[i].id].progresDuration
        }
    }
}