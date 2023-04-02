function renderBackButton() {
    var backBox = el('div','back-box')
    var backBtnSvg =
  "<svg" +
  '  width="15"' +
  '  height="26"' +
  '  viewBox="0 0 15 26"' +
  '  fill="none"' +
  '  xmlns="http://www.w3.org/2000/svg"' +
  ">" +
  "  <path" +
  '    d="M11.6 24.7667L0.366667 13.5667C0.233333 13.4333 0.139111 13.2889 0.084 13.1333C0.028 12.9778 0 12.8111 0 12.6333C0 12.4556 0.028 12.2889 0.084 12.1333C0.139111 11.9778 0.233333 11.8333 0.366667 11.7L11.6 0.466667C11.9111 0.155555 12.3 0 12.7667 0C13.2333 0 13.6333 0.166667 13.9667 0.5C14.3 0.833333 14.4667 1.22222 14.4667 1.66667C14.4667 2.11111 14.3 2.5 13.9667 2.83333L4.16667 12.6333L13.9667 22.4333C14.2778 22.7444 14.4333 23.1276 14.4333 23.5827C14.4333 24.0387 14.2667 24.4333 13.9333 24.7667C13.6 25.1 13.2111 25.2667 12.7667 25.2667C12.3222 25.2667 11.9333 25.1 11.6 24.7667Z"' +
  '    fill="white"' +
  "  />" +
  "</svg>";


    backBox.onclick = ()=> {
        backButtonClick()
    }

    backBox.innerHTML = backBtnSvg

    return backBox
}

function backButtonClick() {
    if (document.querySelector('.movies-and-series-page-box')) {
        document.getElementById('root').innerHTML = ''
        controls.moviesLists.index = 0
        page = 'menu'
        document.getElementById('root').append(renderLoadingPage())
    }

    if (controls.privius === controls.search) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData))
        controls.moviesLists.index = 0
        controls.select = controls.headerComponents
        controls.select.index = 0
        controls.select.addActive()
        console.log(moviesSeriesData);
    }

    if (document.querySelector('.movies-card-info-page')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderMoviesAndSeries(moviesSeriesData))
        controls.select = controls.moviesLists
        controls.select.addActive()
        controls.select.listTransX()
        controls.select.listTransY()
        console.log(moviesSeriesData);
    }

    if (document.querySelector('.settings-page-box')) {
        document.getElementById('root').innerHTML = ''
        page = 'menu'
        document.getElementById('root').append(renderLoadingPage())
    }

    if (document.querySelector('.pin-code-page-box')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderSettingsPage(settingsData))
        controls.select = controls.settings
        controls.select.firstActive()
    }

    if (document.querySelector('.lock-categories-page-box')) {
        document.getElementById('root').innerHTML = ''
        document.getElementById('root').append(renderSettingsPage(settingsData))
        controls.select = controls.settings
        controls.select.firstActive()
    }
}