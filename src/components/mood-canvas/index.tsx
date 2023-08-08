import React, {useEffect, useRef, useState} from "react";
import {InvokeArgs, Signer} from "@waves/signer";
import {ProviderKeeper} from "@waves/provider-keeper";
import Moment from 'react-moment';
import {toast} from 'react-toastify';
import html2canvas from "html2canvas";
import styles from "./style.module.scss"
import {IBlockchainData, ILogData, IPixel} from "../../interface";
import Canvas from "@components/canvas";

const toastWrapper = (text: string) => {
    toast(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export default function MoodCanvas({data}: { data: any }) {

    const width = 100
    const height = 100
    const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow']

    const [selectedToken, setSelectedToken] = useState<"USDT" | "USDC">("USDT")
    const [selectedColor, setSelectedColor] = useState("blue")
    const [selectedPixel, setSelectedPixel] = useState<IPixel[]>([])
    const [selectedPixelNew, setSelectedPixelNew] = useState<IPixel[]>([])
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [log, setLog] = useState<IBlockchainData[]>([])
    const [selectedLog, setSelectedLog] = useState<string | number>("now")
    const [recordCount, setRecordCount] = useState<number>(0)
    const [isWithUpdate, setIsWithUpdate] = useState<boolean>(false)

    const signer = new Signer({
        NODE_URL: 'https://nodes.wavesnodes.com',
    });
    const keeper = new ProviderKeeper();
    signer.setProvider(keeper);

    const decompressData = (data: string) => {
        return data.split("|").filter((e: string) => !!e).map((e: string) => {
            const el = e.split("-")
            return {
                color: el[0],
                width: +el[1],
                height: +el[2]
            }
        })
    }

    const isPixelSelected = (width: number, height: number, isNew = false): string | boolean => {
        let result: any
        (isNew ? selectedPixelNew : selectedPixel).forEach((pixel: IPixel) => {
            if (pixel.width === width && pixel.height === height) {
                result = pixel.color
            }
        })
        return result ? result : false
    }

    const onClickSaveHandler = async () => {
        let USDTWXG = "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ"
        let USDCWXG = "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ"
        const data: InvokeArgs = {
            dApp: "3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
            fee: 500000,
            payment: [{
                assetId: selectedToken === "USDT" ? USDTWXG : USDCWXG,
                amount: 10000 * selectedPixelNew.length,
            }],
            call: {
                function: 'draw',
                args: [
                    {
                        type: "list",
                        value: selectedPixelNew
                            .map(e => `${e.color}-${e.width}-${e.height}`)
                            .map(e => {
                                return {
                                    type: 'string',
                                    value: e
                                }
                            })
                    }
                ]
            },
        }
        setIsWithUpdate(true)
        await signer
            .invoke(data)
            .broadcast()
            .then(e => {
                if (e && e[0]?.type === 16) {
                    toastWrapper('Request sent successfully!')
                } else {
                    toastWrapper('An error occurred, please check your wallet!')
                }
                console.log(e)
            })
            .catch((e) => {
                console.log("error", e)
                if (e?.message?.includes("WavesKeeper is not installed.. This is not error of signer")) {
                    toastWrapper("WavesKeeper not found! You need to install a WavesKeeper to use the app!")
                } else {
                    toastWrapper(e?.message)
                }
                setSelectedPixelNew([])
            })
        setTimeout(() => {
            setSelectedPixelNew([])
            scrollRight()
            setIsWithUpdate(false)
        }, 7000)
    }

    const onClickCanselHandler = () => {
        setSelectedPixelNew(selectedPixelNew.filter((_, i, a) => i !== (a.length - 1)))
    }

    const addNewPixelHandler = (pixel: IPixel) => {
        if (selectedPixelNew.length < 60) {
            let oldPixels = selectedPixelNew.filter(p => !(p.height === pixel.height && p.width === pixel.width))
            setSelectedPixelNew([...oldPixels, pixel])
        } else {
            toastWrapper('60 pixels max per transaction!')
        }
    }

    const [isInit, setInit] = useState(false)

    const scrollRight = () => {
        let element: any = document.querySelector(`.historyLine`)
        if (element) {
            element.scrollLeft = element?.scrollWidth
        }
    }

    useEffect(() => {
        if (data) {
            let logData = data
                .filter((e: IBlockchainData) => e?.key?.includes("log_"))
                .map((e: IBlockchainData) => {
                    if (e?.key?.replaceAll('_', '')?.length > 0) {
                        return {...e, key: `${e?.key?.split("_")[0]}_${e?.key?.split("_")[1]}`}
                    } else {
                        return e
                    }
                })
                .reduce((acc: IBlockchainData[] = [], next: IBlockchainData,) => {
                    let ifExist = false
                    if (acc?.length === undefined) {
                        return [acc, next]
                    }
                    acc?.forEach(a => {
                        if (a?.key === next?.key) {
                            ifExist = true
                        }
                    })
                    if (!ifExist) {
                        return [...acc, next]
                    } else {
                        return acc?.map(e => {
                            if (e?.key !== next?.key) {
                                return e
                            } else {
                                return {...e, value: e?.value + "|" + next?.value}
                            }
                        })
                    }
                })
            setSelectedPixel(decompressData(
                data
                    .filter((e: IBlockchainData) => e?.key?.includes("-"))
                    .map((e: IBlockchainData) => `|${e?.value}-${e?.key}`)?.join(""))
            )
            setLog(logData)
            if (!isInit) {
                setInit(true)
                setTimeout(() => {
                    scrollRight()
                }, 1000)
                setTimeout(() => {
                    scrollRight()
                }, 3000)
            }
        }
    }, [data])

    const logPoints = log?.map(e => +(e?.key?.split("_")[1])).sort((a, b) => a - b)

    function onClickLogHandler(id: number | string) {
        let result: IPixel[] = []
        log
            .map(e => {
                return {...e, id: +e?.key?.split("_")[1]}
            })
            .filter(e => id !== "now" ? e?.id <= id : true)
            .sort((a: ILogData, b: ILogData) => a.id - b.id)
            .map(e => {
                const stepData = decompressData(e.value) as unknown as IPixel
                result = result.concat(stepData)
            })
        setSelectedLog(id)
        setSelectedPixel(result)
    }

    const saveAs = (blob: string, fileName: string) => {
        const elem: HTMLAnchorElement = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        elem.style.cssText = 'display:none;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }
    const takeScreenshotHandler = () => {
        const canva = document.getElementById('canvaBlock')
        if (canva) {
            html2canvas(canva).then((canvas) => {
                let image = canvas.toDataURL('image/png', 1.0);
                saveAs(image, 'Screenshot.png')
            })
        }
    }

    const recordCountTemp = JSON.stringify(data)?.length || 0
    if (recordCount !== recordCountTemp) {
        if (isWithUpdate && recordCountTemp > recordCount) {
            setSelectedPixelNew([])
            scrollRight()
            setIsWithUpdate(false)
        }
        setRecordCount(recordCountTemp)
    }
    const canvasRef = useRef<{ test: () => void }>(null)

    // console.log("selectedPixel", selectedPixel)
    // console.log("log", log)

    return <div className={styles.moodCanvasWrapper} id={"mood-canvas"}>
        <div className={`container ${styles.moodCanvas}`}>
            <button onClick={() => canvasRef?.current?.test()}>test</button>
            <Canvas pixels={selectedPixel} ref={canvasRef} color={selectedColor}
                    addNewPixelHandler={addNewPixelHandler}/>
        </div>
        <div className={`container ${styles.moodCanvas}`}>
            <div className={"title"}>Mood canvas</div>
            <div className={styles.innerContainer}>
                <div className={styles.text}>
                    This drawing will be permanently stored in the blockchain on behalf of your account. Try to express
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
                            className={`${styles.colorElement} ${selectedColor === color && styles.colorElementSelected}`}
                            style={{background: color}}
                            onClick={e => setSelectedColor(color)}
                        ></li>)}
                    </ul>
                    <div
                        id={"canvaBlock"}
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => setIsMouseDown(false)}
                        className={styles.canva}
                    >
                        {Array.from({length: height}).map((row, rowI) => {
                            return <div key={`${rowI}`} className={styles.canvaRow}>
                                {Array.from({length: width}).map((pixel, pixelI) => {
                                    let isPixelSelectedLoc = isPixelSelected(rowI, pixelI, false)
                                    let isPixelSelectedLocNew = selectedLog === "now" ? isPixelSelected(rowI, pixelI, true) : []
                                    let bg = "none"
                                    if (typeof isPixelSelectedLocNew === "string") bg = isPixelSelectedLocNew
                                    else if (typeof isPixelSelectedLoc === "string") bg = isPixelSelectedLoc
                                    return <div
                                        key={`${rowI}${pixelI}`}
                                        className={`${styles.canvaElement}`}
                                        style={{background: bg}}
                                        onClick={() => addNewPixelHandler({
                                            width: rowI,
                                            height: pixelI,
                                            color: selectedColor
                                        })}
                                        onMouseEnter={() => {
                                            if (isMouseDown) addNewPixelHandler({
                                                width: rowI,
                                                height: pixelI,
                                                color: selectedColor
                                            })
                                        }}
                                    ></div>
                                })}
                            </div>
                        })}
                    </div>
                </div>

                <div className={styles.controls}>
                    <div className={styles.selectedToken}>
                        <div className={styles.selectedTokenTitle}>Payment in token:</div>
                        <div className={styles.selectedTokenWrapper}>
                            <span
                                onClick={e => setSelectedToken("USDT")}
                                className={selectedToken === "USDT" ? styles.selectedTokenSelected : ""}>USDT-WXG</span>
                            <span
                                onClick={e => setSelectedToken("USDC")}
                                className={selectedToken === "USDC" ? styles.selectedTokenSelected : ""}>USDC-WXG</span>
                        </div>
                    </div>
                    <div className={styles.pixelUsed}>
                        {selectedPixelNew.length}
                        <span>pixels used</span>
                    </div>
                    <div className={styles.btnGroup}>
                        <button className={styles.btn} onClick={() => onClickCanselHandler()}>Undo last</button>
                        <button className={styles.btn} onClick={() => {
                            setSelectedPixelNew([])
                        }}>Undo all
                        </button>
                        <button className={styles.btn} onClick={e => takeScreenshotHandler()}>Take Screenshot</button>
                        <button disabled={selectedPixelNew.length === 0} className={styles.btn}
                                onClick={() => onClickSaveHandler()}>Save and burn WXG
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-full">
            <ul className={`historyLine ${styles.historyLine}`}>
                {logPoints.map((id, i) =>
                    <li key={`${id}-${i}`}
                        className={`${styles.historyStep} ${id === selectedLog && styles.historyStepSelected}`}
                        onClick={() => onClickLogHandler(id)}>
                        <div>
                            <Moment format="YYYY/MM/DD">
                                {id}
                            </Moment>
                        </div>
                        <span>
                     <Moment format="HH:mm">
                         {id}
                     </Moment>
                 </span>
                    </li>)}
                <li
                    onClick={() => onClickLogHandler("now")}
                    key={`now`}
                    className={`historyStepNow ${styles.historyStep} ${selectedLog === "now" && styles.historyStepSelected}`}>
                    <div>
                        NOW
                    </div>
                </li>
            </ul>
        </div>
    </div>

}