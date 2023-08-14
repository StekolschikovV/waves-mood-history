import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React, {useRef, useState} from "react";
import {MeshTransmissionMaterial, Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Group} from "three";
import {useControls} from "leva";

const TimestampText =
    ({i, datePosition, timePosition, rotation}: {
        i: number,
        datePosition: [number, number, number],
        timePosition: [number, number, number],
        rotation: [number, number, number]
    }) => {

        const store = useRootStore();

        return <>
            <Text
                onClick={() => store.pixelStore3.selectedTimestamp = i}
                position={datePosition}
                rotation={rotation}
                color={store.pixelStore3.getRandomColor(i)}
                scale={[6, 6, 10]}
                anchorX="center"
                anchorY="middle">
                20/07/23
            </Text>
            <Text
                onClick={() => store.pixelStore3.selectedTimestamp = i}
                position={timePosition}
                rotation={rotation}
                scale={[10, 10, 10]}
                color={store.pixelStore3.getRandomColor(i)}
                anchorX="center" anchorY="middle">
                {i}
            </Text>
        </>
    }

export default observer(function Timestamp({i}: { i: number }) {

    const store = useRootStore();
    const [XYZ, setXYZ] = useState([0, 0, 0])

    // const store = useRootStore();
    // const ref = useRef<Mesh<BoxGeometry, MeshPhysicalMaterial>>(null!);
    const ref = useRef<Group>(null!);
    //
    useFrame(() => {

        const speed = 5

        let targetY = (i - store.pixelStore3.selectedTimestamp) * 30
        let targetZ = -Math.abs((i - store.pixelStore3.selectedTimestamp) * 40)
        // && ref.current.position.y !== targetY
        if (ref.current) {

            if (ref.current.position.y !== targetY) {

                if (ref.current.position.y > targetY) {
                    ref.current.position.y -= speed;
                }

                if (ref.current.position.y < targetY) {
                    ref.current.position.y += speed;
                }
            }


            if (ref.current.position.z > targetZ) {
                ref.current.position.z -= speed * 2;
            }

            if (ref.current.position.z < targetZ) {
                ref.current.position.z += speed * 2;
            }
            // console.log(ref.current.rotation.y)
            // ref.current.rotation.x += 0.001;
            // ref.current.rotation.y += 0.005;
        }
    });


    const data = useControls({
        groupX: {value: 0, min: -50, max: 50, step: 0.1},
        groupY: {value: 0, min: -50, max: 50, step: 0.1},
        groupZ: {value: 5, min: -50, max: 50, step: 0.1},

        groupRotationX: {value: 0, min: -50, max: 50, step: 0.01},
        groupRotationY: {value: 0, min: -50, max: 50, step: 0.01},
        groupRotationZ: {value: 0, min: -50, max: 50, step: 0.01},
    })
    const textData:
        {
            datePosition: [number, number, number],
            timePosition: [number, number, number],
            rotation: [number, number, number]
        }[]
        = [
        {datePosition: [-20.1, 5, 20], timePosition: [-20.1, -4, 20], rotation: [-Math.PI, (Math.PI * 1.5), Math.PI]},
        {datePosition: [20.1, 5, 20], timePosition: [20.1, -4, 20], rotation: [Math.PI, (Math.PI / 2), Math.PI]},
        {datePosition: [0, 5, -0.1], timePosition: [0, -4, -0.1], rotation: [-Math.PI * 3, Math.PI * 2, Math.PI]},
        {datePosition: [0, 20.1, 26], timePosition: [0, 20.1, 16], rotation: [-Math.PI / 2, 0, 0]},
        {datePosition: [0, -20.1, 16], timePosition: [0, -20.1, 26], rotation: [-Math.PI * 1.5, 0, 0]},
        {datePosition: [0, 3, 40.1], timePosition: [0, -6, 40.1], rotation: [0, 0, 0]}
    ]

    return <>
        <group
            onClick={() => store.pixelStore3.selectedTimestamp = i}
            scale={[0.5, 0.5, 0.5]}
            ref={ref}
            // position={[-(110 + (Math.abs(i) * 180)), i * 60, -Math.abs(i) * 180]}
            position={[XYZ[0], XYZ[1], XYZ[2]]}
            rotation={[data.groupRotationX, data.groupRotationY, data.groupRotationZ]}
        >

            {textData.map((e, ii) =>
                <TimestampText
                    key={ii}
                    i={i}
                    datePosition={e.datePosition}
                    timePosition={e.timePosition}
                    rotation={e.rotation}/>
            )}


            <mesh
                onClick={e => e.stopPropagation()}
                position={[0, 0, 20]}
                scale={[40, 40, 40]}
                // material={store.pixelStore3.materials.get("red")}
                geometry={store.pixelStore3.geometry}>
                <MeshTransmissionMaterial
                    samples={1}
                    resolution={1}
                    thickness={-10}
                    anisotropy={1}
                    distortionScale={1}
                    temporalDistortion={1}/>
            </mesh>
        </group>


        {/*<mesh*/}
        {/*    ref={ref}*/}
        {/*    // position={[0, 0, 80]}*/}

        {/*    position={position}*/}
        {/*>*/}
        {/*    <boxGeometry*/}
        {/*        // args={[10, 10, 12]}*/}
        {/*        args={size}*/}
        {/*    />*/}
        {/*    <meshPhysicalMaterial*/}
        {/*        color="white"*/}
        {/*        transparent // Включение прозрачности*/}
        {/*        opacity={0.4} // Уровень прозрачности (0 - полностью прозрачный, 1 - непрозрачный)*/}
        {/*        side={DoubleSide} // Отображение материала с обеих сторон грани*/}
        {/*        // color="white"*/}
        {/*        // transmission={0.1} // Пропорция пропускания света через материал (0 - полное отражение, 1 - полное пропускание)*/}
        {/*        clearcoat={1} // Количество покрытия (clearcoat) для добавления реалистичных отражений*/}
        {/*        clearcoatRoughness={0.1} // "Шероховатость" покрытия*/}
        {/*        roughness={0.1} // Шероховатость основного материала*/}
        {/*        ior={1.25}*/}
        {/*        envMapIntensity={25}*/}
        {/*        thickness={20}*/}

        {/*    />*/}
        {/*<MeshTransmissionMaterial*/}
        {/*    clearcoat={1} samples={3}*/}
        {/*    thickness={40}*/}
        {/*    chromaticAberration={0.25}*/}
        {/*    anisotropy={0.4} distortionScale={0.2} temporalDistortion={0.2}/>*/}

        {/*</mesh>*/}
    </>
})