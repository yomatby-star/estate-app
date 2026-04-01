import styles from "./HeaderMenu.module.css"
import { Bell, MessageCircle, User, Menu } from "lucide-react"

type Props = {
  title: string;
  onToggleSidebaer: () => void
}

export default function HeaderMenu({ title, onToggleSidebaer }: Props) {
  const mockIcons = {
    notifications: 12,
    chat: 3,
    user: 1,
  }

  return (
    <div className={styles.root}>
      <div className={styles.leftContent}>
        <button
          type="button"
          onClick={onToggleSidebaer}
          className={styles.sideButton}>
            {<Menu className={styles.menuToggle} size={26}/>}
        </button>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      
      <div className={styles.icons}>
        <button 
          type="button"
          aria-label="通知"
          className={styles.iconRoot}
          onClick={() => console.log("通知クリック！")}
        >
          <span>{<Bell size={20} />}</span>
          <div className={styles.num}>
            {mockIcons.notifications}
          </div>
        </button>
        <button 
          type="button"
          aria-label="チャット"
          className={styles.iconRoot}
          onClick={() => console.log("チャットクリック！")}
        >
          <span>{<MessageCircle size={20} />}</span>
          <div className={styles.num}>
            {mockIcons.chat}
          </div>
        </button>
        <button 
          type="button"
          aria-label="ユーザー"
          className={styles.iconRoot}
          onClick={() => console.log("ユーザークリック！")}
        >
          <span>{<User size={20} />}</span>
          <div className={styles.num}>
            {mockIcons.user}
          </div>
        </button>
      </div>
    </div>
  )
}
