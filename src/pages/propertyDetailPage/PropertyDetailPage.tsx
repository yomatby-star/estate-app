import { useOutletContext } from "react-router-dom"
import styles from "./PropertyDetailPage.module.css"
import { useState } from "react"
import type { Property } from "../../mocks/properties/mock"

type OutletContext = {
  property: Property
}

export default function PropertyDetailPage() {
  const [i, setI] = useState(0)
  const { property } = useOutletContext<OutletContext>()

  if (!property) {
    return <div>該当する物件がありません</div>
  }

  const basicRow = {
    name: property.basic.name,
  }
  const commonRow = [
    {label: "住所", value: property.basic.addr},
    {label: "構造", value: property.common.structure},
    {label: "種別", value: property.common.mansionType},
    {label: "路線", value:property.common.local},
    {label: "駅名", value: property.common.station},
  ]
  const commonSecRow = [
    {label: "築年数", value: property.common.year},
    {label: "階数", value: property.common.floors},
    {label: "オートロック", value: property.common.autoLock},
    {label: "ガス", value: property.common.gas},
    {label: "ゴミ置き場", value: property.common.garbage},
  ]
  const vacantRoomStatus = property.roomStatus.filter((r) => r.status === "vacant")
  const closedRoomStatus = property.roomStatus.filter((r) => r.status === "closed")

  // photoの処理
  const photo = property.images
  const hasImage = photo.length > 0
  const prevPhoto = () => setI((v) => (v - 1 + photo.length) % photo.length)
  const nextPhoto = () => setI((v) => (v + 1) % photo.length)

  // Google Map の処理
  const address = property.basic.addr
  const q = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?hl=ja&q=${q}&output=embed`;

  return (
    <div className={styles.stack}>
      {/* 左側 */}
      <div className={styles.leftContent}>
        <div className={styles.card}>
          <div className={styles.buildingNameField}>
            <h2 className={styles.buildingName}>{basicRow.name}</h2>
          </div>
        
          {commonRow.map(({label, value}) => (
            <div key={label} className={styles.labelVal}>
              <div className={styles.labelTitle}>{label}</div>
              <div className={styles.valueContent}>{value}</div>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          {commonSecRow.map(({label, value}) => (
            <div key={label} className={styles.labelVal}>
              <div className={styles.labelTitle}>{label}</div>
              <div className={styles.valueContent}>{value}</div>
            </div>
          ))}
        </div>
        <div className={`${styles.card} ${styles.vacantRoomField}`}>
          <div className={styles.row}>
            <div className={styles.vacantTitle}>空室：</div>
              <div className={styles.roomStatusButtonField}>
                {vacantRoomStatus.map((room) => 
                  <button key={room.roomNumber} className={styles.roomStatusButton}>
                    {room.roomNumber}
                  </button>
                )}
              </div>
          </div>
          <div className={styles.row}>
            <span className={styles.closedTitle}>募集停止中：</span>
            <div className={styles.roomStatusButtonField}>
              {closedRoomStatus.map((room) => 
                <button key={room.roomNumber} className={styles.roomStatusButton}>
                  {room.roomNumber}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 右側 */}
      <div className={styles.rightContent}>
        <div className={styles.card}>
          {hasImage ? (
            <>
              <img className={styles.photo} src={photo[i]} alt={`物件画像${i}`} />
              <button type="button" onClick={prevPhoto} className={`${styles.ImageButton} ${styles.imagePrev}`}>＜</button>
              <button type="button" onClick={nextPhoto} className={`${styles.ImageButton} ${styles.imageNext}`}>＞</button>
            </>
          ) : 
            <div>NO IMAGES</div>
          }
        </div>

        <div className={styles.card}>
          <iframe 
            src={mapSrc}
            title="Google StreetView"
            className={styles.maps}
          />
        </div>
      </div>
    </div>
  )
}
