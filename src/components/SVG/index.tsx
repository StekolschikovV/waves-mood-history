interface ISVG {
    name: "cup"
    color: string
    width?: string
    height?: string
}
export default function SVG({name, color, width = "30px", height = "30px"}: ISVG) {

    if (name === "cup")
        return <>
            <svg fill={color} height={height} width={width} version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32">
                <path d="M29,6h-5V5c0-0.6-0.4-1-1-1H9C8.4,4,8,4.4,8,5v1H3C2.4,6,2,6.4,2,7v2.7c0,4.4,3.4,8,7.8,8.2c0.8,1.1,1.9,1.9,3.2,2.4V23h-1
                    c-1.7,0-3,1.3-3,3v3c0,0.6,0.4,1,1,1h12c0.6,0,1-0.4,1-1v-3c0-1.7-1.3-3-3-3h-1v-2.6c1.3-0.5,2.4-1.4,3.2-2.4
                    c4.3-0.3,7.8-3.8,7.8-8.2V7C30,6.4,29.6,6,29,6z M4,9.7V8h4v5c0,1,0.2,1.9,0.5,2.7C5.9,15,4,12.6,4,9.7z M28,9.7
                    c0,2.8-1.9,5.2-4.5,6C23.8,14.9,24,14,24,13V8h4V9.7z"/>
            </svg>
        </>
    else return <></>
}