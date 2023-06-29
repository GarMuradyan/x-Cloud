function renderMoviesContinueWatched () {
    if (vodes[clickedCard.stream_id]) {
        vodes[clickedCard.stream_id].continue = clickedCard.continue
        vodes[clickedCard.stream_id].progresDuration = clickedCard.progresDuration
    } else {
        vodes[clickedCard.stream_id] = { continue: clickedCard.continue, progresDuration: clickedCard.progresDuration }
    }
    localStorage.setItem('vods', JSON.stringify(vodes))
    for (var i = 0; i < document.querySelectorAll("[id='" + clickedCard.stream_id + "']").length; i++) {
        if (!document.querySelectorAll("[id='" + clickedCard.stream_id + "']")[i].getAttribute('type')) {
            if (document.querySelectorAll("[id='" + clickedCard.stream_id + "']")[i].getElementsByClassName('movies-progres-bar-box')[0]) {
                document.querySelectorAll("[id='" + clickedCard.stream_id + "']")[i].getElementsByClassName('movies-progres-bar-box')[0].remove()
            }
            document.querySelectorAll("[id='" + clickedCard.stream_id + "']")[i].append(renderMoviesProgresBar(clickedCard))
        }
    }
}