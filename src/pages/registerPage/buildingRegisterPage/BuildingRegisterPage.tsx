import { authFetch } from "../../../api/authFetch"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { REGISTER_NAV, ROUTES } from "../../../routes/rouets"
import { ENDPOINT_URL } from "../../../api/mixin/mixin"
import { Upload, Building2 } from "lucide-react"
import styles from "./BuildingRegisterPage.module.css"


export default function BuildingRegisterPage() {
  const navigate = useNavigate()
  const ENDPOINT = `${ENDPOINT_URL}/api/v1/buildingRegister`
  // console.log("ENDPOINT", ENDPOINT)

  const INPUT_ITEMS = [
    { label: "物件名", key: "buildingName", required: true, type: "input" },
    { label: "住所", key: "buildingAddr", required: true, type: "input" },
    { label: "構造", key: "buildingStructure", required: false, type: "select", options: ["木造", "鉄骨", "軽量鉄骨", "鉄筋コンクリート"] },
    { label: "種別", key: "buildingMansionType", required: false, type: "select", options: ["アパート", "マンション", "ビル", "テナント"]  },
    { label: "路線", key: "buildingLocal", required: false, type: "input" },
    { label: "駅名", key: "buildingStation", required: false, type: "input" },
    { label: "築年", key: "buildingYear", required: false, type: "number" },
    { label: "階数", key: "buildingFloors", required: false, type: "number" },
    { label: "オートロック", key: "buildingAutoLock", required: false, type: "select", options: ["有", "無"] },
    { label: "ガス", key: "buildingGas", required: false, type: "select", options: ["東京ガス", "プロパンガス", "不明"] },
    { label: "ゴミ置場", key: "buildingGarbage", required: false, type: "select", options: ["敷地内", "地域指定", "無"] },
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

      const res = await authFetch(ENDPOINT, {
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

  const onReset = () => {
    setForm(initialForm)
    setImageFile(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.stack}>
        <div className={styles.card}>
          <div className={styles.titleIconField}>
            <Building2 size={26} color="#8b5cf6"/>
            <strong className={styles.title}>物件登録</strong>
          </div>
          {INPUT_ITEMS.map(( item ) => 
            <div key={item.key} className={styles.inputField}>
              <span className={styles.labelTitle}>
                {item.label}{item.required && " *"}
              </span>
              {
                item.type === "select" 
                ? (
                    <select
                      value={form[item.key]}
                      required={item.required}
                      className={styles.select}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          [item.key]: e.target.value
                        }))
                      }}
                    >
                      <option value="">選択してください</option>
                      {item.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) 
                : item.type === "number" 
                  ? (
                    <input 
                      value={form[item.key]}
                      className={styles.input}
                      type="number"
                      min="0"
                      required={item.required}
                      onChange={(e) => 
                        setForm((prev) => ({
                          ...prev,
                          [item.key]: e.target.value
                        }))
                      }
                    />
                  )
                : (
                    <input
                      className={styles.input}
                      required={item.required}
                      value={form[item.key]}
                      onChange={(e) => 
                        setForm((prev) => ({
                          ...prev,
                          [item.key]: e.target.value
                        }))
                      }
                    />
                  )
                }
            </div>
          )}
        </div>

        <div className={styles.card}>
          <div className={styles.imageFieldInner}>
            <div className={styles.imageTitleField}>
              <span className={styles.imageTitle}>外観画像を登録してください</span>
              <span className={styles.imageSubTitle}>物件の外観画像を1枚アップロードしてください</span>
            </div>

            <label htmlFor="image-upload">
              <div className={styles.uploadArea}>
                <input 
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    setImageFile(file)
                  }}
                />
                <Upload size={40} className={styles.fileIcon}/>
                <span className={styles.uploadLabel}>ファイルを選択</span>
                <span className={styles.inputText}>JPG, PNG, WEBP（最大5MB）</span>
              </div>
            </label>

            <div className={styles.imageTitleField}>
              <span className={styles.imageTitle}>プレビュー</span>
            </div>

            <div className={styles.previewField}>
              {imageFile ? (
                <img 
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className={styles.previewFieldImage}
                />
              ) : (
                <span className={styles.noImageText}>上部の「ファイルを選択」から画像を添付してください</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonField}>
        <button type="button" className={`${styles.button} ${styles.resetButton}`} onClick={onReset}>リセット</button>
        <button type="button" className={styles.button} onClick={onSave} disabled={isSaving}>保存</button>
      </div>
    </div>
  )
}
