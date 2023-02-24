var settingsData = [
    {
        img:'http://smarttv.xtream.cloud/img/icons/globus.png',
        name:'Change Language'

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
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/padlock.png',
        name:'Lock Categories',
    },
    {
        img:'http://smarttv.xtream.cloud/img/icons/logout.png',
        name:'Log Out',
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
    var settingsBackBox = el('div','settings-back-box')
    var settingsPageTitle = el('div','settings-page-title')

    settingsPageTitle.textContent = 'Settings'

    settingsBackBox.append(renderBackButton())
    settingsBackBox.append(settingsPageTitle)

    return settingsBackBox
}

function renderSettingsContentCardBox(data) {
    console.log(data);
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

