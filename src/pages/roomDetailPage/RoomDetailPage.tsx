import { useOutletContext, useParams } from "react-router-dom"
import type{ Property, Room } from "../../mocks/properties/mock"
import RoomList from "../../features/properties/components/rooms/RoomList"
import RoomDetail from "../../features/properties/components/rooms/RoomDetail"
import RoomPhoto from "../../features/properties/components/rooms/RoomPhoto"
import { useEffect, useMemo, useState } from "react"
import { getRooms } from "../../api/getRooms/getRooms"
import styles from "./RoomDetailPage.module.css"

type OutletContext = {
  property: Property | undefined
}

export default function RoomDetailPage() {
  // const selectedRoom = useMemo(() => {
  //   return property.roomStatus.find((r) => r.roomNumber === selectedRoomNumber) ?? null
  // }, [property.roomStatus, selectedRoomNumber])
  const { id } = useParams()
  const { property } = useOutletContext<OutletContext>()
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  useEffect(() => {
    // console.log("開いたよ")
    const fetchRoomProperties = async() => {
      try {
        if(!id) return
        console.log("id有", id)
        const data = await getRooms(id)
        console.log("data", data)
        setRooms(data)
        setSelectedRoom(data[0] ?? null)
        // const roomWithImages = await Promise.all(
        //   data.map(async (roomProperty: RoomProperty) => {
        //     const images = roomProperty.images

        //   })
        // )

        // return data
      } catch(error) {
        console.error(error)
      }
    }
    fetchRoomProperties()
  }, [])

  return (
      <div className={styles.inner}>
        <RoomList 
          rooms={rooms}
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
          buildingName={property?.basic.name ?? ""}
        />
        <div className={styles.mainContents}>
          <RoomDetail selectedRoom={selectedRoom}/>
          <RoomPhoto selectedRoom={selectedRoom}/>
        </div>
      </div>
  )
}
