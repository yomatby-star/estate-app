import { useEffect, useState } from "react"
import type { Property, Room } from "../../../../mocks/properties/mock"
import noImage from "../../../../assets/no_image.jpeg"
import styles from "./RoomPhoto.module.css"

type Props = {
  selectedRoom: Room | null
}

export default function RoomPhoto({ selectedRoom }: Props) {
  const [roomPhoto, setRoomPhoto] = useState(0)
  // console.log("selectedRoom:", selectedRoom?.imageUrls)
  const imageUrls = selectedRoom?.imageUrls ?? []
  const hasImage = imageUrls.length > 0

  console.log(selectedRoom)
  console.log(selectedRoom?.imageUrls)

  useEffect(() => {
    setRoomPhoto(0)
  }, [selectedRoom])

  const prev = () => {
    if (imageUrls.length === 0) return 
    setRoomPhoto((i) => (i - 1 + imageUrls.length) % imageUrls.length)
  }
  const next = () => {
    if (imageUrls.length === 0) return
    setRoomPhoto((i) => (i + 1 ) % imageUrls.length)
  }

  return (
    <div className={styles.card}>
      {hasImage ? (
       <div className={styles.imageWrap}>
          <img src={imageUrls[roomPhoto]} className={styles.roomPhoto} alt="" />
          <button type="button" className={`${styles.button} ${styles.prevButton}`} onClick={prev}>＜</button>
          <button type="button" className={`${styles.button} ${styles.nextButton}`} onClick={next}>＞</button>
          <div className={styles.imageCount}>
            { roomPhoto + 1 } / { imageUrls.length }
          </div>
        </div>
      ) : <img src={noImage} className={styles.imageWrap} alt="部屋写真" />
    }
    </div>
  )
}
