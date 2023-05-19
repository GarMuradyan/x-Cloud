function renderButton(className,text,classList,data) {
    var buttonBox = el('button',className)

    buttonBox.textContent = text
    buttonBox.classList.add(classList)

    buttonBox.onclick = function () {
        buttonClick(this,data)
    }

    return buttonBox
}

function buttonClick(elem,data) {
    if (elem.classList.contains('login-button')) {
        loginButtonClick(elem)

    }

    if (elem.classList.contains('play')) {
        playButtonClick(data)
    }

    if (elem.classList.contains('favorit-btn')) {
        favoritButtonClick(data)
    }
}

function favoritButtonClick(data) {

    if (season.length) {
        seriesFavoritClick(data)
    }else {
        moviesFavoritClick(data)
    }

}

function seriesFavoritClick(data) {
    var id = data.series_id

    if (data.favorit) {
        data.favorit = false
        for (var i = 0; i < seriesFavorits.playlist.length; i++) {
            if (seriesFavorits.playlist[i] === data) {
                seriesFavorits.playlist.splice(i,1)
            }            
        }
        series[id] = {favorit:false}
        localStorage.setItem('series',JSON.stringify(series))
        for (var i = 0; i < document.querySelectorAll("[id='"+id+"']").length; i++) {
            if (document.querySelectorAll("[id='"+id+"']")[i].getElementsByClassName('movies-page-favorit-box')[0]) {
                document.querySelectorAll("[id='"+id+"']")[i].getElementsByClassName('movies-page-favorit-box')[0].remove()
            }
        }
    }else {
        data.favorit = true
        seriesFavorits.playlist.push(data)
        series[id] = {favorit:true}
        localStorage.setItem('series',JSON.stringify(series))
        for (var i = 0; i < document.querySelectorAll("[id='"+id+"']").length; i++) {
            if (!document.querySelectorAll("[id='"+id+"']")[i].getAttribute('type')) {
                document.querySelectorAll("[id='"+id+"']")[i].append(renderMoviesPageFavoritBox(clickedCard))
            }
        }
    }


}

function moviesFavoritClick(data) {
    
    var id = data.stream_id

    if (data.favorit) {
        data.favorit = false
        for (var i = 0; i < moviesFavorits.playlist.length; i++) {
            if (moviesFavorits.playlist[i] === data) {
                moviesFavorits.playlist.splice(i,1)
            }            
        }
        vodes[id] = {favorit:false}
        localStorage.setItem('vods',JSON.stringify(vodes))
        for (var i = 0; i < document.querySelectorAll("[id='"+id+"']").length; i++) {
            if (document.querySelectorAll("[id='"+id+"']")[i].getElementsByClassName('movies-page-favorit-box')[0]) {
                document.querySelectorAll("[id='"+id+"']")[i].getElementsByClassName('movies-page-favorit-box')[0].remove()
            }
        }
    }else {
        data.favorit = true
        moviesFavorits.playlist.push(data)
        vodes[id] = {favorit:true}
        localStorage.setItem('vods',JSON.stringify(vodes))
        for (var i = 0; i < document.querySelectorAll("[id='"+id+"']").length; i++) {
            if (!document.querySelectorAll("[id='"+id+"']")[i].getAttribute('type')) {
                document.querySelectorAll("[id='"+id+"']")[i].append(renderMoviesPageFavoritBox(clickedCard))
            }
        }
    }


}

function getMoviesFavorits() {
    for (var i = 0; i < moviesStreams.length; i++) {
        var vod = moviesStreams[i]

        if (vodes[vod.stream_id]) {
            if (vodes[vod.stream_id].favorit) {
                vod.favorit = vodes[vod.stream_id].favorit
                moviesFavorits.playlist.push(vod)
            }
        }
    }

    moviesFavorits.playlist.length ? moviesData.unshift(moviesFavorits) : false
}

function getSeriesFavorits() {
    for (var i = 0; i < seriesStreams.length; i++) {
        var serie = seriesStreams[i]

        if (series[serie.series_id]) {
            if (series[serie.series_id].favorit) {
                serie.favorit = series[serie.series_id].favorit
                seriesFavorits.playlist.push(serie)
            }
        }
    }

    seriesFavorits.playlist.length ? seriesData.unshift(seriesFavorits) : false
}

function playButtonClick(data) {
    cardInfo = data
    if (data.episodes) {
        
    }else {
        document.querySelector('.movies-card-info-page').classList.add('popup-display')
        document.getElementById('root').append(renderMoviesVideoOnPlaying())
        controls.select = controls.moviesVideoLoad
        document.getElementById('root').append(renderMoviesVideo(clickedCard))
    }
}

function loginButtonClick(elem) {
    if (document.querySelector('.login-load')) {
        document.querySelector('.login-load').remove()
    }
    var loginLoad = el('div','login-load')
    
    loginLoad.append(renderLoading())

    elem.append(loginLoad)

    removeLoginPageInputsActive()
    
    if (document.querySelector('.keyboard-box')) {
        document.querySelector('.keyboard-box').remove()
    }
    
    if (controls.privius === controls.login) {
        controls.select = controls.privius
        controls.select.addActive()
    }

    var elems = document.getElementsByClassName('content-inputs-items-box')

    if (elems[0].value === "") {
        if (elems[1].value === "") {
            if (elems[2].value === '') {
                localStorage.setItem('page','menu')
                controls.select = controls.menu
                setTimeout(() => {
                    document.getElementById('root').innerHTML = ''
                    document.getElementById('root').append(renderMenu())
                    controls.select.index = 0
                    controls.select.addActive()
                }, 4000);

                return

            }
        }
    }
    loginError()
}

function loginError() {
    if (document.querySelector('.error')) {
        document.querySelector('.error').remove()
    }
    var error = el('div','error')
    error.textContent = 'invalid login or password'

    document.querySelector('.inputs-parent-box').append(error) 

    setTimeout(() => {
        if (document.querySelector('.login-load')) {
            document.querySelector('.login-load').remove()
        }
        
    }, 1500);

    setTimeout(() => {
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove()
        }
    }, 4000);
    
}