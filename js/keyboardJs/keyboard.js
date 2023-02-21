var activeInput = null

var isUpperCase = false

var keyboard = englishKeyboard

function renderKeyboard(array,data) {
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
                keyboardItemClick(this,array,data)
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

function keyboardItemClick(elem,array,data) {
    if (elem.textContent.length === 1) {
        activeInput.value+=elem.textContent
        showHideKeyboardItemActive(elem)
        if (data) {
            console.log(data);
        }
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
        shiftClick(elem,array,data)
    }

    if (elem.textContent === 'Done') {
        doneClick(elem,array,data)
    }

    if (elem.textContent === '123') {
        numberClick(elem,array,data)
    }

    if (elem.textContent === 'Eng') {
        engClick(elem,array,data)
    }
}

function shiftClick(elem,array,data) {
    if (array === englishKeyboard) {
        if (isUpperCase) {
            lowerCase()
        }else {
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
        
    }else if (array === numberKeyboard) {
        if (document.querySelector('.login-page-box')) {
            document.querySelector('.absolute-box').remove()
            document.getElementById('root').append(renderAbsoluteBox())
        }
        if (document.querySelector('.movies-series-search-page')) {
            document.querySelector('.keyboard-absolute-box').remove()
            document.getElementById('root').append(renderKyeboardAbsolute(data))
        }
    }

    showHideKeyboardItemActive(elem)
    controls.select.removeClass()
    controls.select.firstActive()
}

function doneClick(elem,array,data) {
    if (document.querySelector('.login-page-box')) {
        controls.privius.index+=1
        controls.privius.ok()
    }
    if (document.querySelector('.movies-series-search-page')) {
        console.log('done');
    }
    showHideKeyboardItemActive(elem)
}

function numberClick(elem,array,data) {
    if (document.querySelector('.login-page-box')) {
        keyboard = numberKeyboard
        document.querySelector('.absolute-box').remove()
        document.getElementById('root').append(renderAbsoluteBox())
    }
    if (document.querySelector('.movies-series-search-page')) {
        keyboard = numberKeyboard
        document.querySelector('.keyboard-absolute-box').remove()
        document.getElementById('root').append(renderKyeboardAbsolute(data))
    }

    controls.select.removeClass()
    controls.select.firstActive()

    showHideKeyboardItemActive(elem)
}

function engClick(elem,array,data) {
    if (document.querySelector('.login-page-box')) {
        keyboard = englishKeyboard
        document.querySelector('.absolute-box').remove()
        document.getElementById('root').append(renderAbsoluteBox())
    }

    if (document.querySelector('.movies-series-search-page')) {
        keyboard = englishKeyboard
        document.querySelector('.keyboard-absolute-box').remove()
        document.getElementById('root').append(renderKyeboardAbsolute(data))
    }

    controls.select.removeClass()
    controls.select.firstActive()

    showHideKeyboardItemActive(elem)
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
