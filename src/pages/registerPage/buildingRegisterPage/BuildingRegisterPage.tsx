import { authFetch } from "../../../api/authFetch"
import { useState } from "react"
import styles from "./BuildingRegisterPage.module.css"
import { useNavigate } from "react-router-dom"
import { REGISTER_NAV, ROUTES } from "../../../routes/rouets"



export default function BuildingRegisterPage() {
  const navigate = useNavigate()
  const ENDPOINT_URL = "http://127.0.0.1:8000"
  const PATH = "/api/v1/buildingRegister"

  const INPUT_ITEMS = [
    { label: "物件名", key: "buildingName", required: true },
    { label: "住所", key: "buildingAddr", required: true },
    { label: "構造", key: "buildingStructure", required: false },
    { label: "種別", key: "buildingMansionType", required: false },
    { label: "路線", key: "buildingLocal", required: false },
    { label: "駅名", key: "buildingStation", required: false },
    { label: "築年", key: "buildingYear", required: false },
    { label: "階数", key: "buildingFloors", required: false },
    { label: "オートロック", key: "buildingAutoLock", required: false },
    { label: "ガス", key: "buildingGas", required: false },
    { label: "ゴミ置場", key: "buildingGarbage", required: false },
  ] as const

  const initialForm = {
    buildingName: "",
    buildingAddr: "",
    buildingStructure: "",
    buildingMansionType: "",
    buildingLocal: "",
    buildingStation: "",
    buildingYear: "",
    buildingFloors: "",
    buildingAutoLock: "",
    buildingGas: "",
    buildingGarbage: "",
  }

  const [form, setForm] = useState(initialForm)
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const validateForm = () => {
    if(!form.buildingName.trim()) {
      alert("物件名を入力してください")
      return false
    }

    if(!form.buildingAddr.trim()) {
      alert("住所を入力してください")
      return false
    }

    return true
  }

  const createPayload = () => {
    return {
      basic: {
        name: form.buildingName
      },
      common: {
        addr: form.buildingAddr,
        structure: form.buildingStructure,
        mansionType: form.buildingMansionType,
        local: form.buildingLocal,
        station: form.buildingStation,
        year: Number(form.buildingYear),
        floors: Number(form.buildingFloors),
        autoLock: form.buildingAutoLock,
        gas: form.buildingGas,
        garbage: form.buildingGarbage
      }
    }
  }

  const onSave = async () => {
    if(!validateForm()) return

    try {
      setIsSaving(true)

      const payload = createPayload()
      const formData = new FormData()// 画像・PDF・Excel

      formData.append("payload", JSON.stringify(payload))

      if(imageFile) {
        formData.append("file", imageFile)
      }

      const res = await authFetch(`${ENDPOINT_URL}${PATH}`, {
        method: "post",
        body: formData
      })

      if(!res.ok) {
        const errorBody = await res.json()
        console.log("登録失敗", errorBody)
        alert("登録失敗")
        return
      }

      const data = await res.json()
      console.log("data", data.data.id)

      alert("登録成功")

      setForm(initialForm)
      setImageFile(null)

      navigate(`${ROUTES.register}/${REGISTER_NAV.room}?buildingId=${data.data.id}`)

    } catch (error) {
        console.log("通信エラー", error)
        alert("通信エラーが発生しました")
    } finally {
        setIsSaving(false)
    }
    
  }

  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <strong className={styles.title}>物件登録</strong>
        {INPUT_ITEMS.map(({ label, key, required }) => 
          <div key={key} className={styles.inputField}>
            <span className={styles.labelTitle}>
              {label}{required && " *"}
            </span>
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
      </div>
      <div className={styles.card}>
        <input 
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null
            setImageFile(file)
          }}
        />
        <button type="button" onClick={onSave} disabled={isSaving}>保存</button>
      </div>
    </div>
  )
}
