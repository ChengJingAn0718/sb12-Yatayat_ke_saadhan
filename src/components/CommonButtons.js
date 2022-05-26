
import React, { useRef, useState } from "react";
import "../stylesheets/styles.css";
import { prePathUrl } from "./CommonFunctions";

var isFullScreen = false;
var elem = document.documentElement;

const FullScreenBtn = React.forwardRef((prop, ref) => {

    if (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) {

        isFullScreen = true;
    }
    else
        isFullScreen = false;


    function screenControlFunc(prop) {
        if (!isFullScreen) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem = window.top.document.body; //To break out of frame in IE
                elem.msRequestFullscreen();
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                window.top.document.msExitFullscreen();
            }
        }
        isFullScreen = !isFullScreen
    }

    return (
        <div
            className='commonButton'
            ref={ref}
            style={{
                position: "fixed", width: prop._geo.width * 0.035 + "px",
                height: prop._geo.width * 0.035 + "px",
                left: 2.5 + "%",
                top: "2%",
                cursor: 'pointer',
            }}>
            <img draggable={false} onClick={() => { setTimeout(screenControlFunc, 200) }}
                width={"100%"}
                src={prePathUrl() + "images/Buttons/" + (!isFullScreen ? "fullscreen-svgrepo-com" : "exit-full-screen-svgrepo-com") + ".svg"}
            />
        </div>
    )
});

const MusicButton = React.forwardRef((prop, ref) => {

    const currentRef = useRef()
    const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);
    function controlBacksound() {
        if (_isBackSoundPlaying) {
            _setBackgroundPlaying(false);
            prop.backAudio.pause();
        }
        else {
            _setBackgroundPlaying(true);
            prop.backAudio.play().catch(error => { });
        }
    }

    React.useImperativeHandle(ref, () => ({
        fomartSound: () => {
            setTimeout(() => {
                currentRef.current.className = 'introText'
                prop.backAudio.currentTime = 0;
                prop.backAudio.play().catch(error => { });
                _setBackgroundPlaying(true);

            }, 500);
            setTimeout(() => {
                currentRef.current.className = 'commonButton'
            }, 2000);
        },
        setClass: (prop) => {
            currentRef.current.className = prop
        }
    }
    ))

    return (
        <div
            ref={currentRef}
            className='hideObject'
            onClick={controlBacksound}
            style={{
                position: "fixed", width: prop._geo.width * 0.055 + "px",
                height: prop._geo.width * 0.055 + "px",
                left: 2 + "%",
                top: "46%",
                cursor: 'pointer',
            }}>
            <img

                draggable={false}

                width={"100%"}
                src={prePathUrl() + "images/Buttons/" + (_isBackSoundPlaying ? "Audio_unmute" : "Audio_mute") + ".svg"}
            />
        </div>
    )
});


const LoadingCircleBar = React.forwardRef((prop, ref) => {
    return (
        <div
            ref={ref}
            style={{
                position: 'fixed',
                left: '0px',
                top: '0px',
                background: 'rgb(241 242 243)',
                width: window.innerWidth,
                height: window.innerHeight,
                pointerEvents: 'none'
            }}
        >
            <img
                style={{ position: 'absolute', width: '10%', top: '40%', left: '45%' }}
                src={prePathUrl() + "images/Buttons/loadingBar.gif"}
            />
        </div>
    )
})

export { FullScreenBtn, MusicButton, LoadingCircleBar }