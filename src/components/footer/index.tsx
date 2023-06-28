import styles from "./style.module.scss"

export default function Footer() {

    return <div className={`container ${styles.footer}`}>
        <ul className={styles.left}>
            <li><a href="https://github.com/StekolschikovV/waves-mood-hostory">GitHub</a></li>
            <li><a href="https://new.wavesexplorer.com/addresses/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE">Smart contract</a>
            </li>
            <li>
                <a href="mailto:wavesmoodhistory@gmail.com">
                    <svg xmlns="http://www.w3.org/2000/svg" height="800px"
                         width="800px" version="1.1" id="_x32_" viewBox="0 0 512 512">
                        <g>
                            <path className="st0" fill={"#eee"}
                                  d="M440.917,67.925H71.083C31.827,67.925,0,99.752,0,139.008v233.984c0,39.256,31.827,71.083,71.083,71.083   h369.834c39.255,0,71.083-31.827,71.083-71.083V139.008C512,99.752,480.172,67.925,440.917,67.925z M178.166,321.72l-99.54,84.92   c-7.021,5.992-17.576,5.159-23.567-1.869c-5.992-7.021-5.159-17.576,1.87-23.567l99.54-84.92c7.02-5.992,17.574-5.159,23.566,1.87   C186.027,305.174,185.194,315.729,178.166,321.72z M256,289.436c-13.314-0.033-26.22-4.457-36.31-13.183l0.008,0.008l-0.032-0.024   c0.008,0.008,0.017,0.008,0.024,0.016L66.962,143.694c-6.98-6.058-7.723-16.612-1.674-23.583c6.057-6.98,16.612-7.723,23.582-1.674   l152.771,132.592c3.265,2.906,8.645,5.004,14.359,4.971c5.706,0.017,10.995-2.024,14.44-5.028l0.074-0.065l152.615-132.469   c6.971-6.049,17.526-5.306,23.583,1.674c6.048,6.97,5.306,17.525-1.674,23.583l-152.77,132.599   C282.211,284.929,269.322,289.419,256,289.436z M456.948,404.771c-5.992,7.028-16.547,7.861-23.566,1.869l-99.54-84.92   c-7.028-5.992-7.861-16.546-1.869-23.566c5.991-7.029,16.546-7.861,23.566-1.87l99.54,84.92   C462.107,387.195,462.94,397.75,456.948,404.771z"/>
                        </g>
                    </svg>
                </a>
            </li>
            <li><a href="https://t.me/waves_mood_history">
                <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 15 15" fill="none">
                    <path
                        d="M14.9932 1.58221C15.0223 1.40736 14.9567 1.23016 14.8208 1.11645C14.6848 1.00274 14.4988 0.969519 14.3318 1.02914L0.331836 6.02914C0.143209 6.0965 0.0129867 6.26994 0.000913704 6.46987C-0.0111592 6.6698 0.0972469 6.85765 0.276398 6.94722L4.2764 8.94722C4.43688 9.02746 4.62806 9.01556 4.77735 8.91603L8.09775 6.70244L6.10957 9.18766C6.02203 9.29709 5.98442 9.43824 6.00592 9.57672C6.02742 9.7152 6.10605 9.8383 6.22265 9.91603L12.2227 13.916C12.3638 14.0101 12.5431 14.0262 12.6988 13.9588C12.8545 13.8914 12.9653 13.7496 12.9932 13.5822L14.9932 1.58221Z"
                        fill="#eee"/>
                </svg>
            </a></li>
        </ul>
        <div className={styles.right}>
            <span>Support project: </span>
            3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE
        </div>
    </div>

}