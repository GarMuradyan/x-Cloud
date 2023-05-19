var imgaeHost = 'https://image.tmdb.org/t/p/w500'
var backgroundImage = 'https://api.xtream.cloud/bg.png'
var page = 'login'

if (localStorage.getItem('page')) {
    page = localStorage.getItem('page')
}

function renderLogin() {
    var loginPageBox = el('div','login-page-box')


    loginPageBox.append(renderLoginInputsBox())

    return loginPageBox
}

function renderLoginInputsBox() {
    var placeholders = ['Provider','Username','Password']
    var types = ['text','text','password']


    var inputsParentBox = el('div','inputs-parent-box')
    var inputsParentContentBox = el('div','inputs-parent-content-box')
    var contentLogoBox = el('div','content-logo-box')
    var logoItemBox = el('div','logo-item-box')
    var contentInputsBox = el('div','content-input-box')
    var contentButtonsBox = el('div','content-buttons-box')
    var or = el('div','or')

    for (var i = 0; i < placeholders.length; i++) {
        contentInputsBox.append(renderinputBox(placeholders[i],types[i],'content-inputs-items-box','input-content-items'))
    }
    or.textContent = 'or'

    logoItemBox.append(renderLogo())

    contentLogoBox.append(logoItemBox)

    contentButtonsBox.append(renderButton('login-button','Login','input-content-items'))
    
    inputsParentContentBox.append(contentLogoBox)
    inputsParentContentBox.append(contentInputsBox)
    inputsParentContentBox.append(contentButtonsBox)

    inputsParentBox.append(inputsParentContentBox)

    return inputsParentBox

}