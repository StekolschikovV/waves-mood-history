import {makeAutoObservable, toJS} from "mobx";
import {RootStore} from "@/stores/RootStore";
import axios from "axios";
import {IBlockchainData, IPixelState} from "@/interface";

export class PixelStore {

    conf = {
        size: 100
    }

    root: RootStore;
    data: IPixelState[] = []
    lastDataTime = 0

    state: Map<string, string> = new Map()

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)
        this.load()
    }

    private load = async () => {
        this.data = await axios
            .get("https://nodes.wavesnodes.com/addresses/data/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE")
            .then(e => e.data as IBlockchainData[])
            .then(e => e.filter(e => e.key.includes("log_")))
            .then((e: IBlockchainData[]) => {
                return e.map(ee => {
                    return {
                        time: +ee.key.split("_")[1],
                        pixels: ee.value.split("|").map(eee => {
                            return {
                                color: eee.split("-")[0],
                                y: +eee.split("-")[2],
                                x: 99 - +eee.split("-")[1]
                            }
                        })
                    }
                })
            })
            .catch(e => {
                console.log(e)
                return []
            })
        this.lastDataTime = this.data[this.data.length - 1].time
        // test
        this.state = this.getSliceFromTime(this.lastDataTime)
    }

    private getSliceFromTime = (time: number): Map<string, string> => {
        const validData = this.data.filter(p => p.time <= time).map(e => toJS(e)).reverse()
        const map: Map<string, string> = new Map();
        validData.forEach(e => {
            e.pixels.forEach(p => {
                if (!map.get(`${p.y}-${p.x}`)) {
                    map.set(`${p.y}-${p.x}`, p.color)
                }
            })
        })
        return map
    }


}
