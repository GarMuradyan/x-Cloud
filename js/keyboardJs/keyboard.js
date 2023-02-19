var activeInput = null

var isUpperCase = false

var keyboard = englishKeyboard

function renderKeyboard(array) {
    var keyboardBox = el('div','keyboard-box')

    for (var i = 0; i < array.length; i++) {
        var keyboardRowsBox = el('div','keyboard-rows-box')

        keyboardBox.append(keyboardRowsBox)

        for (var j = 0; j < array[i].length; j++) {
            var keyboardRowsItemBox = el('div','keyboard-rows-item-box')

            keyboardRowsItemBox.textContent = array[i][j]

            keyboardRowsBox.append(keyboardRowsItemBox)

            keyboardItemIfElse(array[i][j],keyboardRowsItemBox)

            keyboardRowsItemBox.onclick = function () {
                keyboardItemClick(this,array)
            }

        }        
    }

    return keyboardBox
}

function keyboardItemIfElse(item,elem) {
    if (item === 'close') {
        elem.textContent = ''
        elem.classList.add('close')
    }

    if (item === 'shift') {
        elem.textContent = ''
        elem.classList.add('shift')
    }

    if (item === 'space') {
        elem.textContent = ''
        elem.classList.add('space')
    }

    if (item === '123') {
        elem.classList.add('width')
    }

    if (item === 'Clean') {
        elem.classList.add('width')
    }

    if (item === 'Done') {
        elem.classList.add('width')
    }

    if (item === 'Eng') {
        elem.classList.add('width')
    }
}

function keyboardItemClick(elem,array) {
    if (elem.textContent.length === 1) {
        activeInput.value+=elem.textContent
        showHideKeyboardItemActive(elem)
    }

    if (elem.textContent === 'Clean') {
        if (activeInput.value) {
            activeInput.value = ''
            showHideKeyboardItemActive(elem)
        }
    }

    if (elem.classList.contains('close')) {
        var x = activeInput.value.substring(0,activeInput.value.length-1)
        activeInput.value = x
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('space')) {
        activeInput.value+=' '
        showHideKeyboardItemActive(elem)
    }

    if (elem.classList.contains('shift')) {
        if (array === englishKeyboard) {
            if (isUpperCase) {
                lowerCase()
            }else {
                upperCase()
            }

            document.querySelector('.keyboard-box').remove()
            document.getElementById('root').append(renderKeyboard(englishKeyboard))
        }else if (array === numberKeyboard) {
            document.querySelector('.keyboard-box').remove()
            document.getElementById('root').append(renderKeyboard(numberKeyboard))
        }

        showHideKeyboardItemActive(elem)
        controls.select.removeClass()
        controls.select.firstActive()
    }

    if (elem.textContent === 'Done') {
        if (controls.privius === controls.login) {
            controls.privius.index+=1
            controls.privius.ok()
        }
        showHideKeyboardItemActive(elem)
    }

    if (elem.textContent === '123') {
        keyboard = numberKeyboard
        console.log('123');
        controls.select.removeClass()
        document.querySelector('.keyboard-box').remove()
        document.getElementById('root').append(renderKeyboard(numberKeyboard))
        controls.select.firstActive()

        showHideKeyboardItemActive(elem)
    }

    if (elem.textContent === 'Eng') {
        keyboard = englishKeyboard
        controls.select.removeClass()
        document.querySelector('.keyboard-box').remove()
        document.getElementById('root').append(renderKeyboard(englishKeyboard))
        controls.select.firstActive()

        showHideKeyboardItemActive(elem)
    }
}

function showHideKeyboardItemActive(elem) {
    setTimeout(() => {
        elem.classList.add('active-background')
    }, 100);
    elem.classList.remove('active-background')
}

function lowerCase() {
    isUpperCase = false
    for (var i = 0; i < englishKeyboard.length; i++) {
        for (var j = 0; j < englishKeyboard[i].length; j++) {
            if (englishKeyboard[i][j].length === 1) {
                englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleLowerCase()
            }
        }
    }
}

function upperCase() {
    isUpperCase = true
    for (var i = 0; i < englishKeyboard.length; i++) {
        for (var j = 0; j < englishKeyboard[i].length; j++) {
            if (englishKeyboard[i][j].length === 1) {
                englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleUpperCase()
            }
        }
    }
}