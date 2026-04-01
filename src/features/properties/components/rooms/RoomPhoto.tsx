import { useState } from "react"
import type { Property } from "../../../../mocks/properties/mock"
import styles from "./RoomPhoto.module.css"

type RoomStatus = Property["roomStatus"][number]
type Props = {
  selectedRoom: RoomStatus | null
}

export default function RoomPhoto({ selectedRoom }: Props) {
  const [roomPhoto, setRoomPhoto] = useState(0)

  const prev = () => {
    if (selectedRoom?.photo) {
      setRoomPhoto((i) => (i - 1 + selectedRoom.photo.length) % selectedRoom.photo.length)
    }
  }
  const next = () => {
    if (selectedRoom?.photo) {
      setRoomPhoto((i) => (i + 1 ) % selectedRoom.photo.length)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={selectedRoom?.photo[roomPhoto]} className={styles.roomPhoto} alt="" />
        <button type="button" className={`${styles.button} ${styles.prevButton}`} onClick={prev}>＜</button>
        <button type="button" className={`${styles.button} ${styles.nextButton}`} onClick={next}>＞</button>
      </div>
    </div>
  )
}
