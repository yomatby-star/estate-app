import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Property } from "../../mocks/properties/mock"
import { getImages } from "../../api/getProperties/getImages"
import noImage from "../../assets/no_image.jpeg"
import styles from "./PropertyDetailPage.module.css"


type OutletContext = {
  property: Property | undefined,
  isEditMode: boolean,
}

export default function PropertyDetailPage() {
  const [i, setI] = useState(0)
  const { property, isEditMode } = useOutletContext<OutletContext>()
  // console.log("⭐️:", property)
  if (!property) {
    return <div>該当する物件がありません</div>
  }

  const defaultForm = {
    name: property?.basic.name ?? "",
    addr: property?.common.addr ?? "",
    structure: property?.common.structure ?? "",
    mansionType: property?.common.mansionType ?? "",
    local: property?.common.local ?? "",
    station: property?.common.station ?? "",
    year: property?.common.year ?? "",
    floors: property?.common.floors ?? "",
    autoLock: property?.common.autoLock ?? "",
    gas: property?.common.gas ?? "",
    garbage: property?.common.garbage ?? "",
  }

  const [form, setForm] = useState(defaultForm)
  const [photos, setPhotos] = useState<string[]>([])
  
  useEffect(() => {
    if(!isEditMode) {
      setForm(defaultForm)
    }
  }, [isEditMode])

  const commonRow = [
    {label: "住所", key: "addr", value: form.addr},
    {label: "構造", key: "structure" ,value: form.structure},
    {label: "種別", key: "mansionType" ,value: form.mansionType},
    {label: "路線", key: "local" ,value:form.local},
    {label: "駅名", key: "station" ,value: form.station},
  ] as const

  const commonSecRow = [
    {label: "築年数", key: "year", value: form.year},
    {label: "階数", key: "floors", value: form.floors},
    {label: "オートロック", key: "autoLock", value: form.autoLock},
    {label: "ガス", key: "gas", value: form.gas},
    {label: "ゴミ置き場", key: "garbage", value: form.garbage},
  ] as const

  // const vacantRoomStatus = property.roomStatus.filter((r) => r.status === "vacant")
  // const closedRoomStatus = property.roomStatus.filter((r) => r.status === "closed")

  // photoの処理
  useEffect(() => {
    const fetchImages = async () => {
      if (!property.images) return

      const urls = await Promise.all(
        property.images.map(async (image) => {
          const data = await getImages(image.image_key)
          return data.url
        })
      )

      setPhotos(urls)
    }

    fetchImages()
  }, [property.images])

  const hasImage = photos.length > 0
  const prevPhoto = () => setI((v) => (v - 1 + photos.length) % photos.length)
  const nextPhoto = () => setI((v) => (v + 1) % photos.length)

  // Google Map の処理
  const address = property.common.addr
  const q = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?hl=ja&q=${q}&output=embed`;

  return (
    <div className={styles.stack}>
      <div className={styles.leftContent}>
        <div className={styles.card}>
          <div className={styles.buildingName}>
            {isEditMode ? (
              <input 
                value={form.name}
                className={styles.editMode}
                onChange={(e) => setForm((prev) => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
            ) : <strong>{form.name}</strong>}
          </div>

          <div className={styles.buildingNameField}>
            {commonRow.map(({label, key, value}) => (
              <div key={label} className={styles.labelVal}>
                <div className={styles.labelTitle}>{label}</div>
                <div className={styles.valueContent}>
                  {isEditMode ? (
                    <input
                      className={styles.editMode}
                      value={value ?? ""}
                      onChange={(e) => setForm((prev) => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                    />
                  ) : value}
                </div>
              </div>
            ))}
            {commonSecRow.map(({label, key, value}) => (
              <div key={label} className={styles.labelVal}>
                <div className={styles.labelTitle}>{label}</div>
                <div className={styles.valueContent}>
                  {isEditMode ? (
                    <input
                      className={styles.editMode}
                      value={value ?? ""}
                      onChange={(e) => setForm((prev) => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                    />
                  ) : value}
                </div>
              </div>
            ))}
          </div>
            {/* <div className={`${styles.card} ${styles.vacantRoomField}`}> */}
              {/* ここに設備表示する */}
              {/* <div className={styles.row}>
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
              </div> */}
          </div>
        </div>

      <div className={styles.rightContent}>
        <div className={styles.card}>
          {hasImage ? (
            <>
              <img className={styles.photo} src={photos[i]} alt={`物件画像${i}`} />
              <button type="button" onClick={prevPhoto} className={`${styles.ImageButton} ${styles.imagePrev}`}>＜</button>
              <button type="button" onClick={nextPhoto} className={`${styles.ImageButton} ${styles.imageNext}`}>＞</button>
            </>
          ) : 
            // <div className={styles.photo}>NO IMAGES</div>
            <img src={noImage} className={styles.photo} alt="建物写真" />
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
