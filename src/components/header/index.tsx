import styles from "./style.module.scss"
import {useEffect, useState} from "react";

export default function Header({onLoaded}: { onLoaded(): void }) {

    const [isMobOpen, setIsMobOpen] = useState(false)

    useEffect(() => {
        const onClick = (e: any) => {
            const el: any = document.querySelector(`.${styles.menu}`)
            if (el && el?.style?.right === "-10px") {
                setIsMobOpen(false)
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const clickHandler = () => {
        setTimeout(() => {
            setIsMobOpen(true)
        }, 300)
    }

    return <div className={`container ${styles.header}`}>
        <div className={styles.logoContainer}>
            <img alt={"logo"} src={"logo.svg"} onLoad={e => onLoaded()}/>
            <div className={styles.logoText}>mood history</div>
        </div>
        <ul className={styles.menu} style={{right: !isMobOpen ? "-1000px" : "-10px"}}>
            <li className={styles.menuElement}><a href="#mood-canvas">Mood canvas</a></li>
            <li className={styles.menuElement}><a href="#top-burners">Top burners</a></li>
            <li className={styles.menuElement}><a href="#FAQ">FAQ</a></li>
            <li className={styles.menuElement}><a href="#sasha-panel">Sasha panel</a></li>
        </ul>
        <button className={styles.menuMob} onClick={clickHandler}>
            <svg viewBox="0 0 100 80" width="30" height="20">
                <rect fill={"#eeeeee"} width="100" height="10" rx="8"></rect>
                <rect fill={"#eeeeee"} y="25" width="100" height="10" rx="8"></rect>
                <rect fill={"#eeeeee"} y="50" width="100" height="10" rx="8"></rect>
            </svg>
        </button>
    </div>
}