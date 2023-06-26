import styles from "./style.module.scss"

export default function Promo() {

    return <div className={`container ${styles.promo}`}>

        <div className={styles.round}
             style={{
                 backgroundImage: `url(/promo2-2.gif)`
            }}
        ></div>
        {/*<img src={"/promo.png"}/>*/}
        <div className={styles.text}>
            Experience boundless creativity, collaborative expression, and emotional release through our dynamic drawing app. As you paint alongside others, ignite the spark of inspiration by burning USDT-WXG or USDC-WXG tokens, sculpting a mesmerizing tapestry of shared feelings. Embrace the artistic revolution and join us in shaping a vibrant creative community.
        </div>

    </div>

}