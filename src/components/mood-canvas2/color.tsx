import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React, {useEffect, useRef, useState} from "react";
import {BoxGeometry, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";

export default observer(function Color({color, i}: { color: string, i: number }) {

    const store = useRootStore();
    const [lastSelectedColor, setLastSelectedColor] = useState<string | null>(null)
    const [z, setZ] = useState<number>(0)

    const playPixelSound = () => {
        const pixelSound = new Audio('./sound/clickselect.mp3')
        pixelSound.volume = 0.8
        pixelSound.play()
    }

    const innerRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);

    useEffect(() => {
        if (lastSelectedColor !== store.pixelStore3.color) {
            if (color === store.pixelStore3.color && (z === -2.5 || lastSelectedColor === null)) {
                gsap.to(innerRef.current.position, {z: 4, duration: 0.25});
                setZ(4)
            } else if (z !== -2.5) {
                gsap.to(innerRef.current.position, {z: -2.5, duration: 0.1});
                setZ(-2.5)
            }
            setLastSelectedColor(store.pixelStore3.color)
        }
    }, [store.pixelStore3.color])

    return <>
        <mesh
            ref={innerRef}
            geometry={store.pixelStore3.geometryBig}
            material={store.pixelStore3.getMaterialByName(color)}
            onPointerDown={(e) => {
                store.pixelStore3.color = color
                playPixelSound()
            }}
            position={[-76, ((8 * i) - 45), -2.5]}>
            {/*<boxGeometry args={[5, 5, 5]}/>*/}
            {/*<meshStandardMaterial opacity={1} color={color} transparent={true}/>*/}
        </mesh>
    </>
})