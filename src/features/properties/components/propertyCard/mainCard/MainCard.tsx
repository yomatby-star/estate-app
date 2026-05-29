import { Link } from "react-router-dom"
import type { Property } from "../../../../../mocks/properties/mock" 
import { ROUTES } from "../../../../../routes/rouets"
import styles from "./MainCard.module.css"
import noImage from "../../../../../assets/no_image.jpeg"
import { Building2 ,Train } from "lucide-react"

type Props = {
  property: Property;
}

export default function MainCard({ property }: Props) {
  // const vacantRoomsCount = property.roomStatus.filter((r) => r.status === "vacant").length
  const path = `${ROUTES.property}/${property.id}`

  // const listItems = [
  //   { id: "buildingName", label: "物件名", value: property.basic.name ?? "-" },
  //   { id: "buildingAddr", label: "住所", value: property.common.addr ?? "-" },
  //   { id: "buildingLocal", label: "路線", value: property.common.local ?? "-" },
  //   { id: "buildingStation", label: "最寄駅", value: property.common.station ?? "-" },
  //   { id: "buildingMansionType", label: "種別", value: property.common.mansionType ?? "-" },
  //   { id: "buildingStructure", label: "構造", value: property.common.structure ?? "-" },
  // ]
  const buildingName = property.basic.name
  const buildingAddr = property.common.addr
  const buildingLocal = property.common.local
  const buildingStation = property.common.station
  const buildingMansionType = property.common.mansionType
  const buildingStructure = property.common.structure

  return (
    <Link to={path} className={styles.card}>
      <img src={property.imageUrl || noImage} className={styles.image} alt="物件写真" />
      <div className={styles.itemsField}>
        <div className={`${styles.basicField} ${styles.innerBorder}`}>
          <strong className={styles.buildingNameTitle}>{buildingName}</strong>
          <span className={styles.buildingAddrTitle}>{buildingAddr}</span>
        </div>
        <div className={`${styles.field} ${styles.innerBorder}`}>
          <Train className={styles.trainIcon}/>
          <div className={styles.basicField}>
            <span>路線</span>
            <span>{buildingLocal}</span>
          </div>
        </div>
        <div className={`${styles.field} ${styles.innerBorder}`}>
          <Train className={styles.trainIcon}/>
          <div className={styles.basicField}>
            <span>最寄駅</span>
            <span>{buildingStation}</span>
          </div>
        </div>
        <div className={`${styles.field} ${styles.innerBorder}`}>
          <Building2 className={styles.buildingIcon}/>
          <div className={styles.basicField}>
            <span>種別</span>
            <span>{buildingMansionType}</span>
          </div>
        </div>
        <div className={styles.basicField}>
          <span className={styles.structureField}>構造</span>
          <span className={styles.structureValue}>{buildingStructure}</span>
        </div>
        {/* <div className={styles.buildingIconField}>
          <Building2 className={styles.buildingIcon}/>
        </div> */}
        {/* {listItems.map(({ id, label, value }) => 
          <div key={id} className={styles.innerField}>
            <div>
              <Building2 />
            </div>
            <div className={styles.labelField}>
              <span>{label}</span>
            </div>
            <div className={styles.valueField}>
              <span>{value}</span>
            </div>
          </div>
        )} */}
      </div>
    </Link>
  )
}
