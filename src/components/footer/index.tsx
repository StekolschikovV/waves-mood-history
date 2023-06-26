import styles from "./style.module.scss"

export default function Footer() {

    return <div className={`container ${styles.footer}`}>
        <ul className={styles.left}>
            <li><a href="">GitHub</a></li>
            <li><a href="">Smart contract</a></li>
        </ul>
        <div className={styles.right}>
            <span>Support our project:</span>
            3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
        </div>
    </div>

}