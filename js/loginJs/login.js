var imgaeHost = 'https://image.tmdb.org/t/p/w500'
var activeInput = null

function renderLogin() {
    var loginPageBox = el('div','login-page-box')

    loginPageBox.style.backgroundImage = 'url(http://smarttv.xtream.cloud/img/bg.png)'

    loginPageBox.append(renderLoginInputsBox())

    return loginPageBox
}

// function renderLoginPageFirstBox() {
//     var descBox = el('div','desc-box')
//     // var descTitleBox = el('p','desc-title-box')
//     // var descSubtitleBox = el('p','desc-subtitle-box')


// }

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
    contentButtonsBox.append(or)
    contentButtonsBox.append(renderButton('provider-or-host-button','Upload playlist','input-content-items'))

    inputsParentContentBox.append(contentLogoBox)
    inputsParentContentBox.append(contentInputsBox)
    inputsParentContentBox.append(contentButtonsBox)

    inputsParentBox.append(inputsParentContentBox)

    return inputsParentBox

}