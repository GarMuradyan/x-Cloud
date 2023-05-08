function renderHiddenLoading() {
    var hiddenLoadingBox = el('div','hidden-loading-box')
    var hiddenLoadBox = el('div','hidden-load-box')

    hiddenLoadingBox.classList.add('popup-display')

    hiddenLoadBox.append(renderLoading())

    hiddenLoadingBox.append(hiddenLoadBox)

    return hiddenLoadingBox
}