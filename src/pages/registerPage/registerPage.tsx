import { NavLink, Outlet } from "react-router-dom"
import styles from "./registerPage.module.css"
import { REGISTER_NAV } from "../../routes/rouets"

export default function registerPage() {
  const tabItems = [
    { label: "物件登録", to: `${REGISTER_NAV.building}` },
    { label: "部屋登録", to: `${REGISTER_NAV.room}` },
    // { label: "オーナー登録", to: `${REGISTER_NAV.owner}` },
  ]
  return (
    <div className={styles.route}>
      <nav className={styles.navField}>
        {tabItems.map(({ label, to }) => (
          <NavLink
            to={to}
            key={to}
            className={({ isActive }) => 
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  )
}
