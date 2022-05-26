import React, { useRef } from "react";
import "../stylesheets/styles.css"
import { prePathUrl } from "./CommonFunctions";

const BaseImage = (prop, ref) => {

    let style = {
        left: '0px',
        top: '0px',

    };

    const currentRef = useRef();

    let widthScale = '100%'
    if (prop.style) {
        style = { ...style, ...prop.style }
        // if (prop.style.transition == null)
        //     style.transition = '0.7s'
    }

    if (prop.scale != null)
        widthScale = prop.scale * 100 + "%";

    if (prop.posInfo != null) {
        if (prop.posInfo.l != null) {
            style.left = 100 * prop.posInfo.l + '%'
            delete style.right;
        }

        if (prop.posInfo.t != null) {
            style.top = 100 * prop.posInfo.t + '%'
            delete style.bottom;
        }
        if (prop.posInfo.b != null) {
            style.bottom = 100 * prop.posInfo.b + '%'
            delete style.top;
        }

    }



    React.useImperativeHandle(ref, () => ({
        setClass: (className) => {
            currentRef.current.className = "baseImage " + className
        }
        ,
        setStyle: (styles) => {
            let allkeys = Object.keys(styles)
            allkeys.map(key => {
                currentRef.current.style[key] = styles[key]
            })
        }
        ,
        setUrl: (url) => {
            currentRef.current.src = prePathUrl() + "images/" + url
        }
        ,
        setPosInfo: (posInfo) => {
            if (posInfo != null) {
                if (posInfo.l != null)
                    currentRef.current.style.left = 100 * posInfo.l + '%'
                if (posInfo.t != null) {
                    currentRef.current.style.top = 100 * posInfo.t + '%'
                    delete style.bottom;
                }
                if (posInfo.b != null) {
                    currentRef.current.style.bottom = 100 * posInfo.b + '%'
                    delete style.top;
                }

                if (posInfo.s != null)
                    currentRef.current.style.width = posInfo.s * 100 + '%'
            }
        }
    }))




    return (
        <img
            draggable={false} className={"baseImage " + (prop.className != null ? prop.className : '')}
            width={widthScale}
            src={prePathUrl() + "images/" + prop.url}
            style={style}
            onClick={prop.onClick}
            ref={currentRef}
            onLoad={prop.onLoad}
        />
    )
}

export default React.forwardRef(BaseImage);
