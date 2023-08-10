import React, {memo} from "react";
import Pixel from "@components/mood-canvas2/pixel";

const MemoizedPixels = memo((props: {
    pixels: { name: string, y: number, x: number }[]
    isDrawMode: boolean
}, context) => {
    return <>
        {props.pixels.map(c => {
                return <Pixel
                    key={c.name}
                    name={c.name}
                    isDrawMode={props.isDrawMode}
                    x={c.x}
                    y={c.y}
                    z={0}
                />
            }
        )}

    </>
});

export default MemoizedPixels