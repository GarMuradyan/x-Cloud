function renderButton (className, text, classList, data) {
    var buttonBox = el('button', className)
    var favoritIcon = el('div', 'favorit-icon')

    buttonBox.textContent = text
    buttonBox.classList.add(classList)

    if (classList === 'favorit-btn') {
        data.favorit ? favoritIcon.style.backgroundImage = 'url(../../favorit.png)' : favoritIcon.style.backgroundImage = 'url(../../unfavorit.png)'

        buttonBox.append(favoritIcon)
    }

    buttonBox.onclick = function () {
        buttonClick(this, data, favoritIcon)
    }

    return buttonBox
}

function buttonClick (elem, data, favoritIcon) {
    if (elem.classList.contains('login-button')) {
        loginButtonClick(elem)

    }

    if (elem.classList.contains('play')) {
        playButtonClick(data)
    }

    if (elem.classList.contains('favorit-btn')) {
        favoritButtonClick(data, favoritIcon)
    }
}

function favoritButtonClick (data, favoritIcon) {

    if (season.length) {
        seriesFavoritClick(data, favoritIcon)
    } else {
        moviesFavoritClick(data, favoritIcon)
    }

}

function seriesFavoritClick (data, favoritIcon) {
    var id = data.series_id

    if (data.favorit) {
        data.favorit = false
        favoritIcon.style.backgroundImage = 'url(../../unfavorit.png)'
        for (var i = 0; i < seriesFavorits.playlist.length; i++) {
            if (seriesFavorits.playlist[i] === data) {
                seriesFavorits.playlist.splice(i, 1)
            }
        }
        if (series[id]) {
            series[id].favorit = false
        } else {
            series[id] = { favorit: false }
        }
        localStorage.setItem('series', JSON.stringify(series))
        for (var i = 0; i < document.querySelectorAll("[id='" + id + "']").length; i++) {
            if (document.querySelectorAll("[id='" + id + "']")[i].getElementsByClassName('movies-page-favorit-box')[0]) {
                document.querySelectorAll("[id='" + id + "']")[i].getElementsByClassName('movies-page-favorit-box')[0].remove()
            }
        }
    } else {
        data.favorit = true
        favoritIcon.style.backgroundImage = 'url(../../favorit.png)'
        seriesFavorits.playlist.push(data)
        if (series[id]) {
            series[id].favorit = true
        } else {
            series[id] = { favorit: true }
        }
        localStorage.setItem('series', JSON.stringify(series))
        for (var i = 0; i < document.querySelectorAll("[id='" + id + "']").length; i++) {
            if (!document.querySelectorAll("[id='" + id + "']")[i].getAttribute('type')) {
                document.querySelectorAll("[id='" + id + "']")[i].append(renderMoviesPageFavoritBox(clickedCard))
            }
        }
    }


}

function moviesFavoritClick (data, favoritIcon) {

    var id = data.stream_id

    if (data.favorit) {
        data.favorit = false
        favoritIcon.style.backgroundImage = 'url(../../unfavorit.png)'
        for (var i = 0; i < moviesFavorits.playlist.length; i++) {
            if (moviesFavorits.playlist[i] === data) {
                moviesFavorits.playlist.splice(i, 1)
            }
        }
        if (vodes[id]) {
            vodes[id].favorit = false
        } else {
            vodes[id] = { favorit: false }
        }
        localStorage.setItem('vods', JSON.stringify(vodes))
        for (var i = 0; i < document.querySelectorAll("[id='" + id + "']").length; i++) {
            if (document.querySelectorAll("[id='" + id + "']")[i].getElementsByClassName('movies-page-favorit-box')[0]) {
                document.querySelectorAll("[id='" + id + "']")[i].getElementsByClassName('movies-page-favorit-box')[0].remove()
            }
        }
    } else {
        data.favorit = true
        favoritIcon.style.backgroundImage = 'url(../../favorit.png)'
        moviesFavorits.playlist.push(data)
        if (vodes[id]) {
            vodes[id].favorit = true
        } else {
            vodes[id] = { favorit: true }
        }
        localStorage.setItem('vods', JSON.stringify(vodes))
        for (var i = 0; i < document.querySelectorAll("[id='" + id + "']").length; i++) {
            if (!document.querySelectorAll("[id='" + id + "']")[i].getAttribute('type')) {
                document.querySelectorAll("[id='" + id + "']")[i].append(renderMoviesPageFavoritBox(clickedCard))
            }
        }
    }


}

function getMoviesFavorits () {
    moviesFavorits.playlist.length ? moviesData.unshift(moviesFavorits) : false
}

function getSeriesFavorits () {
    seriesFavorits.playlist.length ? seriesData.unshift(seriesFavorits) : false
}

function playButtonClick (data) {
    cardInfo = data
    if (moviesSeriesData === seriesData) {

    } else {
        if (clickedCard.continue) {
            console.log('continue');
            if (document.querySelector('.info-continue-popup-parent-box')) {
                document.querySelector('.info-continue-popup-parent-box').remove()
            }
            controls.select.removeClass()

            document.getElementsByClassName('movies-card-info-page')[0].append(renderInfoContinuePopupBox(clickedCard))

            controls.select = controls.infoPopup
            controls.select.privius = controls.similiarList
            controls.select.addActive()
        } else {
            document.getElementsByClassName('movies-card-info-page')[0].classList.add('popup-display')
            document.getElementById('root').append(renderMoviesVideoOnPlaying())
            controls.select = controls.moviesVideoLoad
            document.getElementById('root').append(renderMoviesVideo(clickedCard))
        }
    }
}

function loginButtonClick (elem) {
    if (document.querySelector('.login-load')) {
        document.querySelector('.login-load').remove()
    }
    var loginLoad = el('div', 'login-load')

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
                localStorage.setItem('page', 'menu')
                page = 'menu'
                controls.select = controls.menu
                setTimeout(function () {
                    document.getElementById('root').innerHTML = ''
                    document.getElementById('root').append(renderMenu())
                    controls.select.addActive()
                }, 4000);

                return

            }
        }
    }
    loginError()
}

function loginError () {
    if (document.querySelector('.error')) {
        document.querySelector('.error').remove()
    }
    var error = el('div', 'error')
    error.textContent = 'invalid login or password'

    document.querySelector('.inputs-parent-box').append(error)

    setTimeout(function () {
        if (document.querySelector('.login-load')) {
            document.querySelector('.login-load').remove()
        }

    }, 1500);

    setTimeout(function () {
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove()
        }
    }, 4000);

}