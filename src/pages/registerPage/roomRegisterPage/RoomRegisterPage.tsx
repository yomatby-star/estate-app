import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authFetch } from "../../../api/authFetch"
import { ROUTES, REGISTER_NAV } from "../../../routes/rouets"
import { ENDPOINT_URL } from "../../../api/mixin/mixin"
import { Upload } from "lucide-react"
import { getRoom } from "../../../api/getRooms/getRoom"
import toast from "react-hot-toast"
import styles from "./RoomRegisterPage.module.css"
import stylesDialog from "../../../componets/confirmDialog/ResetDialog.module.css"




export default function RoomRegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const buildingId = searchParams.get("buildingId")
  const copyRoomId = searchParams.get("copyRoomId")
  console.log("buildingId", buildingId)
  console.log("copyRoomId", copyRoomId)

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
    managementFee: "",
    securityDeposit: "",
    keyMoney: "",
    floorPlan: "",
    exclusiveArea: "",
    numberFloors: "",
    direction: "",
    roomStatus: "",
  }

  const [form, setForm] = useState(initialForm)
  const [equipments, setEquipments] = useState<string[]>([])
  const [imagesFile, setImagesFile] = useState<File[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const toggleEquipments = (equipment: string) => {
    setEquipments((prev) =>
      prev.includes(equipment)
        ? prev.filter((item) => item !== equipment)
        :[...prev, equipment]
    )
  }

  const validateChckerList = [
    { key: "roomNumber", label: "部屋番号" },
    { key: "roomRent", label: "家賃" },
    { key: "managementFee", label: "管理費" },
    { key: "floorPlan", label: "間取り" },
    { key: "numberFloors", label: "階" },
    { key: "roomStatus", label: "募集状況" },
  ] as const

  const validateForm = () => {
    const error = validateChckerList.find(
      item => !String(form[item.key]).trim()
    )
    if(error) {
      alert(`${error.label}を入力してください`)
      return false
    }
    return true
  }

  const createPayload = () => {
    return {
      building_id: buildingId,
      room: {
        roomNumber: form.roomNumber,
        rent: Number(form.roomRent),
        managementFee: Number(form.managementFee),
        securityDeposit: Number(form.securityDeposit),
        keyMoney: Number(form.keyMoney),
        floorPlan: form.floorPlan,
        exclusiveArea: form.exclusiveArea,
        numberFloors: form.numberFloors,
        direction: form.direction,
        status: form.roomStatus,
        equipments: equipments
      }
    }
  }

  const onSave = async () => {
    if(!validateForm()) return

    try {
      setIsSaving(true)

      const payload = createPayload()
      const formData = new FormData()

      formData.append("payload", JSON.stringify(payload))

      imagesFile.forEach(file => {
        formData.append("files", file)
      })

      const res = await authFetch(ENDPOINT, {
        method: "post",
        body: formData
      })

      if(!res.ok) {
        const errorBody = await res.json()
        console.log("部屋登録に失敗:", errorBody)
        toast.error(errorBody.detail)
        return
      }

      // const data = await res.json()
      // console.log("RoomData", data.data.id)

      toast.success("部屋登録に成功", {
        duration: 6000,
      })
      setForm(initialForm)
      setImagesFile([])
      setEquipments([])

      // navigate(`${ROUTES.register}/${REGISTER_NAV.owner}?buildingId=${buildingId}`)
      navigate(`${ROUTES.property}/${buildingId}/${REGISTER_NAV.room}`)

    } catch (error) {
      console.log("通信エラー:", error)
      alert("通信エラーが発生しました")

    } finally {
      setIsSaving(false)
    }
  }

  // 投入画像確認用
  useEffect(() => {
    console.log("投入画像件数:", imagesFile.length)
    console.log("投入画像:", imagesFile)
  }, [imagesFile])

  // 部屋複製用の処理
  useEffect(() => {
    if(!copyRoomId) return
    
    const fetchRoom = async () => {
      const room = await getRoom(copyRoomId)
      console.log("取得済部屋情報:", room)

      setEquipments(room.equipments ?? [])
      setForm({
        roomNumber: room.roomNumber ?? "",
        roomRent: String(room.rent ?? ""),
        managementFee: String(room.managementFee ?? ""),
        securityDeposit: String(room.securityDeposit ?? ""),
        keyMoney: String(room.keyMoney ?? ""),
        floorPlan: room.floorPlan ?? "",
        exclusiveArea: String(room.exclusiveArea ?? ""),
        numberFloors: String(room.numberFloors ?? ""),
        direction: room.direction ?? "",
        roomStatus: room.status ?? "",
      })
    }

    fetchRoom()
  }, [copyRoomId])


  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.title}>
          <strong>部屋登録</strong>
          <div>物件名：{selectedBuildingId || "未選択"}</div>
        </div>
        <div className={styles.inner}>
          <div className={styles.leftInner}>
            <span className={styles.basicFieldTitle}>基本情報</span>
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

          <div className={styles.rightInner}>
            <div className={styles.imageFieldInner}>
              <div className={styles.imageFieldInnerHeader}>
                <div className={styles.imageTitleField}>
                  <span className={styles.basicFieldTitle}>部屋画像を登録してください</span>
                  <span className={styles.imageSubTitle}>間取り図・室内画像・設備等の画像を複数登録可能</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className={styles.countButton}
                >
                  画像添付件数：{imagesFile.length} 件
                </button>
              </div>
              <label htmlFor="images-upload">
                <div className={styles.uploadArea}>
                  <input 
                    id="images-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className={styles.hiddenInput}
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? [])
                      console.log("files:", files.length)
                      console.log("画像一覧:", files)
                      setImagesFile(prev => [...prev, ...files])
                    }}
                  />
                  <Upload size={40} color="#8b5cf6"/>
                  <span className={styles.uploadLabel}>ファイルを選択</span>
                  <span className={styles.inputText}>JPG, PNG, WEBP（最大5MB）</span>
                </div>
              </label>
            </div>

            <div className={styles.equipmentArea}>
              <span className={styles.basicFieldTitle}>設備</span>
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
      </div>
      <div className={styles.buttonField}>
        <button className={`${styles.button} ${styles.resetButton}`}>リセット</button>
        <button className={styles.button} onClick={onSave} disabled={isSaving}>{isSaving ? "保存中..." : "保存"}</button>
      </div>

      {isPreviewOpen && (
        <div className={stylesDialog.overlay}>
          <div className={stylesDialog.modal}>
            <div className={styles.header}>
              <h3>添付済み画像 <span className={styles.imagesCount}>{imagesFile.length}</span> 件</h3>
              <div>
                {/* <button className={styles.commonButton}>編集</button> */}
                <button type="button" className={styles.commonButton} onClick={() => setIsPreviewOpen(false)}>閉じる</button>
              </div>
            </div>
            
            <div className={styles.imageList}>
              {imagesFile.map((file, index) => (
                <img 
                  key={`${file.name}-${index}`}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className={styles.previewImage}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>  
  )
}
