var liveTvPlayerBottomData = [
    {
        name: 'Sort',
        id: 'sort-btn',
        classList: 'sort'
    },
    {
        name: 'Category',
        id: 'categ-btn',
        classList: 'category'
    },
    {
        name: 'Favorites',
        id: 'favorit-btn',
        classList: 'favorit'
    },
    {
        name: 'Menu',
        id: 'menu-btn',
        classList: 'menu'
    }
]

var liveCategories = {}

var liveChannels = {}

var liveTvCategories = null

var liveTvChannels = null

var liveTvData = null

var liveTvFavorits = {
    type: 'favorites',
    category_name: 'Favorites',
    playlist: []
}

var liveTvAll = {
    type: 'all',
    category_name: 'All',
    playlist: []
}

var liveTvSearch = {
    type: 'search',
    category_name: 'Search',
    playlist: []
}

if (localStorage.getItem('live-channels')) {
    liveChannels = JSON.parse(localStorage.getItem('live-channels'))
}