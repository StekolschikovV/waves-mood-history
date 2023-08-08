import React, {useEffect, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'
import Pixel from "@components/mood-canvas2/pixel";

export default function MoodCanvas2() {

    const [isDrawMode, setIsDrawMode] = useState(false)
    const [pixels, setPixels] = useState<{ name: string, y: number, x: number }[]>([])

    useEffect(() => {
        let result: { name: string, y: number, x: number }[] = []
        Array.from({length: 100}).forEach((_, xI) => {
            Array.from({length: 100}).forEach((_, yI) => {
                const currentSize = (0.4 + 1)
                const y = (yI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2)
                const x = (xI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2)
                result.push({name: `${yI}-${xI}`, y, x})
            })
        })
        setPixels(result)
    }, [])

    return <>

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
                {pixels.map(c => {
                        return <Pixel
                            key={c.name}
                            name={c.name}
                            isDrawMode={isDrawMode}
                            x={c.x}
                            y={c.y}
                            z={0}
                        />
                    }
                )}
            </CANVAS>
        </div>
    </>

}