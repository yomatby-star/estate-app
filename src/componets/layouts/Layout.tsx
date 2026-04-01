import { Outlet } from "react-router-dom";
import HeaderMenu from "../headers/HeaderMenu";
import Sidebar from "../sidebar/Sidebar";
import styles from "./Layout.module.css"
import { useState } from "react";


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className={styles.root}>
      <div>
        <HeaderMenu 
          title="賃貸管理システム"
          onToggleSidebaer={toggleSidebar}  
        />
      </div>

      <div className={styles.flexContent}>
        <Sidebar isOpen={isSidebarOpen}/>
          <main className={`${styles.mainContent} ${!isSidebarOpen ? styles.mainExpandet : ""}`}>
            <Outlet />
          </main>
      </div>
    </div>
  )
}
