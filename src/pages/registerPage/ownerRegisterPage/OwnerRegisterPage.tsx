import { useState } from "react"
import { useSearchParams } from "react-router-dom"


export default function OwnerRegisterPage() {
  const [searchParams] = useSearchParams()
  const buildingId = searchParams.get("buildingId")

  const [selectedBuildingId, setSelectedBuildingId] = useState(buildingId ?? "")
  // console.log("buildingId", buildingId)

  const INPUT_ITEMS = [
    { label: "オーナー名", key: "ownerName", required: true },
    { label: "住所", key: "ownerAddr", required: true }
  ]

  const initialForm = {
    ownerName: "",
    ownerAddr: "",
  }

  const [from, setForm] = useState(initialForm)

  return (
    <div>
      <div>
        <div>
          <strong>貸主登録</strong>
          <div>物件名：{selectedBuildingId || "未選択"}</div>
        </div>

        <div>
          {INPUT_ITEMS.map(({ label, key, required }) => 
            <div key={key}>
              <span>{label}{required && " *"}</span>              
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
