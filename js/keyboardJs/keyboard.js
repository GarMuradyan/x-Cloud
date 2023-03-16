var activeInput = null

var isUpperCase = false

var keyboard = englishKeyboard

function renderKeyboard(array,data,classNmaes) {
    var keyboardBox = el('div','keyboard-box')

    for (var i = 0; i < array.length; i++) {
        var keyboardRowsBox = el('div','keyboard-rows-box')

        keyboardBox.append(keyboardRowsBox)

        for (var j = 0; j < array[i].length; j++) {
            var keyboardRowsItemBox = el('div','keyboard-rows-item-box')

            keyboardRowsItemBox.textContent = array[i][j]

            keyboardRowsBox.append(keyboardRowsItemBox)

            keyboardItemIfElse(array[i][j],keyboardRowsItemBox,classNmaes)

            keyboardRowsItemBox.onclick = function () {
                keyboardItemClick(this,array,data)
            }

        }        
    }

    return keyboardBox
}

function renderPinKeyboard(array) {
    var pinKeyboardBox = el('div','pin-keyboard-box')

    for (var i = 0; i < array.length; i++) {
        var pinKeyboardItemBox = el('div','pin-keyboard-item-box')

        pinKeyboardItemBox.onclick = function () {
            pinKeyboardItemClick(this)
        }

        pinKeyboardItemBox.textContent = array[i]

        pinKeyboardBox.append(pinKeyboardItemBox)
    }

    return pinKeyboardBox
}

function pinKeyboardItemClick(elem) {
    if (elem.textContent.length === 1) {

        toCheckPinPageTitleText(elem)

        if (activeInput.getElementsByClassName('pin-code-icon')) {
            activeInput.innerHTML = ''
        }

        activeInput.append(el('div','pin-code-icon'))

        controls.pinInputs.index++

        if (controls.pinInputs.index === 4) {
            toCheckPinIndexEqualFor()
        }
        controls.pinInputs.ok()
        showHideKeyboardItemActive(elem)
    }
}

function toCheckPinPageTitleText(elem) {
    if (document.querySelector('.pin-code-page-title-box').textContent === 'Enter old pin') {
        oldPin+=elem.textContent
    }else if (document.querySelector('.pin-code-page-title-box').textContent === 'Enter new pin') {
        newPin+=elem.textContent
    }else if (document.querySelector('.pin-code-page-title-box').textContent === 'Confirm new pin') {
        confirmPin+=elem.textContent
    }
}

function toCheckPinIndexEqualFor() {
    if (document.querySelector('.pin-code-page-title-box').textContent === 'Enter old pin') {
        if (oldPin === localStorage.getItem('pin')) {
            removePinInputsHtml()
            controls.pinInputs.index = 0
            controls.pinInputs.ok()
            document.querySelector('.pin-code-page-title-box').textContent = 'Enter new pin'
            return
        }else {
            removePinInputsHtml()
            controls.pinInputs.index = 0
            controls.pinInputs.ok()
            wrongPin('Wrong Pin')
            return
        }
    }else if (document.querySelector('.pin-code-page-title-box').textContent === 'Enter new pin') {
        if (newPin.length == 4) {
            removePinInputsHtml()
            controls.pinInputs.index = 0
            controls.pinInputs.ok()
            document.querySelector('.pin-code-page-title-box').textContent = 'Confirm new pin'
            console.log(newPin);

            return
        }else {
            newPin = ''
            removePinInputsHtml()
            controls.pinInputs.index = 0
            controls.pinInputs.ok()
            document.querySelector('.pin-code-page-title-box').textContent = 'Enter new pin'
            return
        }
    }else if (document.querySelector('.pin-code-page-title-box').textContent === 'Confirm new pin') {
        if (confirmPin === newPin) {
            newPin = ''
            localStorage.setItem('pin',confirmPin)
            wrongPin('Pin Code Saved')
            setTimeout(() => {

                document.getElementById('root').innerHTML = ''
                document.getElementById('root').append(renderSettingsPage(settingsData))

                controls.select = controls.settings
                controls.select.firstActive()
            }, 1500);
            return
        }else {
            removePinInputsHtml()
            controls.pinInputs.index = 0
            controls.pinInputs.ok()
            wrongPin('Pin not Mutch')
            return
        }
    }
}

function removePinInputsHtml() {
    for (var i = 0; i < document.getElementsByClassName('pin-code-page-inputs-item-box').length; i++) {
        document.getElementsByClassName('pin-code-page-inputs-item-box')[i].innerHTML = ''
    }
}

function wrongPin(name) {
    if (document.querySelector('.wrong-pin')) {
        document.querySelector('.wrong-pin').remove()
    }
    var wrongPin = el('div','wrong-pin')

    wrongPin.textContent = name
    oldPin = ''
    confirmPin = ''

    if (name === 'Pin Code Saved') {
        wrongPin.classList.add('green-color')
    } 
        

    setTimeout(() => {
        if (document.querySelector('.wrong-pin')) {
            document.querySelector('.wrong-pin').remove()
        }
    }, 2500);

    document.querySelector('.pin-code-page-title-and-inputs-box').append(wrongPin)
}

function keyboardItemIfElse(item,elem,classNmaes) {
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

function keyboardItemClick(elem,array,data) {
    if (elem.textContent.length === 1) {
        activeInput.value+=elem.textContent
        showHideKeyboardItemActive(elem)
        if (data) {
            keyboardSearchingClick(data)
        }
    }

    if (elem.classList.contains('clean')) {
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

    if (elem.classList.contains('done')) {
        doneClick(elem,array,data)
    }

    if (elem.classList.contains('num')) {
        numberClick(elem,array,data)
    }

    if (elem.classList.contains('eng')) {
        engClick(elem,array,data)
    }
}

function keyboardSearchingClick(data) {
    if (document.querySelector('.live-tv-page-box')) {
        renderLiveTvSearching(data)
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
        if (document.querySelector('.live-tv-page-box')) {
            document.querySelector('.live-tv-search-keyboard-box').remove()
            document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data,array))
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
        if (document.querySelector('.live-tv-page-box')) {
            document.querySelector('.live-tv-search-keyboard-box').remove()
            document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data,array))
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
    if (document.querySelector('.live-tv-page-box')) {
        liveTvSearchBack()
        // document.querySelector('.live-tv-search-keyboard-box').remove()
        // document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data,array))

    }
    showHideKeyboardItemActive(elem)
}

function numberClick(elem,array,data) {
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
        document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data,keyboard))
    }

    controls.select.removeClass()
    controls.select.firstActive()

    showHideKeyboardItemActive(elem)
}

function engClick(elem,array,data) {
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
        document.querySelector('.live-tv-search-box').append(renderLiveTvKeyboard(data,keyboard))
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
