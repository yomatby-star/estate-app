import { Outlet } from "react-router-dom"
import styles from "./PropertyPage.module.css"

export default function PropertyPage() {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  )
}
