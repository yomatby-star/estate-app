import { authFetch } from "../../../api/authFetch"
import { useState } from "react"
import styles from "./BuildingRegisterPage.module.css"


export default function BuildingRegisterPage() {
  const ENDPOINT_URL = "http://127.0.0.1:8000"
  const PATH = "/api/v1/buildingRegister"

  const INPUT_ITEMS = [
    { label: "物件名", key: "buildingName" },
    { label: "住所", key: "buildingAddr" },
    { label: "構造", key: "buildingStructure" },
    { label: "種別", key: "buildingMansionType" },
    { label: "路線", key: "buildingLocal" },
    { label: "駅名", key: "buildingStation" },
    { label: "築年", key: "buildingYear" },
    { label: "階数", key: "buildingFloors" },
    { label: "オートロック", key: "buildingAutoLock" },
    { label: "ガス", key: "buildingGas" },
    { label: "ゴミ置場", key: "buildingGarbage" },
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
        {INPUT_ITEMS.map(({ label, key }) => 
          <div key={key} className={styles.inputField}>
            <span className={styles.labelTitle}>{label}</span>
            <input
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
