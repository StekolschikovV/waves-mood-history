import {observer} from "mobx-react-lite";
import {useRootStore} from "@/providers/RootStoreProvider";
import React from "react";
import Color from "@components/mood-canvas2/color";

export default observer(function Colors() {

    const store = useRootStore();

    const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow']

    return <>
        {colors.map((c, i) => {
            return <Color key={i} color={c} i={i}/>
        })}
    </>
})