var os = 'web'

if (window.tizen) {
    os = 'tizen'
}

if (os === 'tizen') {
    console.log(os);
    tizen.tvinputdevice.registerKeyBatch(
        ['ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue']
    )
}