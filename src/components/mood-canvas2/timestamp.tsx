import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React, {useRef} from "react";
import {BoxGeometry, DoubleSide, Mesh, MeshPhysicalMaterial} from "three";
import {useFrame} from "@react-three/fiber";

export default observer(function Timestamp({position, size}: {
    position: [number, number, number],
    size: [number, number, number]
}) {

    const store = useRootStore();
    const ref = useRef<Mesh<BoxGeometry, MeshPhysicalMaterial>>(null!);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x += 0.01;
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
    return <>
        <mesh
            ref={ref}
            // position={[0, 0, 80]}

            position={position}
        >
            <boxGeometry
                // args={[10, 10, 12]}
                args={size}
            />
            <meshPhysicalMaterial
                color="white"
                transparent // Включение прозрачности
                opacity={0.4} // Уровень прозрачности (0 - полностью прозрачный, 1 - непрозрачный)
                side={DoubleSide} // Отображение материала с обеих сторон грани
                // color="white"
                // transmission={0.1} // Пропорция пропускания света через материал (0 - полное отражение, 1 - полное пропускание)
                clearcoat={1} // Количество покрытия (clearcoat) для добавления реалистичных отражений
                clearcoatRoughness={0.1} // "Шероховатость" покрытия
                roughness={0.1} // Шероховатость основного материала
                ior={1.25}
                envMapIntensity={25}
                thickness={20}

            />
            {/*<MeshTransmissionMaterial*/}
            {/*    clearcoat={1} samples={3}*/}
            {/*    thickness={40}*/}
            {/*    chromaticAberration={0.25}*/}
            {/*    anisotropy={0.4} distortionScale={0.2} temporalDistortion={0.2}/>*/}

        </mesh>
    </>
})