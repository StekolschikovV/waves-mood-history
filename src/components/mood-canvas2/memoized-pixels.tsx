import React, {memo} from "react";
import Pixel from "@components/mood-canvas2/pixel";
import * as THREE from "three";

const geometry = new THREE.SphereGeometry(1, 28, 28)

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
                    geometry={geometry}
                />
            }
        )}

    </>
});

export default MemoizedPixels