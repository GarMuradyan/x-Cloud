var imgaeHost = 'https://image.tmdb.org/t/p/w500'
var backgroundImage = 'https://api.xtream.cloud/bg.png'
var page = 'login'

if (localStorage.getItem('page')) {
    page = localStorage.getItem('page')
}

function renderLogin () {
    var loginPageBox = el('div', 'login-page-box')


    loginPageBox.append(renderLoginLeftBox())
    loginPageBox.append(renderLoginInputsBox())

    return loginPageBox
}

function renderLoginInputsBox () {
    var placeholders = ['Provider', 'Username', 'Password']
    var types = ['text', 'text', 'password']


    var inputsParentBox = el('div', 'inputs-parent-box')
    var inputsParentContentBox = el('div', 'inputs-parent-content-box')
    var contentLogoBox = el('div', 'content-logo-box')
    var logoItemBox = el('div', 'logo-item-box')
    var contentInputsBox = el('div', 'content-input-box')
    var contentButtonsBox = el('div', 'content-buttons-box')
    var or = el('div', 'or')

    for (var i = 0; i < placeholders.length; i++) {
        contentInputsBox.append(renderinputBox(placeholders[i], types[i], 'content-inputs-items-box', 'input-content-items'))
    }
    or.textContent = 'or'

    logoItemBox.append(renderLogo())

    contentLogoBox.append(logoItemBox)

    contentButtonsBox.append(renderButton('login-button', 'Login', 'input-content-items'))

    inputsParentContentBox.append(contentLogoBox)
    inputsParentContentBox.append(contentInputsBox)
    inputsParentContentBox.append(contentButtonsBox)

    inputsParentBox.append(inputsParentContentBox)

    return inputsParentBox

}

function renderLoginLeftBox () {
    var loginLeftBox = el('div', 'login-left-box')
    var loginLeftContentBox = el('div', 'login-left-content-box')
    var loginLeftContentTitleBox = el('div', 'login-left-content-title-box')
    var loginLeftContentSubTitleBox = el('div', 'login-left-content-sub-title-box')
    var loginLeftContentBottomTitleBox = el('div', 'login-left-content-bottom-title-box')
    var loginLeftContentDescriptionBox = el('div', 'login-left-content-description-box')


    loginLeftContentTitleBox.textContent = 'Thank you for choosing'
    loginLeftContentSubTitleBox.textContent = 'X CLOUD TV'
    loginLeftContentBottomTitleBox.textContent = 'Login with your provider credentials'
    loginLeftContentDescriptionBox.textContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'

    loginLeftBox.append(loginLeftContentBox)

    loginLeftContentBox.append(loginLeftContentTitleBox)
    loginLeftContentBox.append(loginLeftContentSubTitleBox)
    loginLeftContentBox.append(loginLeftContentBottomTitleBox)
    loginLeftContentBox.append(loginLeftContentDescriptionBox)

    return loginLeftBox

}