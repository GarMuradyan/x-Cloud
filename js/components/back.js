function renderBackButton() {
    var backBox = el('div','back-box')
    var backIcon = el('span','material-symbols-outlined')

    backIcon.textContent = 'chevron_left'

    backBox.append(backIcon)

    return backBox
}