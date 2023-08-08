import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'
import Pixel from "@components/canvas/pixel";
import {IPixel} from "@/interface";
import CanvasHelper from "@components/canvas/canvasHelper";


interface IProps {
    color: string
    pixels: IPixel[]
    size?: number
}

let canvasHelper: CanvasHelper

const Canvas = forwardRef(({color, pixels, size = 100}: IProps, ref) => {

    useImperativeHandle(ref, () => ({
        test() {
            console.log("!!!")
        }
    }))

    const [needUpdatePixels, setNeedUpdatePixels] = useState(0)
    const [isDrawMode, setIsDrawMode] = useState(false)
    const [cubes, setCubes] = useState<{ name: string, y: number, x: number }[]>([])
    const [currentSlice, setCurrentSlice] = useState<IPixel[][] | null>(null)
    useEffect(() => {
        canvasHelper = new CanvasHelper(size)
    }, [])

    useEffect(() => {
        let result: { name: string, y: number, x: number }[] = []
        Array.from({length: size}).forEach((_, xI) => {
            Array.from({length: size}).forEach((_, yI) => {
                const currentSize = (0.4 + 1)
                const y = (yI * currentSize) - (size / 2 * currentSize) + (currentSize / 2)
                const x = (xI * currentSize) - (size / 2 * currentSize) + (currentSize / 2)
                result.push({name: `${99 - yI}-${99 - xI}`, y, x})
            })
        })
        setCubes(result)
    }, [])

    useEffect(() => {
        if (pixels.length > 0) {
            canvasHelper.upload(pixels)
            setNeedUpdatePixels(needUpdatePixels + 1)
        }
    }, [pixels])


    return <>
        {/*<button onChange={}> hide</button>*/}
        <div
            className={"canvas"} style={{
            height: "600px",
            border: "1px solid black",
            width: "600px",
        }}
            onMouseDown={() => setIsDrawMode(true)}
            onMouseUp={() => setIsDrawMode(false)}
        >
            <CANVAS camera={{fov: 75, position: [0, 0, 95]}}>
                <ambientLight/>
                {cubes.map(c => {
                        return <Pixel
                            needUpdatePixels={needUpdatePixels}
                            key={c.name}
                            name={c.name}
                            color={color}
                            canvasHelper={canvasHelper}
                            isDrawMode={isDrawMode}
                            x={c.x}
                            y={c.y}
                            z={0}/>
                    }
                )}
            </CANVAS>
        </div>
    </>

})

export default Canvas