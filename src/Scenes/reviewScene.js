import React, { useEffect, useRef, useContext, useState } from 'react';
import "../stylesheets/styles.css";
import BaseImage from '../components/BaseImage';
import { UserContext } from '../components/BaseShot';
import { prePathUrl, getAudioPath, setRepeatType, setRepeatAudio, startRepeatAudio, stopRepeatAudio, setExtraVolume } from "../components/CommonFunctions";
import { textInfoList, iconList, gapList } from "../components/CommonVarariant"


const loadCount = 6

var isRendered = false;
var isEffectPassed = false;

let imageCount = 0


let activeInterval
let timerList = []

let clickedList = []
let wordGround = [5, 5, 4, 4]

const posInfoList = [
    { x: 17, y: 40 },
    { x: 50, y: 40 },
    { x: 1, y: 70 },
    { x: 33, y: 70 },
    { x: 65, y: 70, m: true },

    { x: 17, y: 40 },
    { x: 50, y: 40 },
    { x: 1, y: 70 },
    { x: 33, y: 70 },
    { x: 65, y: 70, m: true },

    { x: 10, y: 40 },
    { x: 50, y: 40, m: true },
    { x: 10, y: 70 },
    { x: 50, y: 70, m: true },

    { x: 10, y: 40 },
    { x: 50, y: 40, m: true },
    { x: 10, y: 70 },
    { x: 50, y: 70, m: true },

]

