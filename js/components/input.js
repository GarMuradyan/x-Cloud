function renderinputBox(placeholder,type,className,classList) {
    var inputBox = el('input',className)

    inputBox.setAttribute('placeholder',placeholder)
    inputBox.setAttribute('type',type)
    inputBox.classList.add(classList)

    inputBox.onclick = inputClick

    return inputBox
}

function inputClick() {
    if (this.getAttribute('placeholder') === 'Provider' || this.getAttribute('placeholder') === 'Username' || this.getAttribute('placeholder') === 'Password') {
        clickProviderUsernameAndPassword(this)
    }
}

function clickProviderUsernameAndPassword(elem) {
    activeInput = elem
    controls.privius = controls.login
    controls.select = controls.keyboard
    removeLoginPageInputsActive()
    elem.classList.add('active-border')
    if (document.querySelector('.keyboard-box')) {
        document.querySelector('.keyboard-box').remove()
    }
    document.getElementById('root').append(renderKeyboard(keyboard))
    controls.select.firstActive()
}

function removeLoginPageInputsActive() {
    var elem = document.getElementsByClassName('content-inputs-items-box')
    for (var i = 0; i < elem.length; i++) {
        elem[i].classList.remove('active-border')
    }
}