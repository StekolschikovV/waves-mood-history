import React, {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";

import {BoxGeometry, Color, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";

interface IProps {
    name: string
    y: number
    x: number
    z: number
    isDrawMode: boolean
    color: string
}

export default function Pixel({isDrawMode, name, color, y, x, z = 0}: IProps) {

    const ref = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);
    const [position, setPosition] = useState({
        x: ((Math.random() - 0.5) * 2) * 100,
        y: ((Math.random() - 0.5) * 2) * 100,
        z: ((Math.random() - 0.5) * 2) * 100
    })

    useFrame(() => {
        // ref.current.rotation.y += 0.01
    });

    useEffect(() => {
        if (ref?.current) {
            gsap.to(ref.current.position, {x, y, z, duration: 0});
            gsap.to(ref.current.material, {opacity: 1, duration: 10});
        }
    }, [ref?.current])

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
        const currentColor = ref.current.material.color
        const newColor = new Color(color)
        if (isDrawMode && !newColor.equals(currentColor)) {
            ref.current.material.color.set(color)
            playPixelSound(getPixelVolume(ref.current.name))
            gsap.to(ref.current.position, {z: 15, duration: 3});
            gsap.to(ref.current.position, {z: 0, duration: 3, data: 3});
        }
    }
    const hoverOutAction = () => {
        // gsap.to(ref.current.position, {z: 0, duration: 3, data: 3});
    }

    return <mesh
        name={name} ref={ref}
        onPointerOver={hoverAction}
        onPointerOut={hoverOutAction}
        position={[position.y, position.x, position.z]}>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial opacity={0} transparent={true}/>
    </mesh>
}