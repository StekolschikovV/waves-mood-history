import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React from "react";

export default observer(function Colors() {

    const store = useRootStore();

    const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow']

    return <>
        {colors.map((c, i) => {
            return <mesh
                key={i}
                onClick={() => store.pixelStore.color = c}

                position={[-80, ((8 * i) - 80), -2.5]}>
                <boxGeometry args={[5, 5, 5]}/>
                <meshStandardMaterial opacity={1} color={c} transparent={true}/>
            </mesh>
        })}
    </>
})