var pinCode = '0000'

if (localStorage.getItem('pin')) {
    pinCode = localStorage.getItem('pin')
}

localStorage.setItem('pin',pinCode)

var settingsData = [
    {
        img:'http://smarttv.xtream.cloud/img/icons/globus.png',
        name:'Change Language',
        onClick: function () {
        }

    },
    {
        img:'https://png.pngtree.com/png-clipart/20190920/original/pngtree-white-search-icon-png-image_4627638.jpg',
        name:'Use XTREAM code EPG',
        checked: localStorage.getItem("use_xtream_code_epg") != "0" ,
        onClick:function(item, data){

            data.checked = !data.checked;

            localStorage.setItem("use_xtream_code_epg", data.checked ? "1" : "0" );

            if(data.checked){
                item.classList.add("checked");
            }else{
                item.classList.remove("checked");
            }

        }
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/tmdb.png',
        name:'Use TMDB api',
        checked: localStorage.getItem('use_tmdb_api') != '0',
        onClick:function(item, data){

            data.checked = !data.checked;

            localStorage.setItem("use_tmdb_api", data.checked ? "1" : "0" );

            if(data.checked){
                item.classList.add("checked");
            }else{
                item.classList.remove("checked");
            }

        }
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/subtitles.png',
        name:'Remove Subtitle Background',
        checked:localStorage.getItem('remove_subtitle_background') != '0',
        onClick:function (item,data) {

            data.checked = !data.checked

            localStorage.setItem('remove_subtitle_background', data.checked ? '1' : '0')

            if (data.checked) {
                item.classList.add('checked')
            }else {
                item.classList.remove('checked')
            }
        }
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/parentalicon.png',
        name:'Change parental code',
        onClick:function () {
            document.getElementById('root').innerHTML = ''
            document.getElementById('root').append(renderPinCodePage('Enter old pin'))
            activeInput = document.querySelector('.pin-code-page-inputs-item-box')
            controls.select = controls.pinInputs
            controls.select.firstActive()
        }
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/padlock.png',
        name:'Lock Categories',
        onClick: function () {
            if (liveTvCategories && seriesCategories && moviesCategories) {
                var arr = []

                getAllLockedCategories()

                arr.push(liveTvCategories)
                arr.push(moviesCategories)
                arr.push(seriesCategories)

                document.getElementById('root').innerHTML = ''

                document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')

                document.querySelector('.lock-categories-page-box') ? document.querySelector('.lock-categories-page-box').remove() : false

                document.getElementById('root').append(renderLockCategoriesPage(arr))

                controls.select = controls.lockCategories
                controls.select.firstActive()
                
                document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')
                
            }else {
                document.getElementById('root').innerHTML = ''
                document.getElementsByClassName('hidden-loading-box')[0].classList.remove('popup-display')
                req(reqUrl + '&action=get_series_categories', "GET").then((res)=> {
                    seriesCategories = res
                    if (liveTvCategories && seriesCategories && moviesCategories) {
                        var arr = []

                        getAllLockedCategories()

                        arr.push(liveTvCategories)
                        arr.push(moviesCategories)
                        arr.push(seriesCategories)

                        
                        document.querySelector('.lock-categories-page-box') ? document.querySelector('.lock-categories-page-box').remove() : false
        
                        document.getElementById('root').append(renderLockCategoriesPage(arr))
        
                        controls.select = controls.lockCategories
                        controls.select.firstActive()

                        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')
                    }
                }).catch((err)=> {
                    console.log(err);
                })

                req(reqUrl+'&action=get_live_categories',"GET",'').then((res)=> {
                    liveTvCategories = res
                    if (liveTvCategories && seriesCategories && moviesCategories) {
                        var arr = []

                        getAllLockedCategories()

                        arr.push(liveTvCategories)
                        arr.push(moviesCategories)
                        arr.push(seriesCategories)

                        
                        document.querySelector('.lock-categories-page-box') ? document.querySelector('.lock-categories-page-box').remove() : false
        
                        document.getElementById('root').append(renderLockCategoriesPage(arr))
        
                        controls.select = controls.lockCategories
                        controls.select.firstActive()

                        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')
                    }
                }).catch((err)=> {
                    console.log(err);
                })

                req(reqUrl + '&action=get_vod_categories', "GET").then((res)=> {
                    moviesCategories = res
                    if (liveTvCategories && seriesCategories && moviesCategories) {
                        var arr = []

                        getAllLockedCategories()

                        arr.push(liveTvCategories)
                        arr.push(moviesCategories)
                        arr.push(seriesCategories)

                        
                        document.querySelector('.lock-categories-page-box') ? document.querySelector('.lock-categories-page-box').remove() : false
        
                        document.getElementById('root').append(renderLockCategoriesPage(arr))
        
                        controls.select = controls.lockCategories
                        controls.select.firstActive()

                        document.getElementsByClassName('hidden-loading-box')[0].classList.add('popup-display')
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
        }
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/logout.png',
        name:'Log Out',
        onClick: function () {
            var data = [
                {
                    name:'Cancel',
                    type:'cancel'
                },
                {
                    name:'Log out',
                    type:'log out'
                }
            ]
            document.querySelector('.settings-page-box').classList.add('exit-background')
            document.getElementById('root').append(renderLogOutPopup(data))
            controls.select.removeClass()
            controls.select = controls.logOut
            controls.select.firstActive()

        }
    },
]

function renderSettingsPage(data) {
    var settingsPageBox = el('div','settings-page-box')
    var settingsPageContentBox = el('div','settings-page-content-box')

    for (var i = 0; i < data.length; i++) {
        settingsPageContentBox.append(renderSettingsContentCardBox(data[i]))
    }

    settingsPageBox.append(renderSettingsBackBox())
    settingsPageBox.append(settingsPageContentBox)

    return settingsPageBox

}

function renderSettingsBackBox() {
    var settingsBackAndTitleBox = el('div','settings-back-and-title-box')
    var settingsBackBox = el('div','settings-back-box')
    var settingsPageTitle = el('div','settings-page-title')

    settingsPageTitle.textContent = 'Settings'

    settingsBackBox.append(renderBackButton())
    settingsBackAndTitleBox.append(settingsBackBox)
    settingsBackAndTitleBox.append(settingsPageTitle)

    return settingsBackAndTitleBox
}

function renderSettingsContentCardBox(data) {
    var settingsCardBox = el('div','settings-card-box')
    var settingsCardImgBox = el('div','settings-card-img-box')
    var settingsCardNameBox = el('div','settings-card-name-box')
    var settingsCardCheckedBox = el('div','settings-card-checked-box')
    var settingsCardCheckedPointBox = el('div','settings-card-checked-point-box')

    settingsCardImgBox.style.backgroundImage = 'url(' + data.img + ')'
    settingsCardNameBox.textContent = data.name

    if (data.checked) settingsCardBox.classList.add('checked');

    settingsCardBox.onclick = function () {
        data.onClick(settingsCardBox, data);
    }

    settingsCardBox.append(settingsCardImgBox)
    settingsCardBox.append(settingsCardNameBox)

    settingsCardCheckedBox.append(settingsCardCheckedPointBox)

    if (data.checked != undefined ) {
        settingsCardBox.append(settingsCardCheckedBox)
    }

    return settingsCardBox

}

function renderLogOutPopup(data) {
    var logOutPopupBox = el('div','log-out-popup-box')
    var logOutPopupContentBox = el('div','log-out-popup-content-box')
    var logOutPopupContentTitleBox = el('div','log-out-popup-content-title-box')
    var logOutPopupContentButtonsBox = el('div','log-out-popup-content-buttons-box')

    logOutPopupContentTitleBox.textContent = 'Are you sure, you want to log out ?'

    for (var i = 0; i < data.length; i++) {
        var contentButtonsButtonBox = el('div','content-buttons-button-box')

        contentButtonsButtonBox.classList.add('active-border')
        contentButtonsButtonBox.setAttribute('type',data[i].type)
        contentButtonsButtonBox.textContent = data[i].name

        contentButtonsButtonBox.onclick = function () {
            logOutPopupButtonsClick(this.getAttribute('type'))
        }

        logOutPopupContentButtonsBox.append(contentButtonsButtonBox)
    }


    logOutPopupContentBox.append(logOutPopupContentTitleBox)
    logOutPopupContentBox.append(logOutPopupContentButtonsBox)

    logOutPopupBox.append(logOutPopupContentBox)

    return logOutPopupBox
}

function logOutPopupButtonsClick(type) {
    switch (type) {
        case 'cancel':
            typeCancel()
            break;
    
        case 'log out':
            typeLogOut()
            break;
    }
}

function typeCancel() {
    document.querySelector('.log-out-popup-box').remove()
    document.querySelector('.settings-page-box').classList.remove('exit-background')
    controls.select = controls.settings
    controls.select.firstActive()
}

function typeLogOut() {
    document.getElementById('root').innerHTML = ''
    page = 'login'
    localStorage.setItem('page',page)
    localStorage.clear()
    document.getElementById('root').append(renderLoadingPage())
}
