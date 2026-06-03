import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authFetch } from "../../../api/authFetch"
import { ROUTES, REGISTER_NAV } from "../../../routes/rouets"
import styles from "./RoomRegisterPage.module.css"
import { ENDPOINT_URL } from "../../../api/mixin/mixin"


export default function RoomRegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const buildingId = searchParams.get("buildingId")
  const [selectedBuildingId, setSelectedBuildingId ] = useState(buildingId ?? "")

  const ENDPOINT = `${ENDPOINT_URL}/api/v1/roomRegister`
  // console.log("ENDPOINT:", ENDPOINT)

  const INPUT_ITEMS = [
    { label: "部屋番号", key: "roomNumber", required: true, type: "input" },
    { label: "家賃", key: "roomRent", required: true, type: "number" },
    { label: "管理費", key: "managementFee", required: true, type: "number" },
    { label: "敷金", key: "securityDeposit", required: false, type: "number" },
    { label: "礼金", key: "keyMoney", required: false, type: "number" },
    { label: "間取り", key: "floorPlan", required: true, type: "select" },
    { label: "専有面積", key: "exclusiveArea", required: true, type: "number" },
    { label: "階", key: "numberFloors", required: true, type: "number" },
    { label: "向き", key: "direction", required: false, type: "select" },
    { label: "募集状況", key: "roomStatus", required: true, type: "select" },
  ] as const

  const EQUIPMENTS = [
    "バストイレ別",
    "エアコン",
    "オートロック",
    "宅配ボックス",
    "TVインターホン",
    "室内洗濯機置き場",
    "防犯カメラ",
    "駐輪場",
    "バルコニー",
    "フローリング",
  ]

  const initialForm = {
    roomNumber: "",
    roomRent: "",
    roomStatus: "",
  }

  const [form, setForm] = useState(initialForm)
  const [equipments, setEquipments] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const toggleEquipments = (equipment: string) => {
    setEquipments((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        :[...prev, equipment]
    )
  }

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

      const res = await authFetch(ENDPOINT, {
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
          <div>物件名：{selectedBuildingId || "未選択"}</div>
        </div>
        <div className={styles.inner}>
          <div className={styles.rightInner}>
            <span>基本情報</span>
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
          </div>
          <div className={styles.equipmentArea}>
            <span>設備</span>
            <div className={styles.equipmentList}>
              {EQUIPMENTS.map((equipment) => (
                <button
                  type="button"
                  key={equipment}
                  onClick={() => toggleEquipments(equipment)}
                  className={
                    equipments.includes(equipment)
                      ? styles.equipmentActive
                      : styles.equipment
                  } 
                >
                  {equipment}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonField}>
        <button>リセット</button>
        <button className={styles.button} onClick={onSave} disabled={isSaving}>保存</button>
      </div>
    </div>  
  )
}
