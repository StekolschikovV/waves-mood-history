import React, {forwardRef, useEffect, useRef, useState} from "react";

import {BoxGeometry, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";
import {useRootStore} from "@/providers/RootStoreProvider";

interface IProps {
    name: string
    y: number
    x: number
    z: number
    isDrawMode: boolean
}

const Pixel = forwardRef((
    {
        isDrawMode,
        name,
        y,
        x,
        z = 0
    }: IProps, ref) => {

    const store = useRootStore();


    const innerRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);
    const [position, setPosition] =
        useState({x, y, z})

    useEffect(() => {
        if (innerRef?.current) {
            // gsap.to(innerRef.current.position, {x, y, z, duration: 0});
            gsap.to(innerRef.current.material, {opacity: 1, duration: 2});
        }
    }, [innerRef?.current])

    useEffect(() => {
        innerRef.current.material.color.set(store.pixelStore.state.get(name) || "white")
    }, [store.pixelStore.state])

    // useEffect(() => {
    //     innerRef.current.material.color.set(canvasHelper.getMyColor(name))
    // }, [needUpdatePixels])

    const playPixelSound = (volume: number) => {
        const pixelSound = new Audio('./sound/ui-click.mp3')
        pixelSound.volume = volume
        pixelSound.play()
    }

    const getPixelVolume = (name: string): number => {
        const volume = name.split("-").map(e => Math.abs(+e)).reduce((acc, e) => acc + e)
        return volume / 1000
    }

    const hoverAction = (isClick = false) => {
        if (isDrawMode || isClick) {
            gsap.to(innerRef.current.position, {z: 3, duration: 3});
            innerRef?.current?.material?.color.set(store.pixelStore.color)
            gsap.to(innerRef.current.position, {z: 0, duration: 1, delay: 2});
            playPixelSound(getPixelVolume(innerRef.current.name))
            store.pixelStore.addNewPixel(name, store.pixelStore.color)
        }
    }

    return <mesh
        onClick={() => hoverAction(true)}
        name={name} ref={innerRef}
        onPointerOver={() => hoverAction(false)}
        position={[position.y, position.x, position.z]}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial opacity={0} transparent={true}/>
    </mesh>
})

export default Pixel