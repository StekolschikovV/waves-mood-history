import React, {useMemo, useRef, useState} from 'react'
import {Canvas as CANVAS, useFrame} from '@react-three/fiber'
import {observer} from "mobx-react-lite";
import styles from "@components/mood-canvas2/style.module.scss";
import gsap from "gsap";
import {Color} from "three";


function Points() {
    const [hovered, setHovered] = useState<number | null>(null);
    const pointsRef = useRef<any>();
    const timeRef = useRef(0);


    const createPositionsArray = (width: number, height: number, step: number) => {
        const positions: number[] = [];
        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                positions.push(x - (height / 2), y - (width / 2), 0);
            }
        }
        return positions;
    };

    const positions = useMemo(() => {
        return new Float32Array(createPositionsArray(100, 100, 1));
    }, []);


    const colors = useMemo(() => {
        return new Float32Array(positions.length);
    }, []);

    const setColor = (position: number, color: string) => {
        const colorObj = new Color(color);
        if (colors[position * 3] !== colorObj.r)
            colors[position * 3] = colorObj.r;
        if (colors[position * 3 + 1] !== colorObj.g)
            colors[position * 3 + 1] = colorObj.g;
        if (colors[position * 3 + 2] !== colorObj.b)
            colors[position * 3 + 2] = colorObj.b;
    }

    const setAnimation = (position: number) => {
        const positionAttribute = pointsRef.current.geometry.getAttribute('position');
        if (positionAttribute.array[position * 3 + 2] === 0) {
            const tl = gsap.timeline()
            tl
                .to([positionAttribute.array], {
                    duration: 2,
                    [position * 3 + 2]: 10,
                })
                .to([positionAttribute.array], {
                    duration: 2,
                    [position * 3 + 2]: 0,
                })
        }
    }

    useFrame(({mouse, clock}) => {
        if (pointsRef.current) {
            const positionAttribute = pointsRef.current.geometry.getAttribute('position');
            const colorAttribute = pointsRef.current.geometry.getAttribute('color');
            const p = hovered
            // if (p) {
            for (let i = 0; i < positionAttribute.count; i++) {

                // if (positionAttribute.array[i * 3 + 2] === 10) {
                //     gsap.to([positionAttribute.array], {
                //         duration: 2,
                //         [i * 3 + 2]: 0, // Опустить частицу
                //     });
                // }
                // // console.log(positionAttribute.array[i * 3 + 2])
                // if (hovered === i) {
                //     if (positionAttribute.array[i * 3 + 2] === 0) {
                //         gsap.to([positionAttribute.array], {
                //             duration: 1,
                //             [i * 3 + 2]: 10, // Поднять частицу
                //         });
                //     }
                // }
            }
            // for (let i = 0; i < positionAttribute.count; i++) {
            //     //     const x = positionAttribute.getX(i);
            //     //     const y = positionAttribute.getY(i);
            //     //     positionAttribute.setXYZ(i, x, y, Math.sin(clock.elapsedTime + x * 0.1 + y * 0.1));
            //     //
            //     //     const t = (Math.sin(timeRef.current + x * 0.1 + y * 0.1) + 1) / 2; // Нормализуем от -1 до 1 к 0 до 1
            //     //     const colorValue = (1 - t) * 0xff + t * 0x00; // Линейная интерполяция между красным и синим
            //     //     colorAttribute.setXYZ(i, colorValue / 255, 0, (255 - colorValue) / 255); // Преобразуем 0-255 в 0-1
            //
            //
            // }
            // // const colorAttribute = pointsRef.current.material.getAttribute('color');
            // for (let i = 0; i < positionAttribute.count; i++) {
            //     const x = positionAttribute.getX(i);
            //     const y = positionAttribute.getY(i);
            //     positionAttribute.setXYZ(i, x, y, 0);
            // }
            // // positionAttribute[hovered || 0].setXYZ(10, 10, 10)
            // const x = positionAttribute.getX(p);
            // const y = positionAttribute.getY(p);
            // positionAttribute.setXYZ(p, x, y, 2)
            // // colorAttribute.set("red")
            // // colorAttribute.setXYZ(hovered || 0, new Color("red")); // Преобразуем 0-255 в 0-1
            //
            if (p) {
                setColor(p, "red")
                setAnimation(p)
            }


            colorAttribute.needsUpdate = true;
            positionAttribute.needsUpdate = true;
            // timeRef.current += clock.getDelta();
            // }

        }
    });

    return (
        <points
            ref={pointsRef}
            onPointerOver={(event) => {
                setHovered(event.index || 0)
            }}
            onPointerOut={() => setHovered(null)}
        >
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    needsUpdate
                    attach="attributes-position"
                    array={positions}
                    count={(positions?.length || 0) / 3} //
                    itemSize={3}
                />
                <bufferAttribute
                    needsUpdate
                    attach="attributes-color"
                    array={colors}
                    count={(positions?.length || 0) / 3} //
                    itemSize={3}
                    normalized/>

            </bufferGeometry>
            <pointsMaterial size={1} color={""} vertexColors={true}/>
        </points>
    );
}


