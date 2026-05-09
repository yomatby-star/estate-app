import { Outlet } from "react-router-dom"

export default function registerPage() {
  return (
    <div>
      <nav>
        <button>物件登録</button>
        <button>部屋登録</button>
        <button>オーナー登録</button>
      </nav>
      <div><Outlet /></div>
    </div>
  )
}
