function el(tagName,className) {
    var teg = document.createElement(tagName)

    if (className) {
        teg.className = className
    }

    return teg
}