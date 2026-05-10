import { authFetch } from "../../../api/authFetch"
import { useState } from "react"


export default function BuildingRegisterPage() {
  const ENDPOINT_URL = "http://127.0.0.1:8000"
  const PATH = "/api/v1/buildingRegister"

  const INPUT_ITEMS = [
    { label: "物件名", key: "buildingName" },
    { label: "住所", key: "buildingAddr" },
    { label: "構造", key: "buildingStructure" },
  ] as const

  const [form, setForm] = useState({
    buildingName: "",
    buildingAddr: "",
    buildingStructure: "",
  })

  const onSave = async () => {
    const body = {
      basic: {
        name: form.buildingName
      },
      common: {
        addr: form.buildingAddr,
        structure: form.buildingStructure
        // mansionType: "",
        // local: "",
        // station: "",
        // year: "",
        // floors: "",
        // autoLock: "",
        // gas: "",
        // garbage: ""
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
    <div>
      <div>
        {INPUT_ITEMS.map(({ label, key }) => 
          <div key={key}>
            <span>{label}</span>
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
    </div>
  )
}
