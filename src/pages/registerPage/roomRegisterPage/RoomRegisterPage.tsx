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
        <strong>部屋登録</strong>
        <div>選択中の物件ID: {selectedBuildingId || "未選択"}</div>
      </div>
      <div>

        <div>
          <div>部屋番号</div>
          <input 
            value={"503"}
          />
        </div>

        <div>
          <div>家賃</div>
          <input
            type="number"
            value={75000}
          />
        </div>

        <div>
          <div>ステータス</div>
          <select>
            
          </select>
        </div>
      </div>
    </div>
  )
}
