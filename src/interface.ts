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

export interface ILogData extends IBlockchainData{
    id: number
}