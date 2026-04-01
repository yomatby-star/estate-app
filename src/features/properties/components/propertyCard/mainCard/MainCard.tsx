import { Link } from "react-router-dom"
import type { Property } from "../../../../../mocks/properties/mock" 
import { ROUTES } from "../../../../../routes/rouets"
import styles from "./MainCard.module.css"

type Props = {
  property: Property
}

export default function MainCard({ property }: Props) {
  const vacantRoomsCount = property.roomStatus.filter((r) => r.status === "vacant").length
  const path = `${ROUTES.property}/${property.id}`
  return (
    <Link to={path} className={styles.card}>
      <img src={property.image} className={styles.image} alt="物件写真" />
      <div className={styles.basic}>
        <div>{property.basic.name}</div>
        <div>{property.basic.addr}</div>
      </div>
      <div>
        <div>{`${property.common.local}`}</div>
        <div>{`${property.common.station} 駅`}</div>
      </div>
      <div>
        <div>{property.common.mansionType}</div>
        <div>{property.common.structure}</div>
      </div>
      <div>
        <button className={styles.vacabtButton}>{`空室件数：${vacantRoomsCount} 部屋`}</button>
      </div>
    </Link>
  )
}
