import "../stylesheets/styles.css";

var intervalList = []
var innerIntervalList = []
var timerList = []

var environIntervalList = []

export function initialAudio(audioList) {
    let allkeys = Object.keys(audioList)
    for (let i = 0; i < allkeys.length; i++) {
        audioList[allkeys[i]].play().catch(error => { })
            .catch(error => {
            })
        audioList[allkeys[i]].pause()
    }
}

export function returnAudioPath(num) {
    return prePathUrl() + "sounds/SB_37_Audio_" + num + '.mp3';
}

export function getMaskStyle(info) {

    let maskStyle = {
        position: "absolute", width: info.scale + "%",
        height: info.scale + "%"
        , left: -(info.scale - 100) / 2 + "%",
        bottom: -(info.scale - 100) / 2 + "%",
        WebkitMaskImage: 'url("' + prePathUrl() + 'images/' + info.url + '.svg")',
        WebkitMaskRepeat: "no-repeat",
        backgroundColor: "white"
    }

    return maskStyle;
}

export function blinkFunc(refList, delay, interval, delRefList = []) {
    var currentNum = timerList.length;
    var isPlus = true;
    var currentIndex = 0;

    if (delRefList.length > 0)
        delRefList.map(ref => {
            ref.current.setClass('character-disappear')
        })
    if (refList[0].current != null)
        refList[0].current.setClass('character-appear')

    timerList.push(
        setTimeout(() => {

            intervalList.push(
                setInterval(() => {
                    if (innerIntervalList[currentNum] != null)
                        clearInterval(innerIntervalList[currentNum])
                    innerIntervalList[currentNum] = setInterval(() => {
                        if (refList[currentIndex].current != null)
                            refList[currentIndex].current.setClass('character-disappear')
                        if (isPlus) {
                            if (currentIndex < refList.length - 1)
                                currentIndex++;
                            else {
                                isPlus = false
                                currentIndex--
                            }
                        }
                        else {
                            if (currentIndex > 0)
                                currentIndex--;
                            else {
                                isPlus = true;
                                currentIndex = 0;
                                clearInterval(innerIntervalList[currentNum])
                            }
                        }
                        if (refList[currentIndex].current != null)
                            refList[currentIndex].current.setClass('character-appear')
                    }, 100);
                }, interval)
            )
        }, delay)
    )
    return currentNum;
}

export function stopBlinkFunc(num) {
    clearInterval(intervalList[num])
    clearTimeout(timerList[num])
    clearInterval(innerIntervalList[num])
}

export function playEnvirAni(refList, interval) {

    let currentLength = environIntervalList.length;
    let currentNum = 0;

    refList[0].current.setClass('showObject')
    if (refList[0].current != null)
        environIntervalList.push(
            setInterval(() => {
                if (refList[currentNum].current != null) {
                    refList[currentNum].current.setClass('hideObject')

                    if (currentNum == refList.length - 1)
                        currentNum = 0
                    else
                        currentNum++

                    refList[currentNum].current.setClass('showObject')
                }
                else
                    clearInterval(environIntervalList[currentLength])


            }, interval)
        )

    return currentLength;

}

export function pauseEnvirAni(num) {
    clearInterval(environIntervalList[num])
}

//setting audio volumes...
var sourceList = [];
var gainNodeList = []
var audioCtxlist = []
var extraAudioList = []

export function setExtraVolume(audio, value) {
    if (!extraAudioList.includes(audio)) {
        extraAudioList.push(audio)
        audioCtxlist.push(new AudioContext())
        sourceList.push(audioCtxlist[audioCtxlist.length - 1].createMediaElementSource(audio))
        gainNodeList.push(audioCtxlist[audioCtxlist.length - 1].createGain())
        sourceList[sourceList.length - 1].connect(gainNodeList[gainNodeList.length - 1]);
        gainNodeList[gainNodeList.length - 1].connect(audioCtxlist[audioCtxlist.length - 1].destination);
        setVolume(extraAudioList.length - 1, value)
    }
    else {
        let index = extraAudioList.findIndex(element => element == audio)
        setVolume(index, value)
    }
}

function setVolume(index, value) {
    gainNodeList[index].gain.value = value; // double the volume
}

let sharePrePath = ''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    sharePrePath = './'
} else {
    // production code
    sharePrePath = './'
}

export const prePathUrl = () => sharePrePath;


export function getAudioPath(fileNum) {
    return prePathUrl() + "sounds/main/" + fileNum + '.mp3';
}


let primaryAudio, repeatAudio,
    repeatInterval, repeartTimer,
    repeatType = 1, subTimer;

//primary - 1
//only - 2

export function setPrimaryAudio(audio) {
    primaryAudio = audio
}

export function setRepeatAudio(audio) {
    repeatAudio = audio;
}

export function setRepeatType(type) {
    repeatType = type
}

export function startRepeatAudio(pastTime = 7000, intervalTime = 10000) {

    clearTimeout(repeartTimer)
    clearInterval(repeatInterval)

    repeartTimer = setTimeout(() => {
        repeatInterval = setInterval(() => {
            if (repeatType == 2)
                repeatAudio.play();
            else {
                clearTimeout(subTimer)
                primaryAudio.play()
                subTimer = setTimeout(() => {
                    repeatAudio.play()
                }, primaryAudio.duration * 1000 + 300);
            }
        }, intervalTime);
    }, pastTime);
}

export function stopRepeatAudio() {
    if (repeatAudio) {
        repeatAudio.pause();
        repeatAudio.currentTime = 0;
    }
    if (primaryAudio) {
        primaryAudio.pause()
        primaryAudio.currentTime = 0
    }

    clearTimeout(repeartTimer)
    clearTimeout(subTimer)
    clearInterval(repeatInterval)
}
