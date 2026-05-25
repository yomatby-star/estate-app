import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import styles from "../roomRegisterPage/RoomRegisterPage.module.css"
import { authFetch } from "../../../api/authFetch"

export default function OwnerRegisterPage() {
  const [searchParams] = useSearchParams()
  const buildingId = searchParams.get("buildingId")
  const [selectedBuildingId, setSelectedBuildingId] = useState(buildingId ?? "")

  const ENDPOINT = "http://127.0.0.1:8000"
  const PATH = "/api/v1/ownerRegister"
  const ENDPOINT_URL = `${ENDPOINT}${PATH}`
  // console.log("ENDPOINT_URL", ENDPOINT_URL)

  const INPUT_ITEMS = [
    { label: "オーナー名", key: "ownerName", required: true },
    { label: "住所", key: "ownerAddr", required: true } 
  ] as const

  const initialForm = {
    ownerName: "",
    ownerAddr: "",
  }

  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)

  const validateForm = () => {
    if(!form.ownerName.trim()) {
      alert("オーナー名を入力して下さい")
      return false
    }
    if(!form.ownerAddr.trim()) {
      alert("住所を入力して下さい")
      return false
    }
    return true
  }

  const createPayload = () => {
    return {
      building_id: buildingId,
      owner: {
        ownerName: form.ownerName,
        ownerAddr: form.ownerAddr
      }
    }
  }

  const onSave = async () => {
    if(!validateForm()) return

    try {
      setIsSaving(true)

      const payload = createPayload()

      const res = await authFetch(ENDPOINT_URL, {
        method:"post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(!res.ok) {
        const errorBody = await res.json()
        console.log("オーナー登録に失敗", errorBody)
        alert("オーナー登録に失敗しました")
        return 
      }

      alert("オーナー登録完了")
      setForm(initialForm)
    } catch (error) {
      console.log("通信エラー:", error)
      alert("通信エラーが発生しました")
    } finally {
      setIsSaving(false)
    }
  }

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
