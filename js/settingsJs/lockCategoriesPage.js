function renderLockCategoriesPage(array,menuMoviesData,menuSeriesData) {
    var liveTvCategData = []
    for (let i = 0; i < array.length; i++) {
        if(i > 2) {
            liveTvCategData.push(array[i])
        }        
    }
    var lockCategoriesPageBox = el('div','lock-categories-page-box')
    var lockCategoriesBackBox = el('div','lock-categories-back-box')
    var lockCategoriesContentBox = el('div','lock-categories-content-box')

    lockCategoriesContentBox.append(renderLockTvCategories(liveTvCategData,'TV Categories',0))
    lockCategoriesContentBox.append(renderLockTvCategories(menuMoviesData,'Movie Categories',0))
    lockCategoriesContentBox.append(renderLockTvCategories(menuSeriesData,'Series Categories',0))

    lockCategoriesBackBox.append(renderBackButton())

    lockCategoriesPageBox.append(lockCategoriesBackBox)
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
    for (var i = 0; i < data.playlist.length; i++) {
        if (data.playlist[i].locked) {
            lockCategoriesCardBox.classList.add('active-image')
        }
    }

    lockCategoriesCardBox.onclick = function () {
        lockCategoriesCardsClick(data,this)
    }

    lockCategoriesCardBox.textContent = data.name


    return lockCategoriesCardBox
}

function lockCategoriesCardsClick(data,elem) {

    if (data.playlist[0].locked) {
        for (var i = 0; i < data.playlist.length; i++) {
            data.playlist[i].locked = false
        }
        liveTvData[1].playlist = f()
        elem.classList.remove('active-image')
        localStorageSetItemMenuesData()
    }else {
        for (var i = 0; i < data.playlist.length; i++) {
            data.playlist[i].locked = true
        }
        liveTvData[1].playlist = f()
        elem.classList.add('active-image')
        localStorageSetItemMenuesData()
        
    }
}

function renderLockCategPageLockBox() {
    console.log('aapend');
    debugger
    var lockCategoriesCardLockedBox = el('div','lock-categoreis-card-locked-box')

    lockCategoriesCardLockedBox.append(renderLockIcon())

    return lockCategoriesCardLockedBox
}

function localStorageSetItemMenuesData() {
    localStorage.setItem('live-tv-data',JSON.stringify(liveTvData))
    localStorage.setItem('menu-movies-data',JSON.stringify(menuMoviesData))
    localStorage.setItem('menu-series-data',JSON.stringify(menuSeriesData))
}
