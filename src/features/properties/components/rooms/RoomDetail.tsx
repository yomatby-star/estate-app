import styles from "./RoomDetail.module.css"

type RoomForm = {
  roomNumber: string
  floorPlan: string
  exclusiveArea: string
  numberFloors: string
  direction: string
  status: string
  rent: string
  managementFee: string
  keyMoney: string
  securityDeposit: string
}

type Props = {
  isEditMode: boolean
  form: RoomForm
  onChangeField: (key: keyof RoomForm, value: string) => void
  equipments: string[]
  onToggleEquipment: (equipment: string) => void
}

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

export default function RoomDetail({ isEditMode, form, onChangeField, equipments, onToggleEquipment }: Props) {

  const statusLabel =
    form.status === "vacant"
      ? "空室"
      : form.status === "closed"
        ? "募集停止"
        : ""

  const statusStyle =
    form.status === "vacant"
      ? styles.vacantStyle
      : form.status === "closed"
        ? styles.closedStyle
        : ""

  const basic = [
    { label: "部屋番号", key: "roomNumber", value: form.roomNumber, suffix: "号室" },
    { label: "タイプ", key: "floorPlan", value: form.floorPlan, suffix: "" },
    { label: "専有面積", key: "exclusiveArea", value: form.exclusiveArea, suffix: "㎡" },
    { label: "階数", key: "numberFloors", value: form.numberFloors, suffix: "階" },
  ] as const

  const conditions = [
    { label: "賃料", key: "rent", value: form.rent, suffix: "/ 月"},
    { label: "管理費", key: "managementFee", value: form.managementFee, suffix: "/ 月"},
    { label: "礼金", key: "keyMoney", value: form.keyMoney, suffix: ""},
    { label: "敷金", key: "securityDeposit", value: form.securityDeposit, suffix: ""},
  ] as const

  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>基本情報</div>
          {isEditMode ? (
            <select
              className={styles.statusSelect}
              value={form.status}
              onChange={(e) => onChangeField("status", e.target.value)}
            >
              <option value="vacant">空室</option>
              <option value="closed">募集停止</option>
            </select>
          ) : (
            <div className={`${styles.statusField} ${statusStyle}`}>{statusLabel}</div>
          )}
        </div>
        {basic.map(({ label, key, value, suffix }) => (
          <div key={label} className={styles.basic}>
            <span className={styles.basicLabel}>{label}</span>
            {isEditMode ? (
              <input
                className={styles.editInput}
                value={value}
                onChange={(e) => onChangeField(key, e.target.value)}
              />
            ) : (
              <span className={styles.basicValue}>{`${value || "-"}${suffix ? ` ${suffix}` : ""}`}</span>
            )}
          </div>
        ))}
        {isEditMode && (
          <div className={styles.basic}>
            <span className={styles.basicLabel}>向き</span>
            <input
              className={styles.editInput}
              value={form.direction}
              onChange={(e) => onChangeField("direction", e.target.value)}
            />
          </div>
        )}
      </div>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>設備</div>
        </div>
        <div className={styles.equipmentItemField}>
          {isEditMode ? (
            EQUIPMENTS.map((equipment) => (
              <button
                type="button"
                key={equipment}
                onClick={() => onToggleEquipment(equipment)}
                className={equipments.includes(equipment) ? styles.equipmentActive : styles.equipment}
              >
                {equipment}
              </button>
            ))
          ) : (
            equipments.map((i, idx) =>
              <span key={idx} className={styles.equipmentItem}>{i}</span>
            )
          )}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.basicHead}>
          <div className={styles.cardTitle}>条件</div>
        </div>
        <div className={styles.conditionsField}>
          {conditions.map(({ label, key, value, suffix }) =>
            <div key={label} className={styles.basic}>
              <span className={styles.basicLabel}>{label}</span>
              {isEditMode ? (
                <input
                  className={styles.editInput}
                  value={value}
                  onChange={(e) => onChangeField(key, e.target.value)}
                />
              ) : (
                <>
                  <span className={styles.basicValue}>{Number(value) ? value : "-"}</span>
                  { suffix && <span>{suffix}</span>}
                </>
              )}
            </div>
          )}
          <button className={styles.registerButton}>この部屋に入居者を登録する</button>
        </div>
      </div>
    </div>
  )
}
