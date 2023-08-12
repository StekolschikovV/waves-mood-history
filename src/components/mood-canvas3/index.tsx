import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Canvas as CANVAS, useFrame} from '@react-three/fiber'
import {observer} from "mobx-react-lite";
import styles from "@components/mood-canvas2/style.module.scss";
import gsap from "gsap";
import {Color} from "three";
import {useRootStore} from "@/providers/RootStoreProvider";
import Moment from "react-moment";
import Colors from "@components/mood-canvas2/colors";
import Screenshot from "@components/mood-canvas2/screenshot";
import {positionToCoordinates} from "@components/mood-canvas3/function";


const Points = observer(({isSelectMode}: { isSelectMode: boolean }) => {

    const [isUseInteract, setIsUseInteract] = useState(false)
    const pointsRef = useRef<any>();
    const store = useRootStore();

    const playPixelSound = (volume: number) => {
        const pixelSound = new Audio('./sound/ui-click.mp3')
        pixelSound.volume = volume
        pixelSound.play()
    }

    const playWarpSound = (volume: number) => {
        if (isUseInteract) {
            const pixelSound = new Audio('./sound/warp.mp3')
            pixelSound.volume = volume
            pixelSound.play()
        }
    }

    const createPositionsArray = (width: number, height: number, step: number) => {
        const positions: number[] = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                positions.push(((x - (height / 2)) * step) + 7.8, ((y - (width / 2)) * step) + step / 2, 0);
            }
        }
        return positions;
    };

    const positions = useMemo(() => {
        return new Float32Array(createPositionsArray(100, 100, 1.5));
    }, []);


    const colors = useMemo(() => {
        return new Float32Array(positions.length);
    }, []);

    const setColor = (position: number, color: string) => {
        const colorObj = new Color(color);
        colors[position * 3] = colorObj.r;
        colors[position * 3 + 1] = colorObj.g;
        colors[position * 3 + 2] = colorObj.b;
    }

    const setAnimation = (position: number, type: "clean" | "select") => {
        const positionAttribute = pointsRef.current.geometry.getAttribute('position');
        const tl = gsap.timeline()
        if (type === "select") {
            tl
                .to([positionAttribute.array], {duration: 0.5, [position * 3 + 2]: -0.7,})
                .to([positionAttribute.array], {duration: 0.7, [position * 3 + 2]: 2,})
                .to([positionAttribute.array], {duration: 0.1, [position * 3 + 2]: 0,})

        } else if (type === "clean") {
            tl
                .to([positionAttribute.array], {duration: 0.3, [position * 3 + 2]: -2,})
                .to([positionAttribute.array], {duration: 0.3, [position * 3 + 2]: 0.5,})
                .to([positionAttribute.array], {duration: 1, [position * 3 + 2]: 0,})
        }
    }

    useFrame(({mouse, clock}) => {
        if (pointsRef.current) {
            const positionAttribute = pointsRef.current.geometry.getAttribute('position');
            const colorAttribute = pointsRef.current.geometry.getAttribute('color');
            colorAttribute.needsUpdate = true;
            positionAttribute.needsUpdate = true;
        }
    });

    const select = (position: number, type: "select" | "click"): void => {
        const coordinates = positionToCoordinates(position)
        if ((isSelectMode || type === "click")) {
            if (store.pixelStore3.mode === "clean" && store.pixelStore3.stateNew.get(coordinates)) {
                playPixelSound(position / 50000)
                store.pixelStore3.cleanPixel(coordinates)
                const oldColor = store.pixelStore3.state.get(coordinates) || "white"
                setColor(position, oldColor)
                setAnimation(position, "clean")
            } else if (store.pixelStore3.mode === "draw"
                && store.pixelStore3.state.get(coordinates) !== store.pixelStore3.color
                && store.pixelStore3.stateNew.get(coordinates) !== store.pixelStore3.color
            ) {
                playPixelSound(position / 50000)
                setColor(position, store.pixelStore3.color)
                setAnimation(position, "select")
                store.pixelStore3.addNewPixel(coordinates, store.pixelStore3.color)
            }
        }
    }

    const updateAllFromStateAnimation = (i: number, x: number, y: number) => {
        const color = store.pixelStore3.state.get(`${x}-${y}`) || "white"
        const colorObj = new Color(color);
        const oldColor = {r: colors[i * 3], g: colors[i * 3 + 1], b: colors[i * 3 + 2]}

        // console.log(colorObj, oldColor, oldColor.r !== colorObj.r || oldColor.g !== colorObj.g || oldColor.b !== colorObj.b)
        // if (oldColor.r !== colorObj.r || oldColor.g !== colorObj.g || oldColor.b !== colorObj.b) {
        setTimeout(() => {
            colors[i * 3] = colorObj.r;
            colors[i * 3 + 1] = colorObj.g;
            colors[i * 3 + 2] = colorObj.b;
        }, 4650)

        const positionAttribute = pointsRef.current.geometry.getAttribute('position');
        const tl = gsap.timeline()

        const xOld = positionAttribute.array[i * 3 + 0]
        const yOld = positionAttribute.array[i * 3 + 1]

        tl
            .to([positionAttribute.array], {duration: 1, [i * 3 + 2]: -(Math.random() * 500)})
            .to([positionAttribute.array], {
                duration: 3.8,
                [i * 3 + 2]: (Math.random() * 100),
                [i * 3]: 0,
                [i * 3 + 1]: 0,
            })

            // .to([positionAttribute.array], {duration: 0, [i * 3 + 2]: (Math.random() * 100)})

            // .to([positionAttribute.array], {duration: 3, [i * 3 + 2]: 0,})
            .to([positionAttribute.array], {
                duration: 2,
                [i * 3 + 2]: 0,
                [i * 3]: xOld,
                [i * 3 + 1]: yOld,
            })
        // }

    }

    const updateAllFromState = () => {
        let i = 0
        playWarpSound(1)
        for (let y = 0; y < 100; y++) {
            for (let x = 0; x < 100; x++) {
                // const color = store.pixelStore3.state.get(`${x}-${y}`) || "white"
                // const colorObj = new Color(color);
                //
                // // const p = positionToCoordinates(i)
                // colors[i * 3] = colorObj.r;
                // colors[i * 3 + 1] = colorObj.g;
                // colors[i * 3 + 2] = colorObj.b;
                // console.log(new Color(colors[i], colors[i + 1], colors[i + 2]))
                // setColor(i, color)
                updateAllFromStateAnimation(i, x, y)
                i++
            }
        }
    }

    useEffect(() => {
        updateAllFromState()
    }, [store.pixelStore3.state])

    useEffect(() => {
        if (store.pixelStore3.stateNew.size === 0) updateAllFromState()
    }, [store.pixelStore3.stateNew])

    useEffect(() => {
        function clickDetector() {
            document.body.addEventListener('click', () => {
                if (!isUseInteract) {
                    setIsUseInteract(true)
                }
            }, true);
        }

        window.addEventListener("click", clickDetector);
        return () => window.removeEventListener("click", clickDetector);
    }, [])

    return (
        <points
            ref={pointsRef}
            onPointerOver={(event) => select(event.index as number, "select")}
            onClick={(event) => select(event.index as number, "click")}
        >
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={(positions?.length || 0) / 3} //
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={(positions?.length || 0) / 3} //
                    itemSize={3}/>

            </bufferGeometry>
            <pointsMaterial size={1.5} color={""} vertexColors={true}/>
            {/*<pointsMaterial size={2} color={""} vertexColors={true}/>*/}
        </points>
    );
})


