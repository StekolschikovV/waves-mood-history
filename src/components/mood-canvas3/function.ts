export const positionToCoordinates = (position: number): string => {
    let i = 0
    let coordinates: string = ""
    for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
            if (i === position) {
                coordinates = `${x}-${y}`
            }
            i++
        }
    }
    return coordinates
}