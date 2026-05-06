import { NavLink, Outlet, useParams } from "react-router-dom"
import { PROPERTY_NAV, ROUTES } from "../../routes/rouets"
import styles from "./PropertyDetailLayout.module.css"
import { mockProperties } from "../../mocks/properties/mock"
import { useState } from "react"

export default function PropertyDetailLayout() {
  const { id } = useParams()
  const property = mockProperties.find((p) => p.id === id)
  const [isEditMode, setIsEditMode] = useState(false)

  const tabItems = [
    { label: "物件詳細", to: `${ROUTES.property}/${id}`  },
    { label: "部屋詳細", to: `${ROUTES.property}/${id}/${PROPERTY_NAV.room}` },
    { label: "入居者", to: `${ROUTES.property}/${id}/${PROPERTY_NAV.tenant}` },
  ]
  return (
    <div className={styles.stack}>
      <div className={styles.tabField}>
        <nav className={styles.navField}>
          {tabItems.map(({ label, to, }) => (
            <NavLink
              to={to}
              key={to}
              end={label === "物件詳細"}
              className={({ isActive }) => 
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              {label}
            </NavLink>
          ))}
          <button 
            type="button" 
            className={`${styles.navItem} ${styles.edits}`}
            onClick={() => setIsEditMode((prev) => !prev)}
          >
            {isEditMode ? "観覧" : "編集"}
          </button>
        </nav>
      </div>

      <div className={styles.outletArea}>
        <Outlet context={{ property, isEditMode }} />
      </div>`
    </div>
  )
}
