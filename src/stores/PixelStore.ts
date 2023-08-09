import {makeAutoObservable, toJS} from "mobx";
import {RootStore} from "@/stores/RootStore";
import axios from "axios";
import {IBlockchainData, IPixelState} from "@/interface";
import {InvokeArgs, Signer} from "@waves/signer";
import {ProviderKeeper} from "@waves/provider-keeper";
import _ from 'lodash';

export class PixelStore {

    root: RootStore;
    data: IPixelState[] = []
    lastDataTime = 0
    selectedDataTime = 0

    state: Map<string, string> = new Map()
    stateNew: Map<string, string> = new Map()
    stateNewTemp: Map<string, string> = new Map()

    color = "red"

    signer: Signer
    selectedToken: "USDT" | "USDC" = "USDT"

    mode: "draw" | "clean" = "draw"

    blockchainDataLimit = 60

    // needUpdatePixel = 0
    debouncedAddNewPixel = _.debounce(() => {
        this.stateNewTemp.forEach((value, key, map) => {
            this.stateNew.set(key, value)
        })
        this.stateNewTemp = new Map()
    }, 1000);

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this)

        this.load()

        this.signer = new Signer({NODE_URL: 'https://nodes.wavesnodes.com'})
        this.signer.setProvider(new ProviderKeeper());

        // TODO: remove
        // @ts-ignore
        window.xxx = this
    }

    public addNewPixel = (name: string, color: string) => {
        this.stateNewTemp.set(name, color)
        this.debouncedAddNewPixel();
    }

    public cleanPixel = (name: string) => {
        this.stateNew.delete(name)
    }

    public travelToTime = (time: number): void => {
        this.state = this.getSliceFromTime(time)
        this.selectedDataTime = time
    }

    public clean() {
        this.stateNew.clear()
        this.implementNewData(this.data)
    }

    public saveNewToBlockchain = async () => {
        let newData: any[] = []
        this.stateNew.forEach((value, key, map) => {
            const arr = key.split("-")
            const y = Math.abs(+arr[1] - 99)
            const x = Math.abs(+arr[0])
            newData.push({
                type: 'string',
                value: `${value}-${y}-${x}`,
                keyForDel: key,
                valueForDel: value,
            })
        })
        let USDTWXG = "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ"
        let USDCWXG = "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ"
        _.chunk(newData, this.blockchainDataLimit).forEach(e => {
            const data: InvokeArgs = {
                dApp: "3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
                fee: 500000,
                payment: [{
                    assetId: this.selectedToken === "USDT" ? USDTWXG : USDCWXG,
                    amount: 10000 * e.length,
                }],
                call: {
                    function: 'draw',
                    args: [
                        {
                            type: "list",
                            value: e
                        }
                    ]
                }
            }
            this.signer
                .invoke(data)
                .broadcast()
                .then((_) => {
                    e.forEach(ee => {
                        this.stateNew.delete(ee.keyForDel)
                    })
                })
                .catch((_) => {
                    e.forEach((ee: any) => {
                        this.stateNew.delete(ee.keyForDel)
                    })
                    this.implementNewData(this.data)
                    console.log(e)
                })
        })

        setTimeout(() => {
            this.load()
        }, 6000)
        setTimeout(() => {
            this.load()
        }, 20000)
    }

    private load = async () => {
        const date = await axios
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
            .then((e: IPixelState[]) => {
                let clearArray: IPixelState[] = []
                e.map(ee => {
                    let isExist = false
                    clearArray.forEach((eee, i) => {
                        if (eee.time === ee.time) {
                            clearArray[i].pixels.concat(ee.pixels)
                            isExist = true
                        }
                    })
                    if (!isExist) {
                        clearArray.push(ee)
                    }
                })
                return clearArray
            })
            .catch(e => {
                console.log(e)
                return []
            })
        this.implementNewData(date)
    }

    private implementNewData = (date: IPixelState[]) => {
        const lastDateSize = this.data.length
        this.data = date
        this.lastDataTime = this.data[this.data.length - 1].time
        this.state = this.getSliceFromTime(this.lastDataTime)
        if (lastDateSize > 0) {
            this.selectedDataTime = this.lastDataTime
        }
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
