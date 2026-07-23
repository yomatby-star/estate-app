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
    // console.log("selectedRoom:", selectedRoom)

    const roomFields = [
        { label: "部屋番号", key: "roomNumber", type: "text" },
        { label: "家賃", key: "rent", type: "number" },
        { label: "管理費", key: "securityDeposit", type: "number" },
        { label: "敷金", key: "securityDeposit", type: "number" },
        { label: "礼金", key: "keyMoney", type: "number" },
        { label: "間取り", key: "floorPlan", type: "text" },
        { label: "専有面積", key: "exclusiveArea", type: "text" },
        { label: "階", key: "numberFloors", type: "text" },
        { label: "向き", key: "direction", type: "text" },
        { label: "募集状況", key: "status", type: "text" },
    ] as const

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
                            <select
                                value={selectedRoomId}
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
                        </div>
                        <div className={styles.dialogContainer}>
                            {/* 左で選択された部屋の情報を入力 */}
                            <div>
                                {roomFields.map((field) => (
                                    <div key={field.key} className={styles.mainContent}>
                                        <label>{field.label}</label>
                                        <div>{selectedRoom?.[field.key] ?? "-"}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.saveButtonArea}>
                        <button onClick={onClose}>キャンセル</button>
                        <button 
                            type="button"
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