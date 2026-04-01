import { NavLink } from "react-router-dom";
import { NAVE_ITEMS } from "../../routes/rouets";
import styles from "./Sidebar.module.css"

type Props = {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: Props) {

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.closed: ""}`}>
      <nav className={styles.navItemsField}>
        {NAVE_ITEMS.map(({path, label, icon: Icon}) => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) => 
              isActive ? `${styles.item} ${styles.active}` : styles.item
            }
          >
            <div className={styles.row}>
              <Icon className={styles.itemIcon} size={18} />
              <span className={styles.itemLabel}>{label}</span>
            </div>
          </NavLink>
        ))}
      </nav>
      <button className={styles.logOutButton}>ログアウト</button>
    </aside>
  )
}
