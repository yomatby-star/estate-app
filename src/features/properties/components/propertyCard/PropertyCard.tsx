import MainCard from "./mainCard/MainCard"
import styles from "./PropertyCard.module.css"
import type { Property } from "../../../../mocks/properties/mock"

type Props = {
  filtered: Property[];
  onlyVacant: boolean;
  onVacantFilterClick: () => void;
}

export default function PropertyCard({ filtered, onlyVacant, onVacantFilterClick }: Props) {
  return (
    <div className={styles.mainCardField}>
      <header className={styles.header}>
        <span>{`${filtered.length} 件`}</span>
        <div className={styles.filteredButtonField}>
          <button className={`${styles.filterButton} ${onlyVacant ? styles.active : ""}`} onClick={onVacantFilterClick}>空室有</button>
        </div>
      </header>

      <main className={styles.mainContentField}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>該当する物件がありません</div>
        ) : filtered.map((f) => (
            <MainCard key={f.id} property={f}/>
          )
        )}
      </main>
      
      <footer className={styles.footer}>
        <button className={styles.nextButton}>次の10件</button>
      </footer>
    </div>
  )
}
