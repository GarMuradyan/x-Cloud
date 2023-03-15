function renderLiveTvSearchBox() {

    var liveTvSearchBox = el('div','live-tv-search-box')
    var liveTvSearchInputBox = el('div','live-tv-search-input-box')

    liveTvSearchBox.classList.add('translate-right')

    liveTvSearchInputBox.append(renderMenuesSearchBox())

    liveTvSearchBox.append(liveTvSearchInputBox)
    liveTvSearchBox.append(renderLiveTvKeyboard(liveTvData[1].playlist))

    return liveTvSearchBox
}

function renderLiveTvKeyboard(data) {
    var liveTvSearchKeyboardBox = el('div','live-tv-search-keyboard-box')

    liveTvSearchKeyboardBox.append(renderKeyboard(keyboard,data))


    return liveTvSearchKeyboardBox
}