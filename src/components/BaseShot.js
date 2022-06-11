import { useRef, useEffect, useState, createContext } from "react";
import App from "./App";
import { isMobile, isIOS } from "react-device-detect";
import "../stylesheets/styles.css";
import loadSound from "../utils/loadSound"
import { prePathUrl } from "./CommonFunctions";
import { LoadingCircleBar } from "./CommonButtons"

const animationColorList = [
    ['#51c9b5', '#cc55d9', '#f55185'],
    ['#43c9e0', '#15ed76', '#f2e01d'],
    ['#f2e01d', '#0269b8', '#a6074c'],
    ['#a6074c', '#361394', '#eb2f80'],
    ['#1e70eb', '#880a91', '#f0a11a'],
    ['#51c9b5', '#cc55d9', '#dfeb88']
]

let titleAudio = new loadSound('intro/2');

let clapAudio = new loadSound('clap', true);
let backAudio = new loadSound('bmusic', true);
let yeahAudio = new loadSound('yeah', true);
let buzzAudio = new loadSound('buzz', true);
let tingAudio = new loadSound('ting', true);
let wooAudio = new loadSound('woo', true);
let replayAudio = new loadSound('replayAudio', true);
let successAudio = new loadSound('success', true);


let bodyAudio1 = new loadSound('intro/2');
let bodyAudio2 = new loadSound('intro/2');
let bodyAudio3 = new loadSound('intro/2');

let commonAudio1 = new loadSound('common/common1');
let commonAudio2 = new loadSound('common/common2');
let commonAudio3 = new loadSound('common/common3');

let subAudioList = []


Array.from(Array(18).keys()).map(value => {
    subAudioList.push(new loadSound('word/' + (value + 1)))
})

backAudio.volume = 0.04;

wooAudio.volume = 0.8;
successAudio.volume = 0.4;

yeahAudio.volume = 0.4
clapAudio.volume = 0.8
buzzAudio.volume = 0.3
tingAudio.volume = 1

isGameStarted = true;

var isOff = false;

let audioList = {
    titleAudio,
    replayAudio,
    clapAudio,
    backAudio,
    yeahAudio,
    tingAudio,
    wooAudio,
    buzzAudio,

    bodyAudio1,
    bodyAudio2,
    bodyAudio3,

    commonAudio1,
    commonAudio2,
    commonAudio3,

    successAudio,
    ...subAudioList
}

var isGameStarted = true;
var volumeList = []

let backgroundSize = { width: 0, height: 0, left: 0, bottom: 0, right: 0, top: 0 }
let isGameLoaded = false;
const UserContext = createContext();

//remove colsoles
console.log = function () { }

