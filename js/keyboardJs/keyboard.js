var activeInput = null

var isUpperCase = false

var keyboard = englishKeyboard

function renderKeyboard (array, data, classNmaes) {
    var keyboardBox = el('div', 'keyboard-box')

    for (var i = 0; i < array.length; i++) {
        var keyboardRowsBox = el('div', 'keyboard-rows-box')

        keyboardBox.append(keyboardRowsBox)

        for (var j = 0; j < array[i].length; j++) {
            var keyboardRowsItemBox = el('div', 'keyboard-rows-item-box')

            keyboardRowsItemBox.textContent = array[i][j]

            keyboardRowsBox.append(keyboardRowsItemBox)

            keyboardItemIfElse(array[i][j], keyboardRowsItemBox, classNmaes)

            keyboardRowsItemBox.onclick = function () {
                keyboardItemClick(this, array, data)
            }

        }
    }

    return keyboardBox
}

function keyboardItemIfElse (item, elem, classNmaes) {
    if (item.length === 1) {
        elem.classList.add(classNmaes[2])
    }

    if (item === 'close') {
        elem.textContent = ''
        elem.classList.add('close')
        elem.classList.add(classNmaes[2])
    }

    if (item === 'shift') {
        elem.textContent = ''
        elem.classList.add('shift')
        elem.classList.add(classNmaes[2])
    }

    if (item === 'space') {
        elem.textContent = ''
        elem.classList.add(classNmaes[1])
    }

    if (item === '123') {
        elem.classList.add(classNmaes[0])
        elem.classList.add('num')
    }

    if (item === 'Clean') {
        elem.classList.add(classNmaes[0])
        elem.classList.add('clean')
    }

    if (item === 'Done') {
        elem.classList.add(classNmaes[0])
        elem.classList.add('done')
    }

    if (item === 'Eng') {
        elem.classList.add(classNmaes[0])
        elem.classList.add('eng')
    }
}

function keyboardItemClick (elem, array, data) {
    if (elem.textContent.length === 1) {
        activeInput.value += elem.textContent
        activeInputText = activeInput.value
        if (data) {
            keyboardSearchingClick(data)
        }
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('clean')) {
        if (activeInput.value) {
            activeInput.value = ''
            activeInputText = activeInput.value
        }
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('close')) {
        var x = activeInput.value.substring(0, activeInput.value.length - 1)
        activeInput.value = x
        activeInputText = activeInput.value
        if (data) {
            keyboardSearchingClick(data)
        }
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('space') || elem.classList.contains('liveTvSpace')) {
        console.log('space');
        activeInput.value += ' '
        activeInputText = activeInput.value
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('shift')) {
        shiftClick(elem, array, data)
    }

    if (elem.classList.contains('done')) {
        doneClick(elem, array, data)
    }

    if (elem.classList.contains('num')) {
        numberClick(elem, array, data)
    }

    if (elem.classList.contains('eng')) {
        engClick(elem, array, data)
    }
}

function keyboardSearchingClick (data) {
    if (document.querySelector('.live-tv-page-box')) {
        renderLiveTvSearching(data)
    }
    if (document.querySelector('.movies-series-search-page')) {
        renderFilmsSearching(data, infoUrl)
    }
    if (document.querySelector('.view-more-page-box')) {
        renderViewMoreSearching(data)
    }
}

function shiftClick (elem, array, data) {
    if (array === englishKeyboard) {
        if (isUpperCase) {
            lowerCase()
        } else {
            upperCase()
        }
        if (document.querySelector('.login-page-box')) {
            document.querySelector('.absolute-box').remove()
            document.getElementById('root').append(renderAbsoluteBox())
        }
        if (document.querySelector('.movies-series-search-page')) {
            document.querySelector('.keyboard-absolute-box').remove()
            document.getElementById('root').append(renderKyeboardAbsolute(data))
        }
        if (document.querySelector('.live-tv-page-box')) {
            document.querySelector('.live-tv-search-keyboard-box').remove()
            document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data, array))
        }
        if (document.querySelector('.view-more-page-box')) {
            document.querySelector('.view-more-keyboard').remove()
            document.querySelector('.view-more-page-box').append(renderViewMoreKeyboard(data, array))
            document.querySelector('.view-more-keyboard').classList.add('keyboard-translate')
        }

    } else if (array === numberKeyboard) {
        if (document.querySelector('.login-page-box')) {
            document.querySelector('.absolute-box').remove()
            document.getElementById('root').append(renderAbsoluteBox())
        }
        if (document.querySelector('.movies-series-search-page')) {
            document.querySelector('.keyboard-absolute-box').remove()
            document.getElementById('root').append(renderKyeboardAbsolute(data))
        }
        if (document.querySelector('.live-tv-page-box')) {
            document.querySelector('.live-tv-search-keyboard-box').remove()
            document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data, array))
        }
        if (document.querySelector('.view-more-page-box')) {
            document.querySelector('.view-more-keyboard').remove()
            document.querySelector('.view-more-page-box').append(renderViewMoreKeyboard(data, array))
            document.querySelector('.view-more-keyboard').classList.add('keyboard-translate')
        }
    }

    showHideKeyboardItemActive(elem)
    controls.select.removeClass()
    controls.select.firstActive()
}

