function renderPinCodePage(text) {
    var pinCodePageBox = el('div','pin-code-page-box')
    var pinCodePageBackBox = el('div','pin-code-page-box')
    var pinCodePageTitleAndInputsBox = el('div','pin-code-page-title-and-inputs-box')
    var pinCodePageTitleBox = el('div','pin-code-page-title-box')
    var pinCodePageInputsBox = el('div','pin-code-page-inputs-box')

    pinCodePageTitleBox.textContent = text

    for (var i = 0; i < 4; i++) {
        var pinCodePageInputsItemBox = el('div','pin-code-page-inputs-item-box')
        
        pinCodePageInputsBox.append(pinCodePageInputsItemBox)
    }


    pinCodePageTitleAndInputsBox.append(pinCodePageTitleBox)
    pinCodePageTitleAndInputsBox.append(pinCodePageInputsBox)

    pinCodePageBox.append(pinCodePageBackBox)
    pinCodePageBox.append(pinCodePageTitleAndInputsBox)

    return pinCodePageBox
}