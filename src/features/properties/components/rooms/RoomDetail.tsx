import type { Property } from "../../../../mocks/properties/mock"
import styles from "./RoomDetail.module.css"

type RoomStatus = Property["roomStatus"][number]

type Props = {
  selectedRoom: RoomStatus | null
}

export default function RoomDetail({ selectedRoom }: Props) {

  const statusLabel = 
    selectedRoom?.status === "vacant" 
      ? "空室" 
      : selectedRoom?.status === "closed" 
        ? "募集停止" 
        : ""

  const statusStyle = 
    selectedRoom?.status === "vacant"
      ? styles.vacantStyle
      : selectedRoom?.status === "closed"
        ? styles.closedStyle
        : ""

  const basic = [
    { label: "部屋番号", value: `${selectedRoom?.roomNumber} 号室` },
    { label: "タイプ", value: `${selectedRoom?.basic.type}` },
    { label: "専有面積", value: `${selectedRoom?.basic.occupiedArea} ㎡` },
    { label: "階数", value: `${selectedRoom?.basic.roomFloor} 階` },
  ]

  const conditions = [
    { label: "賃料", value: selectedRoom?.conditions.rent, suffix: "/ 月"},
    { label: "管理費", value: selectedRoom?.conditions.managementFee, suffix: "/ 月"},
    { label: "礼金", value: selectedRoom?.conditions.reikin,},
    { label: "敷金", value: selectedRoom?.conditions.shikikin},
  ]

  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>基本情報</div>
          <div className={`${styles.statusField} ${statusStyle}`}>{statusLabel}</div>
        </div>
        {basic.map(({ label, value }) => (
          <div key={label} className={styles.basic}>
            <span className={styles.basicLabel}>{label}</span>
            <span className={styles.basicValue}>{value}</span>
          </div>
        ))}
      </div>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>設備</div>
        </div>
        <div className={styles.equipmentItemField}>
          {selectedRoom?.equipment.map((i, idx) => 
            <span key={idx} className={styles.equipmentItem}>{i}</span>
          )}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>条件</div>
        </div>
        <div className={styles.conditionsField}>
          {conditions.map(({ label, value, suffix }) => 
            <div key={label} className={styles.basic}>
              <span className={styles.basicLabel}>{label}</span>
              <span className={styles.basicValue}>{value}</span>
              { suffix && <span>{suffix}</span>}
            </div>
          )}
          <button className={styles.registerButton}>この部屋に入居者を登録する</button>
        </div>
      </div>
    </div>
  )
}