export default observer(function MoodCanvas3() {

    const store = useRootStore();

    const [isSelectMode, setIsSelectMode] = useState(false)
    const [isNeedScreen, setIsNeedScreen] = useState(0)

    const width = window.innerWidth > 700 ? "660px" : "90vw"
    const height = window.innerWidth > 700 ? "600px" : "80vw"

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
                                cursor: "crosshair",
                                border: "1px solid black"
                            }}
                            onMouseDown={() => setIsSelectMode(true)}
                            onMouseUp={() => setIsSelectMode(false)}
                        >
                            <CANVAS camera={{fov: 75, position: [0, 0, 100], far: 1000}}>
                                {store.pixelStore3.isScreenshotMode && <color attach="background" args={['#0f141f']}/>}
                                <Points isSelectMode={isSelectMode}/>
                                <Colors/>
                                <Screenshot isNeedScreen={isNeedScreen}/>
                            </CANVAS>
                        </div>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.selectedToken}>
                            <div className={styles.selectedTokenTitle}>Payment in token:</div>
                            <div className={styles.selectedTokenWrapper}>
                                    <span
                                        onClick={e => store.pixelStore3.selectedToken = "USDT"}
                                        className={store.pixelStore3.selectedToken === "USDT" ? styles.selectedTokenSelected : ""}>USDT-WXG</span>
                                <span
                                    onClick={e => store.pixelStore3.selectedToken = "USDC"}
                                    className={store.pixelStore3.selectedToken === "USDC" ? styles.selectedTokenSelected : ""}>USDC-WXG</span>
                            </div>
                        </div>
                        <div className={styles.selectedToken}>
                            <div className={styles.selectedTokenTitle}>Mode:</div>
                            <div className={styles.selectedTokenWrapper}>
                                            <span
                                                onClick={e => store.pixelStore3.mode = "draw"}
                                                className={store.pixelStore3.mode === "draw" ? styles.selectedTokenSelected : ""}>
                                                Draw
                                            </span>
                                <span
                                    onClick={e => store.pixelStore3.mode = "clean"}
                                    className={store.pixelStore3.mode === "clean" ? styles.selectedTokenSelected : ""}>
                                                Clean
                                            </span>
                            </div>
                        </div>
                        <div className={styles.pixelUsed}>
                            {store.pixelStore3.stateNew.size}
                            <span>pixels used</span>
                            <span
                                className={styles.pixelCalc}>{store.pixelStore3.stateNew.size} pixel / {store.pixelStore3.blockchainDataLimit} max = {Math.ceil((store.pixelStore3.stateNew.size || 0) / (store.pixelStore3.blockchainDataLimit || 1))} transactions</span>
                        </div>
                        <div className={styles.btnGroup}>
                            <button disabled={store.pixelStore3.stateNew.size === 0} className={styles.btn}
                                    onClick={() => store.pixelStore3.saveNewToBlockchain()}>Save and burn WXG
                            </button>
                            <button disabled={store.pixelStore3.stateNew.size === 0} className={styles.btn}
                                    onClick={() => store.pixelStore3.clean()}>Clean
                            </button>
                            <button className={styles.btn} onClick={e => setIsNeedScreen(isNeedScreen + 1)}>Take
                                Screenshot
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container-full">
                <ul className={`historyLine ${styles.historyLine}`}>
                    {store.pixelStore3.data.map((p, i) =>
                        <li key={`${p.time}-${i}`}
                            className={`${styles.historyStep} ${p.time == (store.pixelStore3.selectedDataTime || store.pixelStore3.lastDataTime) && styles.historyStepSelected}`}
                            onClick={() => store.pixelStore3.travelToTime(p.time)}
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


