import { authFetch } from "../../../api/authFetch"
import { useState } from "react"
import styles from "./BuildingRegisterPage.module.css"


export default function BuildingRegisterPage() {
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

  const [form, setForm] = useState({
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
  })

  const onSave = async () => {
    if(!form.buildingName.trim()) {
      alert("物件名を入力してください")
      return
    }

    if(!form.buildingAddr.trim()) {
      alert("住所を入力してください")
      return
    }

    const body = {
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

    const res = await authFetch(`${ENDPOINT_URL}${PATH}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })

    console.log("送信body", body)

    if(!res.ok) {
      const errorBody = await res.json()
      console.log("登録失敗 detail", errorBody)
      alert("登録失敗")
      return
    }

    alert("登録成功")
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
        <button type="button" onClick={onSave}>保存</button>
      </div>
      <div className={styles.card}>
        <div>写真</div>
        <div>その他</div>
      </div>
    </div>
  )
}
