import styles from "./style.module.scss"
import {useState} from "react";

export default function Promo({onLoaded}: { onLoaded(): void }) {

    const [isGifLoaded, setIsGifLoaded] = useState(false)

    return <div className={`container ${styles.promo}`} id={"promo"}>

        <div className={styles.round}>
            <img src={"promo3.gif"}
                 alt={"promo WMH"}
                 onLoad={e => setIsGifLoaded(true)}/>
            {!isGifLoaded &&
                <img
                    alt={"promo WMH"}
                    src={"promo3-static2.jpg"}
                    onLoad={e => onLoaded()}/>}
        </div>
        <div className={styles.text}>
            Experience boundless creativity, collaborative expression, and emotional release through our dynamic drawing
            app. As you paint alongside others, ignite the spark of inspiration by burning USDT-WXG or USDC-WXG tokens,
            sculpting a mesmerizing tapestry of shared feelings. Embrace the artistic revolution and join us in shaping
            a vibrant creative community.
        </div>

    </div>

}