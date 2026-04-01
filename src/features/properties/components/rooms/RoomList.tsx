import type { Property } from "../../../../mocks/properties/mock"
import styles from "./RoomList.module.css"

type Props = {
  property: Property;
  selectedRoomNumber: string | null;
  onSelectRoom: (roomNumber: string) => void;
}

export default function RoomList({ property, selectedRoomNumber, onSelectRoom }: Props) {
  const vacant = property.roomStatus.filter((r) => r.status === "vacant")
  const closed = property.roomStatus.filter((r) => r.status === "closed")

  const roomStatusList = [
    { label: "空室", value: vacant, className: styles.vacantName },
    { label: "募集停止", value: closed, className: styles.closedName }
  ]

  return (
    <div className={styles.stack}>
      <h2 className={styles.title}>{property.basic.name}</h2>
      <div className={styles.listItemField}>
        {roomStatusList.map(({ label, value, className }) => 
          <div key={label} className={styles.listItem}>
            <div className={`${styles.labelName} ${className}`}>{label}</div>
            <div className={styles.item}>
              {value.map((r) => (
                <button 
                  type="button" 
                  key={r.roomNumber} 
                  className={`${styles.button} ${selectedRoomNumber === r.roomNumber ? styles.active : ""}`}
                  onClick={() => onSelectRoom(r.roomNumber)}
                >
                  {r.roomNumber}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
