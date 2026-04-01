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
      <div className={styles.title}>{title}</div>
      <div className={styles.inputField}>
        <input
          value={query}
          className={styles.input}
          onChange={(e) => onChangeQuery(e.target.value)}
          placeholder="物件名・住所"
          onKeyDown={(e) => {
            if(e.key === "Enter" && !e.nativeEvent.isComposing) onSearch()
          }}
        />
        <button type="button" className={styles.searchButton} onClick={onSearch}>検索</button>
      </div>
    </div>
  )
}
