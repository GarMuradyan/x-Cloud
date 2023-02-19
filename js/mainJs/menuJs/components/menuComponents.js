function renderHeaderComponents(name,index) {
    var headerComponentsBox = el('div','header-components-box')
    
    headerComponentsBox.textContent = name
    headerComponentsBox.setAttribute('index',index)

    return headerComponentsBox
}

function renderListsCardBox(name,url,desc) {
    var contentRowsListsCardBox = el('div','content-rows-lists-card-box')
    var cardImageBox = el('div','card-image-box')
    var cardNameBox = el('div','card-name-box')

    cardImageBox.style.backgroundImage = 'url(' + url + ')'
    cardNameBox.textContent = name

    contentRowsListsCardBox.append(cardImageBox)
    contentRowsListsCardBox.append(cardNameBox)

    return contentRowsListsCardBox

}