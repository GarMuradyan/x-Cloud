var controls = {
    select:'',
    privius:'',

    login: {
        class:'active-border',
        index:0,
        items:document.getElementsByClassName('input-content-items'),

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
                    this.class = 'active-border'
                }
                this.addActive()
            }
            
        },
        down: function () {
            if (this.index < this.items.length-1) {
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
            this.class = 'active-border'
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
        class:'active-background',
        index:0,
        rowsIndex:0,
        items:document.getElementsByClassName('keyboard-rows-box'),

        left: function () {
            if (this.index > 0) {
                this.index--
                this.removeClass()
                this.addActive()
            }
        },
        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('keyboard-rows-item-box').length-1) {
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
                if (controls.privius === controls.search) {
                    this.removeClass()
                    controls.select = controls.back
                    controls.select.addActive()
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

            if (this.rowsIndex < this.items.length-1) {
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
        firstActive:function () {
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
        items:document.getElementsByClassName('menu-card-box'),
        index:0,
        class:'active-border',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()

            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
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
        items:document.getElementsByClassName('back-box'),
        index:0,
        class:'active-background',

        left: function () {

        },

        right: function () {
            if (document.querySelector('.search-button-box')) {
                this.removeClass()
                controls.select = controls.searchButton
                controls.select.addActive()   
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
            
        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            
        },
        down: function () {
            if (controls.privius === controls.search) {
                this.removeClass()
                controls.select = controls.keyboard
                controls.select.firstActive()
                return
            }
            if (document.querySelector('.movies-card-info-page')) {
                this.removeClass()
                controls.select = controls.playBuuton
                controls.select.addActive()
                return
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
            this.removeClass()
            controls.select = controls.headerComponents
            controls.select.addActive()
            controls.select.listTransX()
            
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
    searchButton: {
        items:document.getElementsByClassName('search-button-box'),
        index:0,
        class:'active-background',

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
        items:document.getElementsByClassName('header-components-box'),
        index:0,
        class:'active-background',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTransX()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTransX()
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
        },
        back: function () {
            
        },
        listTransX:function () {
            document.querySelector('.header-bottom-content-box').style.transform = 'translateX(' + (- this.index * 350) + 'px)'
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
        items:document.getElementsByClassName('content-rows-lists-box'),
        index:0,
        rowsIndex:0,
        class:'active-background',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTransX()
            }
        },

        right: function () {
            if (this.index < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTransX()
            }
        },

        ok: function () {
            this.items[this.rowsIndex].getElementsByClassName('card-name-box')[this.index].click()
        },

        up: function () {
            if (this.rowsIndex === 0 || this.rowsIndex === '0' ) {
                this.removeClass()
                controls.select = controls.headerComponents
                controls.select.addActive()
                this.listTransX()
            }

            if (this.rowsIndex > 0) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position',this.index)
                this.rowsIndex--
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.addActive()
                this.listTransY()
                this.listTransX()
            }
            
        },

        down: function () {
            if (this.rowsIndex < this.items.length-1) {
                this.removeClass()
                this.items[this.rowsIndex].setAttribute('position',this.index)
                this.rowsIndex++
                this.index = this.items[this.rowsIndex].getAttribute('position')
                this.addActive()
                this.listTransY()
                this.listTransX()
            }
        },
        back: function () {
            
        },

        listTransY: function () {
            document.querySelector('.parent-content-box').style.transform = 'translateY(' + ( - this.rowsIndex * 600) + 'px)'
        },

        listTransX: function () {
            document.getElementsByClassName('content-rows-lists-box')[this.rowsIndex].style.transform = 'translateX(' + ( - this.index * 345) + 'px)'
        },

        addActive: function () {
            this.items[this.rowsIndex].getElementsByClassName('card-name-box')[this.index].classList.add(this.class)
        },
        removeClass: function () {
            for (var i = 0; i < this.items[this.rowsIndex].getElementsByClassName('card-name-box').length; i++) {
                this.items[this.rowsIndex].getElementsByClassName('card-name-box')[i].classList.remove(this.class)
            }
        }
    },

    search: {

    },
    playBuuton: {
        items:document.getElementsByClassName('card-poster-play-button'),
        index:0,
        class:'active-background',

        left: function () {

        },

        right: function () {
            this.removeClass()
            controls.seasons.ok()
            controls.seasons.listTransX()
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
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    },
    seasons: {
        items:document.getElementsByClassName('season-card-box'),
        index:0,
        class:'active-background',

        left: function () {
            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTransX()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTransX()
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
            for (var i = 0; i < document.getElementsByClassName('season-card-box').length; i++) {
                document.getElementsByClassName('season-card-box')[i].classList.remove('active-background')
            }
            controls.select = controls.seasonsEpisodes
            controls.select.addActive()
            controls.select.listTransX()

        },
        back: function () {
            
        },
        addActive: function () {
            this.items[this.index].classList.add(this.class)
            this.items[this.index].classList.add('active-border')
        },
        listTransX:function () {
            if (this.items.length > 5) {
                document.querySelector('.season-top-content-box').style.transform = 'translateX('+ (- this.index * 140) + 'px)'   
            }
        },
        firstActive: function () {
            this.index = 0
            this.addActive()
        },
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
                this.items[i].classList.remove('active-border')
            }
        }
    },
    seasonsEpisodes: {
        items:document.getElementsByClassName('season-episode-card-name-box'),
        index:0,
        class:'active-background',

        left: function () {
            if (this.index === 0) {
                this.removeClass()
                controls.seasons.removeClass()
                controls.select = controls.playBuuton
                controls.select.addActive()
            }

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
                this.listTransX()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
                this.listTransX()
            }

        },

        ok: function () {
            this.items[this.index].click()
        },

        up: function () {
            this.removeClass()
            controls.select = controls.seasons
            controls.select.addActive()
            controls.select.listTransX()
            
        },
        down: function () {

        },
        back: function () {
            
        },
        listTransX:function () {
            document.querySelector('.season-bottom-content-box').style.transform = 'translateX('+ (- this.index * 140) + 'px)'
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
    settings: {
        items:document.getElementsByClassName('settings-card-box'),
        index:0,
        class:'active-background',

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
            if (this.index < this.items.length-1) {
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
        items:document.getElementsByClassName('live-tv-channels-card-box'),
        index:0,
        class:'active-background',

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
                this.addActive()
            }
            
        },
        down: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        back: function () {
            this.removeClass()
            tvCategoriesTitleClick()
        },
        blue: function () {
            menuButtonClick()
        },
        yellow:function () {
            
        },
        green:function () {
            
        },
        red:function () {
            
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
        items:document.getElementsByClassName('live-tv-categories-card-box'),
        index:0,
        class:'active-background',

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
                this.addActive()
            }
            
        },
        down: function () {
            if (this.index < this.items.length-1) {
                this.removeClass()
                this.index++
                this.addActive()
            }
        },
        back: function () {
            document.getElementById('root').innerHTML = ''
            page = 'menu'
            document.getElementById('root').append(renderLoadingPage())
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
        items:document.getElementsByClassName('pin-code-page-inputs-item-box'),
        index:0,
        class:'active-border',

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
            if (this.index < this.items.length-1) {
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
        items:document.getElementsByClassName('pin-keyboard-item-box'),
        index:0,
        class:'active-background',

        left: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
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
        items:document.getElementsByClassName('content-buttons-button-box'),
        index:0,
        class:'active-background',

        left: function () {

            if (this.index > 0) {
                this.removeClass()
                this.index--
                this.addActive()
            }
        },

        right: function () {
            if (this.index < this.items.length-1) {
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
    }
}