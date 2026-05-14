import { useState } from "react"
import { useSearchParams } from "react-router-dom"



export default function RoomRegisterPage() {
  const [searchParamsto] = useSearchParams()
  console.log("searchParamsto", searchParamsto)

  const buildingId = searchParamsto.get("buildingId")

  const [selectedBuildingId, setSelectedBuildingId ] = useState(buildingId ?? "")

  return (
    <div>
      <div>
        <h2>部屋登録</h2>
        <div>選択中の物件ID: {selectedBuildingId || "未選択"}</div>
      </div>
    </div>
  )
}
