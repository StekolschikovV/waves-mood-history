import styles from "./style.module.scss"
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {InvokeArgs, Signer} from "@waves/signer";
import {ProviderKeeper} from "@waves/provider-keeper";
import Moment from 'react-moment';
import { ToastContainer, toast } from 'react-toastify';
import {IBlockchainData, ILogData, IPixel} from "../../interface";

export default function MoodCanvas({data}: {data: any}) {


    const width = 100
    const height = 100
    const colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow']

    const [selectedToken, setSelectedToken] = useState<"USDT" | "USDC">("USDT")
    const [selectedColor, setSelectedColor] = useState("red")
    const [selectedPixel, setSelectedPixel] = useState<IPixel[]>([])
    const [selectedPixelNew, setSelectedPixelNew] = useState<IPixel[]>([])
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [log, setLog] = useState<IBlockchainData[]>([])

    const signer = new Signer({
        NODE_URL: 'https://nodes-testnet.wavesnodes.com',
    });
    const keeper = new ProviderKeeper();
    signer.setProvider(keeper);

    const decompressData = (data: string) => {
        return  data.split("|").filter((e: string) => !!e).map((e: string) => {
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

    const onClickExportHandler = () => { // |red-17-67|red-18-67|red-19-67|red-20-67
        let result = ""
        selectedPixelNew.forEach(c => {
            result += `|${c.color}-${c.width}-${c.height}`
        })
        console.log(result)
    }
    const onClickSaveHandler = async () => {
        const data: InvokeArgs = {
            dApp: "3Mxkh7f6KwxmC83NvQ71Mcpk7B7tXBCNsLY",
            fee: 500000,
            payment: [],
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
        const broadcastResult = await signer
            .invoke(data)
            .broadcast()
            .then(e => e)
            .catch((e) => e)
        console.log("broadcastResult", broadcastResult)
        setTimeout(() => {
            setSelectedPixelNew([])
        }, 4000)
    }

    const onClickCanselHandler = () => {
        setSelectedPixelNew(selectedPixelNew.filter((_, i, a) => i !== (a.length - 1)))
    }
    const addNewPixelHandler = (pixel: IPixel) => {
        if (selectedPixelNew.length < 60) {
            let oldPixels = selectedPixelNew.filter(p => !(p.height === pixel.height && p.width === pixel.width))
            setSelectedPixelNew([...oldPixels, pixel])
        } else {
            toast('60 pixels max per transaction!', {
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
    }

    const [isInit, setInit] = useState(false)

    useEffect(() => {
        if (data) {
            setSelectedPixel(decompressData(
                data
                    .filter((e: IBlockchainData) => e.key.includes("-"))
                    .map((e: IBlockchainData) => `|${e.value}-${e.key}`).join(""))
            )
            setLog(data.filter((e: IBlockchainData) => e.key.includes("log_")))
            let element: any = document.querySelector(`.historyLine`)

            if (!isInit && element) {
                setInit(true)
               setTimeout(() =>{
                   element.scrollLeft = element?.scrollWidth
               }, 3000)
            }
        }
    }, [data])

    const logPoints = log.map(e => +(e.key.split("_")[1])).sort((a, b) => a - b)

    const [selectedLog, setSelectedLog]= useState<string | number>("now")

    function onClickLogHandler(id: number | string) {
            let result: IPixel[]= []
            log
                .map(e => {
                    return {...e, id: +e.key.split("_")[1]}
                })
                .filter(e => id !== "now" ? e.id <= id : true)
                .sort((a : ILogData, b: ILogData) => a.id - b.id)
                .map( e => {
                    const stepData = decompressData(e.value) as unknown as IPixel
                    result = result.concat(stepData)
                })
            setSelectedLog(id)
            setSelectedPixel(result)
    }



    return <div className={styles.moodCanvasWrapper} id={"mood-canvas"}>


        <div className={`container ${styles.moodCanvas}`}>
            <div className={"title"}>Mood canvas</div>
            <div className={styles.innerContainer}>
                <div className={styles.text}>
                    This drawing will be permanently stored in the blockchain on behalf of your account. Try to express your emotions by answering the following questions:
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
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => setIsMouseDown(false)}
                        className={styles.canva}
                    >
                        {Array.from({length: height}).map((row, rowI) => {
                            return <div key={`${rowI}`} className={styles.canvaRow}>
                                {Array.from({length: width}).map((pixel, pixelI) => {
                                    let isPixelSelectedLoc = isPixelSelected(rowI, pixelI, false)
                                    let isPixelSelectedLocNew = selectedLog === "now" ? isPixelSelected(rowI, pixelI, true): []
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
                        <button className={styles.btn}>Refresh</button>
                        <button className={styles.btn} onClick={() => onClickCanselHandler()}>Undo last </button>
                        <button className={styles.btn} onClick={() => onClickSaveHandler()}>Save and burn WXG</button>
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
                    key={`now`} className={`historyStepNow ${styles.historyStep} ${selectedLog === "now" && styles.historyStepSelected}`}>
                    <div>
                        NOW
                    </div>
                </li>
            </ul>
        </div>
    </div>

}