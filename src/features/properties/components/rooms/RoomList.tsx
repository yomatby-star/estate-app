import type { Room } from "../../../../mocks/properties/mock"
import styles from "./RoomList.module.css"

type Props = {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
  buildingName: string;
}

export default function RoomList({ rooms, selectedRoom, onSelectRoom, buildingName }: Props) {
  const vacant = rooms.filter((r) => r.status === "vacant")
  const closed = rooms.filter((r) => r.status === "closed")
  // const applying = rooms.filter((r) => r.status === "applying")
  console.log("vacant:", vacant)
  console.log("closed:", closed)
  // console.log("applying:", applying)

  // const closed = property.roomStatus.filter((r) => r.status === "closed")

  const roomStatusList = [
    { label: "空室", value: vacant, className: styles.vacantName },
    { label: "募集停止", value: closed, className: styles.closedName },
    // { label: "申込あり", value: applying, className: styles.applyingName }
  ]

  return (
    <div className={styles.stack}>
      <h2 className={styles.title}>{buildingName}</h2>
      <div className={styles.listItemField}>
        {roomStatusList.map(({ label, value, className }) => 
          <div key={label} className={styles.listItem}>
            <div className={`${styles.labelName} ${className}`}>{label}</div>
            <div className={styles.item}>
              {value.map((r) => (
                <button 
                  type="button" 
                  key={r.id} 
                  className={`${styles.button} ${selectedRoom?.id === r.id ? styles.active : ""}`}
                  onClick={() => onSelectRoom(r)}
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