export default observer(function MoodCanvas3() {


    const width = window.innerWidth > 700 ? "550px" : "90vw"
    const height = window.innerWidth > 700 ? "500px" : "80vw"


    return <>
        <div className={styles.moodCanvasWrapper} id={"mood-canvas"}>
            <div className={`container ${styles.moodCanvas}`}>
                {/*<div className={"title"}>*/}
                {/*    Mood canvas*/}
                {/*    /!*<div className={"subtitle"}>v2 - Kleon style | v2 - Old style </div>*!/*/}
                {/*</div>*/}
                {/*<div className={styles.innerContainer}>*/}
                {/*    <div className={styles.text}>*/}
                {/*        This drawing will be permanently stored in the blockchain on behalf of your account. Try to*/}
                {/*        express your emotions by answering the following questions:*/}
                {/*        <ul>*/}
                {/*            <li>*/}
                {/*                What is your waves mood today?*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                What would you like to be recorded in history today?*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                How would you describe your current state of mind?*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                What thoughts or memories are evoking strong emotions within you right now?*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*    <div className={styles.canvaWrapper}>*/}
                <div
                    id={"canvaBlock"}
                    className={styles.canva2}
                    style={{
                        width: width,
                        height: height,
                        cursor: "crosshair",
                        border: "1px solid black"
                    }}
                    // onMouseDown={() => window.app.onMouseDown = true}
                    // onMouseUp={() => window.app.onMouseDown = false}
                >
                    <CANVAS camera={{fov: 75, position: [0, 0, 70],}}>
                        <Points/>
                    </CANVAS>
                </div>
                {/*            </div>*/}

                {/*            <div className={styles.controls}>*/}
                {/*                <div className={styles.selectedToken}>*/}
                {/*                    <div className={styles.selectedTokenTitle}>Payment in token:</div>*/}
                {/*                    <div className={styles.selectedTokenWrapper}>*/}
                {/*                    <span*/}
                {/*                        onClick={e => store.pixelStore.selectedToken = "USDT"}*/}
                {/*                        className={store.pixelStore.selectedToken === "USDT" ? styles.selectedTokenSelected : ""}>USDT-WXG</span>*/}
                {/*                        <span*/}
                {/*                            onClick={e => store.pixelStore.selectedToken = "USDC"}*/}
                {/*                            className={store.pixelStore.selectedToken === "USDC" ? styles.selectedTokenSelected : ""}>USDC-WXG</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className={styles.selectedToken}>*/}
                {/*                    <div className={styles.selectedTokenTitle}>Mode:</div>*/}
                {/*                    <div className={styles.selectedTokenWrapper}>*/}
                {/*                            <span*/}
                {/*                                onClick={e => store.pixelStore.mode = "draw"}*/}
                {/*                                className={store.pixelStore.mode === "draw" ? styles.selectedTokenSelected : ""}>*/}
                {/*                                Draw*/}
                {/*                            </span>*/}
                {/*                        <span*/}
                {/*                            onClick={e => store.pixelStore.mode = "clean"}*/}
                {/*                            className={store.pixelStore.mode === "clean" ? styles.selectedTokenSelected : ""}>*/}
                {/*                                Clean*/}
                {/*                            </span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className={styles.pixelUsed}>*/}
                {/*                    {store.pixelStore.stateNew.size}*/}
                {/*                    <span>pixels used</span>*/}
                {/*                    <span*/}
                {/*                        className={styles.pixelCalc}>{store.pixelStore.stateNew.size} pixel / {store.pixelStore.blockchainDataLimit} max = {Math.ceil((store.pixelStore.stateNew.size || 0) / (store.pixelStore.blockchainDataLimit || 1))} transactions</span>*/}
                {/*                </div>*/}
                {/*                <div className={styles.btnGroup}>*/}
                {/*                    <button disabled={store.pixelStore.stateNew.size === 0} className={styles.btn}*/}
                {/*                            onClick={() => store.pixelStore.saveNewToBlockchain()}>Save and burn WXG*/}
                {/*                    </button>*/}
                {/*                    <button disabled={store.pixelStore.stateNew.size === 0} className={styles.btn}*/}
                {/*                            onClick={() => store.pixelStore.clean()}>Clean*/}
                {/*                    </button>*/}
                {/*                    <button className={styles.btn} onClick={e => {*/}
                {/*                        setIsNeedScreen(isNeedScreen + 1)*/}
                {/*                    }}>Take Screenshot*/}
                {/*                    </button>*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className="container-full">*/}
                {/*        <ul className={`historyLine ${styles.historyLine}`}>*/}
                {/*            {store.pixelStore.data.map((p, i) =>*/}
                {/*                <li key={`${p.time}-${i}`}*/}
                {/*                    className={`${styles.historyStep} ${p.time == (store.pixelStore.selectedDataTime || store.pixelStore.lastDataTime) && styles.historyStepSelected}`}*/}
                {/*                    onClick={() => store.pixelStore.travelToTime(p.time)}*/}
                {/*                >*/}
                {/*                    <div>*/}
                {/*                        <Moment format="YYYY/MM/DD">*/}
                {/*                            {p.time}*/}
                {/*                        </Moment>*/}
                {/*                    </div>*/}
                {/*                    <span>*/}
                {/*             <Moment format="HH:mm">*/}
                {/*                 {p.time}*/}
                {/*             </Moment>*/}
                {/*         </span>*/}
                {/*                </li>)}*/}
                {/*        </ul>*/}
            </div>
        </div>
    </>

})


