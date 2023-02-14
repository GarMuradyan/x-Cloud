function renderinputBox(placeholder,type,className,classList) {
    var inputBox = el('input',className)
    inputBox.setAttribute('placeholder',placeholder)
    inputBox.setAttribute('type',type)
    inputBox.classList.add(classList)

    return inputBox
}