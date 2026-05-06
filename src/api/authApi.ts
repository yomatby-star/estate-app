import { authFetch } from "./authFetch"

export async function fetchMe() {
  const res = await authFetch("http://localhost:8000/me", {
    method: "GET",
  })

  if (!res.ok) {
    throw new Error("ユーザー情報取得に失敗しました。")
  }

  return res.json()
}
