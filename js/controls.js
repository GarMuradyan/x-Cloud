var controls = {
    select: '',
    privius: '',

    login: {
        class: 'active-white',
        index: 0,
        items: document.getElementsByClassName('input-content-items'),

        left: function () {
        },
        right: function () {

        },

        ok: function () {
            if (this.index === 3) {
                this.class = 'active-background'
            }
            this.items[this.index].click()
        },

        up: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.index === 2) {
                    this.class = 'active-white'
                }
                this.addActive()
            }

        },
        down: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                if (this.index === 3) {
                    this.class = 'active-background'
                }
                this.addActive()
            }

        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.class = 'active-white'
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    keyboard: {
        class: 'keyboard-active',
        index: 0,
        rowsIndex: 0,
        items: document.getElementsByClassName('keyboard-rows-box'),

        left: function () {
            if (this.index > 0) {
                this.index--
                this.removeClass()
                this.addActive()
            }
        },
        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box').length - 1) {
                this.index++
                this.removeClass()
                this.addActive()
            }
        },

        ok: function () {
            this.removeClass()
            this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box')[this.index].click()
        },

        up: function () {
            if (this.rowsIndex === 0) {
                if (document.querySelector('.live-tv-page-box')) {
                    liveTvSearchBack()
                    return
                }
                if (document.querySelector('.movies-series-search-page')) {
                    this.removeClass()
                    if (document.querySelector('.search-list-content-box').getElementsByClassName('card-name-box').length) {
                        controls.select = controls.searchLists
                        controls.select.addActive()
                        controls.select.listTransX()
                        return
                    } else {
                        this.removeClass()
                        controls.select = controls.back
                        controls.select.addActive()
                        return
                    }
                }

            }
            if (this.rowsIndex > 0) {
                this.removeClass()
                if (this.rowsIndex === 3 && this.index === 1) {
                    this.index = 2
                    this.rowsIndex--
                    this.addActive()
                    return
                }
                if (this.rowsIndex === 3 && this.index === 2) {
                    this.index = 10
                }
                this.rowsIndex--
                this.addActive()
            }

        },
        down: function () {
            if (this.rowsIndex === 2 && this.index > 0 && this.index < 2) {
                this.removeClass()
                this.rowsIndex++
                this.index = 0
                this.addActive()
            }

            if (this.rowsIndex === 2 && this.index > 1 && this.index < 11) {
                this.removeClass()
                this.rowsIndex++
                this.index = 1
                this.addActive()
            }

            if (this.rowsIndex === 2 && this.index === 11) {
                this.removeClass()
                this.rowsIndex++
                this.index = 2
                this.addActive()
            }

            if (this.rowsIndex === 0 && this.index === 12) {
                this.removeClass()
                this.rowsIndex++
                this.index = 11
                this.addActive()
                return
            }

            if (this.rowsIndex < this.items.length - 1) {
                this.removeClass()
                this.rowsIndex++
                this.addActive()
            }

        },
        back: function () {
            if (document.querySelector('.live-tv-channels-content-box')) {
                liveTvSearchBack()
            }
        },
        firstActive: function () {
            this.rowsIndex = 0
            this.index = 0
            this.addActive()
        },
        addActive: function () {
            this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box')[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box')[i].classList.remove(this.class)
            }
        }
    },
    menu: {
        items: document.getElementsByClassName('menu-card-box'),
        index: 0,
        class: 'active-border',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()

            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()

            }

        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

        },
        down: function () {

        },
        back: function () {
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
            this.items[this.index].classList.add('scale')
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
                this.items[i].classList.remove('scale')
            }
        }
    },
    back: {
        items: document.getElementsByClassName('back-box'),
        index: 0,
        class: 'active-background',

        left: function () {

        },

        right: function () {
            if (document.querySelector('.movies-and-series-page-box')) {
                if (!document.querySelector('.movies-and-series-page-box').classList.contains('popup-display')) {
                    this.removeClass()
                    controls.select = controls.searchButton
                    controls.select.addActive()
                }
            }
            if (document.querySelector('.settings-page-box')) {
                this.removeClass()
                controls.select = controls.settings
                controls.select.firstActive()
            }
            if (document.querySelector('.pin-code-page-box')) {
                this.removeClass()
                controls.select = controls.pinInputs
                controls.select.firstActive()
            }
            if (document.querySelector('.lock-categories-page-box')) {
                this.removeClass()
                controls.select = controls.lockCategories
                controls.select.addActive()
            }

        },

        ok: function () {
            this.removeClass()
            this.items[this.index].click()
        },

        up: function () {

        },
        down: function () {
            if (document.querySelector('.movies-series-search-page')) {
                if (!document.querySelector('.movies-series-search-page').classList.contains('popup-display')) {
                    this.removeClass()
                    if (document.querySelector('.search-list-content-box').getElementsByClassName('card-name-box').length) {
                        controls.select = controls.searchLists
                        controls.select.addActive()
                        controls.select.listTransX()
                        return
                    } else {
                        controls.select = controls.keyboard
                        controls.select.firstActive()
                        return
                    }
                }
            }
            if (document.querySelector('.settings-page-box')) {
                this.removeClass()
                controls.select = controls.settings
                controls.select.firstActive()
                return
            }
            if (document.querySelector('.pin-code-page-box')) {
                this.removeClass()
                controls.select = controls.pinInputs
                controls.select.firstActive()
                return
            }
            if (document.querySelector('.lock-categories-page-box')) {
                this.removeClass()
                controls.select = controls.lockCategories
                controls.select.addActive()
                return
            }
            this.removeClass()
            controls.select = controls.headerComponents
            controls.select.addActive()
            controls.select.listTransX()

        },
        back: function () {
            this.removeClass()
            backButtonClick()
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    searchButton: {
        items: document.getElementsByClassName('search-button-box'),
        index: 0,
        class: 'active-background',

        left: function () {
            this.removeClass()
            controls.select = controls.back
            controls.select.addActive()
        },

        right: function () {


        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

        },
        down: function () {
            this.removeClass()
            controls.select = controls.headerComponents
            controls.select.addActive()
        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },

    headerComponents: {
        items: document.getElementsByClassName('header-components-box'),
        parent: document.getElementsByClassName('header-bottom-content-box'),
        index: 0,
        transIndex: 0,
        start: 6,
        class: 'active-border',

        left: function () {
            if (this.index == 0) return
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.index < 3 && this.start !== 6) {
                    this.start--
                    if (moviesSeriesData[this.start]) {
                        this.index = 3
                        this.transIndex--
                        this.listTransX()
                        this.items[6].remove()
                        console.log(moviesSeriesData[this.start]);
                        this.parent[0].insertBefore(renderHeaderComponents(moviesSeriesData[this.start - 6].category_name, this.start - 6), this.parent[0].children[0])
                    }
                }
                this.addActive()
            }
        },

        right: function () {
            console.log(this.parent);
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 3 && this.start < moviesSeriesData.length - 1) {
                    console.log('render');
                    this.start++
                    console.log(this.start);
                    if (moviesSeriesData[this.start]) {
                        this.index = 3
                        this.transIndex++
                        this.listTransX()
                        this.items[0].remove()
                        this.parent[0].append(renderHeaderComponents(moviesSeriesData[this.start].category_name, this.start))
                    }
                }
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            controls.privius = controls.headerComponents
            this.removeClass()
            controls.select = controls.back
            controls.select.addActive()

        },
        down: function () {
            this.removeClass()
            controls.select = controls.moviesLists
            controls.select.addActive()
            controls.select.listTransX()
            controls.select.listTransY()
        },
        back: function () {
            backButtonClick()
        },
        listTransX: function () {
            this.parent[0].style.transform = 'translateX(' + (- this.transIndex * 275) + 'px)'
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    moviesLists: {
        items: document.getElementsByClassName('content-rows-lists-box'),
        index: 0,
        rowsIndex: 0,
        transIndex: 0,
        start: 6,
        class: 'active-border',

        left: function () {
            if (this.index == 0) return
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.start - 7 < 0) {
                } else {
                    console.log('render');
                    if (this.index < 3) {
                        this.start--
                        if (!moviesSeriesData[this.rowsIndex].playlist[this.start]) {
                            console.log('return');
                            return
                        }
                        this.index = 3
                        this.transIndex--
                        this.listTransX()
                        this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[6].remove()
                        this.items[this.rowsIndex].insertBefore(renderListsCardBox(moviesSeriesData[this.rowsIndex].playlist[this.start - 6], moviesSeriesData[this.rowsIndex], this.rowsIndex, infoUrl, this.start - 6), this.items[this.rowsIndex].children[0])
                    }
                }

                this.addActive()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.items[this.rowsIndex].setAttribute('row-index', this.start)
                this.items[this.rowsIndex].setAttribute('translate', this.transIndex)
            }
        },

        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 3 && this.start < moviesSeriesData[this.rowsIndex].playlist.length - 1) {
                    console.log('render');
                    this.start++
                    console.log(this.start);
                    if (!moviesSeriesData[this.rowsIndex].playlist[this.start]) {
                        console.log('return');
                        return
                    }
                    this.index = 3
                    this.transIndex++
                    this.listTransX()
                    this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[0].remove()
                    this.items[this.rowsIndex].append(renderListsCardBox(moviesSeriesData[this.rowsIndex].playlist[this.start], moviesSeriesData[this.rowsIndex], this.rowsIndex, infoUrl, this.start))
                }
                this.addActive()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.items[this.rowsIndex].setAttribute('row-index', this.start)
                this.items[this.rowsIndex].setAttribute('translate', this.transIndex)
            }
        },

        ok: function () {
            this.items[this.rowsIndex].getElementsByClassName('card-name-box')[this.index].click()
        },

        up: function () {
            if (this.rowsIndex === 0 || this.rowsIndex === '0') {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.items[this.rowsIndex].setAttribute('row-index', this.start)
                this.items[this.rowsIndex].setAttribute('translate', this.transIndex)
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.start = this.items[this.rowsIndex].getAttribute('row-index')
                this.transIndex = this.items[this.rowsIndex].getAttribute('translate')
                controls.select = controls.headerComponents
                controls.select.addActive()
            }

            if (this.rowsIndex > 0) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.items[this.rowsIndex].setAttribute('row-index', this.start)
                this.items[this.rowsIndex].setAttribute('translate', this.transIndex)
                this.rowsIndex--
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.start = this.items[this.rowsIndex].getAttribute('row-index')
                this.transIndex = this.items[this.rowsIndex].getAttribute('translate')
                this.addActive()
                this.listTransY()
                this.listTransX()
            }

        },

        down: function () {
            if (this.rowsIndex < this.items.length - 1) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.items[this.rowsIndex].setAttribute('row-index', this.start)
                this.items[this.rowsIndex].setAttribute('translate', this.transIndex)
                this.rowsIndex++
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.start = this.items[this.rowsIndex].getAttribute('row-index')
                this.transIndex = this.items[this.rowsIndex].getAttribute('translate')
                this.addActive()
                this.listTransY()
                this.listTransX()
            }
        },
        back: function () {
            backButtonClick()
        },

        listTransY: function () {
            document.querySelector('.parent-content-box').style.transform = 'translateY(' + (- this.rowsIndex * 390) + 'px)'
        },

        listTransX: function () {
            document.getElementsByClassName('content-rows-lists-box')[this.rowsIndex].style.transform = 'translateX(' + (- this.transIndex * 259) + 'px)'
        },

        addActive: function () {
            if (this.items[this.rowsIndex].getElementsByClassName('card-name-box').length) {
                this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[this.index].classList.add(this.class)
            }
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[i].classList.remove(this.class)
            }
        }
    },

    moviesVideoLoad: {
        index: 0,
        rowsIndex: 0,
        class: 'active-background',

        left: function () {
        },

        right: function () {
        },

        ok: function () {
        },

        up: function () {
        },

        down: function () {
        },
        back: function () {

            if (season.length) {
                document.querySelector('.movies-video-on-playing-box') ? document.querySelector('.movies-video-on-playing-box').remove() : false
                document.querySelector('.movies-video-page-box') ? document.querySelector('.movies-video-page-box').remove() : false
                document.getElementById('root').append(renderMoviesCardInfo(infoData,similiarContent))
                controls.select = controls.episodesLists
                controls.seasonContent.ok()
                controls.select.addActive()
                controls.select.listTransX()
            }else {
                document.querySelector('.movies-video-on-playing-box') ? document.querySelector('.movies-video-on-playing-box').remove() : false
                document.querySelector('.movies-video-page-box') ? document.querySelector('.movies-video-page-box').remove() : false
                document.querySelector('.movies-card-info-page').classList.remove('popup-display')
                controls.select = controls.infoButtons
                controls.select.addActive()
            }
        },

        listTransY: function () {
        },

        listTransX: function () {
        },

        addActive: function () {
        },
        removeClass: function () {
        }
    },

    moviesVideo: {
        index: 0,
        rowsIndex: 0,
        class: 'active-background',
        item: document.getElementsByClassName('movies-video-box'),

        left: function () {
            controls.select = controls.moviesVideoTimeLine
            controls.select.addActive()
            controls.select.left()
        },

        right: function () {
            controls.select = controls.moviesVideoTimeLine
            controls.select.addActive()
            controls.select.right()
        },

        ok: function () {
            this.item[0].click()
        },

        up: function () {
        },

        down: function () {
        },
        back: function () {
            if (showControl) {
                hideControl()
            } else {
                if (season.length) {
                    document.querySelector('.movies-video-page-box').remove()
                    document.getElementById('root').append(renderMoviesCardInfo(infoData,similiarContent))
                    controls.select = controls.episodesLists
                    controls.seasonContent.ok()
                    controls.select.addActive()
                    controls.select.listTransX()
                }else {
                    document.querySelector('.movies-video-page-box').remove()
                    document.querySelector('.movies-card-info-page').classList.remove('popup-display')
                    controls.select = controls.infoButtons
                    controls.select.addActive()
                }
            }
        },

        listTransY: function () {
        },

        listTransX: function () {
        },

        addActive: function () {
        },
        removeClass: function () {
        }
    },

    moviesVideoTimeLine: {
        index: 0,
        rowsIndex: 0,
        class: 'white-color',
        item: document.getElementsByClassName('movies-video-box'),
        secondItem: document.getElementsByClassName('progres-line-button'),

        left: function () {
            this.addActive()
            if (!showControl) {
                openControl()
            }
            video = document.querySelector('.movies-video-box')
            video.currentTime -= 10
            document.querySelector('.progres-line-box').style.width = (video.currentTime / video.duration) * 100 + '%'
        },

        right: function () {
            this.addActive()
            if (!showControl) {
                openControl()
            }
            video = document.querySelector('.movies-video-box')
            video.currentTime += 10
            document.querySelector('.progres-line-box').style.width = (video.currentTime / video.duration) * 100 + '%'
        },

        ok: function () {
            controls.moviesVideo.ok()
        },

        up: function () {
        },

        down: function () {
        },
        back: function () {
            this.removeClass()
            controls.moviesVideo.back()
        },

        listTransY: function () {
        },

        listTransX: function () {
        },

        addActive: function () {
            //this.secondItem[0].classList.add(this.class)
        },
        removeClass: function () {
            // this.secondItem[0].classList.remove(this.class)
        }
    },

    searchLists: {
        items: document.getElementsByClassName('search-list-content-box'),
        index: 0,
        start: 6,
        transIndex: 0,
        rowsIndex: 0,
        class: 'active-border',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.start - 7 < 0) {
                } else {
                    console.log('render');
                    if (this.index < 3) {
                        this.index = 3
                        this.start--
                        this.transIndex--
                        this.listTransX()
                        this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[6].remove()
                        this.items[this.rowsIndex].insertBefore(renderListsCardBox(searchArray[this.start - 6], searchArray, this.rowsIndex, infoUrl, this.start - 6), this.items[this.rowsIndex].children[0])
                    }
                }

                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 3 && this.start < searchArray.length - 1) {
                    console.log('render');
                    this.start++
                    if (!searchArray[this.start]) return
                    this.index = 3
                    this.transIndex++
                    this.listTransX()
                    this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[0].remove()
                    this.items[this.rowsIndex].append(renderListsCardBox(searchArray[this.start], searchArray, this.rowsIndex, infoUrl, this.start))
                }
                this.addActive()

            }
        },

        ok: function () {
            this.items[this.rowsIndex].getElementsByClassName('card-name-box')[this.index].click()
        },

        up: function () {
            this.removeClass()
            controls.select = controls.back
            controls.select.addActive()

        },

        down: function () {
            this.removeClass()
            controls.select = controls.keyboard
            controls.select.firstActive()
        },
        back: function () {
            backButtonClick()
        },

        listTransY: function () {
            this.items[this.rowsIndex].style.transform = 'translateY(' + (- this.rowsIndex * 600) + 'px)'
        },

        listTransX: function () {
            this.items[this.rowsIndex].style.transform = 'translateX(' + (- this.transIndex * 259) + 'px)'
        },

        addActive: function () {
            this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[i].classList.remove(this.class)
            }
        }
    },
    infoButtons: {
        items: document.getElementsByClassName('card-info-button'),
        index: 0,
        class: 'active-background',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

        },
        down: function () {

            if (document.querySelector('.bottom-episodes-content')) {
                this.removeClass()
                controls.select = controls.seasonContent
                controls.select.addActive()
            }else {
                this.removeClass()
                controls.select = controls.similiarList
                controls.select.addActive()
            }
        },
        back: function () {
            backButtonClick()
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },

    seasonContent: {
        items: document.getElementsByClassName('season-card-box'),
        index: 0,
        transIndex:0,
        class: 'active-border',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                if (this.index > 3) {
                    this.transIndex--
                    this.listTransX()
                }
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                if (this.index > 3) {
                    console.log('trnalsate');
                    this.transIndex++
                    this.listTransX()
                }
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            this.removeClass()
            controls.select = controls.infoButtons
            controls.select.addActive()
        },
        down: function () {
            this.removeClass()
            controls.select = controls.episodesLists
            controls.select.addActive()
        },
        back: function () {
            backButtonClick()
        },
        listTransX: function () {
            document.querySelector('.season-list-content-box').style.transform = 'translateX(' + (- this.transIndex * 237) + 'px)'
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },

    episodesLists: {
        items: document.getElementsByClassName('episode-card-box'),
        parent: document.getElementsByClassName('episodes-list-content-box'),
        index: 0,
        transIndex: 0,
        start: 3,
        class: 'active-border',

        left: function () {
            if (this.index == 0) return
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.index < 2 && this.start !== 3) {
                    this.start--
                    if (seasonEpisodes[this.start]) {
                        this.index = 2
                        this.transIndex--
                        this.listTransX()
                        this.items[3].remove()
                        this.parent[0].insertBefore(renderEpisodesCard(seasonEpisodes[this.start - 3], this.start - 3), this.parent[0].children[0])
                    }
                }
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 2 && this.start < seasonEpisodes.length - 1) {
                    console.log('render');
                    this.start++
                    console.log(this.start);
                    if (seasonEpisodes[this.start]) {
                        this.index = 2
                        this.transIndex++
                        this.listTransX()
                        this.items[0].remove()
                        this.parent[0].append(renderEpisodesCard(seasonEpisodes[this.start], this.start))
                    }
                }
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up:function () {
            this.removeClass()
            controls.select = controls.seasonContent
            controls.select.addActive()
            controls.select.listTransX()
        },

        down: function () {
            
        },

        
        back: function () {
            console.log('back');
            backButtonClick()
        },

        listTransY: function () {
            this.items[this.rowsIndex].style.transform = 'translateY(' + (- this.rowsIndex * 600) + 'px)'
        },

        listTransX: function () {
            this.parent[0].style.transform = 'translateX(' + (- this.transIndex * 499) + 'px)'
        },

        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },

        removeClass:function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },

    similiarList: {
        items: document.getElementsByClassName('similiar-content-list-content-box'),
        index: 0,
        start: 6,
        transIndex: 0,
        rowsIndex: 0,
        class: 'active-border',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.start - 7 < 0) {
                } else {
                    if (similiarContent.playlist) {
                        console.log('render');
                        if (this.index < 3) {
                            this.index = 3
                            this.start--
                            this.transIndex--
                            this.listTransX()
                            this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[6].remove()
                            this.items[this.rowsIndex].insertBefore(renderListsCardBox(similiarContent.playlist[this.start - 6], similiarContent, this.rowsIndex, infoUrl, this.start - 6), this.items[this.rowsIndex].children[0])
                        }
                    } else {
                        console.log('render');
                        if (this.index < 3) {
                            this.index = 3
                            this.start--
                            this.transIndex--
                            this.listTransX()
                            this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[6].remove()
                            this.items[this.rowsIndex].insertBefore(renderListsCardBox(similiarContent[this.start - 6], similiarContent, this.rowsIndex, infoUrl, this.start - 6), this.items[this.rowsIndex].children[0])
                        }
                    }
                }

                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length - 1) {
                this.removeClass()
                this.index++
                if (similiarContent.playlist) {
                    if (this.index > 3 && this.start < similiarContent.playlist.length - 1) {
                        console.log('render');
                        this.start++
                        if (!similiarContent.playlist[this.start]) return
                        this.index = 3
                        this.transIndex++
                        this.listTransX()
                        this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[0].remove()
                        this.items[this.rowsIndex].append(renderListsCardBox(similiarContent.playlist[this.start], similiarContent, this.rowsIndex, infoUrl, this.start))
                    }
                } else {
                    if (this.index > 3 && this.start < similiarContent.length - 1) {
                        console.log('render');
                        this.start++
                        if (!similiarContent[this.start]) return
                        this.index = 3
                        this.transIndex++
                        this.listTransX()
                        this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[0].remove()
                        this.items[this.rowsIndex].append(renderListsCardBox(similiarContent[this.start], similiarContent, this.rowsIndex, infoUrl, this.start))
                    }
                }
                this.addActive()

            }
        },

        ok: function () {
            this.items[this.rowsIndex].getElementsByClassName('card-name-box')[this.index].click()
        },

        up: function () {
            this.removeClass()
            controls.select = controls.infoButtons
            controls.select.addActive()

        },

        down: function () {
        },
        back: function () {
            console.log('back');
            backButtonClick()
        },

        listTransY: function () {
            this.items[this.rowsIndex].style.transform = 'translateY(' + (- this.rowsIndex * 600) + 'px)'
        },

        listTransX: function () {
            this.items[this.rowsIndex].style.transform = 'translateX(' + (- this.transIndex * 259) + 'px)'
        },

        addActive: function () {
            this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('content-rows-lists-card-box')[i].classList.remove(this.class)
            }
        }
    },

    settings: {
        items: document.getElementsByClassName('settings-card-box'),
        index: 0,
        class: 'active-background',

        left: function () {
            this.removeClass()
            controls.select = controls.back
            controls.select.addActive()
        },

        right: function () {

        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            if (this.index === 0) {
                this.removeClass()
                controls.select = controls.back
                controls.select.addActive()
            }

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }

        },
        down: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    tvChannels: {
        items: document.getElementsByClassName('live-tv-channels-card-box'),
        index: 0,
        transIndex:0,
        start:6,
        selectIndex:0,
        parent:document.getElementsByClassName('live-tv-channels-content-box'),
        class: 'live-active',

        left: function () {

        },

        right: function () {

        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.index < 3 && this.start !== 6) {
                    this.start--
                    if (selectedCategoriChannels[this.start]) {
                        this.index = 3
                        this.transIndex--
                        this.listTransY()
                        this.items[6].remove()
                        this.parent[0].insertBefore(renderLiveTvChannelsCardBox(selectedCategoriChannels[this.start - 6], this.start - 6,selectedCategoriChannels), this.parent[0].children[0])
                    }
                }
                this.addActive()
            }

        },
        down: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 3 && this.start < selectedCategoriChannels.length - 1) {
                    console.log('render');
                    this.start++
                    console.log(this.start);
                    if (selectedCategoriChannels[this.start]) {
                        this.index = 3
                        this.transIndex++
                        this.listTransY()
                        this.items[0].remove()
                        this.parent[0].append(renderLiveTvChannelsCardBox(selectedCategoriChannels[this.start], this.start,selectedCategoriChannels))
                    }
                }
                this.addActive()
            }
        },
        back: function () {
            this.removeClass()
            tvCategoriesTitleClick()
        },

        listTransY:function () {
            this.parent[0].style.transform = 'translateY(' + (- this.transIndex * 133) + 'px)'
        },

        blue: function () {
            menuButtonClick()
        },
        yellow: function () {

        },
        green: function () {

        },
        red: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    tvCategories: {
        items: document.getElementsByClassName('live-tv-categories-card-box'),
        index: 0,
        selectedCategories:0,
        transIndex:0,
        start:6,
        parent:document.getElementsByClassName('live-tv-categories-content-box'),
        class: 'live-active',

        left: function () {

        },

        right: function () {
            document.querySelector('.live-tv-channels-box').classList.remove('scale-tv')
            document.querySelector('.live-tv-categories-box').classList.add('display')
            controls.select = controls.tvChannels
            controls.select.addActive()
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                if (this.index < 3 && this.start !== 6) {
                    this.start--
                    if (liveTvData[this.start]) {
                        this.index = 3
                        this.transIndex--
                        this.listTransY()
                        this.items[6].remove()
                        this.parent[0].insertBefore(renderLiveTvCategoriesCardBox(liveTvData[this.start - 6], this.start - 6), this.parent[0].children[0])
                    }
                }
                this.addActive()
            }

        },
        down: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                if (this.index > 3 && this.start < liveTvData.length - 1) {
                    console.log('render');
                    this.start++
                    console.log(this.start);
                    if (liveTvData[this.start]) {
                        this.index = 3
                        this.transIndex++
                        this.listTransY()
                        this.items[0].remove()
                        this.parent[0].append(renderLiveTvCategoriesCardBox(liveTvData[this.start], this.start))
                    }
                }
                this.addActive()
            }
        },
        back: function () {
            document.getElementById('root').innerHTML = ''
            page = 'menu'
            document.getElementById('root').append(renderLoadingPage())
        },

        listTransY:function () {
            this.parent[0].style.transform = 'translateY(' + (- this.transIndex * 133) + 'px)'
        },

        blue: function () {
            menuButtonClick()
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    pinInputs: {
        items: document.getElementsByClassName('pin-code-page-inputs-item-box'),
        index: 0,
        class: 'active-border',

        left: function () {
            if (this.index === 0) {
                this.removeClass()
                controls.select = controls.back
                controls.select.addActive()
            }

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            this.removeClass()
            controls.select = controls.back
            controls.select.addActive()

        },
        down: function () {
        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    pinKeyboard: {
        items: document.getElementsByClassName('pin-keyboard-item-box'),
        index: 0,
        class: 'active-background',

        left: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            this.removeClass()
            document.querySelector('.pin-keyboard-box').remove()
            controls.select = controls.pinInputs
            controls.select.addActive()

        },
        down: function () {
        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },

    logOut: {
        items: document.getElementsByClassName('content-buttons-button-box'),
        index: 0,
        class: 'active-background',

        left: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {

        },
        down: function () {
        },
        back: function () {

        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    liveTv: {
        left: function () {


        },

        right: function () {

        },
        ok: function () {
        },

        up: function () {

        },
        down: function () {
        },
        back: function () {
            document.exitFullscreen()
            controls.select = controls.tvChannels
            controls.select.addActive()
        },
        addActive: function () {
        },
        firstActive: function () {

        },
        removeClass: function () {

        }
    },
    lockCategories: {
        items: document.getElementsByClassName('lock-settings-categories-content-cards-box'),
        index: 0,
        rowsIndex: 0,
        class: 'active-border',
        left: function () {
            if (this.rowsIndex == 0) {
                this.removeClass()
                controls.select = controls.back
                controls.select.addActive()
            }
            if (this.rowsIndex > 0) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.rowsIndex--
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.addActive()
                this.listTransY()
            }

        },

        right: function () {
            if (this.rowsIndex < this.items.length - 1) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position', this.index)
                this.rowsIndex++
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.addActive()
                this.listTransY()

            }
        },
        ok: function () {
            this.items[this.rowsIndex].getElementsByClassName('lock-categories-card-box')[this.index].click()
        },

        up: function () {
            if (this.index == 0) {
                this.removeClass()
                controls.select = controls.back
                controls.select.addActive()
            }
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTransY()
            }

        },
        down: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('lock-categories-card-box').length - 1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTransY()
            }
        },
        back: function () {
        },

        listTransY: function () {
            this.items[this.rowsIndex].style.transform = 'translateY(' + (- this.index * 108) + 'px)'
        },

        addActive: function () {
            this.items[this.rowsIndex].getElementsByClassName('lock-categories-card-box')[this.index].classList.add(this.class)
        },
        firstActive: function () {
            this.rowsIndex = 0
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('lock-categories-card-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('lock-categories-card-box')[i].classList.remove(this.class)
            }

        }
    }
}