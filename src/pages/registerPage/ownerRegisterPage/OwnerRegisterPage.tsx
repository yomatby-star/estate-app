import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "../roomRegisterPage/RoomRegisterPage.module.css"

export default function OwnerRegisterPage() {
  const [searchParams] = useSearchParams()
  const buildingId = searchParams.get("buildingId")
  const [selectedBuildingId, setSelectedBuildingId] = useState(buildingId ?? "")

  const INPUT_ITEMS = [
    { label: "オーナー名", key: "ownerName", required: true },
    { label: "住所", key: "ownerAddr", required: true } 
  ] as const

  const initialForm = {
    ownerName: "",
    ownerAddr: "",
  } as const

  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)

  const onSave = async () => console.log("オーナー登録！")

  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.title}>
          <strong>貸主登録</strong>
          <div>物件名：{selectedBuildingId || "未選択"}</div>
        </div>
        {INPUT_ITEMS.map(({ label, key, required }) => 
          <div key={key} className={styles.inputFields}>
            <span className={styles.labelTitle}>{label}{required && " *"}</span>
            <input
              required={required}
              value={form[key]}
              className={styles.inputFields}
              onChange={(e) => 
                setForm((prev) => ({
                  ...prev,
                  [key]: e.target.value
                }))
              }
            />        
          </div>
        )}
        <div className={styles.buttonField}>
          <button className={styles.button} onClick={onSave} disabled={isSaving}>保存</button>
        </div>
      </div>
    </div>
  )
}
