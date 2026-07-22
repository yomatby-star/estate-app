import type { Room } from "../../mocks/properties/mock";
import styles from "../confirmDialog/roomRegisterDialog.module.css"

type Props = {
    open: boolean;
    onClose: () => void;
    buildingName: string;
}

export default function RoomRegisterDialog({ open, onClose, buildingName }: Props) {
    if(!open) return 
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.dialogContainer}>
                    <div className={styles.dialogHeader}>
                        <div>{buildingName}</div>
                        <button onClick={onClose}>閉じる</button>
                    </div>
                    <div className={styles.dialogMain}>
                        <div className={styles.dialogContainer}>
                            <select name="" id="">
                                <option value="">新規登録</option>
                                <option value="">101</option>
                                <option value="">102</option>
                                <option value="">103</option>
                            </select>
                            {/* <div>
                                <button>101</button>
                                <button>102</button>
                                <button>103</button>
                                <button>104</button>
                            </div> */}
                        </div>
                        <div className={styles.dialogContainer}>
                            {/* 左で選択された部屋の情報を入力 */}
                            <div>
                                <div>基本情報</div>
                                <div>部屋番号 101</div>
                                <div>間取り 1K</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.saveButtonArea}>
                        <button>キャンセル</button>
                        <button>保存</button>
                    </div>
                </div>
            </div>
        </div>
    )
}