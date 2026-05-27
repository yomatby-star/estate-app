// import { mockProperties } from "../../mocks/properties/mock"
import PropertyCard from "../../features/properties/components/propertyCard/PropertyCard"
import navMainContentsTitle from "../../hooks/navMaiinContentsTitle/navMainContentsTitle"
import { useEffect, useState } from "react"
import SearchInput from "../../features/properties/components/searchInput/SearchInput"
import styles from "./PropertyListPage.module.css"
import { getProperties } from "../../api/getProperties/getProperties"
import type{ Property } from "../../mocks/properties/mock"



export default function PropertyListPage() {
  const title = navMainContentsTitle()
  const [inputValue, setInputValue] = useState("")
  const [query, setQuery] = useState("")
  const [onlyVacant, setOnlyVacant] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])

  const onSearch = () => setQuery(inputValue)
  const onVacantFilterClick = () => setOnlyVacant((prev) => !prev)
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
        setProperties(data)
      } catch (error) {
        console.log("物件一覧取得失敗:", error)
      }
    }
    fetchProperties()
  },[])

  console.log("properties", properties)

  const q = query.trim()
  const inputSearched = !q
    ? properties
    : properties.filter((p) => {
      const targets = [
        p.basic.name,
        p.common.addr,
        p.common.mansionType,
        p.common.station,
        p.common.structure,
        p.common.local ,
      ]
      return targets.some((item) => item.includes(q))
    }
    )

  // const filtered = !onlyVacant
  //  ? inputSearched
  //  : inputSearched.filter((s) => 
  //   s.roomStatus.some((r) => r.status === "vacant")
  // )

  return (
    <div className={styles.root}>
      <SearchInput
        title={title}
        query={inputValue}
        onChangeQuery={setInputValue}
        onSearch={onSearch}
        />
      <PropertyCard 
        filtered={inputSearched}
        onlyVacant={onlyVacant}
        onVacantFilterClick={onVacantFilterClick}
      />
    </div>
  )
}




