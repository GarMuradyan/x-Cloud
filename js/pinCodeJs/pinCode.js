var oldPin = ''
var newPin = ''
var confirmPin = ''

function renderPinCodePage(text) {
    var pinCodePageBox = el('div','pin-code-page-box')
    var pinCodePageBackBox = el('div','pin-code-page-back-box')
    var pinCodePageTitleAndInputsBox = el('div','pin-code-page-title-and-inputs-box')
    var pinCodePageTitleBox = el('div','pin-code-page-title-box')
    var pinCodePageInputsBox = el('div','pin-code-page-inputs-box')

    pinCodePageTitleBox.textContent = text

    for (var i = 0; i < 4; i++) {
        var pinCodePageInputsItemBox = el('div','pin-code-page-inputs-item-box')

        pinCodePageInputsItemBox.onclick = function () {
            pinCodeInputClick(this)
        }
        
        pinCodePageInputsBox.append(pinCodePageInputsItemBox)
    }


    pinCodePageTitleAndInputsBox.append(pinCodePageTitleBox)
    pinCodePageTitleAndInputsBox.append(pinCodePageInputsBox)

    pinCodePageBackBox.append(renderBackButton())

    pinCodePageBox.append(pinCodePageBackBox)
    pinCodePageBox.append(pinCodePageTitleAndInputsBox)

    return pinCodePageBox
}

function pinCodeInputClick(elem) {
    removePinCodeInputsClass()
    elem.classList.add('active-border')
    activeInput = elem

    if (!document.querySelector('.pin-keyboard-box')) {
        document.getElementById('root').append(renderPinKeyboard(pinKeyboard))
    }

    controls.select = controls.pinKeyboard
    controls.select.addActive()
}

function removePinCodeInputsClass() {
    for (var i = 0; i < document.getElementsByClassName('pin-code-page-inputs-item-box').length; i++) {
        document.getElementsByClassName('pin-code-page-inputs-item-box')[i].classList.remove('active-border')
    }
}