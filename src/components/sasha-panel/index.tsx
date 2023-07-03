import styles from "./style.module.scss";
import {useState} from "react";

export default function SashaPanel() {

    const [step, setStep] = useState(1)

    return <div className={"container"}>
        <div className="title">Sasha panel</div>
        <ul className={styles.header}>
            <li
                onClick={e => setStep(1)}
                className={`${styles.headerElement} ${step === 1 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>1</div>
                <div className={styles.headerElementTitle}>Choose winners</div>
            </li>
            <li className={styles.headerHr}></li>
            <li
                onClick={e => setStep(2)}
                className={`${styles.headerElement} ${step === 2 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>2</div>
                <div className={styles.headerElementTitle}>Pay rewards</div>
            </li>
            <li className={styles.headerHr}></li>
            <li
                onClick={e => setStep(3)}
                className={`${styles.headerElement} ${step === 3 && styles.headerElementSelected}`}>
                <div className={styles.headerElementNum}>3</div>
                <div className={styles.headerElementTitle}>Clear burners</div>
            </li>
        </ul>

        <ul className={styles.body}>
            {step === 1 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>Select burners who will be rewarded.</div>
                <div className={styles.controls}>
                    <button>Next step</button>
                </div>
            </li>}
            {step === 2 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>Specify the amount of burners rewards.</div>
                <div className={styles.controls}>
                    <button>Pay rewards</button>
                    <button>Next step</button>
                </div>
            </li>}
            {step === 3 && <li className={styles.bodyElement}>
                <div className={styles.bodyInfo}>To encourage new burning actions, you need to clear burner list
                    for the past week. This feature is only available to the administrator.
                </div>
                <div className={styles.controls}>
                    <button>Clear burner list</button>
                </div>
            </li>}
        </ul>

    </div>

}