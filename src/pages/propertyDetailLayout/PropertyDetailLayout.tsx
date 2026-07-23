import { NavLink, Outlet, useParams, useOutletContext, useLocation, useNavigate } from "react-router-dom"
import { NAVE_ITEMS, PROPERTY_NAV, ROUTES } from "../../routes/rouets"
import { useEffect, useState } from "react"
import type { Property, Room } from "../../mocks/properties/mock"
import RoomRegisterDialog from "../../componets/confirmDialog/roomRegisterDialog"
import { getRooms } from "../../api/getRooms/getRooms"
import styles from "./PropertyDetailLayout.module.css"

export default function PropertyDetailLayout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { properties } = useOutletContext<{ properties: Property[] }>()
  const location = useLocation()
  const isRoomPage = location.pathname === `${ROUTES.property}/${id}/${PROPERTY_NAV.room}`
  const property = properties.find((p) => p.id === id)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isRoomDetailOpen, setIsRoomDetailOpen] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([])

  const tabItems = [
    { label: "建物詳細", to: `${ROUTES.property}/${id}`},
    { label: "部屋詳細", to: `${ROUTES.property}/${id}/${PROPERTY_NAV.room}`},
    // { label: "入居者", to: `${ROUTES.property}/${id}/${PROPERTY_NAV.tenant}`},
  ]

  useEffect(() => {
    const fetchRooms = async () => {
      if(!id) return
      const data = await getRooms(id)
      // console.log("⭐️", data)
      setRooms(data)
    }
    fetchRooms()
  }, [id])

  const editButtons = isEditMode ? (
    <>
      <button type="button" className={styles.navItem} onClick={() => setIsEditMode(false)}>
        閉じる
      </button>
      <button type="button" className={styles.navItem}>
        保存
      </button>
    </>
  ) : (
    <>
      {isRoomPage && (
        rooms.length === 0 ? (
          <button
            type="button"
            className={styles.navItem}
            onClick={() => navigate(`/register/room?buildingId=${id}`)}
          >
            部屋を新規登録
          </button>
        ) : (
          <button 
            type="button" 
            className={styles.navItem}
            onClick={() => setIsRoomDetailOpen(true)}
          >
            部屋を追加
          </button>
      ))}  
      <button type="button" className={styles.navItem} onClick={() => setIsEditMode(true)}>
        編集
      </button>
    </>
  )

  return (
    <div className={styles.stack}>
      <div className={styles.tabField}>
        <nav className={styles.navField}>
          {tabItems.map(({ label, to, }) => (
            <NavLink
              to={to}
              key={to}
              end={label === "建物詳細"}
              className={({ isActive }) => 
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              {label}
            </NavLink>
          ))}
          <div className={styles.edits}>
            {editButtons}
          </div>
        </nav>
      </div>

      <div className={styles.outletArea}>
        <Outlet context={{ property, isEditMode }} />
      </div>

      <RoomRegisterDialog 
        open={isRoomDetailOpen}
        onClose={() => setIsRoomDetailOpen(false)}
        buildingName={property?.basic.name ?? ""}
        buildingId={id ?? ""}
        rooms={rooms}
      />
    </div>
  )
}
