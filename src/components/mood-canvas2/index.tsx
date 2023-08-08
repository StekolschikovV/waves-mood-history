import React, {useEffect, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'
import Pixel from "@components/mood-canvas2/pixel";
import {useRootStore} from "@/providers/RootStoreProvider";
import {observer} from "mobx-react-lite";

export default observer(function MoodCanvas2() {

    const [isDrawMode, setIsDrawMode] = useState(false)
    const [pixels, setPixels] = useState<{ name: string, y: number, x: number }[]>([])

    const store = useRootStore();


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
        <div>
            <h1>{store.pixelStore.stateNew.size}</h1>
            <button onClick={e => store.pixelStore.color = "red"}>red</button>
            <button onClick={e => store.pixelStore.color = "blue"}>blue</button>
            <button onClick={e => store.pixelStore.color = "green"}>green</button>
            <button onClick={e => store.pixelStore.saveNewToBlockchain("USDT")}>save</button>
        </div>
        <div
            className={"canvas"} style={{
            height: "600px",
            border: "1px solid black",
            width: "600px",
            cursor: "crosshair"
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
        <ul>
            {store.pixelStore.data.map((ts, i) => {
                return <li key={i} onClick={(_) => {
                    store.pixelStore.travelToTime(ts.time)
                }}>{ts.time}</li>
            })}
        </ul>
    </>

})


