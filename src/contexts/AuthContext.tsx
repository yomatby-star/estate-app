import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../lib/firebase"

type AuthContextType = {
  user: User | null,
  loading: boolean,
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // ログインしてるのかの監視関数
  useEffect(() => {
    const unsubscride = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    console.log("useEffect, ログインしてるのかの監視関数実行")
    return unsubscride
  }, [])

  // Login関数
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
    console.log("Login関数実行")
  }

  // Logout関数
  const logout = async () => {
    await signOut(auth)
    console.log("Logout関数実行")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}{/* childrenは<App />のこと */}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
