import React, {useEffect, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'
import Pixel from "@components/canvas/pixel";

const conf = {
    size: 100,
    color: "red"
}

export default function Canvas() {


    const [isDrawMode, setIsDrawMode] = useState(false)
    const [cubes, setCubes] = useState<{ name: string, y: number, x: number }[]>([])

    useEffect(() => {
        let result: { name: string, y: number, x: number }[] = []
        Array.from({length: conf.size}).forEach((_, xI) => {
            Array.from({length: conf.size}).forEach((_, yI) => {
                const currentSize = (0.4 + 1)
                const y = (yI * currentSize) - (conf.size / 2 * currentSize) + (currentSize / 2)
                const x = (xI * currentSize) - (conf.size / 2 * currentSize) + (currentSize / 2)
                result.push({name: `${yI}-${xI}`, y, x})
            })
        })
        setCubes(result)
    }, [])

    console.log("+++")

    return <div
        className={"canvas"} style={{height: "600px", border: "1px solid black", width: "600px"}}
        onMouseDown={() => setIsDrawMode(true)}
        onMouseUp={() => setIsDrawMode(false)}
    >
        <CANVAS camera={{fov: 75, position: [0, 0, 95]}}>
            <ambientLight/>
            {cubes.map(c => <Pixel key={c.name} name={c.name} color={conf.color} isDrawMode={isDrawMode} x={c.x} y={c.y}
                                   z={0}/>)}
        </CANVAS>
    </div>

}