import React, { useEffect, useRef, useContext, useState } from 'react';
import "../stylesheets/styles.css";
import { initialAudio } from '../components/CommonFunctions';
import { UserContext } from '../components/BaseShot';
import { prePathUrl } from "../components/CommonFunctions";

let isGameplaying = false;

let timerList = []

const Scene = React.forwardRef(({ nextFunc, _geo, _startTransition }, ref) => {

    const audioList = useContext(UserContext)
    const playBtnRef = useRef();
    const titleRef = useRef()
    const baseObject = useRef()
    const parentRef = useRef()

    const [isSceneLoad, setSceneLoad] = useState(true)

    useEffect(fomartFunc, [])

    function clickFunc() {
        if (!isGameplaying)
            initialAudio(audioList)

        setTimeout(() => {
            if (!isGameplaying) {
                setTimeout(() => {
                    isGameplaying = true
                }, 500);
            }
            _startTransition(2)
            setTimeout(() => {
                audioList.wooAudio.play().catch(error => { });
                nextFunc();
            }, 300);

        }, 200);

    }


    const activeBtnFunc = () => {
        baseObject.current.className = 'aniObject'
        titleRef.current.className = 'introText'

        setTimeout(() => {
            playBtnRef.current.className = 'introText'
        }, 1000);

        setTimeout(() => {
            playBtnRef.current.className = 'commonButton'
            playBtnRef.current.style.pointerEvents = ''
        }, 2000);

    }

    React.useImperativeHandle(ref, () => ({
        sceneStart: () => {
            activeBtnFunc()
        },
        sceneEnd: () => {
            setSceneLoad(false)
        },
        sceneLoad: () => {
            setSceneLoad(true)
        }
    }))


    function fomartFunc() {

        playBtnRef.current.style.pointerEvents = 'none'

        return () => {
            audioList.titleAudio.pause();
            audioList.titleAudio.currentTime = 0;


            timerList.forEach(element => {
                clearTimeout(element)
            });
        }
    }

    return (
        <div ref={parentRef}>
            {
                isSceneLoad &&
                <div
                    ref={baseObject} className='hideObject'>
                    <div>
                        <div
                            ref={titleRef}
                            className="hideObject"
                        >
                            <div
                                style={{
                                    position: "fixed", width: _geo.width * .7 + "px",
                                    left: _geo.left + _geo.width * 0.2 + "px"
                                    , top: _geo.height * 0.02 + _geo.top + "px"
                                }}>
                                <img
                                    draggable={false}
                                    width={"100%"}
                                    src={prePathUrl() + 'images/bg/title.png'}
                                />
                            </div>
                            <div
                                style={{
                                    position: "fixed", width: _geo.width * .4 + "px",
                                    left: _geo.left + _geo.width * 0.3 + "px"
                                    , top: _geo.height * 0.55 + _geo.top + "px"
                                }}>
                                <img
                                    draggable={false}
                                    width={"100%"}
                                    src={prePathUrl() + 'images/bg/header.svg'}
                                />
                            </div>
                        </div>

                        <div
                            className="hideObject"
                            onClick={clickFunc}
                            ref={playBtnRef}
                            style={{
                                position: "fixed", width: _geo.width * 0.1 + "px",
                                left: _geo.width * 0.46 + _geo.left + "px"
                                , bottom: _geo.height * 0.1 + _geo.top + "px"
                            }}>
                            <img
                                draggable={false}
                                width={"100%"}
                                src={prePathUrl() + 'images/buttons/play_blue.svg'}
                            />
                        </div>

                    </div>
                </div>

            }

        </div>
    );
});

export default Scene;

