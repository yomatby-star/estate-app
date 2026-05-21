import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "./RoomRegisterPage.module.css"
import { Key } from "lucide-react"



export default function RoomRegisterPage() {
  const [searchParamsto] = useSearchParams()
  const buildingId = searchParamsto.get("buildingId")
  const [selectedBuildingId, setSelectedBuildingId ] = useState(buildingId ?? "")

  const ENDPOINT = "http://127.0.0.1:8000"
  const PATH = "/api/v1/roomRegister"
  const ENDPOINT_URL = `${ENDPOINT}${PATH}`
  // console.log("ENDPOINT_URL:", ENDPOINT_URL)

  const INPUT_ITEMS = [
    { label: "部屋番号", key: "roomNumber", required: true },
    { label: "家賃", key: "roomRent", required: true },
    { label: "ステータス", key: "roomStatus", required: true }
  ] as const

  const initialForm = {
    roomNumber: "",
    roomRent: "",
    roomStatus: "",
  }

  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)

  const onSave = () => console.log("保存をクリックしました")


  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.title}>
          <strong>部屋登録</strong>
          <div>
            物件名：{selectedBuildingId || "未選択"}
          </div>
        </div>
        {INPUT_ITEMS.map(({ label, key, required }) => 
          <div key={key} className={styles.inputFields}>
            <span>{label}{required && "*"}</span>
            <input
              required={required}
              value={form[key]}
              onChange={(e) => 
                setForm((prev) => ({
                  ...prev,
                  [key]: e.target.value
                }))
              }
            />
          </div>
        )}
        <button className={styles.save} onClick={onSave}>保存</button>
      </div>
    </div>  
  )
}
