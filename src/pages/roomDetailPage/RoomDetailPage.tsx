import { useOutletContext, useParams } from "react-router-dom"
import type{ Property, Room, RoomForm } from "../../mocks/properties/mock"
import RoomList from "../../features/properties/components/rooms/RoomList"
import RoomDetail from "../../features/properties/components/rooms/RoomDetail"
import RoomPhoto from "../../features/properties/components/rooms/RoomPhoto"
import { useEffect, useState } from "react"
import { getRooms} from "../../api/getRooms/getRooms"
import { getImages } from "../../api/getProperties/getImages"
import { updateRoom } from "../../api/updateRoom/updateRoom"
import toast from "react-hot-toast"
import styles from "./RoomDetailPage.module.css"

type OutletContext = {
  property: Property | undefined
  isEditMode: boolean
  registerSave: (handler: (() => Promise<boolean>) | null) => void
}

const buildRoomForm = (room: Room | null): RoomForm => ({
  roomNumber: room?.roomNumber ?? "",
  floorPlan: room?.floorPlan ?? "",
  exclusiveArea: room?.exclusiveArea ?? "",
  numberFloors: room?.numberFloors ?? "",
  direction: room?.direction ?? "",
  status: room?.status ?? "",
  rent: room ? String(room.rent) : "",
  managementFee: room ? String(room.managementFee) : "",
  keyMoney: room ? String(room.keyMoney) : "",
  securityDeposit: room ? String(room.securityDeposit) : "",
})

export default function RoomDetailPage() {
  const { id } = useParams()
  const { property, isEditMode, registerSave } = useOutletContext<OutletContext>()
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [form, setForm] = useState<RoomForm>(() => buildRoomForm(null))
  const [equipments, setEquipments] = useState<string[]>([])
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [removedImageKeys, setRemovedImageKeys] = useState<string[]>([])

  useEffect(() => {
    setForm(buildRoomForm(selectedRoom))
    setEquipments(selectedRoom?.equipments ?? [])
    setNewImageFiles([])
    setRemovedImageKeys([])
  }, [selectedRoom])

  const handleChangeField = (key: keyof RoomForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleToggleEquipment = (equipment: string) => {
    setEquipments((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        : [...prev, equipment]
    )
  }

  const handleAddImageFiles = (files: File[]) => {
    setNewImageFiles((prev) => [...prev, ...files])
  }

  const handleToggleRemoveImage = (imageKey: string) => {
    setRemovedImageKeys((prev) =>
      prev.includes(imageKey)
        ? prev.filter((key) => key !== imageKey)
        : [...prev, imageKey]
    )
  }

  const handleCancelImageEdit = () => {
    setNewImageFiles([])
    setRemovedImageKeys([])
  }

  const handleSave = async () => {
    if (!selectedRoom) return false

    const payload = {
      room: {
        roomNumber: form.roomNumber,
        rent: Number(form.rent),
        managementFee: Number(form.managementFee),
        securityDeposit: Number(form.securityDeposit),
        keyMoney: Number(form.keyMoney),
        floorPlan: form.floorPlan,
        exclusiveArea: form.exclusiveArea,
        numberFloors: form.numberFloors,
        direction: form.direction,
        status: form.status,
        equipments,
      },
      removedImageKeys,
    }

    try {
      const res = await updateRoom(selectedRoom.id, payload, newImageFiles)

      if (!res.ok) {
        const errorBody = await res.json()
        toast.error(errorBody.detail)
        return false
      }

      const data = await res.json()

      const imageUrls = await Promise.all(
        (data.data.images ?? []).map(async (image: { image_key: string }) => {
          const imageData = await getImages(image.image_key)
          return imageData?.url ?? ""
        })
      )

      const updatedRoom: Room = {
        ...selectedRoom,
        roomNumber: data.data.roomNumber,
        rent: data.data.rent,
        managementFee: data.data.managementFee,
        securityDeposit: data.data.securityDeposit,
        keyMoney: data.data.keyMoney,
        floorPlan: data.data.floorPlan,
        exclusiveArea: data.data.exclusiveArea,
        numberFloors: data.data.numberFloors,
        direction: data.data.direction,
        status: data.data.status,
        equipments: data.data.equipments,
        images: data.data.images,
        imageUrls,
      }

      setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)))
      setSelectedRoom(updatedRoom)

      toast.success("部屋情報を更新しました")
      return true
    } catch (error) {
      console.log("通信エラー", error)
      toast.error("通信エラーが発生しました")
      return false
    }
  }

  useEffect(() => {
    registerSave(handleSave)
    return () => registerSave(null)
  }, [form, equipments, selectedRoom, removedImageKeys, newImageFiles])

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
          <RoomDetail
            isEditMode={isEditMode}
            form={form}
            onChangeField={handleChangeField}
            equipments={equipments}
            onToggleEquipment={handleToggleEquipment}
          />
          <RoomPhoto
            selectedRoom={selectedRoom}
            isEditMode={isEditMode}
            newImageFiles={newImageFiles}
            removedImageKeys={removedImageKeys}
            onAddImageFiles={handleAddImageFiles}
            onToggleRemoveImage={handleToggleRemoveImage}
            onCancelImageEdit={handleCancelImageEdit}
          />
        </div>
      </div>
  )
}
