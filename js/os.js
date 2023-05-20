var os = 'web'

if (window.tizen) {
    os = 'tizen'
}

if (os === 'tizen') {
    console.log(os);
    tizen.tvinputdevice.registerKeyBatch(
        ['VolumeUp', 'VolumeDown', 'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow', 'ColorF3Blue']
    )
}