let doneCount = 0
let stepCount = 0;
let lastIndex = 0
const Scene = React.forwardRef(({ nextFunc, _baseGeo, _geo }, ref) => {

    const audioList = useContext(UserContext)

    const textImageList = Array.from({ length: posInfoList.length }, ref => useRef())
    const clickRefList = Array.from({ length: posInfoList.length }, ref => useRef())
    const iconRefList = Array.from({ length: posInfoList.length }, ref => useRef())
    const wordBodyList = Array.from({ length: posInfoList.length }, ref => useRef())

    const pictureBody = useRef()
    const baseObject = useRef()
    const [isShowLater, setShowLater] = useState(false)

    const [isSceneLoad, setSceneLoad] = useState(false)


    useEffect(() => {

        return () => {
            imageCount = 0;
            isRendered = false;
            isEffectPassed = false;

            for (let i = 0; i < 10; i++) {
                audioList[i].currentTime = 0
                audioList[i].pause();
            }
            stepCount = 0;

            stopRepeatAudio()
        }
    }, [])

    React.useImperativeHandle(ref, () => ({
        sceneLoad: () => {
            setSceneLoad(true)
        },
        sceneStart: () => {
            timerList[0] = setTimeout(activeBtnFunc, 2500);

            setRepeatType(2)

            audioList.bodyAudio1.src = prePathUrl() + "sounds/main/common/review0.mp3"

            imageCount = 0;
            isEffectPassed = true;

            clickedList = []

            setRepeatAudio(audioList.commonAudio3)
            setExtraVolume(audioList.commonAudio3, 6)



            baseObject.current.className = 'aniObject'


        },
        sceneEnd: () => {
            imageCount = 0;
            isRendered = false;
            isEffectPassed = false;

            for (let i = 0; i < 10; i++) {
                audioList[i].currentTime = 0
                audioList[i].pause();
            }
            stepCount = 0;
        }
    }))

    const activeBtnFunc = () => {
        if (!isRendered) {
            isRendered = true;
            timerList[6] = setTimeout(() => {
                audioList.bodyAudio1.play();

                // timerList[7] = setTimeout(() => {
                //     audioList.bodyAudio2.play();

                timerList[8] = setTimeout(() => {
                    audioList.commonAudio3.play()
                    startRepeatAudio()
                    // }, audioList.bodyAudio2.duration * 1000 + 300);
                }, audioList.bodyAudio1.duration * 1000 + 500);
            }, 1000);

            // baseObject.current.className = 'aniObject'
        }
    }

    const testFunction = (groupNum, isClicked) => {

        setShowLater(true)

        setTimeout(() => {
            let fromCount = 0, toCount = 0;
            wordGround.map((value, index) => {
                if (index < groupNum)
                    fromCount += value
            })

            toCount = fromCount + wordGround[groupNum]

            wordBodyList.map((value, index) => {
                if (index >= fromCount && index < toCount) {
                    value.current.className = 'showObject'
                    if (isClicked)
                        clickFunc(index)
                }
                else
                    value.current.className = 'hideObject'
            })
        }, 500);

    }

    const loadImage = () => {
        if (!isRendered) {
            imageCount++

            if (imageCount == loadCount) {
                clearTimeout(timerList[0])
                activeInterval = setInterval(() => {
                    if (isEffectPassed) {
                        activeBtnFunc();
                        clearInterval(activeInterval)
                    }
                }, 100);
            }
        }
    }

    const stopLastAudio = () => {
        audioList[lastIndex].pause()
        audioList[lastIndex].currentTime = 0
    }

    const clickFunc = (num) => {
        stopRepeatAudio()

        let index = num
        clickRefList[index].current.style.pointerEvents = 'none'

        iconRefList[index].current.style.transition = '0.15s'
        iconRefList[index].current.style.transform = 'scale(0.9)'

        stopLastAudio()

        lastIndex = num
        timerList.map(timer => clearTimeout(timer))

        audioList.bodyAudio1.pause()
        audioList.bodyAudio2.pause()

        setTimeout(() => {
            if (posInfoList[index].m) {
                pictureBody.current.style.transition = '1s'
                pictureBody.current.style.left = (_geo.left + _geo.width * 0.03) + 'px'
            }

            iconRefList[index].current.style.transform = 'scale(1)'
            textImageList[index].current.style.transition = '1s'
            textImageList[index].current.style.left = textInfoList[index].lm + "%"

        }, 150);

        clickedList.push(index)

        setExtraVolume(audioList[index], 6)
        setTimeout(() => {
            audioList[index].play();
        }, 50);

        if (clickedList.length == doneCount + wordGround[stepCount]) {
            setTimeout(() => {
                if (stepCount != wordGround.length - 1)
                    goNextStep();
                else
                    nextFunc()
            }, 4000);
        }
        else {
            startRepeatAudio()
        }

        setShowLater(true)

    }

    const goNextStep = () => {
        pictureBody.current.style.transition = '0.3s'
        pictureBody.current.style.opacity = 0
        doneCount = clickedList.length
        stepCount++
        setTimeout(() => {
            pictureBody.current.style.transition = '0s'
            pictureBody.current.style.left = (_geo.left + _geo.width * 0.1) + 'px'

            wordBodyList.map((value, index) => {
                if (index > doneCount - 1) {
                    if (stepCount != wordGround.length - 1 && index < doneCount + wordGround[stepCount])
                        value.current.className = 'showObject'
                    if (stepCount == wordGround.length - 1)
                        value.current.className = 'showObject'
                }
                else
                    value.current.className = 'hideObject'
            })
        }, 300);
        setTimeout(() => {
            pictureBody.current.style.transition = '0.6s'
            pictureBody.current.style.opacity = 1
            startRepeatAudio()
        }, 350);
    }

    const returnSetName = (index) => {
        let num = 1
        let sum = 0
        for (let i = 0; i < wordGround.length; i++) {
            sum += wordGround[i]
            if (index < sum) {
                break;
            }
            else
                num++
        }
        return num;
    }


    return (
        <div>

            {isSceneLoad
                &&
                <div ref={baseObject}
                    className='hideObject'
                    style={{
                        position: "fixed", width: _baseGeo.width + "px"
                        , height: _baseGeo.height + "px",
                        left: _baseGeo.left + 'px',
                        top: _baseGeo.top + 'px',
                    }}
                >

                    <BaseImage url='bg/green_bg.png' />
                    <div
                        style={{
                            position: "fixed", width: _geo.width * 0.5 + "px",
                            height: _geo.width * 0.08 + "px",
                            left: _geo.left + _geo.width * 0.32
                            , top: _geo.top + _geo.height * 0.05
                            , cursor: "pointer",
                        }}>
                        <img
                            width={"100%"}
                            draggable={false}
                            onLoad={loadImage}
                            src={prePathUrl() + 'images/word/title.png'}
                        />
                    </div>

                    <div
                        ref={pictureBody}
                        style={{
                            position: 'fixed', width: _geo.width + 'px',
                            height: _geo.height + 'px',
                            left: _geo.left + _geo.width * 0.1 + 'px',
                            top: _geo.top + 'px'
                        }}>
                        {
                            textImageList.map((value, index) => (isShowLater || index < wordGround[0]) &&
                                <div
                                    key={index}
                                    ref={wordBodyList[index]}
                                    className={index > wordGround[0] - 1 ? 'hideObject' : ''}
                                    style={{
                                        position: 'absolute',
                                        left: posInfoList[index].x + '%',
                                        top: posInfoList[index].y + '%',
                                        width: 14 + '%',
                                        height: 25 + '%',
                                    }}>

                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '83%',
                                            top: '0%',
                                            width: 200 + '%',
                                            height: 100 + '%',
                                            pointerEvents: 'none',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <div
                                            ref={textImageList[index]}
                                            style={{
                                                position: 'absolute',
                                                left: '-100%',
                                                top: '0%',
                                                width: 100 + '%',
                                                height: 100 + '%',
                                                pointerEvents: 'none',
                                            }}
                                        >

                                            <img
                                                style={{
                                                    position: 'absolute',
                                                    width: _geo.width * textInfoList[index].s,
                                                    left: (0.082 - textInfoList[index].l) * _geo.width,
                                                    top: _geo.height * (0.03 - textInfoList[index].t)
                                                }}
                                                src={prePathUrl() + "images/word/" + returnSetName(index) + "/" + textInfoList[index].path + ".png"}

                                            />
                                        </div>
                                    </div>

                                    <img
                                        ref={iconRefList[index]}
                                        style={{
                                            position: 'absolute',
                                            width: _geo.width * 0.14,
                                            left: (0 + gapList[index].x) * _geo.width,
                                            top: _geo.height * (0.03 + gapList[index].y)
                                        }}
                                        onLoad={index < wordGround[0] ? loadImage : null}
                                        src={prePathUrl() + "images/word/" + returnSetName(index) + "/" + iconList[index] + ".png"}
                                    />
                                    <div
                                        ref={clickRefList[index]}
                                        onClick={() => { clickFunc(index) }}
                                        style={{
                                            position: 'absolute',
                                            left: '0%',
                                            top: '13%',
                                            width: 100 + '%',
                                            height: 100 + '%',
                                            cursor: 'pointer',
                                            borderRadius: '50%'
                                        }}
                                    >
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            }

        </div>
    );
});

export default Scene;
