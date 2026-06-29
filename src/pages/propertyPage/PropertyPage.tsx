import { Outlet } from "react-router-dom"
import type { Property } from "../../mocks/properties/mock"
import { useState } from "react"
import styles from "./PropertyPage.module.css"

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([])
  return (
    <div className={styles.root}>
      <Outlet context={{ properties, setProperties }}/>
    </div>
  )
}
