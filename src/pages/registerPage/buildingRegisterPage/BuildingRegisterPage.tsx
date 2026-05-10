import { useState } from "react"


export default function BuildingRegisterPage() {
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
      </div>
    </div>
  )
}
