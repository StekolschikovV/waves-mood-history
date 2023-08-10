import React, {memo, useEffect, useState} from 'react'
import {Canvas as CANVAS} from '@react-three/fiber'

import Pixel from "@components/mood-canvas2/pixel";
import {useRootStore} from "@/providers/RootStoreProvider";
import {observer} from "mobx-react-lite";
import styles from "@components/mood-canvas2/style.module.scss";
import Moment from "react-moment";
import Colors from "@components/mood-canvas2/colors";


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

    const scrollRight = () => {
        let element: any = document.querySelector(`.historyLine`)
        if (element) {
            element.scrollLeft = element?.scrollWidth
        }
    }

    useEffect(() => {
        let result: { name: string, y: number, x: number }[] = []
        Array.from({length: 100}).forEach((_, xI) => {
            Array.from({length: 100}).forEach((_, yI) => {
                const currentSize = (0.1 + 1.5)
                const y = (yI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2) + 8
                const x = (xI * currentSize) - (100 / 2 * currentSize) + (currentSize / 2)
                result.push({name: `${yI}-${xI}`, y, x})
            })
        })
        setPixels(result)
    }, [])

    useEffect(() => {
        scrollRight()

    }, [store.pixelStore.data])
    const width = window.innerWidth > 700 ? "550px" : "90vw"
    const height = window.innerWidth > 700 ? "500px" : "80vw"
    return <>
        <div className={styles.moodCanvasWrapper} id={"mood-canvas"}>
            <div className={`container ${styles.moodCanvas}`}>
                <div className={"title"}>
                    Mood canvas
                    {/*<div className={"subtitle"}>v2 - Kleon style | v2 - Old style </div>*/}
                </div>
                <div className={styles.innerContainer}>
                    <div className={styles.text}>
                        This drawing will be permanently stored in the blockchain on behalf of your account. Try to
                        express your emotions by answering the following questions:
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
                        <div
                            id={"canvaBlock"}
                            className={styles.canva2}
                            style={{
                                width: width,
                                height: height,
                                cursor: "crosshair"
                                // border: "1px solid black",

                            }}
                            onMouseDown={() => setIsDrawMode(true)}
                            onMouseUp={() => setIsDrawMode(false)}
                        >
                            <CANVAS
                                camera={{
                                    fov: 75,
                                    position: [0, 0, 107],
                                }}>
                                <ambientLight intensity={2.7}/>
                                <pointLight intensity={10000} position={[-120, 0, 0]}/>
                                <MemoizedPixels pixels={pixels} isDrawMode={isDrawMode}/>
                                <mesh scale={[((0.1 + 1.5) * 102), ((0.1 + 1.5) * 102), 1]} position={[8, 0, -1]}>
                                    <planeGeometry/>
                                    <meshStandardMaterial color={"#ababab"}/>
                                </mesh>
                                <Colors/>
                            </CANVAS>
                        </div>
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
                        <div className={styles.selectedToken}>
                            <div className={styles.selectedTokenTitle}>Mode:</div>
                            <div className={styles.selectedTokenWrapper}>
                                    <span
                                        onClick={e => store.pixelStore.mode = "draw"}
                                        className={store.pixelStore.mode === "draw" ? styles.selectedTokenSelected : ""}>
                                        Draw
                                    </span>
                                <span
                                    onClick={e => store.pixelStore.mode = "clean"}
                                    className={store.pixelStore.mode === "clean" ? styles.selectedTokenSelected : ""}>
                                        clean
                                    </span>
                            </div>
                        </div>
                        <div className={styles.pixelUsed}>
                            {store.pixelStore.stateNew.size}
                            {/*<span>pixels used({store.pixelStore.blockchainDataLimit} max)</span>*/}
                            <span
                                className={styles.pixelCalc}>{store.pixelStore.stateNew.size} pixel / {store.pixelStore.blockchainDataLimit} max = {Math.ceil((store.pixelStore.stateNew.size || 0) / (store.pixelStore.blockchainDataLimit || 1))} transactions</span>
                        </div>
                        <div className={styles.btnGroup}>
                            <button disabled={store.pixelStore.stateNew.size === 0} className={styles.btn}
                                    onClick={() => store.pixelStore.saveNewToBlockchain()}>Save and burn WXG
                            </button>
                            <button disabled={store.pixelStore.stateNew.size === 0} className={styles.btn}
                                    onClick={() => store.pixelStore.clean()}>Clean
                            </button>
                            <button className={styles.btn}
                                    onClick={() => store.pixelStore.load()}>Load
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container-full">
                <ul className={`historyLine ${styles.historyLine}`}>
                    {store.pixelStore.data.map((p, i) =>
                        <li key={`${p.time}-${i}`}
                            className={`${styles.historyStep} ${p.time == (store.pixelStore.selectedDataTime || store.pixelStore.lastDataTime) && styles.historyStepSelected}`}
                            onClick={() => store.pixelStore.travelToTime(p.time)}
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
                </ul>
            </div>
        </div>
    </>

})


