function renderButton(className,text,classList) {
    var buttonBox = el('button',className)

    buttonBox.textContent = text
    buttonBox.classList.add(classList)

    buttonBox.onclick = buttonClick

    return buttonBox
}

function buttonClick() {
    if (this.textContent === 'Login') {
        removeLoginPageInputsActive()
        if (document.querySelector('.keyboard-box')) {
            document.querySelector('.keyboard-box').remove()
        }
        
        if (controls.privius === controls.login) {
            controls.select = controls.privius
            controls.select.addActive()
        }

    }
}