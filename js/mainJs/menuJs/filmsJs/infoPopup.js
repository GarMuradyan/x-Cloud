function renderInfoContinuePopupBox (data) {
    var elemTypes = [{ type: 'continue', name: 'Continue' }, { type: 'play', name: 'Play' }, { type: 'cancel', name: 'Cancel' }]
    var infoContinuePopupParentBox = el('div', 'info-continue-popup-parent-box')
    var infoContinuePopupBox = el('div', 'info-continue-popup-box')

    for (var i = 0; i < elemTypes.length; i++) {
        var infoContinuePopupItemBox = el('div', 'info-continue-popup-item-box')

        infoContinuePopupItemBox.textContent = elemTypes[i].name
        infoContinuePopupItemBox.setAttribute('type', elemTypes[i].type)

        infoContinuePopupItemBox.onclick = function () {
            infoPopupItemClick(infoContinuePopupParentBox, this.getAttribute('type'), data)
        }

        infoContinuePopupBox.append(infoContinuePopupItemBox)
    }

    infoContinuePopupParentBox.append(infoContinuePopupBox)

    return infoContinuePopupParentBox

}

function infoPopupItemClick (elem, type, data) {
    if (type === 'continue') {
        infoContinueClick(data)
    } else if (type === 'play') {
        infoPlayClick(data)
    } else if (type === 'cancel') {
        InfoCancelClick()
    }
    elem.remove()
}

function infoContinueClick (data) {
    document.getElementsByClassName('movies-card-info-page')[0].classList.add('popup-display')
    document.getElementById('root').append(renderMoviesVideoOnPlaying())
    controls.select = controls.moviesVideoLoad
    document.getElementById('root').append(renderMoviesVideo(data))
}

function infoPlayClick (data) {
    console.log(data);
    data.continue = 0
    data.progresDuration = 0
    document.getElementsByClassName('movies-card-info-page')[0].classList.add('popup-display')
    document.getElementById('root').append(renderMoviesVideoOnPlaying())
    controls.select = controls.moviesVideoLoad
    document.getElementById('root').append(renderMoviesVideo(data))
}

function InfoCancelClick () {

    if (controls.infoPopup.privius === controls.episodesLists) {
        if (document.querySelector('.info-continue-popup-parent-box')) {
            document.querySelector('.info-continue-popup-parent-box').remove()
        }

        controls.select = controls.episodesLists
        controls.select.addActive()
    } else if (controls.infoPopup.privius === controls.similiarList) {
        if (document.querySelector('.info-continue-popup-parent-box')) {
            document.querySelector('.info-continue-popup-parent-box').remove()
        }

        controls.select = controls.similiarList
        controls.select.addActive()
    }
}