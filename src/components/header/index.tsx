import styles from "./style.module.scss"
import {useEffect, useState} from "react";

export default function Header() {

    const [isMobOpen, setIsMobOpen] = useState(false)

    useEffect(() => {
        const onClick = (event: Event) => {
            if (event?.target?.constructor.name !== "SVGRectElement") {
                setIsMobOpen(false)
            }
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    return <div className={`container ${styles.header}`}>
        <div className={styles.logoContainer}>
            <div className={styles.logo}>
                <div className={styles.logoSymbol}>H</div>
            </div>
            <div className={styles.logoText}>mood history</div>
        </div>
        <ul className={styles.menu} style={{right: !isMobOpen ? "-1000px" : "-10px"}}>
            <li className={styles.menuElement}>Mood canvas</li>
            <li className={styles.menuElement}>Time machine</li>
            <li className={styles.menuElement}>Top burners</li>
            <li className={styles.menuElement}>FAQ</li>
        </ul>

        <div className={styles.menuMob} onClick={() => setIsMobOpen(true)}>
            <svg  viewBox="0 0 100 80" width="30" height="20">
                <rect fill={"#eeeeee"} width="100" height="10" rx="8"></rect>
                <rect fill={"#eeeeee"} y="25" width="100" height="10" rx="8"></rect>
                <rect fill={"#eeeeee"} y="50" width="100" height="10" rx="8"></rect>
            </svg>
        </div>



    </div>

}