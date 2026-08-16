import { useEffect, useState } from "react";
import type { Room } from "../../mocks/properties/mock";
import styles from "../confirmDialog/roomRegisterDialog.module.css"
import { useNavigate } from "react-router-dom";
import { REGISTER_NAV, ROUTES } from "../../routes/rouets";

type Props = {
    open: boolean;
    onClose: () => void;
    buildingName: string;
    buildingId: string;
    rooms: Room[]
}

export default function RoomRegisterDialog({ open, onClose, buildingName, buildingId, rooms }: Props) {
    if(!open) return 

    const navigate = useNavigate()

    const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id ?? "")
    // console.log("selectedRoomId:", selectedRoomId)

    const selectedRoom = rooms.find((room) => room.id === selectedRoomId)
    console.log("selectedRoom:", selectedRoom)
    console.log("equipments:", selectedRoom?.equipments)

    const roomFields = [
        { label: "部屋番号", key: "roomNumber", type: "text", suffix: " 号室" },
        { label: "家賃", key: "rent", type: "number", suffix: " 円" },
        { label: "管理費", key: "managementFee", type: "number", suffix: " 円" },
        { label: "敷金", key: "securityDeposit", type: "number", suffix: " 円" },
        { label: "礼金", key: "keyMoney", type: "number", suffix: " 円" },
        { label: "間取り", key: "floorPlan", type: "text", suffix: "" },
        { label: "専有面積", key: "exclusiveArea", type: "text", suffix: " ㎡" },
        { label: "階", key: "numberFloors", type: "text", suffix: " 階" },
        { label: "向き", key: "direction", type: "text", suffix: "" },
        { label: "募集状況", key: "status", type: "text", suffix: "" },
    ] as const

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.dialogContainer}>
                    <div className={styles.dialogHeader}>
                        <div className={styles.buildingNameTitle}>{buildingName}</div>
                        <button onClick={onClose} className={styles.navItem}>閉じる</button>
                    </div>
                    <div className={styles.dialogMain}>
                        <select
                            value={selectedRoomId}
                            className={styles.roomSelectArea}
                            onChange={(e) => setSelectedRoomId(e.target.value)}    
                        >
                            {rooms.map((room) => (
                                <option
                                    key={room.id}
                                    value={room.id}
                                >
                                    {room.roomNumber}
                                </option>
                            ))}
                        </select>
                        <div className={styles.mainContainer}>
                            {/* 左で選択された部屋の情報を入力 */}
                            <strong className={styles.basicLabel}>基本情報</strong>
                            <div className={styles.labalField}>
                                {roomFields.map((field) => {
                                    const value = selectedRoom?.[field.key] || "-"
                                    return (
                                        <div className={styles.mainContent}>
                                            <label className={styles.labal}>{field.label}</label>
                                            <div className={styles.value}>
                                                {field.key === "status"
                                                    ? value === "closed"
                                                        ? "募集停止"
                                                        : value === "vacant"
                                                            ? "空室"
                                                            :value
                                                    :value
                                                }
                                                {field.suffix}
                                            </div>
                                        </div>
                                    )
                                })}
                                {/* {roomFields.map((field) => (
                                    <div key={field.key} className={styles.mainContent}>
                                        <label className={styles.labal}>{field.label}</label>
                                        <div>{selectedRoom?.[field.key] ?? "-"} {field.suffix}</div>
                                    </div>
                                ))} */}
                            </div>
                            <strong className={styles.basicLabel}>設備</strong>
                            <div className={styles.equipmentsFields}>
                                {selectedRoom?.equipments.map((equipment) => (
                                    <div key={equipment} className={styles.equipmentItem}>
                                        {equipment}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.saveButtonArea}>
                        <button onClick={onClose} className={styles.confirmButton}>キャンセル</button>
                        <button 
                            type="button"
                            className={`${styles.confirmButton} ${styles.openDialogButton}`}
                            onClick={() => 
                                navigate(`${ROUTES.register}/${REGISTER_NAV.room}?buildingId=${buildingId}&copyRoomId=${selectedRoomId}`)
                            }
                        >
                            複製して修正
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}