export default function BaseShot() {

    // const standardRate = 1920 / 969;
    // const backRate = 1600 / 900;
    const standardRate = 1600 / 900;
    const [_sizeState, setSizeState] = useState(true);

    const loadingBar = useRef()

    const transitionObject = useRef();
    const coloredObjects = [useRef(), useRef(), useRef()];


    const [geometry, setGeometry] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        left: 0,
        top: 0
    });


    function onOffSound() {
        let allKeys = Object.keys(audioList)
        if (isOff) {
            allKeys.map(
                (key, index) => {
                    audioList[key].volume = volumeList[index]
                })
        }
        else {
            allKeys.map((key, index) => {
                volumeList[index] = audioList[key].volume
                audioList[key].volume = 0
            })
        }
        isOff = !isOff
    }

    function backgroundLoaded() {
        if (!isGameLoaded) {
            isGameLoaded = true
            setTimeout(() => {
                loadingBar.current.className = 'hide'
            }, 300);
        }
    }

    function setLoop(audio) {
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            audio.play().catch(error => { })
        },
            false)
    }

    function playGame() {
        setLoop(backAudio)
    }


    useEffect(() => {
        isGameStarted = true;
        let timeout;

        setLoop(backAudio)
        setTimeout(() => {
            playGame()
        }, 1000);

        transitionObject.current.style.display = 'none'

        var hidden = "hidden";

        if (hidden in document)
            document.addEventListener("visibilitychange", onOffSound);
        else if ((hidden = "mozHidden") in document)
            document.addEventListener("mozvisibilitychange", onOffSound);
        else if ((hidden = "webkitHidden") in document)
            document.addEventListener("webkitvisibilitychange", onOffSound);
        else if ((hidden = "msHidden") in document)
            document.addEventListener("msvisibilitychange", onOffSound);


        setTimeout(() => {
            setWindowResizing();
        }, 100);

        const handleResize = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {

                setWindowResizing();
            }, 100);
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 1 - center center, 2 - center bottom , 3-left center ,  4 - left bottom, 5 - left top , 6-center top


    function startTransition(num = 0) {
        transitionObject.current.style.display = 'inline-block';
        if (innerHeight / innerWidth > 700 / 1024) {
            transitionObject.current.className = 'changeTran1';
        } else
            transitionObject.current.className = 'changeTran';

        for (let i = 0; i < 3; i++)
            coloredObjects[i].current.style.backgroundColor = animationColorList[num][i]
        setTimeout(() => {
            transitionObject.current.className = '';
            transitionObject.current.style.display = 'none';
        }, 3000);
    }



    function setWindowResizing() {


        let width = window.innerWidth;
        let height = window.innerHeight;
        let suitWidth = width;
        let suitHeight = height;
        let left = 0;
        let top = 0;


        backgroundSize.width = width;
        backgroundSize.height = height;

        backgroundSize.left = 0;
        backgroundSize.bottom = 0;
        backgroundSize.right = 0;
        backgroundSize.top = 0;

        if (height * standardRate > width) {
            suitHeight = width / standardRate;

            backgroundSize.width = height * standardRate;

            backgroundSize.left = -1 * (backgroundSize.width - width) / 2;


            top = (height - suitHeight) / 2;
        } else if (height * standardRate < width) {
            suitWidth = height * standardRate;
            backgroundSize.height = width / standardRate;
            backgroundSize.bottom = -1 * (backgroundSize.height - height) / 2;
            left = (width - suitWidth) / 2;
        }
        if (window.innerWidth < window.innerHeight)
            setSizeState(false);
        else
            setSizeState(true);


        backgroundSize.top = backgroundSize.bottom
        backgroundSize.right = backgroundSize.left

        setGeometry({ width: suitWidth, height: suitHeight, left: left, top: top, first: false })
    }


    return (
        <div style={
            {
                backgroundColor: "#6148c4",
                width: "100%",
                height: "100%",
                position: "fixed",
                left: "0px",
                top: "0px",
                textAlign: "center"
            }
        } >

            <div
                style={
                    { background: "transparent" }} >

                <UserContext.Provider value={audioList} >
                    <App
                        _startTransition={startTransition}
                        bgLoaded={backgroundLoaded}
                        geo={geometry}
                        baseGeo={backgroundSize}
                    />
                </UserContext.Provider>
            </div>


            <div ref={transitionObject} >
                <div ref={coloredObjects[0]}
                    style={
                        {
                            backgroundColor: '#7372f2',
                            width: '18000%',
                            height: '500%',
                            bottom: '-0%',
                            right: '-200%',
                            position: 'absolute'
                        }
                    } >
                </div>

                <div ref={coloredObjects[1]}
                    style={
                        {
                            backgroundColor: '#1f77ff',
                            width: '18000%',
                            height: '500%',
                            bottom: '500%',
                            right: '-200%',
                            position: 'absolute'
                        }
                    } >
                </div>

                <div ref={coloredObjects[2]}
                    style={
                        {
                            backgroundColor: '#3334f2',
                            width: '18000%',
                            height: '5000%',
                            bottom: '1000%',
                            right: '-200%',
                            position: 'absolute'
                        }
                    } >
                </div>

            </div>

            <LoadingCircleBar ref={loadingBar} />

            {
                !_sizeState && <div className="block"
                    style={
                        {
                            position: "fixed",
                            left: "0px",
                            top: "0px",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "black",
                            opacity: "0.9",
                            textAlign: "center"
                        }
                    } >
                    <h1
                        style={
                            {
                                fontSize: '10vw',
                                color: 'white',
                                position: 'absolute',
                                top: '38%',
                                left: '10%',
                                padding: '0px',
                                fontFamily: 'popin'
                            }
                        } >
                        Rotate your device!
                    </h1> </div>
            }

        </div>
    )
}

export { UserContext }