import { auth } from "../lib/firebase";

type RequestOptions = RequestInit & {
  headers?: HeadersInit
}

export async function authFetch(url: string, options: RequestOptions = {}) {
  const user = auth.currentUser
  console.log("user", user)

  if (!user) {
    throw new Error("未ログインです")
  }

  const idToken = await user.getIdToken()
  console.log("idToken", idToken)

  const headers = new Headers(options.headers) 
  console.log("headers", headers)

  headers.set("Authorization", `Bearer ${idToken}`)

  const response = await fetch(url, {
    ...options,
    headers,
  })
  console.log("response", response)

  if (response.status === 401) {
    throw new Error("承認エラーです")
  }

  return response
}
