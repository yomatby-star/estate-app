import styles from "./ResetDialog.module.css"

type Props = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void; 
}

export default function ResetDialog({ open, title, message, onConfirm, onClose }: Props) {
    if(!open) return null
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <strong className={styles.title}>{title}</strong>
                <p className={styles.message}>{message}</p>

                <div className={styles.buttonArea}>
                    <button className={styles.confirmButton} onClick={onClose}>いいえ</button>
                    <button className={`${styles.confirmButton} ${styles.resetButton}`} onClick={onConfirm}>はい</button>
                </div>
            </div>
        </div>
    )
}