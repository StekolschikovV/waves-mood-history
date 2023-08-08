import React, {forwardRef, useEffect, useRef, useState} from "react";

import {BoxGeometry, Color, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";
import CanvasHelper from "@components/canvas/canvasHelper";
import {IPixel} from "@/interface";

interface IProps {
    name: string
    y: number
    x: number
    z: number
    isDrawMode: boolean
    color: string
    needUpdatePixels: number
    canvasHelper: CanvasHelper
    addNewPixelHandler: (pixel: IPixel) => void
}

const Pixel = forwardRef(({
                              isDrawMode,
                              needUpdatePixels,
                              addNewPixelHandler,
                              canvasHelper,
                              name,
                              color,
                              y,
                              x,
                              z = 0
                          }: IProps, ref) => {

    const innerRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);
    const [position, setPosition] = useState({
        x: ((Math.random() - 0.5) * 2) * 100,
        y: ((Math.random() - 0.5) * 2) * 100,
        z: ((Math.random() - 0.5) * 2) * 100
    })

    useEffect(() => {
        if (innerRef?.current) {
            gsap.to(innerRef.current.position, {x, y, z, duration: 0});
            gsap.to(innerRef.current.material, {opacity: 1, duration: 10});
        }
    }, [innerRef?.current])

    useEffect(() => {
        innerRef.current.material.color.set(canvasHelper.getMyColor(name))
    }, [needUpdatePixels])

    const playPixelSound = (volume: number) => {
        const pixelSound = new Audio('./sound/ui-click.mp3')
        pixelSound.volume = volume
        pixelSound.play()
    }

    const getPixelVolume = (name: string): number => {
        const volume = name.split("-").map(e => Math.abs(+e)).reduce((acc, e) => acc + e)
        return volume / 1000
    }

    const hoverAction = () => {
        const currentColor = innerRef.current.material.color
        const newColor = new Color(color)
        if (isDrawMode && !newColor.equals(currentColor)) {
            innerRef.current.material.color.set(color)
            playPixelSound(getPixelVolume(innerRef.current.name))
            gsap.to(innerRef.current.position, {z: 15, duration: 3});
            gsap.to(innerRef.current.position, {z: 0, duration: 3, data: 3});
            addNewPixelHandler({
                width: y,
                height: x,
                color: color
            })
        }
    }

    return <mesh
        onClick={hoverAction}
        name={name} ref={innerRef}
        onPointerOver={hoverAction}
        position={[position.y, position.x, position.z]}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial opacity={0} transparent={true}/>
    </mesh>
})

export default Pixel