import { useEffect, useState } from "react"
import type { Property, Room } from "../../../../mocks/properties/mock"
import noImage from "../../../../assets/no_image.jpeg"
import styles from "./RoomPhoto.module.css"
import dialogStyles from "../../../../componets/confirmDialog/ResetDialog.module.css"

type Props = {
  selectedRoom: Room | null
  isEditMode: boolean
  newImageFiles: File[]
  removedImageKeys: string[]
  onAddImageFiles: (files: File[]) => void
  onToggleRemoveImage: (imageKey: string) => void
  onCancelImageEdit: () => void
}

export default function RoomPhoto({
  selectedRoom,
  isEditMode,
  newImageFiles,
  removedImageKeys,
  onAddImageFiles,
  onToggleRemoveImage,
  onCancelImageEdit,
}: Props) {
  const [roomPhoto, setRoomPhoto] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // console.log("selectedRoom:", selectedRoom?.imageUrls)
  const imageUrls = selectedRoom?.imageUrls ?? []
  const hasImage = imageUrls.length > 0
  const roomImages = selectedRoom?.images ?? []
  const visibleImageCount =
    roomImages.filter((image) => !removedImageKeys.includes(image.image_key)).length
    + newImageFiles.length

  const handleCancel = () => {
    onCancelImageEdit()
    setIsDialogOpen(false)
  }

  console.log(selectedRoom)
  console.log(selectedRoom?.imageUrls)

  useEffect(() => {
    setRoomPhoto(0)
  }, [selectedRoom])

  const prev = () => {
    if (imageUrls.length === 0) return 
    setRoomPhoto((i) => (i - 1 + imageUrls.length) % imageUrls.length)
  }
  const next = () => {
    if (imageUrls.length === 0) return
    setRoomPhoto((i) => (i + 1 ) % imageUrls.length)
  }

  return (
    <div className={styles.card}>
      {hasImage ? (
        <div className={styles.imageWrap}>
          <img src={imageUrls[roomPhoto]} className={styles.roomPhoto} alt="" />
          <button type="button" className={`${styles.button} ${styles.prevButton}`} onClick={prev}>＜</button>
          <button type="button" className={`${styles.button} ${styles.nextButton}`} onClick={next}>＞</button>
          <div className={styles.imageCount}>
            { roomPhoto + 1 } / { imageUrls.length }
          </div>
        </div>
      ) :
        <img src={noImage} className={styles.imageWrap} alt="部屋写真" />
      }

      {isEditMode && (
        <button
          type="button"
          className={styles.countButton}
          onClick={() => setIsDialogOpen(true)}
        >
          画像を編集：{visibleImageCount} 件
        </button>
      )}

      {isDialogOpen && (
        <div className={dialogStyles.overlay}>
          <div className={dialogStyles.modal}>
            <div className={styles.header}>
              <h3>登録画像 <span className={styles.imagesCount}>{visibleImageCount}</span> 件</h3>
              <div className={styles.headerButtons}>
                <button type="button" className={styles.commonButton} onClick={handleCancel}>キャンセル</button>
                <button type="button" className={styles.commonButton} onClick={() => setIsDialogOpen(false)}>閉じる</button>
              </div>
            </div>

            <div className={styles.dialogSection}>
              <span className={styles.dialogSectionTitle}>登録済み画像</span>
              <div className={styles.imageList}>
                {roomImages.map((image, index) => {
                  const isMarkedForDeletion = removedImageKeys.includes(image.image_key)
                  return (
                    <div key={image.image_key} className={styles.imageThumb}>
                      <img
                        src={imageUrls[index]}
                        alt={image.file_name}
                        className={`${styles.previewImage} ${isMarkedForDeletion ? styles.markedForDeletion : ""}`}
                      />
                      <button
                        type="button"
                        className={styles.deleteToggle}
                        onClick={() => onToggleRemoveImage(image.image_key)}
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
              <label htmlFor="room-image-upload">
                <div className={styles.uploadArea}>
                  <input
                    id="room-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className={styles.hiddenInput}
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? [])
                      onAddImageFiles(files)
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