function doneClick (elem, array, data) {
    if (document.querySelector('.login-page-box')) {
        controls.privius.index += 1
        controls.privius.ok()
    }
    if (document.querySelector('.movies-series-search-page')) {
        if (document.querySelector('.search-list-content-box').getElementsByClassName('card-name-box').length) {
            controls.select.removeClass()
            controls.select = controls.searchLists
            controls.select.addActive()
            controls.select.listTransX()
        } else {
            controls.select = controls.back
            controls.select.addActive()
        }
    }
    if (document.querySelector('.live-tv-page-box')) {
        liveTvSearchBack()

    }
    if (document.querySelector('.view-more-page-box')) {
        if (document.querySelector('.view-more-movies-content-box').getElementsByClassName('view-more-movies-lists-box').length) {
            controls.select = controls.viewMore
            controls.select.addActive()
        } else {
            controls.select = controls.back
            controls.select.addActive()
        }
        document.querySelector('.view-more-keyboard').classList.remove('keyboard-translate')
    }
    //showHideKeyboardItemActive(elem)
}

function numberClick (elem, array, data) {
    keyboard = numberKeyboard
    if (document.querySelector('.login-page-box')) {
        document.querySelector('.absolute-box').remove()
        document.getElementById('root').append(renderAbsoluteBox())
    }
    if (document.querySelector('.movies-series-search-page')) {
        document.querySelector('.keyboard-absolute-box').remove()
        document.getElementById('root').append(renderKyeboardAbsolute(data))
    }
    if (document.querySelector('.live-tv-page-box')) {
        document.querySelector('.live-tv-search-keyboard-box').remove()
        document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data, keyboard))
    }
    if (document.querySelector('.view-more-page-box')) {
        document.querySelector('.view-more-keyboard').remove()
        document.querySelector('.view-more-page-box').append(renderViewMoreKeyboard(data, keyboard))
        document.querySelector('.view-more-keyboard').classList.add('keyboard-translate')
    }

    controls.select.removeClass()
    controls.select.firstActive()

    showHideKeyboardItemActive(elem)
}

function engClick (elem, array, data) {
    keyboard = englishKeyboard
    if (document.querySelector('.login-page-box')) {
        document.querySelector('.absolute-box').remove()
        document.getElementById('root').append(renderAbsoluteBox())
    }

    if (document.querySelector('.movies-series-search-page')) {
        document.querySelector('.keyboard-absolute-box').remove()
        document.getElementById('root').append(renderKyeboardAbsolute(data))
    }
    if (document.querySelector('.live-tv-page-box')) {
        document.querySelector('.live-tv-search-keyboard-box').remove()
        document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data, keyboard))
    }
    if (document.querySelector('.view-more-page-box')) {
        document.querySelector('.view-more-keyboard').remove()
        document.querySelector('.view-more-page-box').append(renderViewMoreKeyboard(data, keyboard))
        document.querySelector('.view-more-keyboard').classList.add('keyboard-translate')
    }

    controls.select.removeClass()
    controls.select.firstActive()

    showHideKeyboardItemActive(elem)
}

function showHideKeyboardItemActive (elem) {
    setTimeout(() => {
        elem.classList.add('keyboard-active')
    }, 100);
    elem.classList.remove('keyboard-active')
}

function lowerCase () {
    isUpperCase = false
    for (var i = 0; i < englishKeyboard.length; i++) {
        for (var j = 0; j < englishKeyboard[i].length; j++) {
            if (englishKeyboard[i][j].length === 1) {
                englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleLowerCase()
            }
        }
    }
}

function upperCase () {
    isUpperCase = true
    for (var i = 0; i < englishKeyboard.length; i++) {
        for (var j = 0; j < englishKeyboard[i].length; j++) {
            if (englishKeyboard[i][j].length === 1) {
                englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleUpperCase()
            }
        }
    }
}
