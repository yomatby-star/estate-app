import { Building2 } from "lucide-react"
import styles from "./SearchInput.module.css"

type Props = {
  title: string;
  query: string;
  onChangeQuery: (v: string) => void;
  onSearch: () => void
}

export default function SearchInput({ title, query, onChangeQuery, onSearch }: Props) {
  return (
    <div className={styles.titleInputField}>
      <div className={styles.iconAndTitle}>
        <Building2 className={styles.icon} />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.inputField}>
        <input
          value={query}
          className={styles.input}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="物件名・住所で検索"
          onKeyDown={(e) => {
            if(e.key === "Enter" && !e.nativeEvent.isComposing) onSearch()
          }}
        />
        <button type="button" className={styles.searchButton} onClick={onSearch}>検索</button>
      </div>
    </div>
  )
}
