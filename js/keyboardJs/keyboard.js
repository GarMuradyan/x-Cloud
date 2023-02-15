var activeInput = null

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

            keyboardRowsItemBox.onclick = keyboardItemClick

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
}

function keyboardItemClick() {
    if (this.textContent.length === 1) {
        activeInput.value+=this.textContent
        showHideKeyboardItemActive(this)
    }

    if (this.textContent === 'Clean') {
        if (activeInput.value) {
            activeInput.value = ''
            showHideKeyboardItemActive(this)
        }
    }

    if (this.classList.contains('close')) {
        var x = activeInput.value.substring(0,activeInput.value.length-1)
        activeInput.value = x
        showHideKeyboardItemActive(this)
    }

    if (this.classList.contains('space')) {
        activeInput.value+=' '
        showHideKeyboardItemActive(this)
    }

    if (this.classList.contains('shift')) {
        for (var i = 0; i < englishKeyboard.length; i++) {
            for (var j = 0; j < englishKeyboard[i].length; j++) {
                if (englishKeyboard[i][j].length === 1) {
                    // if (englishKeyboard[i][j].toLocaleLowerCase()) {
                    //     console.log('big');
                    //     englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleUpperCase()
                    // }else if (englishKeyboard[i][j].toLocaleUpperCase()) {
                    //     console.log('small');
                    //     englishKeyboard[i][j] = englishKeyboard[i][j].toLocaleLowerCase()
                    // }
                    
                }
            }
        }
        //document.querySelector('.keyboard-box').remove()
        console.log('shift',englishKeyboard);
        showHideKeyboardItemActive(this)
    }

    if (this.textContent === 'Done') {
        if (controls.privius === controls.login) {
            controls.privius.index+=1
            controls.privius.ok()
        }
        showHideKeyboardItemActive(this)
    }
}

function showHideKeyboardItemActive(elem) {
    setTimeout(() => {
        elem.classList.add('active-background')
    }, 100);
    elem.classList.remove('active-background')
}
