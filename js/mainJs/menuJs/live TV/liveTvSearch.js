var searchArr = []

function renderLiveTvSearchBox () {
    keyboard = englishKeyboard
    var liveTvSearchBox = el('div', 'live-tv-search-box')
    var liveTvSearchInputBox = el('div', 'live-tv-search-input-box')

    liveTvSearchBox.classList.add('translate-right')

    liveTvSearchInputBox.append(renderMenuesSearchBox())

    liveTvSearchBox.append(liveTvSearchInputBox)
    liveTvSearchBox.append(renderLiveTvKeyboard(liveTvData[1].playlist, keyboard))

    return liveTvSearchBox
}

function renderLiveTvKeyboard (data, keyboard) {
    var liveTvSearchKeyboardBox = el('div', 'live-tv-search-keyboard-box')

    liveTvSearchKeyboardBox.append(renderKeyboard(keyboard, data, liveTvPage))


    return liveTvSearchKeyboardBox
}

function renderLiveTvSearching (data) {
    id ? clearTimeout(id) : false
    searchArr = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].name.indexOf(activeInput.value) !== -1) {
            searchArr.push(data[i])
        }
    }
    selectedCategoriChannels = searchArr

    var id = setTimeout(function () {
        renderLiveTvChannelsCards(searchArr)
        controls.tvChannels.firstActive()
    }, 600);

}

function liveTvSearchBack () {
    keyboard = englishKeyboard
    document.querySelector('.live-tv-search-keyboard-box').remove()
    document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(liveTvData[1].playlist, keyboard))
    if (document.querySelector('.live-tv-channels-content-box').getElementsByClassName('live-tv-channels-card-box').length) {
        document.querySelector('.live-tv-search-box').classList.add('translate-right')
        document.querySelector('.tv-player-box').classList.remove('translate-right')
        document.querySelector('.tv-player-video-box').play()
        controls.keyboard.removeClass()
        activeInput.value = ''
        controls.select = controls.tvChannels
        controls.select.ok()
    } else {
        document.querySelector('.live-tv-search-box').classList.add('translate-right')
        document.querySelector('.tv-player-box').classList.remove('translate-right')
        document.querySelector('.tv-player-video-box').play()
        controls.keyboard.removeClass()
        activeInput.value = ''
        controls.select = controls.tvCategories
        controls.select.index = 1
        controls.select.removeClass()
        controls.select.ok()
    }



}