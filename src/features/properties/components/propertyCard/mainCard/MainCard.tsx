import { Link } from "react-router-dom"
import type { Property } from "../../../../../mocks/properties/mock" 
import { ROUTES } from "../../../../../routes/rouets"
import styles from "./MainCard.module.css"
import noImage from "../../../../../assets/no_image.jpeg"

type Props = {
  property: Property;
}

export default function MainCard({ property }: Props) {
  // const vacantRoomsCount = property.roomStatus.filter((r) => r.status === "vacant").length
  const path = `${ROUTES.property}/${property.id}`

  const listItems = [
    { id: "buildingName", label: "物件名", value: property.basic.name ?? "-" },
    { id: "buildingAddr", label: "住所", value: property.common.addr ?? "-" },
    { id: "buildingLocal", label: "路線", value: property.common.local ?? "-" },
    { id: "buildingStation", label: "最寄駅", value: property.common.station ?? "-" },
    { id: "buildingMansionType", label: "種別", value: property.common.mansionType ?? "-" },
    { id: "buildingStructure", label: "構造", value: property.common.structure ?? "-" },
  ]

  return (
    <Link to={path} className={styles.card}>
      <img src={property.imageUrl || noImage} className={styles.image} alt="物件写真" />
      <div className={styles.itemsField}>
        {listItems.map(({ id, label, value }) => 
          <div key={id} className={styles.innerField}>
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
