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
        removeClass: function () {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].classList.remove(this.class)
            }
        }
    }
}