import { Link } from "react-router-dom"
import type { Property } from "../../../../../mocks/properties/mock" 
import { ROUTES } from "../../../../../routes/rouets"
import styles from "./MainCard.module.css"

type Props = {
  property: Property;
}

export default function MainCard({ property }: Props) {
  // const vacantRoomsCount = property.roomStatus.filter((r) => r.status === "vacant").length
  const path = `${ROUTES.property}/${property.id}`

  const LISTITEMS = [
    { key: "buildingName", label: "物件名", value: property.basic.name },
    { key: "buildingAddr", label: "住所", value: property.common.addr },
    { key: "buildingLocal", label: "路線", value: property.common.local },
    { key: "buildingStation", label: "最寄駅", value: property.common.station },
    { key: "buildingMansionType", label: "種別", value: property.common.mansionType },
    { key: "buildingStructure", label: "構造", value: property.common.structure },
  ]

  return (
    <Link to={path} className={styles.card}>
      <img src={property.imageUrl} className={styles.image} alt="物件写真" />
      <div className={styles.itemsField}>
        {LISTITEMS.map(({ key, label, value }) => 
          <div key={key} className={styles.innerField}>
            <div className={styles.labelField}>
              <span>{label}</span>
            </div>
            <div className={styles.valueField}>
              <span>{value}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
