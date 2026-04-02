// ログイン確認中なら待つ
// 未ログインなら /login に飛ばす
// ログイン済みなら中身を表示する

import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

type Props = {
  children: ReactNode
}

export default function RequireAuth({ children }: Props) {
  const { user, loading } = useAuth()

  // trueなら
  if (loading) {
    return <div>読み込み中...</div>
  }

  // userがなければ
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
