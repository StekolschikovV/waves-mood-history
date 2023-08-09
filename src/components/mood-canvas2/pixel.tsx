import React, {forwardRef, useEffect, useRef, useState} from "react";

import {BoxGeometry, Color, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";
import {useRootStore} from "@/providers/RootStoreProvider";
import {observer} from "mobx-react-lite";

interface IProps {
    name: string
    y: number
    x: number
    z: number
    isDrawMode: boolean
}

const Pixel = observer(forwardRef((
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
        if ((isDrawMode || isClick) && !innerRef?.current?.material?.color.equals(new Color(store.pixelStore.color))) {
            gsap.to(innerRef.current.position, {z: 3, duration: 0.5});
            innerRef?.current?.material?.color.set(store.pixelStore.color)
            gsap.to(innerRef.current.position, {z: 0, duration: 0.2, delay: 1});
            playPixelSound(getPixelVolume(innerRef.current.name))
            store.pixelStore.addNewPixel(name, store.pixelStore.color)
        }
    }
    // console.log(isDrawMode)
    return <mesh
        onClick={() => hoverAction(true)}
        name={name} ref={innerRef}
        onPointerOver={() => {
            // document.body.style.cursor = "crosshair";
            hoverAction(false)
        }}
        onPointerOut={() => {
            // document.body.style.cursor = "default";
            hoverAction(false)
        }}
        position={[position.y, position.x, position.z]}>
        <boxGeometry args={[1, 1, 2]}/>
        <meshStandardMaterial opacity={0} transparent={true}/>
    </mesh>
}))

export default Pixel