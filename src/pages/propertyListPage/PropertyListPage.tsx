import { mockProperties } from "../../mocks/properties/mock"
import PropertyCard from "../../features/properties/components/propertyCard/PropertyCard"
import navMainContentsTitle from "../../hooks/navMaiinContentsTitle/navMainContentsTitle"
import { useState } from "react"
import SearchInput from "../../features/properties/components/searchInput/SearchInput"
import styles from "./PropertyListPage.module.css"


export default function PropertyListPage() {
  const title = navMainContentsTitle()
  const [inputValue, setInputValue] = useState("")
  const [query, setQuery] = useState("")
  const [onlyVacant, setOnlyVacant] = useState(false)

  const onSearch = () => setQuery(inputValue)
  const onVacantFilterClick = () => setOnlyVacant((prev) => !prev)

  const q = query.trim()
  const inputSearched = !q
    ? mockProperties
    : mockProperties.filter((p) => {
      const targets = [
        p.basic.name,
        p.basic.addr,
        p.common.mansionType,
        p.common.station,
        p.common.structure,
        p.common.local ,
      ]
      return targets.some((item) => item.includes(q))
    }
    )
  const filtered = !onlyVacant
   ? inputSearched
   : inputSearched.filter((s) => 
    s.roomStatus.some((r) => r.status === "vacant")
  )

  return (
    <div className={styles.root}>
      <SearchInput
        title={title}
        query={inputValue}
        onChangeQuery={setInputValue}
        onSearch={onSearch}
        />
      <PropertyCard 
        filtered={filtered}
        onlyVacant={onlyVacant}
        onVacantFilterClick={onVacantFilterClick}
      />
    </div>
  )
}




