
import React, { useState, useEffect, useRef, useContext } from 'react';

import TitleScene from "../Scenes/titleScene";
import ScaleScene from "../Scenes/scaleScene";
import GameScene from "../Scenes/gameScene";
import ReviewScene from "../Scenes/reviewScene";
import MiddleDone from "../Scenes/middleDone";

import Excellent from "../Scenes/excellent"
import WellDone from "../Scenes/welldone"

import { MusicButton } from './CommonButtons';

var __geo;
import { UserContext } from "./BaseShot";

let currentSceneNum = 0;

const App = React.forwardRef(({ geo, _startTransition, baseGeo, bgLoaded }, ref) => {
  const audioList = useContext(UserContext)


  const [_isBackSoundPlaying, _setBackgroundPlaying] = useState(true);
  const [isGameFinished, setGameFinished] = useState(false)

  const musicRef = useRef();

  const sceneList = Array.from({ length: 6 }, ref => useRef())

  __geo = geo;

  useEffect(
    () => {
      musicRef.current.className = 'hideObject'

      sceneList[1].current.sceneLoad()
      sceneList[0].current.sceneLoad()

      return () => {
      }
    }, []
  )


  function nextFunc() {
    loadFunc()

    sceneList[currentSceneNum].current.sceneEnd()

    if (currentSceneNum == 0)
      setTimeout(() => {
        musicRef.current.fomartSound()
      }, 500);

    setTimeout(() => {

      currentSceneNum++
      sceneList[currentSceneNum].current.sceneStart()
    }, 300);
  }

  function loadFunc() {
    if (currentSceneNum > 0)
      sceneList[currentSceneNum + 1].current.sceneLoad()
  }

  function loadScene() {
    bgLoaded()
    sceneList[0].current.sceneStart()
  }

  function goHome() {
    setGameFinished(false)
    currentSceneNum = 0

    audioList.backAudio.pause()
    audioList.backAudio.currentTime = 0;


    setTimeout(() => {
      sceneList[1].current.sceneLoad()
      sceneList[0].current.sceneLoad()
    }, 500);

    musicRef.current.setClass('hideObject')

  }

  function finishGame() {
    setGameFinished(true)
  }


  return (
    <div >
      {
        !isGameFinished
          ?
          <div>
            <TitleScene ref={sceneList[0]} _startTransition={_startTransition} nextFunc={nextFunc}
              _baseGeo={baseGeo} _geo={__geo} />
            <ScaleScene ref={sceneList[1]}
              bgLoaded={loadScene} nextFunc={nextFunc} loadFunc={loadFunc} _startTransition={_startTransition}
              _baseGeo={baseGeo} _geo={__geo} />
            <MiddleDone ref={sceneList[2]} nextFunc={nextFunc} loadFunc={loadFunc} _baseGeo={baseGeo} _geo={__geo} />
            <GameScene ref={sceneList[3]} nextFunc={nextFunc} loadFunc={loadFunc} _baseGeo={baseGeo} _geo={__geo} />
            <WellDone ref={sceneList[4]} nextFunc={nextFunc} loadFunc={loadFunc} _baseGeo={baseGeo} _geo={__geo} />
            <ReviewScene ref={sceneList[5]} nextFunc={finishGame} _baseGeo={baseGeo} _geo={__geo} />
          </div>
          :
          <Excellent nextFunc={goHome} loadFunc={loadFunc} _baseGeo={baseGeo} _geo={__geo} />
      }

      <MusicButton ref={musicRef} _geo={__geo} backAudio={audioList.backAudio} />
    </div >
  );
})
export default App;