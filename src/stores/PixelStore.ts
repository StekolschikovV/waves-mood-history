import {makeAutoObservable, toJS} from "mobx";
import {RootStore} from "@/stores/RootStore";
import axios from "axios";
import {IBlockchainData, IPixelState} from "@/interface";
import {InvokeArgs, Signer} from "@waves/signer";
import {ProviderKeeper} from "@waves/provider-keeper";
import _ from 'lodash';
import {toast} from "react-toastify";

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

    blockchainDataLimit = 10

    debouncedAddNewPixelCounter = 0
    debouncedAddNewPixel = _.debounce(() => {
        this.stateNewTemp.forEach((value, key, map) => {
            if (this.stateNew.size <= this.blockchainDataLimit - 1) {
                this.stateNew.set(key, value)
            }
        })
        this.stateNewTemp = new Map()
    }, 500);

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
        this.debouncedAddNewPixelCounter = this.debouncedAddNewPixelCounter + 1
        if (this.debouncedAddNewPixelCounter <= this.blockchainDataLimit) {
            this.stateNewTemp.set(name, color)
            this.debouncedAddNewPixel();
        }
    }

    public cleanPixel = (name: string) => {
        this.stateNew.delete(name)
    }

    public travelToTime = (time: number): void => {
        this.state = this.getSliceFromTime(time)
        this.selectedDataTime = time
    }

    public clean() {
        // this.stateNew.clear()
        // this.implementNewData(this.data)
        this.load()
        this.stateNew.clear()
        this.debouncedAddNewPixelCounter = 0

    }

    public saveNewToBlockchain = async () => {
        this.debouncedAddNewPixelCounter = 0

        let newData: any[] = []
        let newDataClear: any[] = []
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
            newDataClear.push({
                type: 'string',
                value: `${value}-${y}-${x}`,
                // keyForDel: key,
                // valueForDel: value,
            })
        })
        // let resArr: any[][] = []
        // let tempArr: any[] = []
        //
        // newData.forEach(el => {
        //     tempArr.push(el)
        //     if (tempArr.length === 2) {
        //         resArr.push(tempArr)
        //         tempArr = []
        //     }
        // })
        // if (tempArr.length > 0) {
        //     resArr.push(tempArr)
        // }
        // this.invoke(resArr)
        let USDTWXG = "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ"
        let USDCWXG = "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ"
        const data: InvokeArgs = {
            dApp: "3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
            fee: 500000,
            payment: [{
                assetId: this.selectedToken === "USDT" ? USDTWXG : USDCWXG,
                amount: 10000 * newDataClear.length,
            }],
            call: {
                function: 'draw',
                args: [
                    {
                        type: "list",
                        value: newDataClear
                    }
                ]
            }
        }
        this.signer
            .invoke(data)
            .broadcast()
            .then((response) => {
                // console.log(response)
                // newData.forEach(ee => {
                //     // this.state.set(ee.keyForDel, ee.valueForDel)
                //     this.stateNew.delete(ee.keyForDel)
                // })
                setTimeout(() => {
                    this.load()

                }, 3000)
                // this.invoke(newData)
            })
            .catch((error) => {
                // console.log(error.message)
                toast(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // newData.forEach((ee: any) => {
                //     this.stateNew.delete(ee.keyForDel)
                // })
                this.load()
            })
        // console.log(newData, _.chunk(newData, this.blockchainDataLimit))
        // this.invoke(newData)
        // _.chunk(newData, this.blockchainDataLimit).forEach(e => {
        // resArr.forEach(e => {
        //     let USDTWXG = "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ"
        //     let USDCWXG = "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ"
        //     const data: InvokeArgs = {
        //         dApp: "3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
        //         fee: 500000,
        //         payment: [{
        //             assetId: this.selectedToken === "USDT" ? USDTWXG : USDCWXG,
        //             amount: 10000 * e.length,
        //         }],
        //         call: {
        //             function: 'draw',
        //             args: [
        //                 {
        //                     type: "list",
        //                     value: e
        //                 }
        //             ]
        //         }
        //     }
        //     this.signer
        //         .invoke(data)
        //         .broadcast()
        //         .then((response) => {
        //             console.log(response)
        //             e.forEach(ee => {
        //                 this.state.set(ee.keyForDel, ee.valueForDel)
        //                 this.stateNew.delete(ee.keyForDel)
        //             })
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //
        //             e.forEach((ee: any) => {
        //                 this.stateNew.delete(ee.keyForDel)
        //             })
        //             // this.implementNewData(this.data)
        //             this.load()
        //             console.log(e)
        //         })
        // })
    }

    public load = async () => {
        this.debouncedAddNewPixelCounter = 0
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
            .finally(() => {
                this.stateNew.clear()
            })
        this.implementNewData(date)
    }

    private invoke = (newData: any[]) => {
        let USDTWXG = "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ"
        let USDCWXG = "6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ"
        const data: InvokeArgs = {
            dApp: "3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
            fee: 500000,
            payment: [{
                assetId: this.selectedToken === "USDT" ? USDTWXG : USDCWXG,
                amount: 10000 * newData.length,
            }],
            call: {
                function: 'draw',
                args: [
                    {
                        type: "list",
                        value: newData
                    }
                ]
            }
        }
        this.signer
            .invoke(data)
            .broadcast()
            .then((response) => {
                console.log(response)
                newData.forEach(ee => {
                    this.state.set(ee.keyForDel, ee.valueForDel)
                    this.stateNew.delete(ee.keyForDel)
                })
                // this.invoke(newData)
            })
            .catch((error) => {
                // console.log(error.message)
                toast(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                newData.forEach((ee: any) => {
                    this.stateNew.delete(ee.keyForDel)
                })
                this.load()
            })

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
