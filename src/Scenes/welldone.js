import "../stylesheets/styles.css";
import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from "../components/BaseShot"
import { setExtraVolume } from "../components/CommonFunctions"
import { prePathUrl, getAudioPath } from "../components/CommonFunctions";

const timerList = [];

const Scene = React.forwardRef(({ nextFunc, loadFunc, _baseGeo }, ref) => {

    const audioList = useContext(UserContext)
    const [isSceneLoad, setSceneLoad] = useState(false)

    const parentRef = useRef()
    const spakleRef = useRef()

    useEffect(() => {

        return () => {

        }
    }, [])



    React.useImperativeHandle(ref, () => ({
        sceneLoad: () => {
            setSceneLoad(true)
        },
        sceneStart: () => {
            parentRef.current.className = 'aniObject'
            spakleRef.current.className = 'excellentText'

            audioList.bodyAudio1.src = getAudioPath('common/welldone')

            loadFunc()

            timerList[0] = setTimeout(() => {
                audioList.bodyAudio1.play().catch(error => { });
            }, 1500);

            timerList[2] = setTimeout(() => {
                audioList.clapAudio.play().catch(error => { });
                audioList.yeahAudio.play().catch(error => { });
            }, 3000);

            timerList[1] = setTimeout(() => {
                nextFunc();
            }, 10000);
        },
        sceneEnd: () => {
            audioList.clapAudio.pause();
            audioList.yeahAudio.pause();

            audioList.bodyAudio1.pause();

            audioList.clapAudio.currentTime = 0;
            audioList.yeahAudio.currentTime = 0;

            for (let i = 0; i < timerList.length; i++)
                clearTimeout(timerList[i])

            setSceneLoad(false)
        }
    }))

    return (
        <div>{
            isSceneLoad &&
            <div ref={parentRef} className='hideObject'>
                < div ref={spakleRef} className="hideObject" style={{
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

                < div className="" style={{
                    position: "fixed",
                    width: _baseGeo.width * 1 + "px",
                    height: _baseGeo.height + 'px',
                    left: _baseGeo.left + "px",
                    top: _baseGeo.top + "px",

                }}>
                    <img width={"100%"}
                        src={prePathUrl() + "images/bg/welldone.png"}
                    />
                </div>
            </div>
        }
        </div>
    );
})

export default Scene;
