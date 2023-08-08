import React, {forwardRef, useState} from "react";
import {observer} from "mobx-react-lite";
import {useFrame} from "@react-three/fiber";

interface IProps {
    name: string
    y: number
    x: number
    z: number
}

const Timestamp = observer(forwardRef((
    {
        name,
        y,
        x,
        z = 0
    }: IProps, ref) => {


    //
    // const store = useRootStore();
    //
    // const innerRef = useRef<Mesh<BoxGeometry, MeshStandardMaterial>>(null!);
    const [position, setPosition] = useState({x, y, z})
    const [rotation, setRotation] = useState({x, y, z})


    useFrame(({clock}) => {
        setRotation({x: rotation.x, y: rotation.y + 0.01, z: rotation.z})

        const speed = clock.elapsedTime * 0.08
        setPosition({x: Math.sin(speed) * 120, y: Math.cos(speed) * 120, z: -9})

        // console.log(Math.sin(speed) * 60)
        // вращение цветком
        // const ghost3Angle = - elapsedTime * 0.18
        // ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
        // ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
        // ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    })

    return <mesh
        rotation={[rotation.x, rotation.y, rotation.z]}
        position={[position.x, position.y, position.z]}>
        <boxGeometry args={[15, 15, 15]}/>
        <meshStandardMaterial opacity={1} transparent={true}/>
    </mesh>
}))

export default Timestamp