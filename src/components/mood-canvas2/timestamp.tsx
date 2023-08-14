import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React, {useRef} from "react";
import {MeshTransmissionMaterial, Text} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {Group} from "three";
import {useControls} from "leva";

export default observer(function Timestamp({position, size}: {
    position: [number, number, number],
    size: [number, number, number]
}) {
    const store = useRootStore();

    // const store = useRootStore();
    // const ref = useRef<Mesh<BoxGeometry, MeshPhysicalMaterial>>(null!);
    const ref = useRef<Group>(null!);
    //
    useFrame(() => {
        if (ref.current) {
            // ref.current.rotation.x += 0.01;
            ref.current.rotation.y += 0.01;
        }
    });
    // roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    // clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    // clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
    // transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
    // ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    // envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    // color: '#ffffff',
    // attenuationTint: '#ffe79e',
    // attenuationDistance: { value: 0, min: 0, max: 1 }

    const data = useControls({
        groupX: {value: 0, min: -50, max: 50, step: 0.1},
        groupY: {value: 0, min: -50, max: 50, step: 0.1},
        groupZ: {value: 5, min: -50, max: 50, step: 0.1},

        groupRotationX: {value: 0, min: -50, max: 50, step: 0.01},
        groupRotationY: {value: 0, min: -50, max: 50, step: 0.01},
        groupRotationZ: {value: 0, min: -50, max: 50, step: 0.01},
    })
    return <>
        <group
            ref={ref}
            position={[data.groupX, data.groupY, data.groupZ]}
            rotation={[data.groupRotationX, data.groupRotationY, data.groupRotationZ]}
        >

            <Text position={[-20.1, 5, 20]} rotation={[Math.PI, (Math.PI * 1.5), Math.PI]} color="#2e4377"
                  scale={[6, 6, 10]}
                  anchorX="center"
                  anchorY="middle">
                20/07/23
            </Text>
            <Text position={[-20.1, -4, 20]} rotation={[-Math.PI, (Math.PI * 1.5), Math.PI]} scale={[10, 10, 10]}
                  color="#2e4377"
                  anchorX="center" anchorY="middle">
                17:40
            </Text>

            <Text position={[20.1, 5, 20]} rotation={[Math.PI, (Math.PI / 2), Math.PI]} color="#2e4377"
                  scale={[6, 6, 10]}
                  anchorX="center"
                  anchorY="middle">
                20/07/23
            </Text>
            <Text position={[20.1, -4, 20]} rotation={[-Math.PI, (Math.PI / 2), Math.PI]} scale={[10, 10, 10]}
                  color="#2e4377"
                  anchorX="center" anchorY="middle">
                17:40
            </Text>


            <Text position={[0, 5, -0.1]} rotation={[-Math.PI * 3, Math.PI * 2, Math.PI]} scale={[6, 6, 10]}
                  color="#2e4377"
                  anchorX="center"
                  anchorY="middle">
                20/07/23
            </Text>
            <Text position={[0, -4, -0.1]} rotation={[-Math.PI * 3, Math.PI * 2, Math.PI]} scale={[10, 10, 10]}
                  color="#2e4377"
                  anchorX="center" anchorY="middle">
                17:40
            </Text>

            <Text position={[0, 20.1, 26]} rotation={[-Math.PI / 2, 0, 0]} scale={[6, 6, 10]} color="#2e4377"
                  anchorX="center"
                  anchorY="middle">
                20/07/23
            </Text>
            <Text position={[0, 20.1, 16]} rotation={[-Math.PI / 2, 0, 0]} scale={[10, 10, 10]} color="#2e4377"
                  anchorX="center" anchorY="middle">
                17:40
            </Text>

            <Text position={[0, -20.1, 16]} rotation={[-Math.PI * 1.5, 0, 0]} scale={[6, 6, 10]} color="#2e4377"
                  anchorX="center"
                  anchorY="middle">
                20/07/23
            </Text>
            <Text position={[0, -20.1, 26]} rotation={[-Math.PI * 1.5, 0, 0]} scale={[10, 10, 10]} color="#2e4377"
                  anchorX="center" anchorY="middle">
                17:40
            </Text>

            <Text position={[0, 3, 40.1]} scale={[6, 6, 10]} color="red" anchorX="center" anchorY="middle">
                20/07/23
            </Text>
            <Text position={[0, -6, 40.1]} scale={[10, 10, 10]} color="red" anchorX="center" anchorY="middle">
                17:40
            </Text>


            <mesh
                onClick={e => e.stopPropagation()}
                position={[0, 0, 20]}
                scale={[40, 40, 40]}
                // material={store.pixelStore3.materials.get("red")}
                geometry={store.pixelStore3.geometry}>
                <MeshTransmissionMaterial
                    samples={2}
                    resolution={512}
                    thickness={-1}
                    anisotropy={10}
                    distortionScale={22}
                    temporalDistortion={22}/>
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