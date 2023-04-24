function renderLockCategoriesPage(array) {

    var names = ['Movie Categories','Series Categories']

    var lockCategoriesPageBox = el('div','lock-categories-page-box')
    var lockCategoriesBackBox = el('div','lock-categories-back-box')
    var lockCategoriesContentBox = el('div','lock-categories-content-box')

    for (var i = 0; i < array.length; i++) {
        lockCategoriesContentBox.append(renderLockTvCategories(array[i], names[i] ,0))
    }

    lockCategoriesBackBox.append(renderBackButton())

    lockCategoriesPageBox.append(lockCategoriesBackBox)
    lockCategoriesPageBox.append(lockCategoriesContentBox)


    return lockCategoriesPageBox
}

function renderLockTvCategories(array,name,position) {
    console.log(array);
    var lockSettingsCategoriesBox = el('div','lock-settings-categories-box')
    var lockSettingsCategoriesTitleBox = el('div','lock-settings-categories-title-box')
    var lockSettingsCategoriesContentBox = el('div','lock-settings-categories-content-box')
    var lockSettingsCategoriesContentCardsBox = el('div','lock-settings-categories-content-cards-box')

    lockSettingsCategoriesTitleBox.textContent = name
    lockSettingsCategoriesContentCardsBox.setAttribute('position',position)

    for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        lockSettingsCategoriesContentCardsBox.append(renderLockCategoriesCards(array[i]))
    }

    lockSettingsCategoriesContentBox.append(lockSettingsCategoriesContentCardsBox)

    lockSettingsCategoriesBox.append(lockSettingsCategoriesTitleBox)
    lockSettingsCategoriesBox.append(lockSettingsCategoriesContentBox)

    return lockSettingsCategoriesBox
}

function renderLockCategoriesCards(data) {
    var lockCategoriesCardBox = el('div','lock-categories-card-box')
    
    if (data.locked) {
        lockCategoriesCardBox.classList.add('active-image')
    }
    for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].locked) {
            lockCategoriesCardBox.classList.add('active-image')
        }
    }

    lockCategoriesCardBox.onclick = function () {
        lockCategoriesCardsClick(data,this)
    }

    lockCategoriesCardBox.textContent = data.page


    return lockCategoriesCardBox
}

function lockCategoriesCardsClick(data,elem) {

    if (data.results[0].locked) {
        for (var i = 0; i < data.results.length; i++) {
            data.results[i].locked = false
        }
        elem.classList.remove('active-image')
        localStorageSetItemMenuesData()
    }else {
        for (var i = 0; i < data.results.length; i++) {
            data.results[i].locked = true
        }
        elem.classList.add('active-image')
        localStorageSetItemMenuesData()
        
    }
}

function renderLockCategPageLockBox() {
    var lockCategoriesCardLockedBox = el('div','lock-categoreis-card-locked-box')

    lockCategoriesCardLockedBox.append(renderLockIcon())

    return lockCategoriesCardLockedBox
}
