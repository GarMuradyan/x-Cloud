var liveTvData = [
    {
        name:'Favorites',
        type:'favorites'
    },
    {
        name:'All',
        type:'all',
        playlist: ''
    },
    {
        name:'Search',
        type:'search'
    },
    {
        name:'Movies',
        type:'movies',
        playlist: [
            {
                poster: 'https://www.lyngsat.com/logo/tv/tt/tv-3-tz.png',
                name:'Channel 2',
                epg: [
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'06:33'
                    },
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'08:55'
                    },
                ]
            },
            {
                poster: 'https://www.lyngsat.com/logo/tv/num/192_tv_nl.png',
                name:'Channel 1',
                epg: [
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'06:33'
                    },
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'08:55'
                    },
                ]
            },
        ]
    },
    {
        name:'Music',
        type:'music',
        playlist: [
            {
                poster: 'https://www.lyngsat.com/logo/tv/nn/new-world-tv-tg.png',
                name:'Channel 3',
                epg: [
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'06:33'
                    },
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'08:55'
                    },
                ]
            },
        ]
    },
    {
        name:'Education',
        type:'education',
        playlist: [
            {
                poster: 'https://www.lyngsat.com/logo/tv/bb/bharat-24-in.png',
                name:'Channel 4',
                epg: [
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'06:33'
                    },
                    {
                        desc:'dsadasdasdsafsdhsfsd fdhgfgfdadshgfgdfd',
                        time:'08:55'
                    },
                ]
            },
        ]
    },
]

if (liveTvData) {
    liveTvData[1].playlist = f()
}

function f() {
    var all = []
    if (liveTvData) {
        for (var i = 3; i < liveTvData.length; i++) {
            for (var j = 0; j < liveTvData[i].playlist.length; j++) {
                all.push(liveTvData[i].playlist[j])
            }
        }
    }
    return all
}

if (localStorage.getItem('live-tv-data')) {
    liveTvData = JSON.parse(localStorage.getItem('live-tv-data'))
}

var liveTvPlayerBottomData = [
    {
        name:'Sort',
        id:'sort-btn',
        classList:'sort'
    },
    {
        name:'Category',
        id:'categ-btn',
        classList:'category'
    },
    {
        name:'Favorites',
        id:'favorit-btn',
        classList:'favorit'
    },
    {
        name:'Menu',
        id:'menu-btn',
        classList:'menu'
    }
]