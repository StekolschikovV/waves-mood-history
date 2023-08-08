import {IPixel} from "@/interface";

export default class CanvasHelper {

    size = 0
    pixels: IPixel[] = []
    lastSate: IPixel[][] | null = null

    constructor(size: number) {
        this.size = size
    }

    public upload = (pixels: IPixel[]) => {
        if (this.pixels.length !== pixels.length) {
            this.pixels = pixels
            this.lastSate = this.getLastSate()
        }
    }

    public getMyColor = (name: string) => {
        let result = ""
        const arr = name.split("-")
        const y = +arr[0]
        const x = +arr[1]
        if (this.lastSate) {
            result = this.lastSate[y][x].color
        }
        return result
    }

    private getLastSate = (): IPixel[][] => {
        let result: IPixel[][] = []
        Array.from({length: this.size}).forEach((_, yI) => {
            let line: IPixel[] = []
            Array.from({length: this.size}).forEach((_, xI) => {
                let p: IPixel = {color: "white", width: xI, height: yI}
                this.pixels.forEach(e => {
                    if (e.height === xI && e.width === yI) p = e
                })
                line.push(p)
            })
            result.push(line.reverse())
        })
        return result
    }

}