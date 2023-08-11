import React, {memo} from "react";
import Pixel from "@components/mood-canvas2/pixel";

const MemoizedPixel = memo((props: {
    name: string, y: number, x: number, z: number
}, context) => {
    return <Pixel
        key={props.name}
        name={props.name}
        x={props.x}
        y={props.y}
        z={props.z}
    />
})
const MemoizedPixels = memo((props: {
    pixels: { name: string, y: number, x: number }[]
}, context) => {
    return <>
        {props.pixels.map(c => {
                return <MemoizedPixel
                    key={c.name}
                    name={c.name}
                    x={c.x}
                    y={c.y}
                    z={0}
                />
            }
        )}

    </>
});

export default MemoizedPixels