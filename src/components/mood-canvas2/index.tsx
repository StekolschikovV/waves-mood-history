import React, {memo, useEffect, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'
import Pixel from "@components/mood-canvas2/pixel";
import {useRootStore} from "@/providers/RootStoreProvider";
import {observer} from "mobx-react-lite";
import Timestamp from "@components/mood-canvas2/timestamp";
import styles from "@components/mood-canvas/style.module.scss";
import Moment from "react-moment";

const MemoizedTimestamp = memo((props, context) => {
    return <Timestamp name={""} x={0} y={100} z={5}/>
})

const MemoizedPixels = memo((props: {
    pixels: { name: string, y: number, x: number }[]
    isDrawMode: boolean
}, context) => {
    return <>
        {props.pixels.map(c => {
                return <Pixel
                    key={c.name}
                    name={c.name}
                    isDrawMode={props.isDrawMode}
                    x={c.x}
                    y={c.y}
                    z={0}
                />
            }
        )}
    </>
});

export default observer(function MoodCanvas2() {

    const [isDrawMode, setIsDrawMode] = useState(false)
    const [pixels, setPixels] = useState<{ name: string, y: number, x: number }[]>([])
    const store = useRootStore();
    const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow']

    useEffect(() => {
        let result: { name: string, y: number, x: number }[] = []
        Array.from({length: 100}).forEach((_, xI) => {
            Array.from({length: 100}).forEach((_, yI) => {
                const currentSize = (0.1 + 1.5)
                const y = (yI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2)
                const x = (xI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2)
                result.push({name: `${yI}-${xI}`, y, x})
            })
        })
        setPixels(result)
    }, [])

    return <>
        <div className={styles.moodCanvasWrapper} id={"mood-canvas"}>
            <div className={`container ${styles.moodCanvas}`}>
                <div className={"title"}>Mood canvas</div>
                <div className={styles.innerContainer}>
                    <div className={styles.text}>
                        This drawing will be permanently stored in the blockchain on behalf of your account. Try to
                        express
                        your emotions by answering the following questions:
                        <ul>
                            <li>
                                What is your waves mood today?
                            </li>
                            <li>
                                What would you like to be recorded in history today?
                            </li>
                            <li>
                                How would you describe your current state of mind?
                            </li>
                            <li>
                                What thoughts or memories are evoking strong emotions within you right now?
                            </li>
                        </ul>
                    </div>
                    <div className={styles.canvaWrapper}>
                        <ul className={styles.colorList}>
                            {colors.map(color => <li
                                key={color}
                                className={`${styles.colorElement} ${store.pixelStore.color === color && styles.colorElementSelected}`}
                                style={{background: color}}
                                onClick={e => store.pixelStore.color = color}
                            ></li>)}
                        </ul>

                        <div
                            id={"canvaBlock"}
                            className={styles.canva}
                            style={{
                                height: "600px",
                                border: "1px solid black",
                                width: "600px",
                                cursor: "crosshair"
                            }}
                            onMouseDown={() => setIsDrawMode(true)}
                            onMouseUp={() => setIsDrawMode(false)}
                        >
                            {/*<CANVAS camera={{fov: 75, position: [0, 0, 95]}}>*/}
                            <CANVAS camera={{fov: 75, position: [0, 0, 105]}}>
                                <ambientLight intensity={1.5}/>
                                <MemoizedPixels pixels={pixels} isDrawMode={isDrawMode}/>
                            </CANVAS>
                        </div>
                        {/*<div*/}
                        {/*    id={"canvaBlock"}*/}
                        {/*    onMouseDown={() => setIsMouseDown(true)}*/}
                        {/*    onMouseUp={() => setIsMouseDown(false)}*/}
                        {/*    className={styles.canva}*/}
                        {/*>*/}
                        {/*    {Array.from({length: height}).map((row, rowI) => {*/}
                        {/*        return <div key={`${rowI}`} className={styles.canvaRow}>*/}
                        {/*            {Array.from({length: width}).map((pixel, pixelI) => {*/}
                        {/*                let isPixelSelectedLoc = isPixelSelected(rowI, pixelI, false)*/}
                        {/*                let isPixelSelectedLocNew = selectedLog === "now" ? isPixelSelected(rowI, pixelI, true) : []*/}
                        {/*                let bg = "none"*/}
                        {/*                if (typeof isPixelSelectedLocNew === "string") bg = isPixelSelectedLocNew*/}
                        {/*                else if (typeof isPixelSelectedLoc === "string") bg = isPixelSelectedLoc*/}
                        {/*                return <div*/}
                        {/*                    key={`${rowI}${pixelI}`}*/}
                        {/*                    className={`${styles.canvaElement}`}*/}
                        {/*                    style={{background: bg}}*/}
                        {/*                    onClick={() => addNewPixelHandler({*/}
                        {/*                        width: rowI,*/}
                        {/*                        height: pixelI,*/}
                        {/*                        color: selectedColor*/}
                        {/*                    })}*/}
                        {/*                    onMouseEnter={() => {*/}
                        {/*                        if (isMouseDown) addNewPixelHandler({*/}
                        {/*                            width: rowI,*/}
                        {/*                            height: pixelI,*/}
                        {/*                            color: selectedColor*/}
                        {/*                        })*/}
                        {/*                    }}*/}
                        {/*                ></div>*/}
                        {/*            })}*/}
                        {/*        </div>*/}
                        {/*    })}*/}
                        {/*</div>*/}
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.selectedToken}>
                            <div className={styles.selectedTokenTitle}>Payment in token:</div>
                            <div className={styles.selectedTokenWrapper}>
                            <span
                                onClick={e => store.pixelStore.selectedToken = "USDT"}
                                className={store.pixelStore.selectedToken === "USDT" ? styles.selectedTokenSelected : ""}>USDT-WXG</span>
                                <span
                                    onClick={e => store.pixelStore.selectedToken = "USDC"}
                                    className={store.pixelStore.selectedToken === "USDC" ? styles.selectedTokenSelected : ""}>USDC-WXG</span>
                            </div>
                        </div>
                        <div className={styles.pixelUsed}>
                            {store.pixelStore.stateNew.size}
                            <span>pixels used</span>
                        </div>
                        <div className={styles.btnGroup}>
                            {/*<button className={styles.btn} onClick={() => onClickCanselHandler()}>Undo last</button>*/}
                            {/*<button className={styles.btn} onClick={() => {*/}
                            {/*    setSelectedPixelNew([])*/}
                            {/*}}>Undo all*/}
                            {/*</button>*/}
                            {/*<button className={styles.btn} onClick={e => takeScreenshotHandler()}>Take Screenshot</button>*/}
                            {/*<button disabled={selectedPixelNew.length === 0} className={styles.btn}*/}
                            {/*        onClick={() => onClickSaveHandler()}>Save and burn WXG*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-full">
                <ul className={`historyLine ${styles.historyLine}`}>
                    {store.pixelStore.data.map((p, i) =>
                        <li key={`${p.time}-${i}`}
                            className={`${styles.historyStep}`}
                            // className={`${styles.historyStep} ${p === selectedLog && styles.historyStepSelected}`}
                            // onClick={() => onClickLogHandler(p)}
                        >
                            <div>
                                <Moment format="YYYY/MM/DD">
                                    {p.time}
                                </Moment>
                            </div>
                            <span>
                     <Moment format="HH:mm">
                         {p.time}
                     </Moment>
                 </span>
                        </li>)}
                    <li
                        onClick={() => store.pixelStore.travelToTime(store.pixelStore.lastDataTime)}
                        key={`now`}
                        // className={`historyStepNow ${styles.historyStep} ${selectedLog === "now" && styles.historyStepSelected}`}>
                        className={`historyStepNow `}>
                        <div>
                            NOW
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        {/*<div>*/}
        {/*    <h1>{store.pixelStore.stateNew.size}</h1>*/}
        {/*    <button onClick={e => store.pixelStore.color = "red"}>red</button>*/}
        {/*    <button onClick={e => store.pixelStore.color = "blue"}>blue</button>*/}
        {/*    <button onClick={e => store.pixelStore.color = "green"}>green</button>*/}
        {/*    <button onClick={e => store.pixelStore.saveNewToBlockchain("USDT")}>save</button>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*    className={"canvas"} style={{*/}
        {/*    height: "600px",*/}
        {/*    border: "1px solid black",*/}
        {/*    width: "600px",*/}
        {/*    cursor: "crosshair"*/}
        {/*}}*/}
        {/*    onMouseDown={() => setIsDrawMode(true)}*/}
        {/*    onMouseUp={() => setIsDrawMode(false)}*/}
        {/*>*/}
        {/*    /!*<CANVAS camera={{fov: 75, position: [0, 0, 95]}}>*!/*/}
        {/*    <CANVAS camera={{fov: 75, position: [0, 0, 105]}}>*/}
        {/*        <ambientLight intensity={1.5}/>*/}
        {/*        <MemoizedPixels pixels={pixels} isDrawMode={isDrawMode}/>*/}
        {/*    </CANVAS>*/}
        {/*</div>*/}
        {/*<ul>*/}
        {/*    {store.pixelStore.data.map((ts, i) => {*/}
        {/*        return <li key={i} onClick={(_) => {*/}
        {/*            store.pixelStore.travelToTime(ts.time)*/}
        {/*        }}>{ts.time}</li>*/}
        {/*    })}*/}
        {/*</ul>*/}
    </>

})


