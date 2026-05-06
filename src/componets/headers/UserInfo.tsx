import { useAuth } from "../../contexts/AuthContext"


export default function UserInfo() {
  const { user } = useAuth()

  return (
    <div>User： {user?.email}</div>
  )
}
