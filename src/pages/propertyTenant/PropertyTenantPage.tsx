import { useAuth } from "../../contexts/AuthContext" 
import { fetchMe } from "../../api/authApi" 

export default function PropertyTenantPage() {
  const { user } = useAuth()

  const handlecheckMe = async () => {
    try {
      const data = await fetchMe()
      console.log("承認成功", data)
      alert(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(error)
      alert("認証付きのAPI呼び出しに失敗しました。")
    }
  }

  return (
    <div>
      <p>ログイン中： {user?.email}</p>
      <button onClick={handlecheckMe}>/me 確認</button>
    </div>
  )
}
