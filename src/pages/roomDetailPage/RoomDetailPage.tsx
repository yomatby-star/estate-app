import { useOutletContext, useParams } from "react-router-dom"
import type{ Property, Room } from "../../mocks/properties/mock"
import RoomList from "../../features/properties/components/rooms/RoomList"
import RoomDetail from "../../features/properties/components/rooms/RoomDetail"
import RoomPhoto from "../../features/properties/components/rooms/RoomPhoto"
import { useEffect, useState } from "react"
import { getRooms} from "../../api/getRooms/getRooms"
import { getImages } from "../../api/getProperties/getImages"
import styles from "./RoomDetailPage.module.css"

type OutletContext = {
  property: Property | undefined
}

export default function RoomDetailPage() {
  const { id } = useParams()
  const { property } = useOutletContext<OutletContext>()
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  useEffect(() => {
    const fetchRoomProperties = async() => {
      try {
        if(!id) return
        // console.log("id有", id)
        const data = await getRooms(id)
        // console.log("data", data[0])
        
        const roomWithImages = await Promise.all(
          data.map(async (room: Room) => {
            const imageUrls = await Promise.all(
              (room.images ?? []).map(async (image) => {
                const imageData = await getImages(image.image_key)
                console.log("url:", imageData?.url)
                return imageData?.url ?? ""
              })
            )

            return {
              ...room,
              imageUrls,
            }
          })
        )

        setRooms(roomWithImages)
        setSelectedRoom(roomWithImages[0] ?? null)
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
