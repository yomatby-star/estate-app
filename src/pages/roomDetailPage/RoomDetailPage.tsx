import { useOutletContext } from "react-router-dom"
import styles from "./RoomDetailPage.module.css"
import type { Property } from "../../mocks/properties/mock"
import RoomList from "../../features/properties/components/rooms/RoomList"
import RoomDetail from "../../features/properties/components/rooms/RoomDetail"
import RoomPhoto from "../../features/properties/components/rooms/RoomPhoto"
import { useMemo, useState } from "react"

type OutletContext = {
  property: Property
}

export default function RoomDetailPage() {
  const { property } = useOutletContext<OutletContext>()

  const firstRoomNunber = property.roomStatus[0]?.roomNumber ?? null
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<string | null>(firstRoomNunber)

  const selectedRoom = useMemo(() => {
    return property.roomStatus.find((r) => r.roomNumber === selectedRoomNumber) ?? null
  }, [property.roomStatus, selectedRoomNumber])

  return (
      <div className={styles.inner}>
          <RoomList 
            property={property}
            selectedRoomNumber={selectedRoomNumber}
            onSelectRoom={setSelectedRoomNumber}
          />
        <div className={styles.mainContents}>
          <RoomDetail selectedRoom={selectedRoom}/>
          <RoomPhoto selectedRoom={selectedRoom}/>
        </div>
      </div>
  )
}
