import styles from "./style.module.scss"
import SVG from "../SVG";
import {IBlockchainData} from "../../interface";

export default function TopBurners({data}: { data: any }) {

    const getTopBurners = (): IBlockchainData[] => {
        if (data) return data
            .filter((e: IBlockchainData) => e.key.includes("_pixelCount"))
            .sort((a: IBlockchainData, b: IBlockchainData) => +b.value - +a.value)
            .map((e: IBlockchainData) => {
                return {...e, key: e.key.split("_")[0]}
            })
        else return []
    }
    
    return <div className={"container"} id={"top-burners"}>
        <div className="title">Top burners</div>
        <ul className={styles.list}>
            {getTopBurners().map((e, i) =>
                <li className={styles.element} key={e.key}>
                    <span>
                        {i === 0 && <SVG name={"cup"} color={"#f3c950"} width={"25px"} height={"25px"}/>}
                        {i === 1 && <SVG name={"cup"} color={"#878787"} width={"25px"} height={"25px"}/>}
                        {i === 2 && <SVG name={"cup"} color={"#ad7341"} width={"25px"} height={"25px"}/>}
                        {i > 2 && <SVG name={"cup"} color={"#323846"} width={"25px"} height={"25px"}/>}
                        {e?.key}
                    </span>
                    <span>{0.01 * +e?.value} WGX</span>
                </li>
            )}
        </ul>
    </div>

}