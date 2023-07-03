import styles from "./style.module.scss";

interface IProps {
    title: string
    onClick: () => void
    isW100?: boolean
    isDisabled?: boolean
}

export default function Btn({title, onClick, isW100 = false, isDisabled = false}: IProps) {

    return <button
        disabled={isDisabled}
        className={`${styles.btn} ${isW100 && styles.isW100}`} onClick={onClick}>
        {title}
    </button>

}