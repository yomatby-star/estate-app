import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import styles from "./RoomRegisterPage.module.css"
import { authFetch } from "../../../api/authFetch"
import { ROUTES, REGISTER_NAV } from "../../../routes/rouets"


export default function RoomRegisterPage() {
  const navigate = useNavigate()
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
    { label: "募集状況", key: "roomStatus", required: true }
  ] as const

  const initialForm = {
    roomNumber: "",
    roomRent: "",
    roomStatus: "",
  }

  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)

  const validateForm = () => {
    if(!form.roomNumber.trim()) {
      alert("部屋番号を入力してください")
      return false
    }

    if(!form.roomRent.trim()) {
      alert("家賃を入力してください")
      return false
    }

    if(!form.roomStatus.trim()) {
      alert("ステータスを選んでください")
      return false
    }

    return true
  }

  const createPayload = () => {
    return {
      building_id: buildingId,
      room: {
        roomNumber: Number(form.roomNumber),
        rent: Number(form.roomRent),
        status: form.roomStatus
      }
    }
  }

  const onSave = async () => {
    if(!validateForm()) return

    try {
      setIsSaving(true)

      const payload = createPayload()

      const res = await authFetch(ENDPOINT_URL, {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(!res.ok) {
        const errorBody = res.json()
        console.log("部屋登録に失敗:", errorBody)
        alert("部屋登録に失敗")
        return
      }

      // const data = await res.json()
      // console.log("RoomData", data.data.id)

      alert("部屋登録に成功")
      setForm(initialForm)

      navigate(`${ROUTES.register}/${REGISTER_NAV.owner}?buildingId=${buildingId}`)
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
          <strong>部屋登録</strong>
          <div>
            物件名：{selectedBuildingId || "未選択"}
          </div>
        </div>
        {INPUT_ITEMS.map(({ label, key, required }) => 
          <div key={key} className={styles.inputFields}>
            <span className={styles.labelTitle}>{label}{required && " *"}</span>

            {key === "roomStatus" ? (
              <select
                className={styles.statusField}
                value={form.roomStatus}
                onChange={(e) => 
                  setForm((prev) => ({
                    ...prev,
                    roomStatus: e.target.value
                  }))
                }
              >
                <option value="">選択してください</option>
                <option value="vacant">空室</option>
                <option value="closed">募集停止</option>
                <option value="applying">申込有</option>
              </select>
            ) : (
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
            )}
          </div>
        )}
        <div className={styles.buttonField}>
          <button className={styles.button} onClick={onSave} disabled={isSaving}>保存</button>
        </div>
      </div>
    </div>  
  )
}
