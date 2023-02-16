function renderButton(className,text,classList) {
    var buttonBox = el('button',className)

    buttonBox.textContent = text
    buttonBox.classList.add(classList)

    buttonBox.onclick = buttonClick

    return buttonBox
}

function buttonClick() {
    if (this.textContent === 'Login') {
        loginButtonClick(this)

    }
}

function loginButtonClick(elem) {
    if (document.querySelector('.login-load')) {
        document.querySelector('.login-load').remove()
    }
    var loginLoad = el('div','login-load')
    
    loginLoad.append(renderLoading())

    elem.append(loginLoad)
    removeLoginPageInputsActive()
    if (document.querySelector('.keyboard-box')) {
        document.querySelector('.keyboard-box').remove()
    }
    
    if (controls.privius === controls.login) {
        controls.select = controls.privius
        controls.select.addActive()
    }

    var elems = document.getElementsByClassName('content-inputs-items-box')

    if (elems[0].value === "g") {
        if (elems[1].value === "g") {
            if (elems[2].value === 'g') {
                setTimeout(() => {
                    document.getElementById('root').append(renderMenu())
                    if (document.querySelector('.login-page-box')) {
                        document.querySelector('.login-page-box').remove()
                    }
                    controls.select = controls.menu
                    controls.select.addActive()
                }, 4000);

                return

            }
        }
    }
    loginError()
}

function loginError() {
    if (document.querySelector('.error')) {
        document.querySelector('.error').remove()
    }
    var error = el('div','error')
    error.textContent = 'invalid login or password'

    setTimeout(() => {
        if (document.querySelector('.login-load')) {
            document.querySelector('.login-load').remove()
        }

        document.querySelector('.inputs-parent-box').append(error) 
        
    }, 1500);

    setTimeout(() => {
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove()
        }
    }, 4000);
    
}