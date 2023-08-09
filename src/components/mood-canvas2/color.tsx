import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React, {useEffect, useRef, useState} from "react";
import {BoxGeometry, Mesh, MeshStandardMaterial} from "three";
import gsap from "gsap";

export default observer(function Color({color, i}: { color: string, i: number }) {

    const store = useRootStore();
    const [lastSelectedColor, setLastSelectedColor] = useState<string | null>(null)
    const [z, setZ] = useState<number>(0)

    const innerRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);

    useEffect(() => {
        console.log(store.pixelStore.color, color === store.pixelStore.color, z, z === -2.5)
        if (lastSelectedColor !== store.pixelStore.color) {
            if (color === store.pixelStore.color && (z === -2.5 || lastSelectedColor === null)) {
                gsap.to(innerRef.current.position, {z: 4, duration: 0.25});
                setZ(4)
            } else if (z !== -2.5) {
                gsap.to(innerRef.current.position, {z: -2.5, duration: 0.1});
                setZ(-2.5)
            }
            setLastSelectedColor(store.pixelStore.color)
        }
    }, [store.pixelStore.color])

    return <>
        <mesh
            ref={innerRef}
            onPointerDown={(e) => store.pixelStore.color = color}
            position={[-80, ((8 * i) - 60), -2.5]}>
            <boxGeometry args={[5, 5, 5]}/>
            <meshStandardMaterial opacity={1} color={color} transparent={true}/>
        </mesh>
    </>
})