function renderHeaderComponents(name,index) {
    var headerComponentsBox = el('div','header-components-box')
    
    headerComponentsBox.textContent = name
    headerComponentsBox.setAttribute('index',index)

    headerComponentsBox.onclick = clickHeaderComponents
        

    return headerComponentsBox
}

function renderListsCardBox(data) {
    var contentRowsListsCardBox = el('div','content-rows-lists-card-box')
    var cardImageBox = el('div','card-image-box')
    var cardNameBox = el('div','card-name-box')

    cardImageBox.style.backgroundImage = 'url(' + data.poster + ')'
    cardNameBox.textContent = data.name

    contentRowsListsCardBox.onclick = function () {
        clickListsCard(data)
    }

    contentRowsListsCardBox.append(cardImageBox)
    contentRowsListsCardBox.append(cardNameBox)

    return contentRowsListsCardBox

}

function clickHeaderComponents() {
    console.log(this.getAttribute('index'));
    controls.select.removeClass()
    controls.select = controls.moviesLists
    controls.select.rowsIndex = this.getAttribute('index')
    controls.select.addActive()
    controls.select.listTransY()
    controls.select.listTransX()
}

function clickListsCard(data) {
    controls.privius = controls.select
    document.getElementById('root').innerHTML = ''
    document.getElementById('root').append(renderMoviesCardInfo(data))
    controls.select = controls.playBuuton
    controls.select.addActive()
}