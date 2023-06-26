import styles from "./style.module.scss"
import SVG from "../SVG";

export default function TopBurners() {

    return <div className={"container"} id={"top-burners"}>
        <div className="title">Top burners</div>
        <ul className={styles.list}>
            <li className={styles.element}>
                <span>
                   <SVG name={"cup"} color={"#f3c950"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>300 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                   <SVG name={"cup"} color={"#878787"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>232 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#ad7341"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>91 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>39 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>42 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>10 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>9 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>4 WGX</span>
            </li>
            <li className={styles.element}>
                <span>
                    <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"} />
                    3MvEkw2C78pz2dKAppkhh1mRH6HuJGwRCSk
                </span>
                <span>2 WGX</span>
            </li>
        </ul>
    </div>

}