import React, { useContext, useRef, useEffect } from 'react';
import "../stylesheets/styles.css";
import { UserContext } from "../components/BaseShot"
import { isIOS } from "react-device-detect";
import { setExtraVolume, setRepeatAudio, setRepeatType, startRepeatAudio, stopRepeatAudio } from "../components/CommonFunctions"
import { prePathUrl } from "../components/CommonFunctions";

let timerList = []

export default function Scene18({ nextFunc, _geo, _baseGeo }) {

    const audioList = useContext(UserContext)
    const replayBtn = useRef()
    useEffect(() => {

        audioList.bodyAudio1.src = prePathUrl() + "sounds/effect/excellent.mp3"
        setRepeatAudio(audioList.replayAudio)
        setRepeatType(2)

        timerList[0] = setTimeout(() => {
            audioList.clapAudio.pause();
            audioList.clapAudio.currentTime = 0;

            audioList.yeahAudio.pause();
            audioList.yeahAudio.currentTime = 0;

            audioList.bodyAudio1.play();
        }, 2000);

        timerList[4] = setTimeout(() => {
            audioList.clapAudio.play().catch(error => { }).catch(error => { })
            audioList.yeahAudio.play().catch(error => { }).catch(error => { })
            replayBtn.current.className = 'aniObject'
        }, 4000);


        timerList[1] = setTimeout(() => {
            audioList.backAudio.volume = 0.02;

            audioList.yeahAudio.volume = 0.2
            audioList.clapAudio.volume = 0.4


            audioList.replayAudio.play().catch(error => { });
            startRepeatAudio()

            timerList[3] = setTimeout(() => {
                audioList.backAudio.volume = 0.04;
                audioList.yeahAudio.volume = 0.4
                audioList.clapAudio.volume = 0.8

            }, audioList.replayAudio.duration * 1000);
        }, 7500);

        return () => {

            stopRepeatAudio()

            timerList.map(timer => {
                clearTimeout(timer)
            })

            audioList.bodyAudio1.pause();
            audioList.replayAudio.pause();

            audioList.clapAudio.pause();
            audioList.yeahAudio.pause();

            audioList.clapAudio.currentTime = 0;
            audioList.yeahAudio.currentTime = 0;
            audioList.replayAudio.currentTime = 0;

            audioList.replayAudio.pause();

            audioList.backAudio.volume = 0.04;
            audioList.yeahAudio.volume = 0.4
            audioList.clapAudio.volume = 0.8
        }
    }, [])

    return (
        <div className='aniObject'>

            < div className="excellentText" style={{
                position: "fixed",
                width: _baseGeo.width * 1 + "px",
                height: _baseGeo.height + 'px',
                left: _baseGeo.left + "px",
                top: _baseGeo.top + "px",

            }}>
                <img width={"100%"}
                    src={prePathUrl() + "images/bg/spakle.png"}
                />
            </div>

            < div
                style={{
                    position: "fixed",
                    width: _baseGeo.width + "px",
                    height: _baseGeo.height + 'px',
                    left: _baseGeo.left + "px",
                    top: _baseGeo.top + "px",
                }}>
                <img width={"100%"}
                    src={prePathUrl() + "images/bg/excellent.png"}
                />
            </div>

            <div ref={replayBtn}
                className='hideObject'
            >
                <div
                    className='commonButton'
                    onClick={() => {
                        setTimeout(() => {
                            nextFunc()
                        }, 200);
                    }}
                    style={{
                        position: "fixed", width: _geo.width * 0.1 + "px",
                        height: _geo.width * 0.1 + "px",
                        left: _geo.left + _geo.width * 0.45
                        , top: _geo.top + _geo.height * 0.8
                        , cursor: "pointer",
                    }}>
                    <img

                        width={"100%"}
                        draggable={false}
                        src={prePathUrl() + 'images/Buttons/Replay_Blue.svg'}
                    />
                </div>
            </div>
        </div>
    );
}
