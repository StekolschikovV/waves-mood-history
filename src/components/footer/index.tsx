import styles from "./style.module.scss"

export default function Footer() {

    return <div className={`container ${styles.footer}`}>
        <ul className={styles.left}>
            <li><a href="https://github.com/StekolschikovV/waves-mood-hostory">GitHub</a></li>
            <li><a href="https://new.wavesexplorer.com/addresses/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE">Smart contract</a></li>
        </ul>
        <div className={styles.right}>
            <span>Support our project: </span>
            3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE
        </div>
    </div>

}