

import "../stylesheets/styles.css"
import BaseImage from "./BaseImage"
import React, { useRef } from 'react'

export const MaskComponent = React.forwardRef((prop, ref) => {
    const currentMaskRef = useRef()

    React.useImperativeHandle(ref, () => ({
        setClass: (prop) => {
            currentMaskRef.current.className = prop
        },
        setMask: (newPath) => {
            currentMaskRef.current.style.WebkitMaskImage = 'url("' +
                newPath
                + '")'
        },
        setStyle: (styles) => {
            let allkeys = Object.keys(styles)
            allkeys.map(key => {
                currentMaskRef.current.style[key] = styles[key]
            })
        }

    }))

    return (
        <div
            ref={currentMaskRef}
            className='hideObject'
            style={{
                position: "absolute",
                width: '100%'
                , height: '100%',
                left: '0%',
                top: '0%',
                WebkitMaskImage: 'url("' +
                    prop.maskPath
                    + '")',
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: "no-repeat"
            }}
        >
            <BaseImage
                url={'bg/base.png'}
            />
        </div>
    )

})