import { prePathUrl } from "../components/CommonFunctions";

const loadSound = (name, isEffectSound = false) => {
    return new Audio(prePathUrl() + "sounds/" + (isEffectSound ? "effect/" :"main/") + name + ".mp3")
}

export default loadSound