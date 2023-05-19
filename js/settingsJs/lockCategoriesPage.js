function renderLockCategoriesPage(array) {

    var names = ['Live Categories' ,'Movie Categories','Series Categories']

    var lockCategoriesPageBox = el('div','lock-categories-page-box')
    var lockCategoriesHeaderBox = el('div','lock-categories-header-box')
    var lockCategoriesBackBox = el('div','lock-categories-back-box')
    var lockCategoriesBackNameBox = el('div','lock-categories-back-name-box')
    var lockCategoriesContentBox = el('div','lock-categories-content-box')

    lockCategoriesBackNameBox.textContent = 'Settings'

    for (var i = 0; i < array.length; i++) {
        lockCategoriesContentBox.append(renderLockTvCategories(array[i], names[i] ,0))
    }

    lockCategoriesBackBox.append(renderBackButton())

    lockCategoriesHeaderBox.append(lockCategoriesBackBox)
    lockCategoriesHeaderBox.append(lockCategoriesBackNameBox)

    lockCategoriesPageBox.append(lockCategoriesHeaderBox)
    lockCategoriesPageBox.append(lockCategoriesContentBox)


    return lockCategoriesPageBox
}

function renderLockTvCategories(array,name,position) {
    var lockSettingsCategoriesBox = el('div','lock-settings-categories-box')
    var lockSettingsCategoriesTitleBox = el('div','lock-settings-categories-title-box')
    var lockSettingsCategoriesContentBox = el('div','lock-settings-categories-content-box')
    var lockSettingsCategoriesContentCardsBox = el('div','lock-settings-categories-content-cards-box')

    lockSettingsCategoriesTitleBox.textContent = name
    lockSettingsCategoriesContentCardsBox.setAttribute('position',position)

    for (var i = 0; i < array.length; i++) {
        lockSettingsCategoriesContentCardsBox.append(renderLockCategoriesCards(array[i]))
    }

    lockSettingsCategoriesContentBox.append(lockSettingsCategoriesContentCardsBox)

    lockSettingsCategoriesBox.append(lockSettingsCategoriesTitleBox)
    lockSettingsCategoriesBox.append(lockSettingsCategoriesContentBox)

    return lockSettingsCategoriesBox
}

function renderLockCategoriesCards(data) {
    var lockCategoriesCardBox = el('div','lock-categories-card-box')
    var lockCategoriesCardNameBox = el('div','lock-categories-card-name-box')
    
    if (data.locked) {
        lockCategoriesCardBox.classList.add('active-image')
    }

    lockCategoriesCardBox.onclick = function () {
        lockCategoriesCardsClick(data,this)
    }

    lockCategoriesCardNameBox.textContent = data.category_name

    lockCategoriesCardBox.append(lockCategoriesCardNameBox)


    return lockCategoriesCardBox
}

function lockCategoriesCardsClick(data,elem) {

    if (data.locked) {
        data.locked = false
        elem.classList.remove('active-image')
        if (controls.lockCategories.rowsIndex == 0) {
            liveLocked[data.category_id] = {locked:false}
        }
        if (controls.lockCategories.rowsIndex == 1) {
            moviesLocked[data.category_id] = {locked:false}
        }
        if (controls.lockCategories.rowsIndex == 2) {
            seriesLocked[data.category_id] = {locked:false}
        }
        localStorageSetItemMenuesData()
    }else {
        data.locked = true
        elem.classList.add('active-image')
        if (controls.lockCategories.rowsIndex == 0) {
            liveLocked[data.category_id] = {locked:true}
        }
        if (controls.lockCategories.rowsIndex == 1) {
            moviesLocked[data.category_id] = {locked:true}
        }
        if (controls.lockCategories.rowsIndex == 2) {
            seriesLocked[data.category_id] = {locked:true}
        }
        localStorageSetItemMenuesData()
        
    }
}

function getLiveTvLockedCategories() {
    for (var i = 0; i < liveTvData.length; i++) {
        if (liveTvData[i].category_id) {
            if (liveLocked[liveTvData[i].category_id]) {
                liveTvData[i].locked = liveLocked[liveTvData[i].category_id].locked
            }
        }
    }
}

function getMoviesLockedCategories() {
    for (var i = 0; i < moviesData.length; i++) {
        if (moviesData[i].category_id) {
            if (moviesLocked[moviesData[i].category_id]) {
                moviesData[i].locked = moviesLocked[moviesData[i].category_id].locked
            }
        }        
    }
}

function getSeriesLockedCategories() {
    for (var i = 0; i < seriesData.length; i++) {
        if (seriesData[i].category_id) {
            if (seriesLocked[seriesData[i].category_id]) {
                seriesData[i].locked = seriesLocked[seriesData[i].category_id].locked
            }
        }        
    }
}

function getAllLockedCategories() {
    for (var i = 0; i < liveTvCategories.length; i++) {
        if (liveLocked[liveTvCategories[i].category_id]) {
            liveTvCategories[i].locked = liveLocked[liveTvCategories[i].category_id].locked
        }
    }

    for (var i = 0; i < seriesCategories.length; i++) {
        if (seriesLocked[seriesCategories[i].category_id]) {
            seriesCategories[i].locked = seriesLocked[seriesCategories[i].category_id].locked
        }        
    }

    for (var i = 0; i < moviesCategories.length; i++) {
        if (moviesLocked[moviesCategories[i].category_id]) {
            moviesCategories[i].locked = moviesLocked[moviesCategories[i].category_id].locked
        }
    }
}
