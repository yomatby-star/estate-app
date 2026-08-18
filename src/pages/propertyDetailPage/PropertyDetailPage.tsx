import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import type React from "react"
import type { Property } from "../../mocks/properties/mock"
import { getImages } from "../../api/getProperties/getImages"
import { updateProperty } from "../../api/updateProperty/updateProperty"
import toast from "react-hot-toast"
import noImage from "../../assets/no_image.jpeg"
import styles from "./PropertyDetailPage.module.css"
import dialogStyles from "../../componets/confirmDialog/ResetDialog.module.css"


type OutletContext = {
  property: Property | undefined,
  isEditMode: boolean,
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  registerSave: (handler: (() => Promise<boolean>) | null) => void,
}

export default function PropertyDetailPage() {
  const [i, setI] = useState(0)
  const { property, isEditMode, setProperties, registerSave } = useOutletContext<OutletContext>()

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
  const [newImageFiles, setNewImageFiles] = useState<File[]>([])
  const [removedImageKeys, setRemovedImageKeys] = useState<string[]>([])
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  useEffect(() => {
    if(!isEditMode) {
      setForm(defaultForm)
      setNewImageFiles([])
      setRemovedImageKeys([])
    }
  }, [isEditMode])

  const toggleRemoveImage = (imageKey: string) => {
    setRemovedImageKeys((prev) =>
      prev.includes(imageKey)
        ? prev.filter((key) => key !== imageKey)
        : [...prev, imageKey]
    )
  }

  const handleImageDialogCancel = () => {
    setNewImageFiles([])
    setRemovedImageKeys([])
    setIsImageDialogOpen(false)
  }

  const handleSave = async () => {
    if (!property) return false

    const payload = {
      basic: {
        name: form.name
      },
      common: {
        addr: form.addr,
        structure: form.structure,
        mansionType: form.mansionType,
        local: form.local,
        station: form.station,
        year: Number(form.year),
        floors: Number(form.floors),
        autoLock: form.autoLock,
        gas: form.gas,
        garbage: form.garbage,
      },
      removedImageKeys,
    }

    try {
      const res = await updateProperty(property.id, payload, newImageFiles)

      if (!res.ok) {
        toast.error("更新に失敗しました")
        return false
      }

      const data = await res.json()

      setProperties((prev) => prev.map((p) =>
        p.id === property.id
          ? { ...p, basic: data.data.basic, common: data.data.common, images: data.data.images }
          : p
      ))

      setNewImageFiles([])
      setRemovedImageKeys([])

      toast.success("物件情報を更新しました")
      return true
    } catch (error) {
      console.log("通信エラー", error)
      toast.error("通信エラーが発生しました")
      return false
    }
  }

  useEffect(() => {
    registerSave(handleSave)
    return () => registerSave(null)
  }, [form, property?.id, removedImageKeys, newImageFiles])

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
      if (!property?.images) return

      const urls = await Promise.all(
        property.images.map(async (image) => {
          const data = await getImages(image.image_key)
          return data.url
        })
      )

      setPhotos(urls)
    }

    fetchImages()
  }, [property?.images])

  const hasImage = photos.length > 0
  const prevPhoto = () => setI((v) => (v - 1 + photos.length) % photos.length)
  const nextPhoto = () => setI((v) => (v + 1) % photos.length)

  const visibleImageCount =
    (property?.images ?? []).filter((image) => !removedImageKeys.includes(image.image_key)).length
    + newImageFiles.length

  // Google Map の処理
  const address = property?.common.addr ?? ""
  const q = encodeURIComponent(address);
  const mapSrc = `https://www.google.com/maps?hl=ja&q=${q}&output=embed`;

  if (!property) {
    return <div>該当する物件がありません</div>
  }

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

          {isEditMode && (
            <button
              type="button"
              className={styles.countButton}
              onClick={() => setIsImageDialogOpen(true)}
            >
              画像を編集：{visibleImageCount} 件
            </button>
          )}
        </div>

        <div className={styles.card}>
          <iframe
            src={mapSrc}
            title="Google StreetView"
            className={styles.maps}
          />
        </div>
      </div>

      {isImageDialogOpen && (
        <div className={dialogStyles.overlay}>
          <div className={dialogStyles.modal}>
            <div className={styles.header}>
              <h3>登録画像 <span className={styles.imagesCount}>{visibleImageCount}</span> 件</h3>
              <div className={styles.headerButtons}>
                <button type="button" className={styles.commonButton} onClick={handleImageDialogCancel}>キャンセル</button>
                <button type="button" className={styles.commonButton} onClick={() => setIsImageDialogOpen(false)}>閉じる</button>
              </div>
            </div>

            <div className={styles.dialogSection}>
              <span className={styles.dialogSectionTitle}>登録済み画像</span>
              <div className={styles.imageList}>
                {property.images.map((image, index) => {
                  const isMarkedForDeletion = removedImageKeys.includes(image.image_key)
                  return (
                    <div key={image.image_key} className={styles.imageThumb}>
                      <img
                        src={photos[index]}
                        alt={image.file_name}
                        className={`${styles.previewImage} ${isMarkedForDeletion ? styles.markedForDeletion : ""}`}
                      />
                      <button
                        type="button"
                        className={styles.deleteToggle}
                        onClick={() => toggleRemoveImage(image.image_key)}
                      >
                        {isMarkedForDeletion ? "戻す" : "×"}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.dialogSection}>
              <span className={styles.dialogSectionTitle}>追加する画像</span>
              <label htmlFor="building-image-upload">
                <div className={styles.uploadArea}>
                  <input
                    id="building-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className={styles.hiddenInput}
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? [])
                      setNewImageFiles((prev) => [...prev, ...files])
                    }}
                  />
                  <span className={styles.uploadLabel}>ファイルを選択</span>
                  <span className={styles.inputText}>JPG, PNG, WEBP（最大5MB）</span>
                </div>
              </label>
              <div className={styles.imageList}>
                {newImageFiles.map((file, index) => (
                  <img
                    key={`${file.name}-${index}`}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className={styles.previewImage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
