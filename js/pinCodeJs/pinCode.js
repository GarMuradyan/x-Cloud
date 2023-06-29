var pinObject = {
    state: "Enter pin",
    value: "",
    newValue: "",
    changePin: false
}

function renderPinCodePage (selected, callBack) {
    console.log(selected);
    console.log(callBack);
    var pinCodePageBox = el('div', 'pin-code-page-box')
    var pinCodePageBackBox = el('div', 'pin-code-page-back-box')
    var pinCodePageTitleAndInputsBox = el('div', 'pin-code-page-title-and-inputs-box')
    var pinCodePageTitleBox = el('div', 'pin-code-page-title-box')
    var pinCodePageInputsBox = el('div', 'pin-code-page-inputs-box')

    pinCodePageTitleBox.textContent = pinObject.state

    for (var i = 0; i < 4; i++) {
        var pinCodePageInputsItemBox = el('div', 'pin-code-page-inputs-item-box')

        pinCodePageInputsItemBox.onclick = function () {
            pinCodeInputClick(this, selected, callBack)
        }

        pinCodePageInputsBox.append(pinCodePageInputsItemBox)
    }
    console.log(pinObject);

    pinObject.changePin ? pinCodePageBox.style.backgroundImage = 'url(../../Film.png)' : pinCodePageBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'

    pinCodePageTitleAndInputsBox.append(pinCodePageTitleBox)
    pinCodePageTitleAndInputsBox.append(pinCodePageInputsBox)

    pinCodePageBackBox.append(renderBackButton())

    pinCodePageBox.append(pinCodePageBackBox)
    pinCodePageBox.append(pinCodePageTitleAndInputsBox)
    pinCodePageBox.append(renderPinKeyboard(selected, callBack))

    return pinCodePageBox
}

function pinCodeInputClick (elem, selected, callBack) {
    removePinCodeInputsClass()
    elem.classList.add('active-border')
    activeInput = elem

    controls.select = controls.pinKeyboard
    controls.select.firstActive()
}

function removePinCodeInputsClass () {
    for (var i = 0; i < document.getElementsByClassName('pin-code-page-inputs-item-box').length; i++) {
        document.getElementsByClassName('pin-code-page-inputs-item-box')[i].classList.remove('active-border')
    }
}

function renderWrongPin (text) {

    document.querySelector('.wrong-pin-box') ? document.querySelector('.wrong-pin-box').remove() : false

    var wrongPinBox = el('div', 'wrong-pin-box')
    var wrongPinTitleBox = el('div', 'wrong-pin-title-box')

    wrongPinTitleBox.textContent = text

    setTimeout(function () {
        wrongPinBox.remove()
    }, 2000)

    wrongPinBox.append(wrongPinTitleBox)

    document.querySelector('.pin-code-page-title-and-inputs-box').append(wrongPinBox)

}

function pinLogic (pinTitle) {
    if (pinObject.state == 'Enter pin') {
        if (pinObject.value == pinCode) {
            console.log('you enter pin');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.state = 'Enter new pin'
            pinObject.value = ''
            pinObject.newValue = ''
            pinTitle.textContent = pinObject.state
            pinInputHtml()

        } else {
            console.log('else');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.value = ''
            pinObject.newValue = ''
            pinInputHtml()
            renderWrongPin('Wrong pin')
        }
    } else if (pinObject.state == 'Enter new pin') {
        if (pinObject.value.length == 4) {
            console.log('you enter new pin');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.state = 'Confirm pin'
            pinObject.value = ''
            pinTitle.textContent = pinObject.state
            pinInputHtml()
        } else {
            console.log('else');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.value = ''
            pinObject.newValue = ''
            pinInputHtml()
            renderWrongPin('Wrong pin')
        }
    } else if (pinObject.state == 'Confirm pin') {
        if (pinObject.value == pinObject.newValue) {
            console.log('you create new pin');
            pinCode = pinObject.newValue
            controls.pinInputs.index = 0
            controls.select = ''
            localStorage.setItem('pin', pinCode)
            renderWrongPin('Pin changed')
            document.querySelector('.wrong-pin-title-box').style.color = 'green'
            pinInputHtml()
            setTimeout(function () {
                backButtonClick()
            }, 1500);
        } else {
            console.log('else');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.value = ''
            pinInputHtml()
            renderWrongPin('Wrong pin')
        }
    }
}

function pinStaticLogic (selected, callBack) {
    if (pinObject.state == 'Enter pin') {
        if (pinObject.value == pinCode) {
            console.log('you enter pin');
            document.getElementsByClassName('pin-code-page-box')[0].remove()
            document.querySelector('.tv-player-video-box') ? document.querySelector('.tv-player-video-box').play() : false
            callBack()
            pinObject.value = ''
            pinObject.newValue = ''

        } else {
            console.log('else');
            controls.pinInputs.index = 0
            controls.pinInputs.addActive()
            pinObject.value = ''
            pinObject.newValue = ''
            pinInputHtml()
            renderWrongPin('Wrong pin')
        }
    }
}