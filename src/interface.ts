export interface IPixel {
    color: string
    width: number
    height: number
}

export interface IBlockchainData {
    key: string
    type?: string
    value: string
}

export interface IPixelState {
    pixels: {
        color: string
        y: number
        x: number
    }[],
    time: number
}


export interface ILogData extends IBlockchainData {
    id: number
}

