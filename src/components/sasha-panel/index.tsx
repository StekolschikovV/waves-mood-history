import styles from "./style.module.scss";
import {useState} from "react";
import Btn from "../../UI/btn";
import {IBlockchainData} from "../../interface";

interface IWinner {
    address: string
    reward: number
    WXG: number
}

export default function SashaPanel({data}: { data: any }) {

    const [step, setStep] = useState(1)
    const [selectedWinners, setSelectedWinners] = useState<IWinner[]>([])
    const [isPaid, setIsPaid] = useState(false)
    const [isRewardSetForAll, setIsRewardSetForAll] = useState<boolean>(false)

    const getTopBurners = (): IBlockchainData[] => {
        if (data) return data
            .filter((e: IBlockchainData) => e.key.includes("_pixelCount"))
            .sort((a: IBlockchainData, b: IBlockchainData) => +b.value - +a.value)
            .map((e: IBlockchainData) => {
                return {...e, key: e.key.split("_")[0]}
            })
        else return []
    }

    const selectWinnerHandler = (e: IBlockchainData): void => {
        const address = e.key
        const clearArray = selectedWinners.filter(x => x.address !== e.key)
        if (clearArray.length === selectedWinners.length) {
            setSelectedWinners([...selectedWinners, {address, reward: 0, WXG: +e?.value}])
        } else {
            setSelectedWinners(clearArray)
        }
    }

    const isWinnerSelected = (e: IBlockchainData) => {
        return selectedWinners.filter(x => x.address === e.key).length > 0
    }

    const setRewardHandler = (sw: IWinner, event: React.ChangeEvent<HTMLInputElement>) => {
        const newData: IWinner[] = selectedWinners.map(swEl => {
            return {
                ...swEl,
                reward: sw.address !== swEl.address ? swEl.reward : +((event.target as HTMLInputElement)?.value)
            }
        })
        let isRewardSetForAllLoc: null | boolean = null
        newData.map(e => {
            if (isRewardSetForAllLoc !== false) {
                if (e.reward && e.reward > 0) isRewardSetForAllLoc = true
                else isRewardSetForAllLoc = false
            }
        })
        setIsRewardSetForAll(isRewardSetForAllLoc === null ? false : isRewardSetForAllLoc)
        setSelectedWinners(newData)
    }

    console.log("selectedWinners", selectedWinners)

    return <div className={"container"}>

        <div className="title">Sasha panel</div>

        {/*header*/}
        <ul className={styles.header}>
            <li className={`${styles.headerElement} ${step === 1 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>1</div>
                <div className={styles.headerElementTitle}>Choose winners</div>
            </li>
            <li className={styles.headerHr}></li>
            <li className={`${styles.headerElement} ${step === 2 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>2</div>
                <div className={styles.headerElementTitle}>Pay rewards</div>
            </li>
            <li className={styles.headerHr}></li>
            <li className={`${styles.headerElement} ${step === 3 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>3</div>
                <div className={styles.headerElementTitle}>Clear burners</div>
            </li>
        </ul>

        {/*body*/}
        <ul className={styles.body}>
            {step === 1 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>Select burners who will be rewarded.</div>
                <ul className={styles.bodyList}>
                    {getTopBurners().map((e, i) =>
                        <li className={styles.bodyListElement} key={i}>
                            <div>
                                <div
                                    className={`${styles.bodyListElementSelect} ${isWinnerSelected(e) && styles.bodyListElementSelectSelected}`}
                                    onClick={() => selectWinnerHandler(e)}></div>
                                <div className={styles.bodyListElementText}>{e.key}</div>
                            </div>
                            <div>{0.01 * +e?.value} WGX</div>
                        </li>
                    )}
                </ul>
                <div className={styles.controls}>
                    <Btn title={"Next step"} onClick={() => setStep(2)} isDisabled={selectedWinners.length === 0}/>
                </div>
            </li>}
            {step === 2 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>Specify the amount of burners rewards.</div>
                <ul className={styles.bodyList}>
                    {selectedWinners.map((sw, i) =>
                        <li className={styles.bodyListElement} key={i}>
                            <div className={styles.bodyListElementText}>{sw.address} ({0.01 * +sw.WXG} WXG)</div>
                            <div className={styles.bodyListElementInput}>
                                <input placeholder={"0"}
                                       onChange={(e) => setRewardHandler(sw, e)}/> WAVES
                            </div>
                        </li>
                    )}
                </ul>
                <div className={styles.controls}>
                    <Btn isDisabled={isPaid || !isRewardSetForAll} title={"Pay rewards"}
                         onClick={() => setIsPaid(true)}/>
                    <Btn isDisabled={!isPaid} title={"Next step"} onClick={() => setStep(3)}/>
                </div>
            </li>}
            {step === 3 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>To encourage new burning actions, you need to clear burner list
                    for the past week. This feature is only available to the administrator.
                </div>
                <div className={styles.controls}>
                    <Btn title={"Clear burner list"} onClick={() => setStep(1)}/>
                </div>
            </li>}
        </ul>

    </div>
}